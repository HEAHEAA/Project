import './css/surveyUserStyle.css';
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../ContextServer/SurveysContext";
import TextField from "@mui/material/TextField";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {FiChevronsLeft} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";

function UserSurveyDetailPage() {
    const {
        surveyList,
        userTitle, userContent,
        userSdate, userEdate,
        questList, setQuestList,
        QuestGetSubmit,
        GetSurvey,

        AnswerGetSubmit,
        answerList, setAnswerList,

        SubmitVote,
        vote, setVote,
    } = useContext(SurveysContext);
    const navigate = useNavigate();

    //현재 사용중인 값만 보여주기
    let falseFilter = surveyList.filter((datas) => datas.useyn === true);

    const darkTheme = createTheme({
        palette: {
            mode: 'light',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });

    useEffect(() => {
        QuestGetSubmit();
        AnswerGetSubmit();
        // setQuestSeq(questList[0]?.seqno);
    }, []);


    //reduce 같은 id 값 끼리 묶기
    const group = answerList.reduce((acc, current) => {
        acc[current.sv_question_seqno] = acc[current.sv_question_seqno] || [];
        acc[current.sv_question_seqno].push(current.sv_ans_content);
        return acc;
    }, {});

    //시퀀스넘버 추가
    const group2 = answerList.reduce((acc, current) => {
        acc[current.sv_question_seqno] = acc[current.sv_question_seqno] || [];
        acc[current.sv_question_seqno].push(current.seqno);
        return acc;
    }, {});


    //그룹으로 만든 답변을 배열로 저장
    const groupKey = Object.keys(group).map((key) => {
        return {sv_question_seqno: key, sv_ans_content: group[key], ansSeqno: group2[key]};
    })


    //인풋 라디오값 가져오기ㅣ
    const [input, setInput] = useState([]);


    const handleJsonChange = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value
        })
    };
    let strArr = [];
    for (let objKey in input) {
        if (input.hasOwnProperty(objKey)) {
            strArr.push(input[objKey]);
        }
    }


    //안내모달
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    //모달 타이머생성
    useEffect(() => {
        let timer = setTimeout(() => {
            setOpen(false)
        }, 30000);
        return () => {
            clearTimeout(timer)
        }
    });

    // //페이지가 1개라면 기본 첫번째 디테일 페이지가 보이도록
    useEffect(() => {
        if (falseFilter.length === 1) {
            GetSurvey(18);
            navigate('/survey/user/home/detail');
        }
    }, [])


    let [main, setMain] = useState(0);
    let [que, setQue] = useState(0);
    let [ans, setAns] = useState(0);


    const handelSubmit = () => {
        const list = {
            sv_main_seqno: main,
            sv_question_seqno: que,
            sv_ans_seqno: ans,
        };
        setVote([...vote, list]);
    }

    useEffect(() => {
        handelSubmit();
    }, [main])


    return (
        <div>
            <ThemeProvider theme={darkTheme}>

                <SurveyModal open={open} handleClose={handleClose}/>

                <div className="survey-box-body">
                    <div className="survey-header-2">
                        <h2>『{userTitle}』</h2>
                        <p>{userSdate} ~ {userEdate}</p>
                    </div>
                    <div className="survey-header-3">
                        <span onClick={() => {
                            navigate('/survey/user/home');
                        }}><FiChevronsLeft/> 이전</span>
                    </div>

                    <div className="survey-content-body">
                        <TextField
                            type={"text"}
                            variant="outlined"
                            sx={{width: "95%", marginTop: 1}}
                            value={userContent}
                            multiline
                            rows={4}
                        />
                        <p style={{textAlign: "left", paddingLeft: "5vh", paddingTop: "1vh"}}>
                            * 각 질문별 답변은 1개씩만 선택해주세요.
                        </p>


                        {
                            [...questList]
                                .map(function (arr, inx) {
                                    return (
                                        <div className={`surveyBoxTitle ${arr.focus ? "error" : ""}`}
                                             id={`buttons-group${inx}`}>
                                            <div className="survey-body-quest-head">
                                                {/*<p>{arr.sv_question_content}</p>*/}
                                                <p>{arr.sv_question_content}</p>
                                            </div>

                                            <RadioGroup sx={{marginLeft: 5}}
                                                        className="radioGroup"
                                                        id={`${arr}`}
                                                        name={inx}
                                                        onChange={handleJsonChange}
                                            >

                                                {
                                                    groupKey.map(function (a, i) {

                                                        return (
                                                            <div>
                                                                {arr.seqno === parseInt(a.sv_question_seqno) ? <>
                                                                    {
                                                                        groupKey[inx].ansSeqno.map(function (anwer, index) {
                                                                            return (
                                                                                <div style={{
                                                                                    textAlign: 'left',
                                                                                    marginBottom: "1vh",
                                                                                    marginTop: "1vh"
                                                                                }}>
                                                                                    <input type={"radio"}
                                                                                           value={anwer}
                                                                                           id={`${arr}`}
                                                                                           onChange={(e) => {
                                                                                               handelSubmit(e);

                                                                                               // setMainSeq(arr.sv_seqno)
                                                                                               // setQuestSeq(parseInt(groupKey[inx].sv_question_seqno));
                                                                                               // setAnsSeq(anwer);
                                                                                           }}
                                                                                           onClick={() => {
                                                                                               setMain(arr.sv_seqno);
                                                                                               setQue(parseInt(groupKey[inx].sv_question_seqno));
                                                                                               setAns(anwer);
                                                                                           }}

                                                                                           name={inx}
                                                                                           style={{zIndex: 99999999999}}
                                                                                    />
                                                                                    <label
                                                                                        style={{paddingLeft: '2vh'}}
                                                                                        onClick={() => {
                                                                                        }}>
                                                                                        {groupKey[inx].sv_ans_content[index]}
                                                                                    </label>

                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </> : null
                                                                }
                                                            </div>
                                                        )

                                                    })
                                                }
                                            </RadioGroup>
                                        </div>
                                    )
                                })
                        }


                        <Button variant="outlined" sx={{marginTop: 1, marginBottom: 1}} onClick={() => {
                            SubmitVote();
                            handleOpen();
                        }}>
                            제출
                        </Button>
                        <Button variant="outlined" color={"error"}
                                sx={{marginLeft: "1vh", marginTop: 1, marginBottom: 1}}
                                onClick={() => {
                                    navigate('/survey/user/home');
                                }}>
                            취소
                        </Button>
                    </div>



                    {/*<DetailBox*/}
                    {/*    onSubmit={onSubmit}*/}
                    {/*    questList={questList}*/}
                    {/*    handleJsonChange={handleJsonChange}*/}
                    {/*    groupKey={groupKey}*/}
                    {/*    SubmitVote={SubmitVote}*/}
                    {/*    handleOpen={handleOpen}*/}
                    {/*/>*/}


                </div>


            </ThemeProvider>
        </div>
    )
}


function SurveyModal({open, handleClose}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        textAlign: "center",
        bgcolor: 'background.paper',
        border: '10px solid #556da8',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style}}>
                    <hr/>
                    <h4 id="parent-modal-description">
                        "조사에 참여해 주셔서 진심으로 감사드립니다"
                    </h4>
                    <hr/>
                    <p className="parent-modal-description2">본 설문조사는 30초 뒤 자동으로 미디어 홍보물 페이지로 돌아갑니다.</p>
                </Box>
            </Modal>
        </div>
    )
}


export default UserSurveyDetailPage;