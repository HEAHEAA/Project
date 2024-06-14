import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";


function Facility01() {
    return (
        <div style={{marginTop: "-4vh"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <h6 style={{textAlign: "left"}}>관리 명</h6>
                    <TextField
                        required
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <h6 style={{textAlign: "left"}}>주소</h6>
                    <TextField
                        required
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <h6 style={{textAlign: "left"}}>X 좌표</h6>
                    <TextField
                        required
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <h6 style={{textAlign: "left"}}>Y 좌표</h6>
                    <TextField
                        required
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>


            </Grid>

            <div className="fa-btn">
                <Button variant="contained" className="f-save" style={{marginRight: "0.5vh"}}>등록</Button>
                <Button variant="outlined" className="f-close">취소</Button>
            </div>
        </div>
    )
}

export default Facility01;