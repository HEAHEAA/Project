import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ModalStyles} from "../../../theme/mui-style-query.jsx";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import WeekPicker from "../../../components/date-picker/WeekPicker.jsx";
import {useContext, useEffect} from "react";
import {NoticeContext} from "../../../context/notice/NoticeContext.jsx";

function AddAlarmModal({addModal, handleClose}) {
    const {
        noticeData, setNoticeData,
        NoticeInsertData
    } = useContext(NoticeContext);

    useEffect(() => {
        setNoticeData({
            notice_type: "1",//1=알림 2=일정
            notice_content: "",
            start_week: localStorage.getItem('year-week')
        })
    }, [addModal]);

    return (
        <Modal
            open={addModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles} className="modal-bar">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <strong>알림사항 생성</strong>
                </Typography>
                <hr color="#e7e7e7" style={{marginBottom: 30, marginTop: 10}}/>

                <Grid container spacing={4} className="modal-grid">

                    <Grid item xs={12} sm={12}>
                        <span>날짜 지정</span>
                        <br/>
                        <TextField
                            fullWidth
                            variant="standard"
                            value={
                                localStorage.getItem('year-week')?.substring(0, 4) + "년" +
                                localStorage.getItem('year-week')?.substring(4, 5) + "월" +
                                localStorage.getItem('year-week')?.substring(5, 6) + "주차"
                            }
                            disabled
                        />
                        <br/>
                        <div style={{border: '1px solid #dadada'}}>
                            <WeekPicker/>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <span>알림 내용</span>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={10}
                            fullWidth
                            placeholder="내용을 입력해주세요."
                            name="notice_content"
                            value={noticeData.notice_content}
                            onChange={(e) => setNoticeData({...noticeData, notice_content: e.target.value})}
                        />
                    </Grid>
                </Grid>

                <br/>


                <Button variant="contained" fullWidth onClick={() => {
                    if (window.confirm('정말 추가 하시겠습니까?')) {
                        NoticeInsertData();
                        handleClose();
                    }
                }}>
                    추가 <Add/>
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

export default AddAlarmModal;
