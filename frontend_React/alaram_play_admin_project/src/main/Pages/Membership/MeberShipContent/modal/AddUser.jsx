import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import {Grid, InputAdornment, TextField} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";
import {useContext, useState} from "react";
import {SignupContext} from "../../../../../api/Login/SignupContext.jsx";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {IoCheckmarkDoneSharp} from "react-icons/io5";

function AddUser({open, handleClose}) {
    const {singUpValue, setSignupValue, signUpOnSubmit} = useContext(SignupContext);

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
                                onChange={(e) => setSignupValue({...singUpValue, user_name: e.target.value})}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <span>아이디</span>
                            <TextField
                                id="filled-basic"
                                label="ex) HongGilDong"
                                variant="filled"
                                name="user_id"
                                onChange={(e) => setSignupValue({...singUpValue, user_id: e.target.value})}
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
                                fullWidth
                                label="비밀번호를 입력해주세요"
                                name="user_pwd"
                                onChange={(e) => setSignupValue({...singUpValue, user_pwd: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <br/>

                    <Button variant="contained" fullWidth onClick={() => {
                        if (singUpValue.user_id === "" && singUpValue.user_pwd === "" && singUpValue.sys_op_user_class_id === 0 && singUpValue.user_name === "") {
                            alert('빈칸이 존재합니다. 빈칸을 채워주세요.');
                        } else {
                            signUpOnSubmit();
                            handleClose();
                            alert(singUpValue.user_id + '(이)가 추가 되었습니다.');
                        }
                    }}
                    >등록하기 < IoCheckmarkDoneSharp/>
                    < /Button>
                    <Button variant="contained" fullWidth sx={{marginTop: 1}} color={"inherit"} onClick={()=>{
                        handleClose();
                    }}>
                        취소
                    </Button>

                </Box>
            </Modal>
        </div>
    )
}

export default AddUser;