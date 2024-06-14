import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {ModalStyles} from "../../theme/mui-style-query.jsx";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Edit} from "@mui/icons-material";
import WeekPicker from "../../components/date-picker/WeekPicker.jsx";
import {useContext} from "react";
import {NewsContext} from "../../context/news/NewsContext.jsx";

function UpdateNewsModal({handleClose, updateModal}) {
    const {
        newsValue, setNewsValue,
        UpdateNewsData,
    } = useContext(NewsContext);
    return (
        <Modal
            open={updateModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles} className="modal-bar">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <strong>업계소식 수정</strong>
                </Typography>

                <hr color="#e7e7e7" style={{marginBottom: 30, marginTop: 10}}/>

                <Grid container spacing={4} className="modal-grid">
                    <Grid item xs={12} sm={12}>
                        <span>소식 내용 수정</span>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={7}
                            fullWidth
                            placeholder="내용을 입력해주세요."
                            name="in_content"
                            value={newsValue.in_content}
                            onChange={(e) => setNewsValue({...newsValue, in_content: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <span>하이퍼링크 수정</span>
                        <TextField
                            id="outlined-multiline-static"
                            fullWidth
                            placeholder="ex:) http://www.abc.com"
                            name="in_link"
                            value={newsValue.in_link}
                            onChange={(e) => setNewsValue({...newsValue, in_link: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <span>날짜 지정</span>
                        <br/>
                        <TextField
                            disabled
                            id="standard-basic"
                            variant="standard"
                            sx={{marginTop: 1}}
                            fullWidth
                            value={
                                newsValue.start_week?.substring(0, 4) + "년" +
                                (
                                    newsValue.start_week?.substring(4, 6) === '10' ? newsValue.start_week?.substring(4, 6) : (
                                        newsValue.start_week?.substring(4, 6) === '11' ? newsValue.start_week?.substring(4, 6) : (
                                            newsValue.start_week?.substring(4, 6) === '12' ? newsValue.start_week?.substring(4, 5) :
                                                newsValue.start_week?.substring(4, 5)
                                        )
                                    )
                                ) + "월" +
                                (
                                    newsValue.start_week?.substring(4, 6) === '10' ? newsValue.start_week?.substring(4, 5) : (
                                        newsValue.start_week?.substring(4, 6) === '11' ? newsValue.start_week?.substring(4, 5) : (
                                            newsValue.start_week?.substring(4, 6) === '12' ? newsValue.start_week?.substring(4, 5) :
                                                newsValue.start_week?.substring(5, 6)
                                        )
                                    )
                                ) + "주차"
                            }
                        />
                        <WeekPicker/>
                    </Grid>
                </Grid>
                <br/>
                <Button variant="contained" fullWidth onClick={() => {
                    if (window.confirm('정말 수정 하시겠습니까?')) {
                        UpdateNewsData();
                        handleClose();
                    }
                }}>
                    수정 <Edit/>
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

export default UpdateNewsModal;
