import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Modal, StepLabel} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../../../ContextServer/SurveysContext";
import {LoginContext} from "../../../../../../ContextServer/LoginContext";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import {AiOutlineArrowRight, AiOutlineCheck, AiFillPlusCircle, AiOutlineEdit} from "react-icons/ai";
import AddAnswerDetail from "./AnswerDeleteDetail/AddAnswerDetail";

function QuestAdd({AddModalOpen, handleAddClose, lastSeq, getQuestList}) {
    const {access, RefreshToken, role} = useContext(LoginContext);
    const {
        questContent, setQuestContent,
        answerContent, setAnswerContent,

        //질문 리스트
        SvQuestList, setSvQuestList,

        //답변 리스트
        svAnswerList, setSvAnswerList,

    } = useContext(SurveysContext);


    //스텝
    const [stepBtn, setStepBtn] = useState(1);
    const [answerPage, setAnswerPage] = useState(false);
    const steps = [
        '1. 질문생성',
        '2. 답변생성',
    ];
    ///탭바 이벤트
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        color: "white",
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    //질문등록 데이터 insert
    const AddQuestData = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                sv_seqno: lastSeq.seqno + 1,
                sv_question_no: SvQuestList.length + 1,
                sv_question_content: questContent
            })
        })
        setSvQuestList('');

        //질문 리스트 가져옴
        getQuestList();
    }


    useEffect(() => {
        svAnswerListSubmit();
    }, [answerPage]);


    //답변등록 리스트
    const svAnswerListSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/singleAnswer?sv_main_seqno=${lastSeq.seqno + 1}&sv_question_seqno=${SvQuestList.length+1}&sv_ans_no=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setSvAnswerList(res.data);
        })
    }


    //답변 add 시, 반응
    const [addBtn, setAddBtn] = useState(false);
    //답변등록 insert하기
    const svAnswerAddData = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                sv_main_seqno: lastSeq.seqno + 1,
                sv_question_seqno: SvQuestList.length +1,
                sv_ans_no: 1,
                sv_ans_content: answerContent
            })
        })
        setAnswerContent('');
        svAnswerListSubmit();
    }

    //답변 수정하기
    const [editBtn, setEditBtn] = useState(false);
    const [answerUseYn, setAnswerUseYn] = useState(true);
    const [AnswerEditId, setAnswerEditId] = useState(0);

    const SvAnswerEditGetId = async (id) => {
        for (let list of svAnswerList) {
            if (list.seqno === id) {
                setAnswerContent(list.sv_ans_content)
            }
        }
        setAnswerEditId(id);
    }

    const svAnswerEditSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/answer`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                sv_main_seqno: lastSeq.seqno + 1,
                sv_question_seqno: SvQuestList.length + 1,
                sv_ans_no: 1,
                sv_ans_content: answerContent,
                useyn: answerUseYn,
                seqno: AnswerEditId
            })
        })
        setAnswerContent('');
        svAnswerListSubmit();
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Modal
                open={AddModalOpen}
                onClose={() => {
                    if (window.confirm('팝업을 나갈 시, 내용이 저장되지 않습니다.')) {
                        handleAddClose();
                    }
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style}}>
                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="새 항목 추가" value="1"/>
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <Box sx={{width: '100%', marginBottom: 1}}>
                                <Stepper activeStep={stepBtn} alternativeLabel>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>

                            <AddAnswerDetail handleClose={handleClose} open={open} svAnswerEditSubmit={svAnswerEditSubmit}/>

                            {
                                answerPage === false ? <>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <label>질문</label>
                                            <TextField
                                                type={"text"}
                                                rows={2}
                                                value={questContent}
                                                onChange={(e) => setQuestContent(e.target.value)}
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                            />
                                        </Grid>
                                    </Grid>


                                    <Button variant="contained" fullWidth sx={{marginTop: 1}} onClick={() => {
                                        //질문 생성
                                        AddQuestData();

                                        //스텝
                                        setStepBtn(stepBtn + 1);
                                        setAnswerPage(true);

                                        setQuestContent('');
                                    }}>
                                        답변 생성 <AiOutlineArrowRight style={{marginLeft: "1vh"}}/>
                                    </Button>


                                    <Button variant="contained" color={"inherit"} sx={{marginTop: 1}} onClick={() => {
                                        if (window.confirm('내용이 저장되지 않습니다. 나가시겠습니까?')) {
                                            handleAddClose();
                                            setQuestContent('');
                                        }
                                    }} fullWidth>
                                        목록
                                    </Button>
                                </> : <>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <hr/>
                                            <label>답변</label>
                                            <TextField
                                                type={"text"}
                                                rows={2}
                                                variant="outlined"
                                                value={answerContent}
                                                onChange={(e) => setAnswerContent(e.target.value)}
                                                label="내용을 입력해주세요."
                                                fullWidth
                                                multiline
                                            />

                                            {
                                                editBtn === true ?
                                                    <Button variant="contained" color={"warning"} fullWidth
                                                            sx={{marginTop: 1}}
                                                            onClick={() => {
                                                                svAnswerEditSubmit();

                                                                setEditBtn(false);
                                                                setAddBtn(true);
                                                            }}>
                                                        답변 수정 <AiOutlineEdit style={{marginLeft: "1vh"}}/>
                                                    </Button>
                                                    :
                                                    <Button variant="contained" color={"inherit"} fullWidth
                                                            sx={{marginTop: 1}}
                                                            onClick={() => {
                                                                svAnswerAddData();
                                                                setAddBtn(true);
                                                            }}>
                                                        답변 추가 <AiFillPlusCircle style={{marginLeft: "1vh"}}/>
                                                    </Button>
                                            }


                                            {
                                                addBtn === true ? <>
                                                    {
                                                        svAnswerList.map(function (arr, inx) {
                                                            return (
                                                                <div style={{marginTop: "2vh"}}>
                                                                    <TextField
                                                                        type={"text"}
                                                                        rows={1}
                                                                        variant="outlined"
                                                                        value={arr.sv_ans_content}
                                                                        sx={{float: "left", width: "70%"}}
                                                                    />
                                                                    <Button sx={{marginTop: 1}} onClick={() => {
                                                                        SvAnswerEditGetId(arr.seqno);
                                                                        setAnswerEditId(arr.seqno);
                                                                        setAnswerUseYn(true);
                                                                        setEditBtn(true);
                                                                    }}>수정</Button>
                                                                    <Button sx={{marginTop: 1}} color={"error"} onClick={()=>{
                                                                        SvAnswerEditGetId(arr.seqno);
                                                                        setAnswerEditId(arr.seqno);
                                                                        setAnswerUseYn(false);
                                                                        handleOpen();
                                                                    }}>
                                                                        삭제
                                                                    </Button>

                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </> : null

                                            }

                                        </Grid>


                                    </Grid>

                                    <hr/>


                                    <Button variant="contained" color={"success"} fullWidth sx={{marginTop: 3}}
                                            onClick={() => {
                                                alert('질문과답변이 새로 생성되었습니다.');
                                                handleAddClose();
                                                setStepBtn(1);
                                                setAnswerPage(false);
                                                setQuestContent('');
                                            }}>
                                        완료 <AiOutlineCheck style={{marginLeft: "1vh"}}/>
                                    </Button>


                                    <Button variant="contained" color={"inherit"} sx={{marginTop: 1}} onClick={() => {
                                        if (window.confirm('내용이 저장되지 않습니다. 나가시겠습니까?')) {
                                            handleAddClose();
                                            setStepBtn(1);
                                            setAnswerPage(false);
                                            setQuestContent('');
                                        }
                                    }} fullWidth>
                                        목록
                                    </Button>

                                </>
                            }


                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal>
        </div>
    )
}

export default QuestAdd;