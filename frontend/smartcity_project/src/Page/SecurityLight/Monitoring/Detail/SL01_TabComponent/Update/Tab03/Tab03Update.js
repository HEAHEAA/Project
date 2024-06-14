import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {BsFillDeviceHddFill} from "react-icons/bs";

import Button from "@mui/material/Button";
import {useContext} from "react";
import {SecurityLightContext} from "../../../../../../../ContextServer/SecurityContext";

function Tab03Update({open, handleClose,}) {
    const {
        ProfileId, setProfileId,
        ProfileName, setProfileName,
        gateWay, setGateWay,
        sslc, setSslc,
        repeater, setRepeater,
        EditEMData,Deletes
    } = useContext(SecurityLightContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <Grid container spacing={3}>
                        <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                            <BsFillDeviceHddFill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                            장비관리 수정
                        </Typography>

                        <Grid item xs={12} sm={12}>
                            <label>프로파일ID</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={ProfileId}
                                onChange={(e) => setProfileId(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>프로파일명</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={ProfileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>게이트웨이</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={gateWay}
                                onChange={(e) => setGateWay(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>SSLC 수량</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={sslc}
                                onChange={(e) => setSslc(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>리피터 수량</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={repeater}
                                onChange={(e) => setRepeater(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <br/>

                    <Button onClick={() => {
                        if (window.confirm('수정하시겠습니까?')) {
                            EditEMData();
                            handleClose();
                        }
                    }} variant="contained" color={"success"} fullWidth style={{marginTop: "0.5vh"}}
                    >
                        수정완료
                    </Button>

                    <Button onClick={() => {
                        if (window.confirm('정막삭제하시겠습니까?')) {
                            Deletes();
                            handleClose();
                        }
                    }} variant="contained" color={"error"}
                            fullWidth
                            style={{marginTop: "0.5vh"}}
                    >
                        삭제
                    </Button>

                    <Button onClick={() => {
                        handleClose();}}
                            variant="outlined" color={"secondary"} fullWidth style={{marginTop: "0.5vh"}}
                    >
                        목록으로
                    </Button>

                    {/*<Tab03Dimming EditEMData={EditEMData} settings={settings} setSettings={setSettings}/>*/}










                </Box>
            </Modal>
        </div>
    )
}

export default Tab03Update;