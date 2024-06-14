import {useContext} from "react";
import {LoginContext} from "../../../../../../ContextServer/LoginContext";
import {SurveysContext} from "../../../../../../ContextServer/SurveysContext";
import {Modal, StepLabel} from "@mui/material";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import * as React from "react";

function QuestDelete({deleteModalOpen,handleDeleteClose,mainSeq,seqNum,queNum,getQuestList}){
    const {access, RefreshToken} = useContext(LoginContext);
    const {
        //질문-내용
        questContent, setQuestContent,
    } = useContext(SurveysContext);

    ///탭바 이벤트
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    //질문 delete
    const QueDelete = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${mainSeq}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body : JSON.stringify({
                seqno: seqNum,
                sv_question_no: queNum,
                sv_question_content: questContent,
                useyn: false,
            })
        })
        setQuestContent('');
        getQuestList();
    }

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

    return(
        <div>
            <Modal
                open={deleteModalOpen}
                onClose={() => {
                    if (window.confirm('팝업을 나갈 시, 내용이 저장되지 않습니다.')) {
                        handleDeleteClose();
                    }
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style}}>
                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="항목 삭제" value="1"/>
                            </TabList>
                        </Box>

                        <TabPanel value="1">
                            <h5>질문 : {questContent}</h5>
                            <br/>
                            <h6>삭제하시겠습니까?</h6>

                            <br/>
                            <Button fullWidth color={"primary"} variant="outlined" onClick={()=>{
                                QueDelete();
                                handleDeleteClose();
                                alert('삭제가 완료 되었습니다.');
                            }}>확인</Button>
                            <Button fullWidth color={"warning"} onClick={()=>{
                                handleDeleteClose();
                            }}>취소</Button>

                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal>
        </div>
    )
}
export default QuestDelete;