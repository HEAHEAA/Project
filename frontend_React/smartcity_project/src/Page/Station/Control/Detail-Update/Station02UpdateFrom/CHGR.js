import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {TextBlack} from "../../../../../Componet/style-config/light-theme";

function CHGR({handleClose}){
    const {dvcId, ChOprtSt, setChOprtSt, ChOprtEd, setChOprtEd, dvPostAPI, DvList,} = useContext(StationContext);

    const EditCHGR = async () => {
        const CHGR = {
            oprtStHm: ChOprtSt,
            oprtEdHm: ChOprtEd,
        }
        await fetch(`nodeApi/devicesUpdate/${dvcId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(CHGR)
        }).then(res => res.json()).then(res => {
            setChOprtSt('');
            setChOprtEd('');
            dvPostAPI();
            alert('수정이 완료 되었습니다.')
        })
        DvList();
        dvPostAPI();
    }


    return(
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h6">
                충전기
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>운영시작</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={ChOprtSt}
                        onChange={(e) => setChOprtSt(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left"}}>운영종료</p>
                    <TextField
                        required
                        label="12:00 -> 1200"
                        value={ChOprtEd}
                        onChange={(e) => setChOprtEd(e.target.value)}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
            <div className="station-pop-detail-foot">
                <Button onClick={() => {
                    if (window.confirm(`수정하시겠습니까?`)) {
                        EditCHGR();
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
export default CHGR;