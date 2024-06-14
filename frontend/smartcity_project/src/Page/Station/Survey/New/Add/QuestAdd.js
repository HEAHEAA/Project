import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../../ContextServer/SurveysContext";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import AnswerAdd from "./AnswerAdd";
import {AppBar} from "@progress/kendo-react-layout";
import {AiOutlineFolderOpen} from "react-icons/ai";
import {BiMessageSquareDots} from "react-icons/bi";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import * as React from "react";
import QuestDeleteAdd from "./QuestDeleteAdd";
import {TableHeader, TextBlack, TextWhite} from "../../../../../Componet/style-config/light-theme";


//설문등록 - 메인
const PostSurveyValue = {
    sv_title: "", //설문제목
    sv_content: "", //설문내용
    sv_stdate: "", //설문시작일
    sv_eddate: "" //설문 종료일
}

function QuestAdd(){
    const {access, RefreshToken} = useContext(LoginContext);
    const {surveyNum, setSurveyNum, surveyAllList,SurveyMainSubmit} = useContext(SurveysContext);
    const navigate = useNavigate();


    const [postSurvey, setPostSurvey] = useState(PostSurveyValue); //설문메인 등록
    const {sv_title, sv_content, sv_stdate, sv_eddate} = postSurvey; // 설문메인

    //설문등록
    const onChangeSurveyHandler = (e) => {
        setPostSurvey({...postSurvey, [e.target.name]: e.target.value});
    }

    //설문-생성
    const PostSurvey = async () =>{
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                sv_title: sv_title,
                sv_content: sv_content,
                sv_stdate: sv_stdate,
                sv_eddate: sv_eddate
            })
        }).then(res => res.json()).then(res => {
            alert('설문이 등록되었습니다.');
            navigate('/station/survey');
        })
        SurveyMainSubmit();
        getTask();
    }
    /**
     * //질문등록 - 질문 POST
     * //질문 시퀀스값은 아직 만들어지지 않은 값이므로, 마지막 설문시퀀스값에 +1을 더해준다.
     *
     * @type {lastSeq} :pop()으로 전체설문 에서 마지막 배열값만 가져와준다.
     */

    const lastSeq = [...surveyAllList].pop();

    const [quest,setQuest] = useState('');
    const [svContent, setSvContent] = useState('');
    const [editId, setEditId] = useState('');
    const [buttonText, setButtonText] = useState('질문추가');
    const [ansNum, setAnsNum] = useState(0);

    //질문 - 데이터 삽입
    const AddQuest = async () => {
        const task = {sv_seqno: lastSeq.seqno + 1 , sv_question_no: 1, sv_question_content: svContent}
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${lastSeq.seqno +1}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body : JSON.stringify(task)
        })
        setSvContent('');
        getTask();
    }

    //질문 - 수정 id 값 가져오기
    const getEdit = async (id) => {
        for(let que of quest){
            if(que.seqno === id){
                setSvContent(que.sv_question_content)
            }
        }
        setButtonText('Update')
        setEditId(id);
    }

    //질문- 수정
    const [useYn,setUseYn] = useState(true);
    const editTask = async () => {
        for(let que of quest){
            if(que.seqno === editId){
                RefreshToken();
                let ac = null;
                if (access === '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                    // ac = localStorage.getItem('login')
                } else {
                    ac = access
                }
                await fetch(`/api/survey/question?sv_seqno=${lastSeq.seqno + 1}`,{

                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body :JSON.stringify({
                        seqno: que.seqno,
                        sv_question_no: 1,
                        sv_question_content: svContent,
                        useyn: useYn
                    })
                })
            }
        }
        setSvContent('');
        getTask();
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            AddQuest();
        }
    }

    useEffect(()=>{
        getTask();
    },[]);

    //데이터 GET
    const getTask = async () =>{
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${lastSeq.seqno + 1}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setQuest(res.data);
        })
    }


    /**
     * 답변등록 hook
     */

    const [ansUpdate, setAnsUpdate] = useState(false);

    // 답변[생성]모달
    const [Open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // delete 모달
    const [DeleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);


    return(
        <div>
            {
                ansUpdate === true ? <AnswerAdd
                    Open={Open}
                    handleClose={handleClose}

                    ansUpdate={ansUpdate}
                    setAnsUpdate={setAnsUpdate}
                    ansNum={ansNum}
                    setAnsNum={setAnsNum}
                    lastSeq={lastSeq}
                /> : null
            }

            <QuestDeleteAdd editTask={editTask} DeleteOpen={DeleteOpen} handleDeleteClose={handleDeleteClose}/>


            <AppBar themeColor={"light"}>
                <div className="surveyMain-header">
                    <div className="surveyMain-header-1">
                        <p> 설문조사관리 <AiOutlineFolderOpen style={{marginLeft: "0.5vh", marginRight: "1vh"}}/>
                            / <span style={{color: "#1c63c2", paddingLeft: "0.5vh"}}> 설문조사 생성 <BiMessageSquareDots
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
                                <TableHead style={{backgroundColor: "#1c63c2",color: "white"}}>
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
                                                                                setAnsNum(quest.seqno);
                                                                                setAnsUpdate(true);
                                                                                handleOpen();
                                                                            }}>답변 달기</Button>
                                                                    <Button variant="outlined" sx={{marginLeft: 1}}
                                                                            onClick={() => {
                                                                                getEdit(quest.seqno);
                                                                            }}>수정</Button>
                                                                    <Button variant="outlined" sx={{marginLeft: 1}}
                                                                            color={"error"} onClick={()=>{
                                                                                setUseYn(false);
                                                                                handleDeleteOpen();
                                                                            }}>삭제</Button>
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
                                return PostSurvey();
                            } else {
                                return ''
                            }
                        }}>입력완료 </Button>
                        <Button variant="outlined" onClick={() => navigate(`/station/survey`)} sx={{marginLeft: 1}}>목록으로</Button>

                    </div>
                </div>
            </AppBar>


        </div>
    )
}
export default QuestAdd;