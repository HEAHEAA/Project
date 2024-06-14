import Typography from "@mui/material/Typography";
import * as React from "react";
import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {TextBlack} from "../../../../../Componet/style-config/light-theme";

function HTBC({handleClose}) {
    const {
        dvcId, dvPostAPI,
        HtStMd, setHtStMd,
        HtEdMd, setHtEdMd,
        HtStHm, setHtStHm,
        HtEdHm, setHtEdHm,
        DvList,
    } = useContext(StationContext);

    const EditUVCD = async () => {
        const HTBC = {
            oprtStMd: HtStMd,
            oprtEdMd: HtEdMd,
            oprtStHm: HtStHm,
            oprtEdHm: HtEdHm,
        }
        await fetch(`nodeApi/devicesUpdate/${dvcId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(HTBC)
        }).then(res => res.json()).then(res => {
            setHtStMd('');
            setHtEdMd('');
            setHtStHm('');
            setHtEdHm('');
            dvPostAPI();
            alert('수정이 완료 되었습니다.')
        })
        DvList();
        dvPostAPI();
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h6">
                온열벤치
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>시작일</p>
                    <TextField
                        required
                        label="12월01일 -> 1201"
                        value={HtStMd}
                        onChange={(e) => setHtStMd(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>운영종료</p>
                    <TextField
                        required
                        label="12월01일 -> 1201"
                        value={HtEdMd}
                        onChange={(e) => setHtEdMd(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>시작시간</p>
                    <TextField
                        required
                        value={HtStHm}
                        label="ex) 12:00 -> 1200"
                        onChange={(e) => setHtStHm(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>종료시간</p>
                    <TextField
                        required
                        value={HtEdHm}
                        label="ex) 12:00 -> 1200"
                        onChange={(e) => setHtEdHm(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <div className="station-pop-detail-foot">
                <Button onClick={() => {
                    if (window.confirm(`수정하시겠습니까?`)) {
                        EditUVCD();
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

export default HTBC;