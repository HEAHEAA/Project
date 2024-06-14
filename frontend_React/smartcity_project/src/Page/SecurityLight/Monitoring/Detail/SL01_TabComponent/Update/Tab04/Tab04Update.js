import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {BsFillDeviceHddFill} from "react-icons/bs";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useContext} from "react";
import {SecurityLightContext} from "../../../../../../../ContextServer/SecurityContext";
import Button from "@mui/material/Button";

function Tab04Update({open,handleClose,EditEmData,Delete}){
    const {
        ProfileId, setProfileId,
        ProfileName, setProfileName,
        gateway, setGateWay,
        cate, setCate,
        bgnDate, setBgnDate,
        dynamic, setDynamic,
        user, setUser,
        lightCnt, setLightCnt,
        lightMode, setLightMode,
        reportCycle, setReportCycle,
    } = useContext(SecurityLightContext);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 700,
        overflow: "auto",
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
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"

            >
                <Box sx={{...style, width: 600}}>
                    <Grid container spacing={3}>
                        <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                            <BsFillDeviceHddFill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                            디밍제어관리 수정
                        </Typography>

                        <Grid item xs={12} sm={12}>
                            <label>프로파일ID</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={ProfileId || ''}
                                onChange={(e) => setProfileId(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>장비이름</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={ProfileName || ''}
                                onChange={(e) => setProfileName(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>연결 게이트웨이</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={gateway || ''}
                                onChange={(e) => setGateWay(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>적용유형</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={cate || ''}
                                onChange={(e) => setCate(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>적용시작일</label>
                            <TextField
                                type={"datetime-local"}
                                id="outlined-basic"
                                variant="outlined"
                                value={bgnDate || ''}
                                onChange={(e) => setBgnDate(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>동적디밍갯수</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                value={dynamic}
                                onChange={(e) => setDynamic(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>보안등 갯수</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={lightCnt}
                                onChange={(e) => setLightCnt(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>보안등모드</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={lightMode}
                                onChange={(e) => setLightMode(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>감시 주기간격</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={reportCycle}
                                onChange={(e) => setReportCycle(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>등록자</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <br/>

                    <Button variant="outlined" onClick={() => {
                        if(window.confirm('정말 수정하시겠습니까?')){
                            EditEmData();handleClose();
                            alert('수정이 완료 되었습니다.')
                        }else {
                            return '';
                        }
                    }} fullWidth>수정완료</Button>
                    <Button color="error" variant="contained" onClick={()=>{
                        if(window.confirm('정막삭제하시겠습니까?')){
                             Delete();handleClose();
                             alert('삭제가 완료되었습니다.');
                        }
                    }} fullWidth style={{marginTop: "0.5vh"}}>삭제</Button>
                </Box>
            </Modal>
        </div>
    )
}
export default Tab04Update;