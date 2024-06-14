import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {BsFillDeviceHddFill} from "react-icons/bs";
import {useContext} from "react";
import {SecurityLightContext} from "../../../../../../../ContextServer/SecurityContext";
import Button from "@mui/material/Button";


function NewTab03({AddOpen, handleAddClose}) {
    const {
        setAddProId,
        setAddProName,
        setAddGate,
        setAddSslc,
        setAddRepeater,
        setAddPir,
        AddEMData,
    } = useContext(SecurityLightContext);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
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
                open={AddOpen}
                // onClose={handleAddClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    <Grid container spacing={3}>
                        <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                            <BsFillDeviceHddFill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                            장비관리 입력
                        </Typography>

                        <Grid item xs={12} sm={12}>
                            <label>프로파일 ID</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setAddProId(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>프로파일 명</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setAddProName(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>게이트웨이</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setAddGate(e.target.value)}
                                fullWidth
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <label>SSLC 수량</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setAddSslc(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>리피터수량</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setAddRepeater(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>최대감지</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setAddPir(e.target.value)}
                                placeholder="ex) 60초 0~255"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <br/>

                    <Button onClick={() => {
                        if (window.confirm('장비를 생성하시겠습니까?')) {
                            AddEMData();
                            handleAddClose();
                        }
                    }} variant="contained" fullWidth style={{marginTop: "0.5vh"}}
                    >
                        생성하기
                    </Button>

                    <Button onClick={() => {
                        handleAddClose();
                    }} variant="outlined" fullWidth style={{marginTop: "0.5vh"}}
                    >
                        목록으로
                    </Button>

                </Box>
            </Modal>
        </div>
    )
}

export default NewTab03;