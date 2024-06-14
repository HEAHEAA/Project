import './style/survey.scss';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {AppBar} from "@mui/material";

function Survey(){
    const { state } = useLocation();
    const { sv_seqno } = useParams();
    const navigate = useNavigate();

    // 1. 설문 질문조회
    const [surveyData, setSurveyData] = useState([]);
    // console.log(surveyData);
    const questionData = () => {
        axios
            .get(`/nodeApi/surveyQuestion?sv_seqno=${sv_seqno}`)
            .then((res) => {
                const data = res.data.result.map((item) => ({
                    ...item,
                    sv_ans_question: item.sv_ans_question,
                }));
                setSurveyData(data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    useEffect(() => {
        questionData();
    }, [sv_seqno]);

    // 2-1. 설문 전체 답변조회
    const [surveyNewData, setSurveyNewData] = useState([]);
    // console.log(surveyNewData);
    const answerData = () => {
        axios
            .get(
                `/nodeApi/surveyAnswer?sv_main_seqno=${sv_seqno}`
            )
            .then((res) => {
                const data = res.data.result.map((item) => ({
                    ...item,
                    seqno: item.seqno,
                    sv_main_seqno: item.sv_main_seqno,
                    sv_question_seqno: item.sv_question_seqno,
                    sv_ans_no: item.sv_ans_no,
                    sv_ans_content: item.sv_ans_content,
                }));
                setSurveyNewData(data);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    useEffect(() => {
        answerData();
    }, []);

    // 2-2. 해당 질문에 대한 답변 뿌리기
    // reduce로 객체 같은 값끼리 분류
    // 해당 질문에 대한 답변을 그룹화하는 과정
    const group = surveyNewData.reduce((acc, current) => {
        acc[current.sv_question_seqno] = acc[current.sv_question_seqno] || [];
        acc[current.sv_question_seqno].push(current.sv_ans_content);
        return acc;
    }, {});
    // 그룹화된 답변을 배열로 변환하여 저장
    const groupKey = Object.keys(group).map((key) => {
        return { sv_question_seqno: key, sv_ans_content: group[key] };
    });

    // 3. 설문 등록 투표 결과
    // 제출 관련된 함수, focusing 맞추기
    const handleSubmit = () => {
        for (let i = 0; i < surveyData.length; i++) {
            if (!surveyData[i].selectedValue) {
                alert(`${i + 1}번 항목을 선택해주세요.`);
                const newData = [...surveyData];
                newData[i].focus = true;
                setSurveyData(newData);
                setTimeout(() => {
                    const inputElement = document.getElementById(`buttons-group${i}`);
                    if (inputElement) {
                        inputElement.scrollIntoView({ behavior: "instant" });
                        inputElement.focus();
                    }
                }, 0);
                return;
            }
        }
        const voteData = surveyData.map((item) => ({
            sv_main_seqno: item.sv_main_seqno,
            sv_ques_seqno: item.sv_ques_seqno,
            sv_ans_seqno: item.selectedValue,
        }));
        axios
            .post("/nodeApi/surveyVote", voteData)
            .then(() => {
                alert("설문 등록이 완료되었습니다.");
                navigate("/survey/user/home");
            })
            .catch((err) => console.log("실패 :", err));
        alert("설문 등록이 완료되었습니다.");
        navigate("/survey/user/home");
    };

    // 라디오 버튼을 선택할 때마다 해당 질문에 대한 선택된 답변 값을 업데이트
    const handleChange = (event, index) => {
        const newData = [...surveyData];
        newData[index].selectedValue = event.target.value;
        newData[index].focus = false; // focus 초기화
        setSurveyData(newData);
    };

    // 취소 버튼
    const handleCancel = () => {
        navigate("/survey/user/home");
    };
    // 로고 버튼
    const handleLogo = () => {
        navigate("/survey/user/home");
    };


    const darkTheme = createTheme({
        palette: {
            mode: 'light',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });

    return(
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar color={'inherit'}>
                    <div className="surveyContainer">
                        <div className="surveyInner">
                            <header className="listHeader">
                                <div className="headflex">
                                    <h2>설문조사</h2>
                                    <div className="utileWrap">
                                        <ul className="locationWrap">
                                            <li className="n1">홈</li>
                                            <ArrowForwardIosIcon />
                                            <li className="n2">소통과 참여</li>
                                            <ArrowForwardIosIcon />
                                            <li className="n3">설문조사</li>
                                        </ul>
                                    </div>
                                </div>
                            </header>

                            <div className="surveyBody">
                                <div className="surveyBodyHeader">
                                    <div className="iconWrap">
                                        <BallotTwoToneIcon className="iconItem" />
                                    </div>
                                    <div className="titleWrap">
                                        <div className="headerTitle">
                                            <h4>설문 주제 : {state?.sv_title}</h4>
                                        </div>
                                        <div className="headerDate">
                                            <p> - 기간 : {state?.sv_stdate} ~ {state?.sv_eddate}</p>
                                        </div>
                                        <div className="headerNotice">
                                            <p> - 설문 내용 : {state?.sv_content}</p>
                                        </div>
                                        <div className="headernumber">
                                            <p> - 총 문항수 : {surveyData?.length} 문항</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="surveyBox">
                                    {surveyData.map((item, index) => (
                                        <div key={index}>
                                            {/* 설문 질문의 제목과 에러 여부를 나타냄*/}
                                            <FormLabel
                                                className={`surveyBoxTitle ${item.focus ? "error" : ""}`}
                                                id={`buttons-group${index}`}
                                            >
                                                {/* 질문 번호와 내용 표시 */}
                                                {index + 1}. {surveyData[index].sv_question_content}
                                                <RadioGroup
                                                    className="radioGroup"
                                                    aria-labelledby={`buttons-group${index}`}
                                                    name={`radio-buttons-group${index}`}
                                                    value={item.selectedValue}
                                                    onChange={(e) => handleChange(e, index)}
                                                >
                                                    {/* groupKey 배열을 매핑하여 답변 생성 */}
                                                    {groupKey.map(function (arr, inx) {
                                                        if (
                                                            // 현재 질문과 답변의 질문 번호를 비교하여 해당하는 답변 표시하기
                                                            index.toString() === groupKey[inx].sv_question_seqno
                                                        ) {
                                                            return (
                                                                <RadioGroup
                                                                    className="radioGroup"
                                                                    aria-labelledby={`buttons-group${index}`}
                                                                    name={`radio-buttons-group${index}`}
                                                                    value={surveyData[index].selectedValue}
                                                                    onChange={(e) => handleChange(e, index)}
                                                                >
                                                                    {/* 답변 항목을 표시 */}
                                                                    {groupKey[inx].sv_ans_content.map(
                                                                        (answer, answerIndex) => (
                                                                            <FormControlLabel
                                                                                key={answerIndex}
                                                                                value={answer}
                                                                                control={<Radio size="small" />}
                                                                                label={answer}
                                                                            />
                                                                        )
                                                                    )}
                                                                </RadioGroup>
                                                            );
                                                        }
                                                    })}
                                                </RadioGroup>
                                            </FormLabel>
                                        </div>
                                    ))}
                                    <div className="surveyButton">
                                        {/* 취소 버튼 */}
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={handleCancel}
                                        >
                                            취소
                                        </Button>
                                        {/* 설문 제출 버튼 */}
                                        <Button variant="outlined" onClick={handleSubmit}>
                                            제출
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppBar>
            </ThemeProvider>
        </div>
    )
}
export default Survey;