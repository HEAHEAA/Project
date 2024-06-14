import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {useContext, useState} from "react";
import {SignUpContext} from "../../../../ContextServer/SIgnUpContext";

function AdminInfo() {
    const {userId, setUserId, userPwd, setUserPwd, userName, setUserName} = useContext(SignUpContext);
    const [pwd, setPwd] = useState('');


    return (
        <div>
            <Typography variant="h6" gutterBottom>
                회원가입 양식에 맞춰 입력해주세요.
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={userId}
                        name="user_id"
                        label="아이디(필수)"
                        onChange={(e) => setUserId(e.target.value)}
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={userName}
                        name="user_name"
                        label="이름(필수)"
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        id="outlined-basic"
                        value={pwd}
                        type={"password"}
                        label="패스워드(필수)"
                        variant="standard"
                        onChange={(e) => setPwd(e.target.value)}
                        fullWidth
                    />
                </Grid>


                {
                    pwd === userPwd ? <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                value={userPwd}
                                name="user_pwd"
                                type={"password"}
                                label="패스워드 확인(필수)"
                                variant="standard"
                                color="success"
                                onChange={(e) => setUserPwd(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </> : <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error
                                margin="normal"
                                value={userPwd}
                                name="user_pwd"
                                type={"password"}
                                label="패스워드 확인(필수)"
                                variant="standard"
                                helperText="비밀번호가 동일하지 않습니다."
                                color="error"
                                onChange={(e) => setUserPwd(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </>
                }

                <Grid item xs={12}>
                    <TextField
                        type={"email"}
                        label="이메일"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type={"number"}
                        required
                        label="전화번호"
                        helperText=" - 을 뺀 숫자만 입력해주세요."
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="소속"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                </Grid>

            </Grid>

        </div>
    )
}

export default AdminInfo;