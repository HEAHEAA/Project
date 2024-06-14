import Grid from "@mui/material/Grid";
import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {TextBlack} from "../../../../../Componet/style-config/light-theme";

function PPCT({handleClose}) {
    const {PPin, PPout, PPTdyIn, PPTdyOut,} = useContext(StationContext);
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>입실수</p>
                    <TextField
                        value={PPin}
                        fullWidth
                        variant="standard"
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>퇴실수</p>
                    <TextField
                        value={PPout}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>금일 입실수</p>
                    <TextField
                        value={PPTdyIn}
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{color: TextBlack.color, textAlign: "left", marginBottom: "1vh"}}>금일 퇴실수</p>
                    <TextField
                        value={PPTdyOut}
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

export default PPCT;