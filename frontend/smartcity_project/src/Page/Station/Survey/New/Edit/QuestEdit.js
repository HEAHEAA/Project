import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../../ContextServer/SurveysContext";
import {useNavigate, useParams} from "react-router-dom";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import * as React from "react";
import {AppBar} from "@progress/kendo-react-layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AiOutlineFolderOpen} from "react-icons/ai";
import {BiMessageAdd, BiMessageSquareDots} from "react-icons/bi";
import {Table} from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AnswerEdit from "./AnswerEdit";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TableHead from "@mui/material/TableHead";
import {TableHeader, TextBlack, TextWhite} from "../../../../../Componet/style-config/light-theme";

function QuestEdit() {
    const {surveyNum, setSurveyNum, surveyAllList} = useContext(SurveysContext);
    const {access, RefreshToken} = useContext(LoginContext);
    const {seqno} = useParams();
    const navigate = useNavigate();

    //설문조사 메인수정
    const PutSurveyValue = {
        seqno: seqno,
        sv_title: surveyAllList[surveyNum]?.sv_title,
        sv_content: surveyAllList[surveyNum]?.sv_content,
        sv_stdate: surveyAllList[surveyNum]?.sv_stdate,
        sv_eddate: surveyAllList[surveyNum]?.sv_eddate,
        useyn: true,
    }

    const [putList, setPutList] = useState(PutSurveyValue);
    const {sv_title, sv_content, sv_stdate, sv_eddate} = putList;


    const onChangeSurveyHandler = (e) => {
        setPutList({...putList, [e.target.name]: e.target.value});
    }

    //설문조사 수정API

    const [SurveyUseYn,setSurveyUseYn] = useState(true);
    const onSelect = (e) => {
        e.preventDefault();
        setSurveyUseYn(e.target.value);
    }

    const PutSurvey = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                seqno: seqno,
                sv_title: sv_title,
                sv_content: sv_content,
                sv_stdate: sv_stdate,
                sv_eddate: sv_eddate,
                useyn: SurveyUseYn,
            })
        }).then(res => res.json())
            .then(res => {
                alert('수정이 완료 되었습니다.');
                navigate('/station/survey');
                window.location.reload();
            })
    }


    /**
     * 질문
     */
    const [quest, setQuest] = useState('');
    const [svContent, setSvContent] = useState('');
    const [editId, setEditId] = useState('');
    const [buttonText, setButtonText] = useState('질문추가')
    const [ansNum, setAnsNum] = useState(0);
    const [useYn, setUseYn] = useState(true);

    //질문삽입
    const AddQuest = async () => {
        const task = {sv_seqno: seqno, sv_question_no: 1, sv_question_content: svContent}
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${seqno}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify(task)
        })
        setSvContent('');
        getTask();
    }

    //데터 비동기 수정 id
    const getEdit = async (id) => {
        for (let que of quest) {
            if (que.seqno === id) {
                setSvContent(que.sv_question_content)
            }
        }
        setButtonText('update')
        setEditId(id)
    }

    //데이터 비동기 질문 수정
    const editTask = async () => {
        for (let que of quest) {
            if (que.seqno === editId) {
                RefreshToken();
                let ac = null;
                if (access === '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/survey/question?sv_seqno=${seqno}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        seqno: que.seqno,
                        sv_question_no: 1,
                        sv_question_content: svContent,
                        useyn: useYn,
                    })
                })
            }
        }
        setSvContent('');
        getTask()
    }

    //키보드 조작
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            AddQuest();
        }
    }

    useEffect(() => {
        getTask();
    }, []);

    //질문 -조회
    const getTask = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${seqno}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setQuest(res.data)
        })
    }


    /**
     * 답변
     */
    const [ansUpdate, setAnsUpdate] = useState(false);

    // 답변[생성]모달
    const [Open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            {
                ansUpdate === true ? <AnswerEdit
                    Open={Open}
                    handleClose={handleClose}

                    ansUpdate={ansUpdate} //팝업 띄우는 hook
                    setAnsUpdate={setAnsUpdate}
                    seqnos={seqno} //수정될 메인 페이지 num
                    ansNum={ansNum}
                    setAnsNum={setAnsNum}
                /> : null
            }


            <AppBar themeColor={"light"}>
                <div className="surveyMain-header">
                    <div className="surveyMain-header-1">
                        <p> 설문조사관리 <AiOutlineFolderOpen style={{marginLeft: "0.5vh", marginRight: "1vh"}}/>
                            / <span style={{color: "#1c63c2", paddingLeft: "0.5vh"}}> 설문조사 수정 <BiMessageSquareDots
                                style={{marginLeft: "0.5vh"}}/> </span></p>
                    </div>
                </div>

                <div className="surveyMain-Content">
                    <TableContainer style={{cursor: "default"}}>
                        <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{backgroundColor: TableHeader.backgroundColor, width: "100px", color: "white"}}>
                                        제목*
                                    </TableCell>
                                    <TableCell style={{width: "800px", color: "white"}}>
                                        <TextField
                                            variant="outlined"
                                            name="sv_title"
                                            value={sv_title}
                                            onChange={(e) => onChangeSurveyHandler(e)}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{backgroundColor: TableHeader.backgroundColor, width: "100px", color: "white"}}>
                                        게시 시작일 ~ 종료일
                                    </TableCell>
                                    <TableCell style={{width: "800px", color: "white"}}>

                                        <TextField
                                            type={"date"}
                                            variant="outlined"
                                            name="sv_stdate"
                                            value={sv_stdate}
                                            onChange={(e) => onChangeSurveyHandler(e)}
                                        />

                                        <span style={{fontSize: 35,color: TextBlack.color}}> ~ </span>

                                        <TextField
                                            type={"date"}
                                            variant="outlined"
                                            name="sv_eddate"
                                            value={sv_eddate}
                                            onChange={(e) => onChangeSurveyHandler(e)}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>


                        <div className="surveyMain-add-Content">
                            <p>내용</p>
                        </div>
                        <div className="surveyMain-add-Content-2">
                            <TextField
                                type={"text"}
                                rows={6}
                                variant="outlined"
                                value={sv_content}
                                name="sv_content"
                                onChange={(e) => onChangeSurveyHandler(e)}
                                fullWidth
                                multiline
                            />
                        </div>


                        <br/>


                        <FormControl sx={{float: "right", marginRight: 2, width: 200, color: "white", marginBottom: 1}}
                                     size={"small"}>
                            <InputLabel id="demo-simple-select-label">설문지 사용여부</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={SurveyUseYn}
                                onChange={(e) => onSelect(e)}
                            >
                                <MenuItem value={true}>사용중</MenuItem>
                                <MenuItem value={false}>미사용</MenuItem>
                            </Select>
                        </FormControl>


                        <div className="survey-quest-list" style={{textAlign: "left", marginBottom: "5vh"}}>
                            <h5 style={{marginLeft: "4vh"}}>설문조사 항목관리 *</h5>
                            <TextField className="quest-input" placeholder="질문을 추가해주세요."
                                       value={svContent}
                                       onChange={(e) => setSvContent(e.target.value)}
                                       onKeyUp={handleKeyPress} style={{marginLeft: "4vh"}}/>

                            <Button variant="outlined" className="quest-input-btn" onClick={() => {
                                buttonText === '질문추가' ? AddQuest() : editTask()
                            }} style={{marginLeft: "0.5vh"}}>{buttonText}</Button>
                        </div>

                        <TableContainer style={{cursor: "default", marginTop: "8vh"}}>
                            <Table sx={{minWidth: "100%", fontSize: 11, marginTop: 4}} aria-label="simple table">
                                <TableHead style={{backgroundColor: "#1c63c2"}}>
                                    <TableRow>
                                        <TableCell style={{width: "200px",color:TextWhite.color}}>질문 내용</TableCell>
                                        <TableCell style={{width: "50px",color:TextWhite.color}}>수정&삭제</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quest && quest.map(function (quest, i) {
                                            return (
                                                <>
                                                    <>
                                                        {quest === true ? <>
                                                            <TableRow>
                                                                <TableCell
                                                                    style={{width: "200px"}}>{quest.sv_question_content}</TableCell>
                                                                <TableCell style={{width: "200px"}}>
                                                                    <Button variant="outlined" color={"warning"}
                                                                            onClick={() => {
                                                                                // setAnsNum(i);
                                                                                setAnsNum(quest.seqno);
                                                                                setAnsUpdate(true);
                                                                                handleOpen();
                                                                            }}>답변 달기</Button>
                                                                    <Button variant="outlined" sx={{marginLeft: 1}}
                                                                            onClick={() => {
                                                                                getEdit(quest.seqno);
                                                                            }}>수정</Button>
                                                                    <Button variant="outlined" sx={{marginLeft: 1}}
                                                                            color={"error"}>삭제</Button>
                                                                </TableCell>
                                                            </TableRow>

                                                        </> : <>

                                                            <TableRow>
                                                                <TableCell
                                                                    style={{width: "200px"}}>{quest.sv_question_content}</TableCell>
                                                                <TableCell style={{width: "200px"}}>
                                                                    <Button variant="outlined" color={"warning"}
                                                                            onClick={() => {
                                                                                // setAnsNum(i);
                                                                                setAnsNum(quest.seqno);
                                                                                setAnsUpdate(true);
                                                                                handleOpen();
                                                                            }}>답변 달기</Button>
                                                                    <Button variant="outlined" sx={{marginLeft: 1}}
                                                                            onClick={() => {
                                                                                getEdit(quest.seqno);
                                                                            }}>수정</Button>
                                                                    <Button variant="outlined" sx={{marginLeft: 1}}
                                                                            color={"error"}>삭제</Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                        }

                                                    </>
                                                </>
                                            )
                                        }
                                    )}
                                </TableBody>
                            </Table>


                        </TableContainer>

                        <br/>
                    </TableContainer>

                    <div className="survey-page-form-foot">
                        <Button variant="contained" onClick={() => {
                            if (window.confirm('정말 수정하시겠습니까?')) {
                                return PutSurvey();
                            } else {
                                return ''
                            }
                        }}>수정완료 </Button>
                        <Button variant="outlined" onClick={() => navigate(`/station/survey`)} sx={{marginLeft: 1}}>목록으로</Button>

                    </div>
                </div>
            </AppBar>

        </div>
    )
}

export default QuestEdit;