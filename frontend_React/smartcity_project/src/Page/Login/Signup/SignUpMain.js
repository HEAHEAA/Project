import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {Slide} from "@mui/material";
import AdminInfo from "./UserInfor/AdminInfo";
import UserInfo from "./UserInfor/UserInfo";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {SignUpContext} from "../../../ContextServer/SIgnUpContext";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.yesan.go.kr/">
                yesan
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

//애니메이션효과를 주기위한 컴포넌트
const select = (
    <Paper sx={{m: 1}} elevation={4}>
        <Stack sx={{width: '100%'}} spacing={2}>
            <Alert onClose={() => {
            }}>This is a success SignUp</Alert>
        </Stack>
    </Paper>
);


const steps = ['회원정보입력', '권한입력', '회원가입완료'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AdminInfo/>;
        case 1:
            return <UserInfo/>;
        case 2:
            return <div> 입력이 완료 되었습니다. </div>;
        default:
            throw new Error('Unknown step');
    }
}


function SignUpMain() {
    const {
        userId, setUserId,
        userPwd, setUserPwd,
        UserClass, setUserClass,
        userName, setUserName, SignUpSubmitHandler
    } = useContext(SignUpContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const [checked, setChecked] = React.useState(false);
    const navigate = useNavigate();


    const handleNext = () => {
        if (userId === '') {
            alert('아이디값을 입력하세요.');
        } else if (userName === '') {
            alert('이름값을 입력하세요.');
        } else if (userPwd === '') {
            alert('패스워드를 입력하세요.');
        } else {
            setActiveStep(activeStep + 1);
        }
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };


    return (
        <div>
            <div style={{
                width: "100%",
                height: "100vh",
                position: "absolute",
                zIndex: 10000,
                backgroundColor: "#f2efde",
                marginTop: "-0vh"
            }}>
                <CssBaseline/>
                <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                    <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}
                           style={{backgroundColor: "#ffffff"}}>
                        <Typography component="h1" variant="h4" align="center">
                            <img src={process.env.PUBLIC_URL + './img/yesan-logo.png'} alt="logo" width={150}/>
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length - 1 ? (
                            <React.Fragment>

                                <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
                                    {select}
                                </Slide>

                                <br/>

                                <Typography variant="h5" gutterBottom>
                                    Thank you
                                </Typography>
                                <hr/>
                                <br/>
                                <Typography variant="subtitle1">

                                    <Button variant="contained" disableElevation onClick={() => {
                                        navigate('/')
                                    }}>
                                        로그인 화면으로 돌아가기
                                    </Button>

                                </Typography>
                                <br/>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}

                                    {activeStep !== 1 && (
                                        <Button
                                            variant="text"
                                            onClick={() => {
                                                navigate(-1)
                                            }}
                                            sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="outlined"
                                        onClick={handleNext}
                                        sx={{mt: 3, ml: 1}}
                                    >
                                        {activeStep === steps.length - 2 ?
                                            <div onClick={() => {
                                                setChecked(true);
                                                SignUpSubmitHandler();
                                            }}>
                                                SignUp!
                                            </div>
                                            : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Paper>
                    <Copyright/>
                </Container>
            </div>
        </div>
    )
}

export default SignUpMain;