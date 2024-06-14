import {useContext} from "react";
import {CrossWalkContext} from "../../../../../ContextServer/CrossWalkContext";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EditMap from "../../../../Station/Facility/Map/EditMap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";

function CrossFacNew({open,handleClose}){
    const {
        CrossFacNewSubmit,
        AddCode, setAddCode,
        AddName, setAddName,
        AddCrossLng, AddCrossLat
    } = useContext(CrossWalkContext);

    //모달스타일
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

                <Box sx={{...style, width: 800}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        시설물 생성 입력
                    </Typography>
                    <br/>

                    <Grid container spacing={3}>
                        <label>경도위도 설정</label>
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
                                value={AddCrossLng}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>위도</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                value={AddCrossLat}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>시설물명</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                value={AddCode}
                                onChange={(e) => setAddCode(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>시설물 주소</label>
                            <TextField
                                type={"text"}
                                id="outlined-basic"
                                value={AddName}
                                onChange={(e) => setAddName(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                    </Grid>


                    <Button fullWidth variant="contained" sx={{marginTop: 2, height: '4vh'}} onClick={() => {
                        if (window.confirm('시설물을 추가하시겠습니까?')) {
                            CrossFacNewSubmit();
                            handleClose();
                        }
                    }}>
                        시설물생성
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
export default CrossFacNew;