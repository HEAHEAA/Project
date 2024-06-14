import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {GiCheckMark} from "react-icons/gi";
import {FiX} from "react-icons/fi";
import Modal from "@mui/material/Modal";
import {Grid, InputAdornment, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useState} from "react";
import {MemberContext} from "../../../../../api/MemberShip/MemberContext.jsx";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility.js";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff.js";

function EditUser({open,handleClose}){
    const {userEditValue,setUserEditValue,EditMemberInfoOnSubmit} = useContext(MemberContext);
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
    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="mbs-user-update-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <strong>사용자 정보 수정</strong>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        이름/비밀번호를 수정 할 수있습니다.
                    </Typography>

                    <hr/>
                    <br/>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <span>아이디</span>
                            <TextField
                                disabled
                                id="filled-basic"
                                variant="filled"
                                value={userEditValue.user_id}
                                helperText="아이디는 변경 할 수 없습니다."
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <span>이름</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                value={userEditValue.user_name}
                                onChange={(e) => setUserEditValue({...userEditValue, user_name: e.target.value})}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <span>비밀번호</span>
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
                                onChange={(e) => setUserEditValue({...userEditValue, user_pwd: e.target.value})}
                            />
                        </Grid>

                    </Grid>





                    <Button variant="contained" fullWidth onClick={()=>{
                        if(userEditValue.user_name === '' || userEditValue.user_pwd === ''){
                            alert('빈 칸이 존재합니다. 모두 입력해주세요.')
                        }else {
                            EditMemberInfoOnSubmit();
                            handleClose();
                            alert('수정이 완료 되었습니다.');
                        }
                    }}>
                        저장 &nbsp;<GiCheckMark />
                    </Button>

                    <Button
                        variant="contained"
                        fullWidth
                        color={"inherit"}
                        sx={{marginTop: 1}}
                        onClick={()=>{
                            handleClose();
                        }}
                    >
                        취소  &nbsp;<FiX />
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
export default EditUser;