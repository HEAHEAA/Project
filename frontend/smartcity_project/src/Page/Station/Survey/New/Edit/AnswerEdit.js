import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";

function AnswerEdit(props){

    const {access, RefreshToken, role} = useContext(LoginContext);
    const [ans, setAns] = useState('');
    const [anContent, setAnContent] = useState('');
    const [editId, setEditId] = useState('');
    const [buttonText, setButtonText] = useState('답변추가');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    //답변 생성
    const AddAns = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/answer`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body : JSON.stringify({
                sv_main_seqno : props.seqnos,
                sv_question_seqno : props.ansNum,
                sv_ans_no : 1,
                sv_ans_content: anContent
            })
        })
        setAnContent('');
        GetData();
    }

    //비동기 id값 가져오기
    const GetEdit = async (id) => {
        for(let an of ans){
            if(an.seqno === id) {
                setAnContent(an.sv_ans_content)
            }
        }
        setButtonText('Update')
        setEditId(id)
    }



    //답변-수정
    const editTask = async () => {
        for(let an of ans){
            if(an.seqno === editId){

                RefreshToken();
                let ac = null;
                if (access === '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                    // ac = localStorage.getItem('login')
                } else {
                    ac = access
                }
                await fetch(`/api/survey/answer`,{
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body : JSON.stringify({
                        sv_main_seqno: props.seqnos,
                        sv_question_seqno: props.ansNum,
                        sv_ans_no: 1,
                        sv_ans_content: anContent,
                        useyn : true,
                        seqno: an.seqno
                    })
                })
            }
        }
        setAnContent('');
        GetData();
    }

    //수정 할 데이터
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            AddAns();
        }
    }



    //답변 조회
    useEffect(() => {
        GetData();
    }, []);

    const GetData = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/singleAnswer?sv_main_seqno=${props.seqnos}&sv_question_seqno=${props.ansNum}&sv_ans_no=1`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setAns(res.data)
        })
    }



    return(
        <div>

            <Modal
                open={props.Open}
                onClose={() => {
                    if (window.confirm('팝업을 나갈 시, 내용이 저장되지 않습니다.')) {
                        props.handleClose();
                    }
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style}}>

                    <div style={{width: "100%", height: "15vh", paddingTop: "2vh"}}>
                        <TextField value={anContent}
                                   onChange={(e) => setAnContent(e.target.value)}
                                   onKeyUp={handleKeyPress}
                                   label="Enter시, 답변이 등록됩니다."
                                   style={{
                                       color: "white", float: "left", width: "80%", marginTop: "1vh",
                                       marginLeft: "5%"
                                   }} variant="standard"
                        />

                        <Button variant="outlined" className="answer-btn" onClick={() => {
                            editTask();
                        }} style={{marginTop: "1vh", width: "90%",marginLeft: "5%"}}
                        >답변수정</Button>
                    </div>



                    {ans && ans.map(function (an, i) {
                            return (
                                <div key={an.seqno}>
                                    {an === true ? <>
                                        <div className="answer-form">
                                            <ul>
                                                <input type="radio"/>
                                                <li>{an.sv_ans_content}</li>

                                                <Button variant="contained" onClick={() => {
                                                    GetEdit(an.seqno)
                                                }}>수정</Button>
                                                <Button variant="outlined" color="error">
                                                    삭제
                                                </Button>
                                            </ul>
                                        </div>
                                    </> : <>
                                        <div style={{width: "100%", height: "5vh"}}>
                                            <p style={{float: "left"}}>{an.sv_ans_content}</p>

                                            <Button variant="outlined" color="error" style={{
                                                float: "right",
                                                marginLeft: "0.5vh",
                                                marginRight: "1vh",
                                                marginTop: "0vh"
                                            }}>
                                                삭제
                                            </Button>

                                            <Button variant="outlined" onClick={() => {
                                                GetEdit(an.seqno)
                                            }} style={{
                                                float: "right",
                                                textDecoration: "none",
                                                marginTop: "0vh",
                                                marginLeft: "1vh"
                                            }}>수정</Button>


                                        </div>
                                    </>
                                    }
                                </div>
                            )
                        }
                    )}

                    <div style={{width: "100%",height: "5vh"}}>
                        <Button variant="contained"  onClick={() => {props.setAnsUpdate(false)}}>저장</Button>


                        <Button  variant="outlined" sx={{marginLeft: 1}} onClick={() => {
                            if (window.confirm(`목록으로 가시겠습니까? (내용은 자동으로 저장됩니다.)`)) {
                                return props.setAnsUpdate(false);
                            }
                        }}>
                            목록
                        </Button>
                    </div>



                </Box>


            </Modal>



        </div>
    )
}
export default AnswerEdit;