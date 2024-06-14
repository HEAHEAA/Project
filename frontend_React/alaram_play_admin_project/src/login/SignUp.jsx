import {
    createTheme,
    Grid,
    InputAdornment,
    TextField,
    ThemeProvider
} from "@mui/material";
import Button from "@mui/material/Button";
import {SlActionUndo, SlPaperPlane} from "react-icons/sl";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@mui/material/IconButton";
import {Alert} from "@mui/lab";
import {SignupContext} from "../api/Login/SignupContext.jsx";

function SignUp() {
    const navigate = useNavigate();
    const {singUpValue,setSignupValue, signUpOnSubmit,signupSuccess} = useContext(SignupContext);

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


    //2. 테마
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });


    return (
        <div className="login-bg">


            <div className="signup-box">

                <div className="signup-inner">


                    <div className="signup-inner-box">
                        <h1>회원가입을 위해</h1>
                        <h1>정보를 입력해주세요.</h1>


                        <Button variant="outlined" color={"inherit"} onClick={() => {
                            navigate(-1);
                        }}>
                            <SlActionUndo/> &nbsp; Back
                        </Button>
                    </div>


                    <br/>
                    <hr/>
                    <br/>


                    <ThemeProvider theme={darkTheme}>
                        <Grid container spacing={2} className="signup-grid">

                            <Grid item xs={12} sm={12}>
                                <label>이름</label>
                                <TextField
                                    id="filled-basic"
                                    label="이름을 입력해주세요."
                                    variant="filled"
                                    fullWidth
                                    sx={{marginTop: 1}}
                                    name="user_name"
                                    onChange={(e) => setSignupValue({...singUpValue, user_name: e.target.value})}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <label>아이디</label>
                                <TextField
                                    type={"text"}
                                    label="아이디를 입력해주세요."
                                    variant="filled"
                                    fullWidth
                                    sx={{marginTop: 1}}
                                    name="user_id"
                                    onChange={(e) => setSignupValue({...singUpValue, user_id: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <label>비밀번호</label>
                                <TextField
                                    variant="filled"
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
                                    name="user_pwd"
                                    onChange={(e) => setSignupValue({...singUpValue, user_pwd: e.target.value})}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" fullWidth onClick={()=>{
                                    if(singUpValue.user_id === "" && singUpValue.user_pwd === "" && singUpValue.sys_op_user_class_id === 0 && singUpValue.user_name === ""){
                                        alert('빈칸이 존재합니다. 빈칸을 채워주세요.');
                                    }else {
                                        signUpOnSubmit();
                                    }
                                }}>
                                    회원가입&nbsp;<SlPaperPlane/>
                                </Button>
                            </Grid>

                            {
                                signupSuccess === true ?
                                    <Grid item xs={12} sm={12}>
                                        <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success" action={
                                            <Button color="inherit" size="small" onClick={()=>{
                                                navigate('/');
                                            }}>
                                                로그인 이동
                                            </Button>
                                        }>
                                            회원가입 완료 ! 관리자 승인 이후 사용이 가능 합니다.
                                        </Alert>
                                    </Grid> : null
                            }


                        </Grid>
                    </ThemeProvider>


                </div>
            </div>
        </div>
    )
}

export default SignUp;