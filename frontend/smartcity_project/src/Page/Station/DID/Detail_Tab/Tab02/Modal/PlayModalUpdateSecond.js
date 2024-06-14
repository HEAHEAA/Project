import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useContext, useState} from "react";
import {ControlContext} from "../../../../../../ContextServer/ControlContext";
import {LoginContext} from "../../../../../../ContextServer/LoginContext";

function PlayModalUpdateSecond({handleClose,firs,setFirst,UseUN}){
    const {
        upEdit,
        UpStart, setUpStart,
        UpEnd, setUpEnd,
        UpTitle, setUpTitle,
        UpContent, setUpContent,
        playList, UpUseYN, setUpUseYN,
        checkId, updateCheckItem,
        updateCheckId,
        setUpdateCheckId,
        PlayDIDList,
    } = useContext(ControlContext);
    const {access, RefreshToken} = useContext(LoginContext);

    const [input,setInput] = useState([]);
    const handleJSonChange = (e) => {
        const {name,value} = e.target;
        setInput({
            ...input,
            [name]: value
        })
    };
    //딕셔너리 -> 리스트변경 이벤트
    let strArr = [];
    for(let objKey in input) {
        if(input.hasOwnProperty(objKey)){
            strArr.push(parseInt(input[objKey]));
        }
    }

    const PlayDIDUpdate = async () =>{
        for(let list of playList){
            if(list.pm_idx === upEdit){
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/board/promotion/update`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        file_idx: updateCheckId,
                        time: strArr,
                        pm_start: UpStart,
                        pm_end: UpEnd,
                        pm_title: UpTitle,
                        pm_content: UpContent,
                        pm_idx: upEdit,
                    })
                })
            }
        }
        setUpStart('');
        setUpEnd('');
        setUpTitle('');
        setUpContent('');
        UseUN();
        PlayDIDList();
    }




    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <label>수정 선택파일</label>
                    {
                        updateCheckItem?.map((arr) => {
                            return(
                                <ul>
                                    <li>{arr}</li>
                                </ul>
                            )
                        })
                    }
                </Grid>

                <Grid item xs={12} sm={12}>
                    <label>제목</label>
                    <TextField
                        type={"text"}
                        variant="filled"
                        value={UpTitle}
                        onChange={(e) => setUpTitle(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <label>내용</label>
                    <TextField
                        type={"text"}
                        value={UpContent}
                        onChange={(e) => setUpContent(e.target.value)}
                        variant="filled"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <label>재생시간</label>

                    {
                        updateCheckItem.map((arr,i) => (
                            <div>
                                <TextField
                                    id={`${arr}`}
                                    type={"number"}
                                    name={i}
                                    onChange={handleJSonChange}
                                    variant="filled"
                                    placeholder={'(' + arr + ')' + ' 숫자만 적어주세요.'}
                                    fullWidth
                                    style={{marginTop: "1vh"}}
                                />
                            </div>
                        ))
                    }

                </Grid>

                <Grid item xs={12} sm={12}>
                    <label>게시시작일</label>
                    <TextField
                        type={"text"}
                        variant="filled"
                        value={UpStart}
                        onChange={(e) => setUpStart(e.target.value)}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <label>게시종료일</label>
                    <TextField
                        type={"text"}
                        variant="filled"
                        value={UpEnd}
                        onChange={(e) => setUpEnd(e.target.value)}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <label>사용유무</label>
                    <FormControl variant="filled" sx={{minWidth: "100%"}}>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={UpUseYN}
                            onChange={(e) => setUpUseYN(e.target.value)}
                        >
                            <MenuItem value={1}>사용</MenuItem>
                            <MenuItem value={0}>사용안함</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Button type={"submit"} fullWidth variant="contained" sx={{marginTop: 1}} onClick={()=>{
                if(window.confirm('수정이 완료되었습니다.')){
                    PlayDIDUpdate();
                    handleClose();
                }
            }}>
                수정완료
            </Button>
            <Button  variant="contained" color={"inherit"} sx={{marginTop: 2,float: "right"}} onClick={() => {
                handleClose();
            }}>목록으로</Button>
            <Button  variant="contained" color={"inherit"} sx={{marginTop: 2, float: "left"}} onClick={() => {
               setFirst(false);
            }}>이전</Button>

        </div>
    )
}
export default PlayModalUpdateSecond;