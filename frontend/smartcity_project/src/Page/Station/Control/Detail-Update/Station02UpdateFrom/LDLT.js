import Typography from "@mui/material/Typography";
import * as React from "react";
import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {TextBlack} from "../../../../../Componet/style-config/light-theme";

function LDLT({handleClose}){
    const {
        dvcId,dvPostAPI,
        LdoprtStHm, setLdOprtStHm,
        LdoprtEdHm, setLdOprtEdHm,
        LdoprtStHm2, setLdOprtStHm2,
        LdoprtEdHm2, setLdOprtEdHm2,
        DvList,
    } = useContext(StationContext);

    const EditLDLT = async () => {
        const LDLT = {
            oprtStHm: LdoprtStHm,
            oprtEdHm: LdoprtEdHm,
            oprtStHm2: LdoprtStHm2,
            oprtEdHm2: LdoprtEdHm2,
        }
        await fetch(`nodeApi/devicesUpdate/${dvcId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(LDLT)
        }).then(res => res.json()).then(res => {
            setLdOprtStHm('');
            setLdOprtEdHm('');
            setLdOprtStHm2('');
            setLdOprtEdHm2('');
            dvPostAPI();
            alert('수정이 완료 되었습니다.')
        })
        DvList();
        dvPostAPI();
    }

    return(
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h6">
                LED 조명
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>(내부조명1)시작</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={LdoprtStHm}
                        onChange={(e) => setLdOprtStHm(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>(내부조명1)종료</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={LdoprtEdHm}
                        onChange={(e) => setLdOprtEdHm(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>(내부조명2)시작</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={LdoprtStHm2}
                        onChange={(e) => setLdOprtStHm2(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>(내부조명2)종료</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={LdoprtEdHm2}
                        onChange={(e) => setLdOprtEdHm2(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

            </Grid>
            <div className="station-pop-detail-foot">
                <Button onClick={() => {
                    if (window.confirm(`수정하시겠습니까?`)) {
                        EditLDLT();
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
export default LDLT;