import {useContext, useState} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {TextBlack} from "../../../../../Componet/style-config/light-theme";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Select} from "@mui/material";
import {LoginContext} from "../../../../../ContextServer/LoginContext";

function ARCO({handleClose}) {
    const {access, RefreshToken, role} = useContext(LoginContext);
    const {
        dvcId, oprt, setOprt,
        oprtMode, setOprtMode,
        windSts, setWindSts,
        coolTemp, setCoolTemp,
        heatTemp, setHeatTemp,
        autoTemp, setAutoTemp,
        coolSTMd, setCoolStMd,
        coolEdMd, setCoolEdMd,
        oprtStHm, setOprtStHm,
        oprtEdHm, setOprtEdHm,
        winBtn, setWinBtn,
        dvPostAPI, DvList,
    } = useContext(StationContext);




    const EditARCO = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        const ARCO = {
            oprt: oprt,
            oprtMode: oprtMode,
            windSts: windSts,
            coolTemp: coolTemp,
            heatTemp: heatTemp,
            coolStMd: coolSTMd,
            coolEdMd: coolEdMd,
            oprtStHm: oprtStHm,
            oprtEdHm: oprtEdHm,
            dfrst: winBtn === 1 ? true : false,
        }
        await fetch(`/nodeApi/devicesUpdate/${dvcId}`, {
        // await fetch(`api/devices/${dvcId}/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ARCO)
        }).then(res => res.json()).then(res => {
            setOprt('');
            setOprtMode('');
            setWindSts('')
            setCoolTemp(0);
            setHeatTemp(0);
            setAutoTemp(0);
            setCoolStMd('');
            setCoolEdMd('');
            setOprtStHm('');
            setOprtEdHm('');
            dvPostAPI();
            setWinBtn(0);
            alert('수정이 완료 되었습니다.')
        })
        DvList();
        dvPostAPI();
    }







    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>전원여부</p>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={oprt} onChange={(e) => setOprt(e.target.value)}
                            style={TextBlack}
                        >
                            <MenuItem value="1">ON</MenuItem>
                            <MenuItem value="0">OFF</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>운전모드</p>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={oprtMode} onChange={(e) => setOprtMode(e.target.value)}
                            style={TextBlack}
                        >
                            <MenuItem value="0">냉방</MenuItem>
                            <MenuItem value="1">제습</MenuItem>
                            <MenuItem value="2">송풍</MenuItem>
                            <MenuItem value="3">자동</MenuItem>
                            <MenuItem value="4">난방</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <span style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>바람세기</span>

                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={windSts} onChange={(e) => setWindSts(e.target.value)}
                            style={TextBlack}
                        >
                            <MenuItem value="1">약</MenuItem>
                            <MenuItem value="2">중</MenuItem>
                            <MenuItem value="3">강</MenuItem>
                            <MenuItem value="4">자동</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <span style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>제상모드</span>

                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={winBtn}
                            onChange={(e) => setWinBtn(e.target.value)}
                            style={TextBlack}
                        >
                            <MenuItem value={0}>수동</MenuItem>
                            <MenuItem value={1}>자동</MenuItem>
                        </Select>
                    </FormControl>

                </Grid>


                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>냉방온도</p>
                    <TextField
                        value={coolTemp}
                        onChange={(e) => setCoolTemp(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>난방온도</p>
                    <TextField
                        required
                        value={heatTemp}
                        onChange={(e) => setHeatTemp(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>하절기(시작)</p>
                    <TextField
                        label="ex) 01월01일 -> 0101"
                        value={coolSTMd}
                        onChange={(e) => setCoolStMd(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>하절기(종료)</p>
                    <TextField
                        required
                        label="ex) 01월01일 -> 0101"
                        value={coolEdMd}
                        onChange={(e) => setCoolEdMd(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>운영시작</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={oprtStHm}
                        onChange={(e) => setOprtStHm(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>운전종료</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={oprtEdHm}
                        onChange={(e) => setOprtEdHm(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>


            </Grid>

            <div className="station-pop-detail-foot">
                <Button onClick={() => {
                    if (window.confirm(`수정하시겠습니까?`)) {
                        EditARCO();
                        handleClose();
                        DvList();
                    }
                }} variant="contained">저장</Button>

                <Button variant="outlined" onClick={() => {
                    handleClose();
                }}>취소</Button>
            </div>
        </div>
    )
}

export default ARCO;