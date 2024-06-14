import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {useContext} from "react";
import {NoticeContext} from "../../../api/system/NoticeContext.jsx";
import Button from "@mui/material/Button";


function NoticeModal({open,handleClose}){
    const {noticeEditValue} = useContext(NoticeContext);
    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="script-list-modal">

                    <div className="notice-modal-header">
                        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mt: 2 }}>
                            <strong>공지사항</strong>
                        </Typography>
                    </div>



                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <h3>제목</h3>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                value={noticeEditValue.notice_title}
                                fullWidth
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <h4>내용</h4>
                            <TextField
                                id="filled-multiline-static"
                                multiline
                                rows={14}
                                value={noticeEditValue.notice_content}
                                variant="filled"
                                fullWidth
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <h4>게시 시작일</h4>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                value={noticeEditValue.notice_start_date}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <h4>게시 종료일</h4>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                value={noticeEditValue.notice_end_date}
                                fullWidth
                            />
                        </Grid>

                        <hr/>
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" onClick={()=>{
                                handleClose();
                            }}>
                                목록으로
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </div>
    )
}
export default NoticeModal;