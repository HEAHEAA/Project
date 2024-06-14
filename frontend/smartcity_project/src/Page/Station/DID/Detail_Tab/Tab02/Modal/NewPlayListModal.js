import {MenuItem, Modal, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import {ControlContext} from "../../../../../../ContextServer/ControlContext";
import {BsFillSkipForwardFill} from "react-icons/bs";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {LoginContext} from "../../../../../../ContextServer/LoginContext";
import InputLabel from "@mui/material/InputLabel";


function NewPlayListModal({open, handleClose}) {
    const {access, RefreshToken} = useContext(LoginContext);
    const {checkItem, PlayDIDList, checkId, didList, mediaType,} = useContext(ControlContext);

    const [input, setInput] = useState([]);
    const [Start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    //재생목록 변환 이벤트
    const handleJsonChange = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value
        })
    };
    //딕셔너리 => 리스트 변경
    let strArr = [];
    for (let objKey in input) {
        if (input.hasOwnProperty(objKey)) {
            strArr.push(parseInt(input[objKey]));
        }
    }


    //재생목록생성
    const PlayDIDAdd = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/board/promotion/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                file_idx: checkId,
                time: timeArr,
                pm_start: Start.replaceAll('T', ' '),
                pm_end: end.replaceAll('T', ' '),
                pm_title: title,
                pm_content: content
            })
        })
        setStart('');
        setEnd('');
        setTitle('');
        setContent('');
        setInput([]);
        PlayDIDList();
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        overflow: "auto",
        height: 700,
        color: "black",
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        "&::-webkit-scrollbar": {
            width: 10,
            height: 10,
            cursor: "default",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#f3f3f3",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cbcbcb",
            borderRadius: 0
        },
        p: 4,
    };


    let arr = [];

    for (let i = 0; i < checkItem.length; i++) {
        let fileType = checkItem[i].split('.');

        if (fileType[1] === 'mp4') {
            arr.push([60]);
        }
        //
        // if(fileType[1] === 'jpg' || fileType[1] == 'png' || fileType[1] === 'JPEG'){
        //     arr1.push([])
        // }
    }

    let arr3 = [];
    for (let i = 0; i < arr.length; i++) {
        arr3.push(1);
    }

    let timeArr = [...arr3,...strArr]



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form"
                     noValidate
                     autoComplete="off">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <BsFillSkipForwardFill style={{marginRight: "1vh"}}/>재생목록 생성
                    </Typography>
                    <hr/>


                    {
                        checkItem.length > 0 ?
                            <Box>
                                <Typography id="modal-modal-description" sx={{mt: 2}}>
                                    선택된 파일 목록
                                </Typography>
                                <br/>

                                {
                                    checkItem.map((arr) => (
                                        <ul>
                                            <li>{arr}</li>
                                        </ul>
                                    ))
                                }

                            </Box> : <Box>
                                <Typography id="modal-modal-description" sx={{mt: 2}}>
                                    선택된 파일 목록이 없습니다.
                                </Typography>
                            </Box>
                    }
                    <hr/>


                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <label>대상 DID</label>
                            <FormControl variant="filled" sx={{minWidth: "100%"}}>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    defaultValue={0}
                                >
                                    <MenuItem value={0}>전체</MenuItem>
                                    <MenuItem value={1}>DID</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <label>제목</label>
                            <TextField
                                type={"text"}
                                label="제목"
                                value={title}
                                name="pm_title"
                                onChange={(e) => setTitle(e.target.value)}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label>내용</label>
                            <TextField
                                id="filled-basic"
                                label="내용"
                                value={content}
                                name="pm_content"
                                onChange={(e) => setContent(e.target.value)}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label>게시시작일</label>
                            <TextField
                                type={"datetime-local"}
                                id="filled-basic"
                                value={Start}
                                name="pm_start"
                                onChange={(e) => setStart(e.target.value)}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>게시종료일</label>
                            <TextField
                                type={"datetime-local"}
                                id="filled-basic"
                                value={end}
                                name="pm_end"
                                onChange={(e) => setEnd(e.target.value)}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>재생시간 설정</label> <br/>
                            <small>(영상은 재생시간을 설정하지 않아도 됩니다.)</small>
                            {
                                checkItem.map((arr, i) => {

                                    let checkTemArr = checkItem[i].split('.');

                                    return (
                                        <div>
                                            {
                                                checkTemArr[1] === 'mp4' ? <div style={{marginTop: "1.5vh"}}>
                                                        <li>{arr} </li>
                                                    </div>
                                                    :
                                                    <div style={{marginTop: "1.5vh"}}>
                                                        <small>{i + 1}. {arr}</small>

                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">시간 선택</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id={`${arr}`}
                                                                name={i}
                                                                onChange={handleJsonChange}
                                                            >
                                                                <MenuItem value={60}>1분</MenuItem>
                                                                <MenuItem value={300}>5분</MenuItem>
                                                                <MenuItem value={600}>10분</MenuItem>
                                                                <MenuItem value={3600}>30분</MenuItem>
                                                                <MenuItem value={12000}>1시간</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                            }

                                        </div>
                                    )
                                })
                            }
                        </Grid>


                    </Grid>
                    <br/>
                    <Button variant="outlined" fullWidth onClick={() => {
                        if (window.confirm('재생목록을 생성하시겠습니까?')) {
                            PlayDIDAdd();
                            handleClose();
                        }
                    }}>
                        재생 목록 생성
                    </Button>
                    <Button variant="outlined" color={"error"} fullWidth sx={{marginTop: 1}} onClick={() => {
                        handleClose()
                    }}>작성취소</Button>

                </Box>

            </Modal>
        </div>
    )
}

export default NewPlayListModal;