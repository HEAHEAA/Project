import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";
import * as React from "react";
import EditMap from "../../Map/EditMap";
import {IoMdClose} from "react-icons/io";

function StationFacUpdate({open, handleClose}) {
    const {StationUpdateSubmit, code, setCode, name, setName, lng, lat, StationFacDelete} = useContext(StationContext);

    //모달스타일
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "black",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={{...style, width: 800}}>
                    <div style={{width: "100%", height: "-2vh"}}>
                        <IoMdClose style={{float: "right", marginRight: "1vh", color: "white", fontSize: 18}} onClick={()=>{
                            handleClose();
                        }}/>
                    </div>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        시설물 생성 입력
                    </Typography>
                    <br/>

                    <Grid container spacing={3}>

                        <label style={{paddingLeft: "2vh"}}>경도위도 설정</label>
                        <Grid item xs={12} sm={12}>
                            <div style={{width: "100%", height: "35vh", marginTop: "0vh", overflow: "auto"}}>
                                <EditMap/>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>경도</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                value={lng}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>위도</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                value={lat}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>시설물명</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>시설물 주소</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>


                    <Button fullWidth variant="contained" sx={{marginTop: 2, height: '4vh', marginBottom: 1}}
                            onClick={() => {
                                if (window.confirm('시설물을 수정하시겠습니까?')) {
                                    StationUpdateSubmit();
                                    handleClose();
                                }
                            }}>
                        시설물수정
                    </Button>

                    <Button variant="outlined" color="error" fullWidth onClick={() => {
                        if (window.confirm('정말 삭제하시겠습니까?')) {
                            StationFacDelete();
                            handleClose();
                        }
                    }}>
                        삭제하기
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export default StationFacUpdate;