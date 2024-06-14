import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useContext} from "react";
import {AlarmContext} from "../../../../api/system/AlarmContext.jsx";

function AlarmDetailModal({open, handleClose}) {
    const {alarmSingleData, setAlarmSingleData,EditAlarmOnSubmit} = useContext(AlarmContext);
    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="alarm-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <strong>알람 상세보기</strong>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 0}}>
                        작성 된 알람을 상세히 확인 할 수 있습니다.
                    </Typography>

                    <hr/>
                    <br/>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <span>작성자</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                value={alarmSingleData.clnt_user_id}
                                name="clnt_user_id"
                                helperText="발송수신자는 변경 할 수 없습니다."
                                disabled
                                fullWidth
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <span>발송시간</span>
                            <TextField
                                type={"datetime-local"}
                                id="filled-basic"
                                variant="filled"
                                name="sms_transfer_time"
                                value={alarmSingleData.sms_transfer_time}
                                onChange={(e) => {
                                    setAlarmSingleData({...alarmSingleData, sms_transfer_time: e.target.value})
                                }}
                                fullWidth
                            />
                        </Grid>



                        <Grid item xs={12} sm={12}>
                            <span>제목</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                value={alarmSingleData.sms_title}
                                name="sms_title"
                                onChange={(e) => {
                                    setAlarmSingleData({...alarmSingleData, sms_title: e.target.value})
                                }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <span>내용</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                multiline
                                value={alarmSingleData.sms_content}
                                name="sms_content"
                                onChange={(e) => {
                                    setAlarmSingleData({...alarmSingleData, sms_content: e.target.value})
                                }}
                                rows={4}
                                fullWidth
                            />
                        </Grid>



                        <Grid item xs={12} sm={12}>
                            <span>링크</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                value={alarmSingleData.sms_link}
                                name="sms_link"
                                onChange={(e) => {
                                    setAlarmSingleData({...alarmSingleData, sms_link: e.target.value})
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <br/>
                    <Button variant="contained" fullWidth onClick={()=>{
                        if(window.confirm('내용을 수정 하시겠습니까?')) {
                            EditAlarmOnSubmit();
                            handleClose();
                            alert('수정이 완료 되었습니다.');
                        }
                    }}>
                        저장
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth sx={{marginTop: 1}}
                        color={"inherit"}
                        onClick={() => {
                            handleClose();
                        }}
                    >취소</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default AlarmDetailModal