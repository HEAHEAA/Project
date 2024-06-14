import {useNavigate, useParams} from "react-router-dom";
import {AiOutlineFolderOpen} from "react-icons/ai";
import {BiMessageAdd, BiMessageSquareDots} from "react-icons/bi";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import QuestAdd from "../Add/Modal/QuestAdd";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import {AppBar} from "@progress/kendo-react-layout";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../../ContextServer/SurveysContext";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import QuestAdds from "./Modal/QuestAdds";
import QuestEdits from "./Modal/QuestEdits";
import QuestDelete from "../Add/Modal/QuestDelete";
import QuestDeletes from "./Modal/QuestDeletes";

function SurveyEdit(){
    const {access, RefreshToken} = useContext(LoginContext);
    const {
        SurveyMainSubmit,
        //수정 할 설문조사 데이터값
        title, setTitle,
        svContent, setSvContent,
        StartDate, setStartDate,
        EndDate, setEndDate,

        questContent, setQuestContent,

    } = useContext(SurveysContext);

    const navigate = useNavigate();
    const {seqno} = useParams();

    //설문조사 - 수정
    const [useYn,setUseYn] = useState(true);

    const svSurveyEdit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                seqno: seqno,
                sv_title: title,
                sv_content: svContent,
                sv_stdate: StartDate,
                sv_eddate: EndDate,
                useyn: useYn,
            })
        })
        setTitle('');
        setSvContent('');
        setStartDate('');
        setEndDate('');
        setUseYn(true);

        SurveyMainSubmit();
    }

    useEffect(()=>{
        SurveyMainSubmit();
        QuestListSubmit();
    },[]);

    //설문조사 질문-조회
    const [questList,setQuestList] = useState([]);

    const QuestListSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${seqno}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setQuestList(res.data);
        })
    }

    //질문-수정값 가져오기
    const [editId,setEditId] = useState(0);
    const EditQuestGetId = async (id) => {
        for(let list of questList){
            if(list.seqno === id){
                setQuestContent(list.sv_question_content);
            }
        }
        setEditId(id);
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
                            / <span style={{color: "#a0f4ff", paddingLeft: "0.5vh"}}> 설문조사 수정 <BiMessageSquareDots
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
                                value={svContent}
                                onChange={(e) => setSvContent(e.target.value)}
                                fullWidth
                                multiline
                            />
                        </div>
                    </TableContainer>
                    <hr/>

                    {/*/!* Add모달 *!/*/}
                    <QuestAdds AddModalOpen={AddModalOpen} handleAddClose={handleAddClose} QuestListSubmit={QuestListSubmit} questList={questList} seqno={seqno}/>
                    {/*/!* Edit 모달 *!/*/}
                    <QuestEdits
                        QuestListSubmit={QuestListSubmit}
                        EditModalOpen={EditModalOpen}
                        handleEditClose={handleEditClose}
                        seqNum={seqNum}
                        queNum={queNum}
                        mainSeq={mainSeq}
                    />
                    {/*/!* delete 모달 *!/*/}
                    <QuestDeletes
                        deleteModalOpen={deleteOpen}
                        handleDeleteClose={handleDeleteClose}
                        QuestListSubmit={QuestListSubmit}
                        seqNum={seqNum}
                        queNum={queNum}
                        mainSeq={mainSeq}
                    />



                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{float: "right", marginRight: 2, width: 200, color: "white", marginBottom: 1}} onClick={()=>{
                            handleAddOpen();
                    }}>
                        항목 추가 <BiMessageAdd style={{marginLeft: "0.5vh", fontSize: 16}} />
                    </Button>


                    <FormControl sx={{float: "left", marginLeft: 2, width: 200, color: "white", marginBottom: 1}} size={"small"}>
                        <InputLabel id="demo-simple-select-label">설문지 사용여부</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={useYn}
                            onChange={(e) => setUseYn(e.target.value)}
                        >
                            <MenuItem value={true}>사용중</MenuItem>
                            <MenuItem value={false}>미사용</MenuItem>
                        </Select>
                    </FormControl>



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
                                    questList&&questList.map(function (arr,inx){
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
                                                    }}>삭제</Button>
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
                            svSurveyEdit();
                            alert('저장이 완료 되었습니다.');
                            navigate('/station/survey');
                        }
                    }}>
                        저장
                    </Button>
                    <Button variant="contained" color={"inherit"} sx={{marginLeft: 1}} onClick={()=>{
                        navigate('/station/survey');
                        // setTitle('');
                        // setStartDate('');
                        // setEndDate('');
                        // setSvContent('');
                    }}>목록</Button>

                </div>
            </AppBar>
        </div>
    )
}
export default SurveyEdit;