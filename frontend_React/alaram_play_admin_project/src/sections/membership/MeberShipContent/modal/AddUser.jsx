import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import {Grid, InputAdornment, TextField} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import {useContext, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {IoCheckmarkDoneSharp} from "react-icons/io5";
import {AddSignUp} from "../../../../hooks/sections/signup/UseSignUp.jsx";
import {MemberContext} from "../../../../context/MemberContext.jsx";

function AddUser({open, handleClose}) {
    const {signupOn,setSignupOn} = useContext(MemberContext);

    const [signUpValue, setSignUpValue] = useState({
        user_id: "",
        user_pwd: "",
        sys_op_user_class_id: 1,
        user_name: ""
    })
    const {mutate: fetchSignup, data: signUpRes} = AddSignUp();
    const handleSignUpCreate = () => {
        if (signUpValue.user_id === '' || signUpValue.user_pwd === '' || signUpValue.user_name === '') {
            alert('빈 값이 존재합니다.')
        } else {
            const data = {
                user_id: signUpValue.user_id?.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,""),
                user_pwd: signUpValue.user_pwd,
                sys_op_user_class_id: 1,
                user_name: signUpValue.user_name?.replace( /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,"")
            }
            fetchSignup(data);
        }
    }



    const handleOnChange = (e) => {
        const {name,value} = e.target;
        const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        let check = true

        if(name === ('user_name' || 'user_id')){
            if(regExp.test(value)){
                alert('특수문자는 입력할 수 없습니다.');
                check = false;
            }
        }

        check &&
            setSignUpValue({
                ...signUpValue,
                [name]: value
            })
    }

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="mbs-user-update-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h1">
                        <strong>회원 추가 등록</strong>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        이용 회원을 추가등록 할 수있습니다.
                    </Typography>

                    <br/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <span>이름</span>
                            <TextField
                                id="filled-basic"
                                label="ex) 홍길동"
                                variant="filled"
                                name="user_name"
                                value={signUpValue.user_name}
                                helperText="특수문자는 사용이 불가합니다."
                                onChange={(e) => setSignUpValue({...signUpValue, user_name: e.target.value})}
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <span>아이디</span>
                            <TextField
                                id="filled-basic"
                                label="ex) HongGilDong"
                                helperText="특수문자는 사용이 불가합니다."
                                variant="filled"
                                name="user_id"
                                onChange={(e) => setSignUpValue({...signUpValue, user_id: e.target.value})}
                                fullWidth
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
                                name="user_pwd"
                                onChange={(e) => setSignUpValue({...signUpValue, user_pwd: e.target.value})}
                                fullWidth
                                label="비밀번호를 입력해주세요"
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Button variant="contained" fullWidth onClick={() => {
                        handleSignUpCreate();
                        alert('추가 등록이 완료 되었습니다.');
                        setSignupOn(true);
                        handleClose();
                    }}>등록하기 <IoCheckmarkDoneSharp/>< /Button>
                    <Button variant="contained" fullWidth sx={{marginTop: 1}} color={"inherit"} onClick={() => {
                        handleClose();
                    }}>취소</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AddUser;