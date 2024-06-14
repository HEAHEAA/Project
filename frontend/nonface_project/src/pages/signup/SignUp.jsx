import '../../style/pages/SignUp.css'
import TextField from "@mui/material/TextField";
import {BsCheck} from "react-icons/bs";
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import logo from "../../assets/img/logo.png";
import {InputAdornment, Select} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import {useContext, useEffect, useState} from "react";
import {SignupContext} from "../../api/login/SignupContext.jsx";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function SignUp() {
    const {
        clntUserId, setClntUserid,
        signUpValue, setSignupValue,
        idCheck, setIdCheck,
        clntPwd, setClntPwd,
        clntPwdCheck, setClntPwdCheck,
        MatchIdCheck,
        SignupUserSubmit,

        clntName,
        groupListGetOnSubmit,
        clientList,
    } = useContext(SignupContext);
    //이용약관 체크
    const [check, setCheck] = useState(false);

    useEffect(() => {
        MatchIdCheck();
    }, [clntUserId]);

    useEffect(() => {
        groupListGetOnSubmit();
    }, []);


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
            <div className="signup-container">
                <div className="container">

                    <div className="signup-head">
                        <h2>회원가입을 위해 <br/>정보를 입력해주세요.</h2>
                        <Button variant="outlined" color={"inherit"} sx={{marginTop: -2}} onClick={() => {
                            navigate(-1);
                        }}>
                            돌아가기
                        </Button>
                    </div>

                    <div className="signup-content">

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <div className="signup-content-form">
                                    <p>아이디*
                                        {
                                            idCheck === null ?
                                                <span style={{color: "#1b72bf"}}> </span> : (
                                                    idCheck === true ?
                                                        <span style={{color: "#1b72bf"}}> 사용할 수있는 아이디입니다.</span> :
                                                        <span style={{color: "#ff0000"}}> 중복되는 아이디 입니다.</span>
                                                )
                                        }
                                    </p>
                                    <TextField
                                        type={"text"}
                                        label=""
                                        helperText="영문+숫자 조합 6자리 이상"
                                        color={idCheck === true ? 'info' : 'error'}
                                        sx={{width: "85%", float: "left"}}
                                        name="clnt_user_id"
                                        value={clntUserId}
                                        onChange={
                                            (e) => {
                                                setSignupValue({...signUpValue, clnt_user_id: e.target.value});
                                                setClntUserid(e.target.value);
                                            }}
                                    />
                                    <Button
                                        variant="outlined"
                                        sx={{width: "12%", marginLeft: 1, height: "4.5vh"}}
                                        size={"large"}
                                        onClick={MatchIdCheck}
                                        color={idCheck === true ? "info" : 'error'}
                                    >
                                        중복확인
                                    </Button>
                                </div>
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <div className="signup-content-form">
                                    <p>고객사*</p>
                                    <FormControl fullWidth sx={{marginTop: 0}}>
                                        <InputLabel id="demo-simple-select-label">선택</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="clnt_org_id"
                                            onChange={
                                                (e) => {
                                                    setSignupValue({...signUpValue, clnt_org_id: e.target.value});
                                                }}
                                        >
                                            {
                                                clientList.map(function (arr, inx) {
                                                    return (
                                                        <MenuItem
                                                            value={arr.clnt_org_id || ''}>{arr.clnt_org_id || ''}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div className="signup-content-form">
                                    <p>고객사 명*</p>
                                    <TextField
                                        type={"text"}
                                        fullWidth
                                        name="clnt_org_name"
                                        value={clntName[0]}
                                    />

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div className="signup-content-form">
                                    <p>휴대폰 번호*</p>
                                    <TextField
                                        type={"text"}
                                        label="ex: 01012345678"
                                        fullWidth
                                        name="user_phone"
                                        onChange={(e) => setSignupValue({...signUpValue, user_phone: e.target.value})}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div className="signup-content-form">
                                    <p>이메일*</p>
                                    <TextField
                                        type={"text"}
                                        label="ex: abc@gmail.com"
                                        fullWidth
                                        name="user_email"
                                        onChange={(e) => setSignupValue({...signUpValue, user_email: e.target.value})}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <div className="signup-content-form">
                                    <p>사용자 권한*</p>
                                    <FormControl fullWidth sx={{marginTop: 0}}>
                                        <InputLabel id="demo-simple-select-label">선택</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="clnt_user_type"
                                            onChange={
                                                (e) => {
                                                    setSignupValue({...signUpValue, clnt_user_type: e.target.value});
                                                }}
                                        >
                                            <MenuItem value="관리자">관리자</MenuItem>
                                            <MenuItem value="일반관리자">일반관리자</MenuItem>
                                            <MenuItem value="일반사용자">일반사용자</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <div className="signup-content-form">
                                    <p>비밀번호*</p>
                                    <TextField
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
                                        label="비밀번호"
                                        value={clntPwd}
                                        onChange={(e) => setClntPwd(e.target.value)}
                                    />
                                </div>
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <div className="signup-content-form">
                                    <p>비밀번호 확인
                                        {
                                            clntPwdCheck === '' ?
                                                <span style={{color: "#1b72bf"}}></span> : (
                                                    clntPwdCheck === clntPwd ?
                                                        <span style={{color: "#1b72bf"}}> 비밀번호가 동일합니다.<BsCheck/></span> :
                                                        <span style={{color: "#ff0000"}}>  비밀번호가 다릅니다.   <BsCheck/></span>
                                                )
                                        }
                                    </p>
                                    <TextField
                                        type={"password"}
                                        label="비밀번호 확인"
                                        fullWidth
                                        name="clnt_user_pwd"
                                        value={clntPwdCheck}
                                        onChange={(e) => {
                                            setSignupValue({...signUpValue, clnt_user_pwd: e.target.value});
                                            setClntPwdCheck(e.target.value);
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>


                        <div className="signup-content-form">
                            <FormControlLabel
                                control={<Checkbox value={check} checked={check} onChange={(e) => setCheck(!check)}/>}
                                label="이용약관 개인정보 수집 및 정보이용에 동의합니다. *"/>
                        </div>


                        <Button variant="outlined" fullWidth onClick={() => {

                            if (signUpValue.clnt_org_id !== null && signUpValue.clnt_user_id !== null && signUpValue.clnt_user_name !== null &&
                                signUpValue.clnt_user_pwd !== null && signUpValue.user_email !== null && signUpValue.user_phone
                            ) {
                                alert('회원가입이 완료 되었습니다.');
                                // navigate('/');
                                SignupUserSubmit();
                            } else {
                                alert('필수입력창을 채워주세요.')
                            }


                        }}>가입하기</Button>

                    </div>


                </div>
            </div>


            {
                window.innerWidth < 600 ? null :
                    <Box sx={{transform: 'translateZ(1)', flexGrow: 1}}>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{position: 'absolute', bottom: 25, right: 30}}
                            icon={<img src={logo} alt={"logo"} width="80px"/>}
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                        </SpeedDial>
                    </Box>
            }


        </div>
    )
}

export default SignUp;