import {createTheme, ThemeProvider} from "@mui/material/styles";
import {MenuItem, Modal, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import {useContext} from "react";
import {FacilityContext} from "../../../../ContextServer/FacilityContext";
import TextField from "@mui/material/TextField";
import ModalMap from "../../../../Page/SecurityLight/Monitoring/Map/ModalMap";
import SolarMap from "../../../../Page/SolarPanel/Monitoring/map/SolarMap";
import CrossWalkMap from "../../../../Page/CrossWork/Monitoring/map/CrossWalkMap";
import Button from "@mui/material/Button";

function Fac02New({open, handleClose}) {
    const {
        AddCode, setAddCode,
        AddName, setAddName,
        AddLng, setAddLan,
        AddLat, setAddLat,
        AddCate, setAddCate,
        selectNum,
        AddFlData,
    } = useContext(FacilityContext)


    const onSelect = (e) => {
        e.preventDefault();
        setAddCate(e.target.value);
    }

    //테마 다크모드
    const defaultTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    //모달스타일
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 1000,
        overflow: "auto",
        bgcolor: 'background.paper',
        color: "white",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
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

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <label>카테고리 선택</label>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={AddCate}
                                        onChange={(e) => onSelect(e)}
                                    >
                                        <MenuItem value={1}>스마트 보안등</MenuItem>
                                        <MenuItem value={2}>스마트 태양열지도</MenuItem>
                                        <MenuItem value={3}>스마트 버스정류장</MenuItem>
                                        <MenuItem value={4}>스마트 횡단보도</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <label>시설물명</label>
                                <TextField
                                    type={"text"}
                                    id="outlined-basic"
                                    variant="outlined"
                                    onChange={(e) => setAddCode(e.target.value)}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <label>시설물 주소</label>
                                <TextField
                                    type={"text"}
                                    id="outlined-basic"
                                    variant="outlined"
                                    onChange={(e) => setAddName(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label>경도</label>
                                <TextField
                                    type={"text"}
                                    id="outlined-basic"
                                    variant="outlined"
                                    value={AddLng}
                                    onChange={(e) => setAddLan(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label>위도</label>
                                <TextField
                                    type={"text"}
                                    id="outlined-basic"
                                    variant="outlined"
                                    value={AddLat}
                                    onChange={(e) => setAddLat(e.target.value)}
                                    fullWidth
                                />
                            </Grid>

                        </Grid>

                        <div style={{width: "100%", height: "40vh", marginTop: "4vh", overflow: "auto"}}>
                            <label>경도위도 설정</label>

                            {
                                AddCate === 1 ? <ModalMap/> : null
                            }
                            {
                                AddCate === 2 ? <SolarMap/> : null
                            }
                            {
                                AddCate === 4 ? <CrossWalkMap/> : null
                            }
                        </div>

                        <Button onClick={() => {
                            if (window.confirm('시설물 생성하시겠습니까?')) {
                                AddFlData();
                                handleClose();
                                alert('생성이 완료 되었습니다.')
                            }
                        }} fullWidth variant="contained" sx={{
                            marginTop: 2, height: '4vh'
                        }}>시설물생성</Button>

                    </Box>
                </Modal>
            </ThemeProvider>
        </div>
    )
}

export default Fac02New;