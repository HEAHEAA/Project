import {MenuItem, Modal, Select, Snackbar} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";


function KpiListModal({open,handleClose,cate,setCate,setCount,handleOpen,count,kmoth,EditKpiData,setKmonth,Delete}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "400px",
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        KPI통계 수정
                    </Typography>
                    <br/>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <label>날짜</label>
                            <TextField
                                type={"month"}
                                id="outlined-basic"
                                variant="outlined"
                                value={kmoth}
                                onChange={(e) =>setKmonth(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <FormControl style={{width: "93%", marginLeft: "7%", marginTop: "2vh"}}>
                            <label>카테고리</label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={cate}
                                onChange={(e) => setCate(e.target.value)}
                            >
                                <MenuItem value={1}>범죄</MenuItem>
                                <MenuItem value={2}>교통사고</MenuItem>
                                <MenuItem value={3}>온열질환자</MenuItem>
                            </Select>
                        </FormControl>

                        <Grid item xs={12} sm={12}>
                            <label>횟수</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                    </Grid>
                    <br/>

                    <Button variant="outlined" color="secondary" style={{float: "right", marginLeft: "1vh"}} onClick={()=>{
                        handleClose()
                    }}>목록</Button>

                    <Button  variant="outlined" color="error" style={{float: "right", marginLeft: "1vh"}} onClick={()=>{
                        if(window.confirm('정말삭제하시겠습니까?')){
                            Delete();
                            handleClose();
                        }
                    }}>
                        삭제
                    </Button>

                    <Button variant="outlined" style={{float: "right"}} onClick={()=>{
                        EditKpiData();
                        handleClose();
                        alert('수정이 완료 되었습니다.')
                    }}>수정</Button>

                </Box>
            </Modal>
        </div>
    )
}
export default KpiListModal;