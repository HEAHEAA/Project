import Box from "@mui/material/Box";
import {ModalStyles} from "../../../theme/mui-style-query.jsx";
import Typography from "@mui/material/Typography";
import { Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Edit} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import WeekPicker from "../../../components/date-picker/WeekPicker.jsx";
import {useContext} from "react";
import {NoticeContext} from "../../../context/notice/NoticeContext.jsx";

function UpdateAlarmModal({handleClose,updateModal}){
    const {
        noticeData,setNoticeData,
        UpdateNoticeData
    } = useContext(NoticeContext);


    return(
        <Modal
            open={updateModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles} className="modal-bar">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <strong>알림사항 수정</strong>
                </Typography>
                <hr color="#e7e7e7" style={{marginBottom: 30, marginTop: 10}}/>

                <Grid container spacing={4} className="modal-grid">

                    <Grid item xs={12} sm={12}>
                        <span>날짜 변경</span>

                        <br/>
                        <TextField
                            disabled
                            id="standard-basic"
                            variant="standard"
                            sx={{marginTop:1}}
                            fullWidth
                            value={
                                noticeData.start_week?.substring(0, 4)+ "년" +
                                (
                                    noticeData.start_week?.substring(4, 6) === '10' ? noticeData.start_week?.substring(4, 6) : (
                                        noticeData.start_week?.substring(4, 6) === '11' ? noticeData.start_week?.substring(4, 6) : (
                                            noticeData.start_week?.substring(4, 6) === '12' ? noticeData.start_week?.substring(4, 5) :
                                                noticeData.start_week?.substring(4, 5)
                                        )
                                    )
                                ) + "월" +
                                (
                                    noticeData.start_week?.substring(4, 6) === '10' ? noticeData.start_week?.substring(4, 5) : (
                                        noticeData.start_week?.substring(4, 6) === '11' ? noticeData.start_week?.substring(4, 5) : (
                                            noticeData.start_week?.substring(4, 6) === '12' ? noticeData.start_week?.substring(4, 5) :
                                                noticeData.start_week?.substring(5, 6)
                                        )
                                    )
                                ) + "주차"
                            }
                        />
                        <div style={{ marginTop: 10}}>
                            <WeekPicker/>
                        </div>
                        <br/>

                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <span>알림 내용 수정</span>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={10}
                            fullWidth
                            name="notice_content"
                            value={noticeData.notice_content}
                            onChange={(e) => setNoticeData({...noticeData, notice_content: e.target.value})}
                            placeholder="내용을 입력해주세요."
                        />
                    </Grid>
                </Grid>

                <br/>


                <Button variant="contained" fullWidth onClick={()=>{
                    if(window.confirm('정말 수정 하시겠습니까?')){
                        UpdateNoticeData();
                        handleClose();
                    }
                }}>
                    수정 완료<Edit/>
                </Button>

                <Button variant="contained"
                        color={"inherit"}
                        fullWidth
                        sx={{marginTop: 1}}
                        onClick={handleClose}
                >
                    목록으로
                </Button>

            </Box>
        </Modal>
    )
}
export default UpdateAlarmModal;
