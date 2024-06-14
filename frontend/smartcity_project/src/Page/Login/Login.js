import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import background from "../../img-bg/bg-04.gif"
import {useContext, useState} from "react";
import {IconButton, InputAdornment} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {LoginContext} from "../../ContextServer/LoginContext";
import {useNavigate} from "react-router-dom";
import yesanLogo from '../../img-bg/yesan-logo.png'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link  href="https://www.yesan.go.kr/">
                예산군
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>


    );
}


function Login() {
    const {value, setValue, LoginSubmit, success, setSuccess} = useContext(LoginContext);
    const navigate = useNavigate();

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
        <div className="login-bg" style={{backgroundImage: `url(${background})`}}>
            <Container component="main" maxWidth="xs"
                       style={{backgroundColor: "#ffffff", border: "1px solid gray", marginTop: "-0vh"}}>
                <CssBaseline/>
                <Box
                    sx={{
                        height: "50vh",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className="login-form"
                >

                    <img src={yesanLogo} alt="logo" width={150}
                         style={{marginTop: "4vh"}}/>

                    <Typography component="h1" variant="h6" className="login-p">
                        <p>중소도시 스마트시티 관제</p>
                    </Typography>

                    <Box component="form" onSubmit={LoginSubmit}>

                        <TextField
                            id="outlined-basic"
                            label="ID"
                            variant="outlined"
                            name="user_id"
                            onChange={(e) => setValue({...value, user_id: e.target.value})}
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="outlined-basic"
                            type={values.showPass ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            // onClick={handlePassVisibilty}
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
                            label="password"
                            variant="outlined"
                            name="user_pwd"
                            onChange={(e) => setValue({...value, user_pwd: e.target.value})}
                            fullWidth
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            LOGIN
                        </Button>


                        <Button onClick={() => {
                            navigate('/signup')
                        }} style={{marginTop: "2vh"}}>
                            회원가입이 필요하신가요?
                        </Button>

                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </div>
    )
}

export default Login;