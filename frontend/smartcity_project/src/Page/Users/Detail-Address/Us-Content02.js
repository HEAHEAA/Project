import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../ContextServer/LoginContext";
import Button from "@mui/material/Button";
import {DetailExitIcon, TextBlack} from "../../../Componet/style-config/light-theme";
import Text from "ol/style/Text";

function UsContent02() {
    const {access, RefreshToken, userId} = useContext(LoginContext);
    const [user, setUser] = useState([]); //사용자 목록 list
    const [userBtn, setUserBtn] = useState(0);
    const [oneDayUser, setOneDayUser] = useState([]); // 일일 사용자 로그


    const navigate = useNavigate();
    const GoUs = () => {
        navigate('/users');
    }
    //사용자 목록 리스트 GET API
    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/user/userList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setUser(res.data);
            })
    }


    return (
        <div>
            <div className="Us-Detail01">
                <p className="k-icon k-i-x" style={DetailExitIcon} onClick={GoUs}></p>

                <div className="Us-Detail-table">
                    <h1 style={TextBlack}>사용자 편집</h1>

                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <p style={{textAlign: "left", fontSize: "16px",color: TextBlack.color}}>회원ID</p>
                            <TextField
                                required
                                value={user[userBtn]?.user_id}
                                fullWidth
                                autoComplete="given-name"
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <FormControl variant="filled" sx={{m: 0, minWidth: "100%"}} style={{marginTop: "-0vh"}}
                                         className="users-selects">
                                <p style={{textAlign: "left", fontSize: "16px",color: TextBlack.color}}>사용자구분</p>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                >
                                    <MenuItem>관리자</MenuItem>
                                    <MenuItem>사용자</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <FormControl variant="filled" sx={{m: 0, minWidth: "100%"}} style={{marginTop: "-0vh"}}
                                         className="users-selects">
                                <p style={{textAlign: "left", fontSize: "16px",color: TextBlack.color}}>승인여부</p>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                >
                                    <MenuItem>승인</MenuItem>
                                    <MenuItem>미승인</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <p style={{textAlign: "left", fontSize: "16px",color: TextBlack.color}}>이메일</p>
                            <TextField
                                required
                                fullWidth
                                autoComplete="given-name"
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <p style={{textAlign: "left", fontSize: "16px",color: TextBlack.color}}>연락처</p>
                            <TextField
                                required
                                fullWidth
                                autoComplete="given-name"
                                variant="filled"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <p style={{textAlign: "left", fontSize: "16px",color: TextBlack.color}}>비고</p>
                            <TextField
                                required
                                fullWidth
                                autoComplete="given-name"
                                variant="filled"
                            />
                        </Grid>
                    </Grid>


                    <Button variant="contained"
                            className="save" size={"large"}
                            style={{marginTop: "2vh"}}>저장</Button>
                    <Button variant="outlined"
                            className="close" size={"large"}
                            style={{marginTop: "2vh", marginLeft: "0.5vh"}}>취소</Button>

                </div>
            </div>
        </div>
    )
}

export default UsContent02;