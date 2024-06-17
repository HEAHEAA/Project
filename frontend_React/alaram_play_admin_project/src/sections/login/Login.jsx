import {Button, FormControlLabel, IconButton, InputAdornment, Radio, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import {useContext, useState} from "react";
import Box from "@mui/material/Box";
import {LoginContext} from "../../context/LoginContext.jsx";

function Login() {
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

    return (
        <div className="login-bg">
            <div className="login-box">
                <div className="login-inner">
                    <h1>LOGIN</h1>
                    <hr/>
                    <br/>
                    <Box component="form" onSubmit={LoginOnSubmit}>
                        <TextField
                            id="filled-basic"
                            label="아이디를 입력해주세요."
                            variant="filled"
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
                            label="비밀번호를 입력해주세요"
                            name="user_pwd"
                            value={loginValue.user_pwd}
                            onChange={(e) => setLoginValue({...loginValue, user_pwd: e.target.value})}
                        />
                        <FormControlLabel value="female"
                                          control={<Radio
                                              checked={localStorage.getItem('check') === 'true' ? true :  setRemember(true)}/>}
                                          label="로그인 기억하기"
                        />


                        <Button
                            type="submit"
                            variant="contained"
                            sx={{marginTop: 2, marginBottom: 2}}
                            fullWidth>
                            로그인
                        </Button>
                    </Box>
                    <p
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            navigate('/signup')
                        }}>
                        회원가입이 필요한가요?
                    </p>
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default Login;