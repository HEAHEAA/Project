import '../../_style/login/login.css'
import Typography from "@mui/material/Typography";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import logo from '../../assets/image/donghae-logo.png';
import {useContext, useState} from "react";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import {Grid, IconButton, InputAdornment} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../../context/login/LoginContext.jsx";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://www.dh2002.co.kr/">
                Donghae
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Login(){
    const navigate = useNavigate();
    const {
        loginValue, setLoginValue,
        setRemember, LoginOnSubmit,
    } = useContext(LoginContext);

    // 비밀번호 감추기 이벤트
    const [values, setValues] = useState({
        showPass: false
    })
    const togglePasswordHide = () => {
        setValues({
            ...values,
            showPass: !values.showPass
        });
    };

    return(
        <div className="login-background">
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    backgroundColor: "white",
                    marginTop: 10,
                    borderRadius:5,
            }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <br/>
                    <img src={logo} className="login-logo"/>

                    <Typography component="h1" variant="h3" className="login-header" sx={{fontFamily: "SUITE-Regular"}}>
                        <strong>LOGIN</strong>
                    </Typography>
                    <br/>

                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={LoginOnSubmit}>
                        <TextField
                            id="filled-basic"
                            label="ID*"
                            value={loginValue.user_id}
                            name="user_id"
                            onChange={(e) => setLoginValue({...loginValue, user_id: e.target.value})}
                            fullWidth
                        />
                        <TextField
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
                            label="Password*"
                            name="user_pwd"
                            value={loginValue.user_pwd}
                            onChange={(e) => setLoginValue({...loginValue, user_pwd: e.target.value})}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 , float: "left"}}
                        >
                            로그인
                        </Button>
                    </Box>
                </Box>

                <Link href="/signup" variant="body2">
                    {"회원가입이 필요하신가요?"}
                </Link>

                <Copyright sx={{ mt: 4, mb: 4 }} />
                <br/>
            </Container>
        </div>
    )
}
export default Login;
