import {MenuItem, Modal, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {BsFillDeviceHddFill} from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import FormControl from "@mui/material/FormControl";

function Tab01Update({
                         modal,
                         handleClose,
                         setContent,
                         content,
                         lampId,
                         setCompany,
                         company,
                         status,
                         setStatus,
                         EditExamData,
                         Delete
                     }) {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: '10px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <div>
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <Grid container spacing={3}>
                        <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                            <BsFillDeviceHddFill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                            유지보수신청 수정
                        </Typography>

                        <Grid item xs={12} sm={12}>
                            <label>장비아이디</label>

                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={lampId}
                                helperText="고정값은 수정할수없습니다."
                                fullWidth
                                disabled
                            />


                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>요청내역</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>업체</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>신청 진행상황</label>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value="요청">요청중</MenuItem>
                                    <MenuItem value="요청진행중">요청진행중</MenuItem>
                                    <MenuItem value="진행완료">진행완료</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <br/>
                    <Button variant="contained" color="error" style={{float: "right"}} onClick={() => {
                        if (window.confirm('정말 삭제하시겠습니까?')) {
                            Delete();
                            handleClose();
                            alert('삭제가 완료되었습니다.');
                        }
                    }}>
                        삭제
                    </Button>
                    <Button variant="contained" style={{float: "right", marginRight: "0.5vh"}} onClick={() => {
                        if (window.confirm('정말 수정하시겠습니까?')) {
                            EditExamData();
                            handleClose();
                        }
                    }}>수정</Button>

                </Box>
            </Modal>
        </div>
    )
}

export default Tab01Update;