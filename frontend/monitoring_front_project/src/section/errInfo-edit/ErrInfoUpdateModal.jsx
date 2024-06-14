import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Grid, Select, TextField} from "@mui/material";
import {useContext} from "react";
import {ErrInfoContext} from "../../context/errInfoContext.jsx";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {themes} from "../../theme/darkThme.jsx";

export const ErrInfoUpdateModal = ({open,handleClose}) => {
    const {
        errUpdateData,
        setErrUpdateData,
        ErrInfoUpdateSubmit
    } = useContext(ErrInfoContext);

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={themes.err_modal} className="modal">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    에러 이력 수정
                </Typography>

                <br/>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <span>지역</span>
                        <TextField
                            id="filled-basic"
                            value={errUpdateData.error_region}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <span>에러정보</span>
                        <TextField
                            id="filled-basic"
                            value={errUpdateData.error_state}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <span>발생 시간</span>
                        <TextField
                            id="filled-basic"
                            value={errUpdateData.error_break_date}
                            disabled
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}></Grid>
                    <Grid item xs={12} sm={12}></Grid>
                    <Grid item xs={12} sm={12}></Grid>

                    <Grid item xs={12} sm={6}>
                        <span>해결 여/부</span>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={errUpdateData.error_update_check}
                                onChange={(e) => setErrUpdateData({
                                    ...errUpdateData,
                                    error_update_check: e.target.value
                                })}
                            >
                                <MenuItem value={false}>N</MenuItem>
                                <MenuItem value={true}>Y</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <span>관리자 이름</span>
                        <TextField
                            id="filled-basic"
                            value={errUpdateData.error_reason_user}
                            onChange={(e) => setErrUpdateData({
                                ...errUpdateData,
                                error_reason_user: e.target.value
                            })}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <span>해결완료 시간</span>
                        <TextField
                            type="datetime-local"
                            id="filled-basic"
                            value={errUpdateData.error_renew_date}
                            onChange={(e) => setErrUpdateData({
                                ...errUpdateData,
                                error_renew_date: e.target.value
                            })}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <span>사유</span>
                        <TextField
                            id="filled-basic"
                            label="사유를 입력해 주세요."
                            value={errUpdateData.error_reason}
                            onChange={(e) => setErrUpdateData({
                                ...errUpdateData,
                                error_reason: e.target.value
                            })}
                            multiline
                            rows={6}
                            fullWidth
                        />
                    </Grid>

                </Grid>

                <br/>


                <Button variant="contained" sx={{ float :"right"}} color={"inherit"} onClick={()=> {
                    if(window.confirm('정말 취소 하시겠습니까?')) {
                        handleClose();
                    }
                }}>
                    취소
                </Button>
                <Button variant="contained" color="info" sx={{marginRight: 1, float :"right"}} onClick={() => {
                    if(window.confirm('정말 수정 하시겠습니까?')) {


                        if(errUpdateData.error_reason_user === null && errUpdateData.error_renew_date === "" && errUpdateData.error_reason === ""){
                            alert('빈칸을 채워주세요 !');
                        }else {
                            ErrInfoUpdateSubmit();
                            handleClose();
                            alert('수정이 완료 되었습니다.');
                        }

                    }
                }}>
                    완료
                </Button>


            </Box>
        </Modal>
    )
}
