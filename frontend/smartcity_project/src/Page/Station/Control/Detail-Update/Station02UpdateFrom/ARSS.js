import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {TextBlack} from "../../../../../Componet/style-config/light-theme";

function ARSS({handleClose}) {
    const {temp, hmdt, fineDust, ufineDust, co2, vocs,} = useContext(StationContext);

    return (
        <div>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>온도(℃)</p>
                    <TextField
                        value={temp + "℃"}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>습도(%)</p>
                    <TextField
                        value={hmdt + "%"}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>미세먼지</p>
                    <TextField
                        value={fineDust}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>초미세먼지</p>
                    <TextField
                        value={ufineDust}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>이산화탄소</p>
                    <TextField
                        value={co2}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>VOCs 휘발성유기화합물</p>
                    <TextField
                        value={vocs}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

            </Grid>

            <div className="station-pop-detail-foot">
                <Button variant="contained" fullWidth onClick={() => {
                    handleClose();
                }}>닫기</Button>
            </div>
        </div>
    )
}

export default ARSS;