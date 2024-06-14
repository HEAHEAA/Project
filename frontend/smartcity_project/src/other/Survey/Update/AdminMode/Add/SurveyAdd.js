import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../../ContextServer/SurveysContext";
import {useNavigate} from "react-router-dom";
import {AppBar} from "@progress/kendo-react-layout";
import {AiOutlineFolderOpen} from "react-icons/ai";
import {BiMessageAdd, BiMessageSquareDots, BiPencil, BiX} from "react-icons/bi";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import * as React from "react";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import QuestAdd from "./Modal/QuestAdd";
import QuestEdit from "./Modal/QuestEdit";
import QuestDelete from "./Modal/QuestDelete";

function SurveyAdd(){
    const {access, RefreshToken, role} = useContext(LoginContext);
    const {
        //설문조사 전체 리스트
        surveyAllList,
        SurveyMainSubmit,

        //설문조사 제목/내용/날짜/ Add
        title, setTitle,
        svContent, setSvContent,
        StartDate, setStartDate,
        EndDate, setEndDate,
        SurveyAddSubmit,

        //질문 리스트
        SvQuestList, setSvQuestList,

        //질문 수정id값
        EditQuestGetId
    } = useContext(SurveysContext);
    const navigate = useNavigate();

    useEffect(()=>{
        SurveyMainSubmit();
        getQuestList();
    },[]);

    // 질문 시퀀스값 생성되지 않았으므로 시퀀스 +1 하기위한 마지막 배열만 빼기
    let lastSeq = [...surveyAllList].pop();


    //질문리스트 가져오기
    const getQuestList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${lastSeq.seqno +1}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res=> {
            setSvQuestList(res.data);
        })
    }


    // 질문&답변 [생성]모달
    const [AddModalOpen, setAddModalOpen] = useState(false);
    const handleAddOpen = () => setAddModalOpen(true);
    const handleAddClose = () => setAddModalOpen(false);

    //질문&답변 [수정]모달
    const [mainSeq,setMainSeq] = useState(0);
    const [seqNum,setSeqNum] = useState(0);
    const [queNum,setQueNum] = useState(0);
    const [EditModalOpen, setEditModalOpen] = useState(false);
    const handleEditOpen = () => setEditModalOpen(true);
    const handleEditClose = () => setEditModalOpen(false);

    //질문&답변 [삭제] 모달
    const [deleteOpen,setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);





    return(
        <div>
            <AppBar themeColor={"dark"}>
                <div className="surveyMain-header">
                    <div className="surveyMain-header-1">
                        <p> 설문조사관리 <AiOutlineFolderOpen style={{marginLeft: "0.5vh", marginRight: "1vh"}}/>
                            / <span style={{color: "#a0f4ff", paddingLeft: "0.5vh"}}> 설문조사 생성 <BiMessageSquareDots
                                style={{marginLeft: "0.5vh"}}/> </span></p>
                    </div>
                </div>

                <div className="surveyMain-Content">
                    <TableContainer style={{cursor: "default"}}>
                        <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{backgroundColor: "#232323", width: "100px", color: "white"}}>
                                        제목*
                                    </TableCell>
                                    <TableCell style={{width: "800px", color: "white"}}>
                                        <TextField
                                            label="제목을 입력해주세요."
                                            variant="outlined"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            fullWidth
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{backgroundColor: "#232323", width: "100px", color: "white"}}>
                                        게시 시작일 ~ 종료일
                                    </TableCell>
                                    <TableCell style={{width: "800px", color: "white"}}>

                                        <TextField
                                            type={"date"}
                                            variant="outlined"
                                            value={StartDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />

                                        <span style={{fontSize: 35}}> ~ </span>

                                        <TextField
                                            type={"date"}
                                            variant="outlined"
                                            value={EndDate}
                                            onChange={(e) => setEndDate(e.target.value)}
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
                                label="내용을 입력해주세요."
                                value={svContent}
                                onChange={(e) => setSvContent(e.target.value)}
                                fullWidth
                                multiline
                            />
                        </div>
                    </TableContainer>
                    <hr/>

                    {/*/!* Add모달 *!/*/}
                    <QuestAdd AddModalOpen={AddModalOpen} handleAddClose={handleAddClose} lastSeq={lastSeq} getQuestList={getQuestList}/>
                    {/*/!* Edit 모달 *!/*/}
                    <QuestEdit
                        EditModalOpen={EditModalOpen}
                        handleEditClose={handleEditClose}
                        getQuestList={getQuestList}
                        seqNum={seqNum}
                        setSeqNum={setSeqNum}
                        queNum={queNum}
                        setQueNum={setQueNum}
                        mainSeq={mainSeq}
                        setMainSeq={setMainSeq}
                    />
                    {/*/!* delete 모달 *!/*/}
                    <QuestDelete
                        deleteModalOpen={deleteOpen}
                        handleDeleteClose={handleDeleteClose}
                        getQuestList={getQuestList}
                        seqNum={seqNum}
                        queNum={queNum}
                        mainSeq={mainSeq}
                    />



                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{float: "right", marginRight: 2, width: 200, color: "white", marginBottom: 1}}
                        onClick={()=>{
                            handleAddOpen();
                        }}>
                        항목 추가 <BiMessageAdd style={{marginLeft: "0.5vh", fontSize: 16}}/>
                    </Button>


                    <TableContainer style={{cursor: "default"}}>
                        <Table sx={{minWidth: "100%", fontSize: 11, marginTop: 2}} aria-label="simple table">
                            <TableHead style={{backgroundColor: "#232323"}}>
                                <TableRow>
                                    <TableCell style={{width: "200px"}}>질문 내용</TableCell>
                                    <TableCell style={{width: "50px"}}>수정&삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    SvQuestList&&SvQuestList.map(function (arr,inx){
                                        return(
                                            <TableRow>
                                                <TableCell style={{width: "200px"}}>{arr.sv_question_content}</TableCell>
                                                <TableCell style={{width: "200px"}}>
                                                    <Button variant="outlined" onClick={()=>{
                                                        handleEditOpen();
                                                        EditQuestGetId(arr.seqno);
                                                        setSeqNum(arr.seqno);
                                                        setQueNum(arr.sv_question_no);
                                                        setMainSeq(arr.sv_seqno);
                                                    }}>수정</Button>
                                                    <Button variant="outlined" sx={{marginLeft: 1}} color={"warning"} onClick={()=>{
                                                        handleDeleteOpen();
                                                        EditQuestGetId(arr.seqno);
                                                        setSeqNum(arr.seqno);
                                                        setQueNum(arr.sv_question_no);
                                                        setMainSeq(arr.sv_seqno);
                                                    }}>
                                                        삭제
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <Button variant="contained" onClick={()=>{
                        if(window.confirm('내용을 저장하시겠습니까?')){
                            SurveyAddSubmit();
                            alert('저장이 완료 되었습니다.');
                            navigate('/station/survey');
                        }
                    }}>
                        저장
                    </Button>
                    <Button variant="contained" color={"inherit"} sx={{marginLeft: 1}} onClick={()=>{
                        navigate('/station/survey');
                        setTitle('');
                        setStartDate('');
                        setEndDate('');
                        setSvContent('');
                    }}>목록</Button>

                </div>
            </AppBar>
        </div>
    )
}
export default SurveyAdd;