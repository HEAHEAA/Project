import {MenuItem, Modal, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {BsFillDeviceHddFill} from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../../../../ContextServer/LoginContext";
import FormControl from "@mui/material/FormControl";

function NewTab01({
                      AddModal, handleAddClose, setCompany, company, setContent, content, setUser, setLampId, user,
                      setStatus, lampId, AddExamData
                  }) {

    const [selectList, setSelectList] = useState([]);
    const {access, RefreshToken} = useContext(LoginContext);
    const [num, setNum] = useState(0);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 600,
        overflow: "auto",
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const getData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        fetch(`/api/strLamp/em/select`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json())
            .then(res => {
                setSelectList(res.data);
            })
    }
    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Modal
                open={AddModal}
                onClose={handleAddClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <Grid container spacing={3}>
                        <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                            <BsFillDeviceHddFill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                            유지보수 신청 입력
                        </Typography>

                        <Grid item xs={12} sm={12}>
                            <label>장비아이디</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={lampId}
                                    onChange={(e) => setLampId(e.target.value)}
                                >
                                    {
                                        selectList.map(function (a, i) {
                                            return (
                                                <MenuItem value={a.slem_profile_id} onClick={() => {
                                                    setNum(i);
                                                }} key={i}>
                                                    {a.slem_profile_id}
                                                </MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>민원처리</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={"요청"}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="요청">요청</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>민원인</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setUser(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>정비업체</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setCompany(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>점검내용</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setContent(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <br/>
                    <Button variant="contained" onClick={() => {
                        if (lampId === '') {
                            alert('장비아이디값을 입력해주세요.');
                        } else if (user === '') {
                            alert('민원인을 입력해주세요.');
                        } else if (company === '') {
                            alert('정비업체를 입력해주세요.');
                        } else if (content === '') {
                            alert('점검내용을 입력해주세요.');
                        } else {
                            AddExamData();
                            handleAddClose();
                            alert('내용이 추가 되었습니다.');
                        }
                    }} fullWidth>
                        완료
                    </Button>
                    <Button variant="outlined" style={{marginTop: "0.5vh"}} onClick={() => {
                        if (window.confirm('유지보수를 신청하시겠습니까?')) {
                            handleAddClose();
                        }
                    }} fullWidth>
                        목록
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default NewTab01;