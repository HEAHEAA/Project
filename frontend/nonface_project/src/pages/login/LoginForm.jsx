import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../../api/login/LoginContext.jsx";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="nonface/src/pages/login/Login.jsx#">
                정보통신기획평가원
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function LoginForm() {
    const {
        //로그인 정보
        loginValue, setLoginValue,
        LoginOnSubmit,

    } = useContext(LoginContext);


    //0. 이동
    const navigate = useNavigate();

    //1. 비밀번호 감추기 이벤트
    const [values, setValues] = useState({
        showPass: false
    })
    const togglePasswordHide = () => {
        setValues({
            ...values,
            showPass: !values.showPass
        });
    };



    return (
        <div>
            <Box
                sx={
                    window.innerWidth > 1200 ?
                        {
                            my: 15,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        } : {
                            my: 10,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }
                }
            >

                <Typography component="h1" variant="h4" id="login-p">
                    Login
                </Typography>
                <Box component="form" onSubmit={LoginOnSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        onChange={(e) => setLoginValue({...loginValue, clnt_user_id: e.target.value})}
                        name="clnt_user_id"
                        margin="normal"
                        required
                        fullWidth
                        label="아이디를 입력해주세요"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => setLoginValue({...loginValue, clnt_user_pwd: e.target.value})}
                        name="clnt_user_pwd"
                        margin="normal"
                        type={values.showPass ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password"
                                        edge="end"
                                        onClick={togglePasswordHide}
                                    >
                                        {values.showPass ? (
                                            <VisibilityIcon/>
                                        ) : (
                                            <VisibilityOffIcon/>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        required
                        fullWidth
                        label="비밀번호를 입력해주세요"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" checked={localStorage.getItem('login') !== null}/>}
                        label="아이디 기억하기"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: "#6c63ff"}}
                    >
                        로그인
                    </Button>
                    <Grid container>
                        <Grid item >
                            <Link href="/signup" variant="body2">
                                {"회원가입"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{mt: 5}}/>
                </Box>
            </Box>
        </div>

    )
}

export default LoginForm;