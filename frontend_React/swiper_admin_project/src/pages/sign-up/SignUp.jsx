import Button from "@mui/material/Button";
import {SlActionUndo, SlPaperPlane} from "react-icons/sl";
import {
    Alert,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    ThemeProvider
} from "@mui/material";
import {DarkTheme} from "../../theme/mui-theme.jsx";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import CheckIcon from '@mui/icons-material/Check';
import {useContext, useEffect, useState} from "react";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import {SignupContext} from "../../context/login/SignupContext.jsx";
import {ClientContext} from "../../context/client/ClientContext.jsx";

function SignUp() {
    const navigate = useNavigate();
    const {
        signUpValue,
        setSignUpValue,
        pwdCheck,
        setPwdCheck,
        SignOnSubmit,
        singCheck,setSignCheck
    } = useContext(SignupContext);

    const {
        ClientPartOnSubmit,ClientPart,
        ClientGradeOnSubmit,ClientGrade
    } = useContext(ClientContext);

    useEffect(() => {
        ClientPartOnSubmit();
        ClientGradeOnSubmit();
    }, []);

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

    return (
        <div className="login-background">
            <div className="signup-box">
                <div className="signup-inner">
                    <Toolbar/>
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
                    <ThemeProvider theme={DarkTheme}>
                        <Grid container spacing={2} className="signup-grid">
                            <Grid item xs={12} sm={6}>
                                <label>이름</label>
                                <TextField
                                    id="filled-basic"
                                    label="이름을 입력해주세요."
                                    variant="filled"
                                    fullWidth
                                    sx={{marginTop: 1}}
                                    name="user_name"
                                    value={signUpValue.user_name}
                                    onChange={(e) => setSignUpValue({...signUpValue, user_name: e.target.value})}
                                />

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label>아이디</label>
                                <TextField
                                    type={"text"}
                                    label="아이디를 입력해주세요."
                                    variant="filled"
                                    fullWidth
                                    sx={{marginTop: 1}}
                                    name="user_id"
                                    value={signUpValue.user_id}
                                    onChange={(e) => setSignUpValue({...signUpValue, user_id: e.target.value})}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                                    value={pwdCheck}
                                    onChange={(e) => setPwdCheck(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <label>비밀번호 확인</label>
                                <TextField
                                    error={pwdCheck !== signUpValue.user_pwd}
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
                                    helperText={pwdCheck === signUpValue.user_pwd ? "비밀번호 동일" : "동일 하지 않습니다 !"}
                                    onChange={(e) => setSignUpValue({...signUpValue, user_pwd: e.target.value})}
                                    value={signUpValue.user_pwd}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <label>이메일</label>
                                <TextField
                                    type={"email"}
                                    label="이메일을 입력해주세요."
                                    variant="filled"
                                    fullWidth
                                    sx={{marginTop: 1}}
                                    name="user_mail"
                                    onChange={(e) => setSignUpValue({...signUpValue, user_mail: e.target.value})}
                                    value={signUpValue.user_mail}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <label>부서</label>
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="demo-simple-select-filled-label">선택</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        name="user_class"
                                        onChange={(e) => setSignUpValue({...signUpValue, user_class: e.target.value})}
                                        value={signUpValue.user_class}
                                    >
                                        <MenuItem value={1}>총괄 관리자</MenuItem>
                                        <MenuItem value={2}>업무 지원실</MenuItem>
                                        <MenuItem value={3}>경영 지원실</MenuItem>
                                        <MenuItem value={4}>기획실</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Button variant="contained" fullWidth onClick={()=>{
                                    SignOnSubmit();
                                }}>
                                    회원가입&nbsp;<SlPaperPlane/>
                                </Button>
                            </Grid>

                            {
                                singCheck !== false ?
                                    <Grid item xs={12} sm={12}>
                                        <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success" action={
                                            <Button color="inherit" size="small" onClick={() => {
                                                navigate('/');
                                            }}>
                                                로그인 이동
                                            </Button>
                                        }>
                                            회원가입 완료 !
                                        </Alert>
                                    </Grid> : null
                            }

                            <Toolbar/>
                        </Grid>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
