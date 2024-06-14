import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ModalStyles} from "../../theme/mui-style-query.jsx";
import TextField from "@mui/material/TextField";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import WeekPicker from "../../components/date-picker/WeekPicker.jsx";
import {useContext} from "react";
import {NewsContext} from "../../context/news/NewsContext.jsx";

function AddNews({addModal,handleClose}){
    const {NewsWeekInsert, newsValue,setNewsValue} = useContext(NewsContext);

    return(
        <Modal
            open={addModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles} className="modal-bar">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <strong>업계소식 생성</strong>
                </Typography>

                <hr color="#e7e7e7" style={{marginBottom: 30, marginTop: 10}}/>

                <Grid container spacing={4} className="modal-grid">
                    <Grid item xs={12} sm={12}>
                        <span>하이퍼링크</span>
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
                        <span>소식 내용</span>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={7}
                            fullWidth
                            placeholder="하이퍼링크 적용 시, 텍스트가 자동 삽입 됩니다."
                            name="in_content"
                        />
                    </Grid>

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
                        <WeekPicker/>
                    </Grid>
                </Grid>
                <br/>
                <Button variant="contained" fullWidth onClick={()=>{
                    if(window.confirm('소식을 등록 하시겠습니까?')){
                        NewsWeekInsert();
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
export default AddNews;
