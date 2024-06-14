import SecurityUpdateWarningIcon from '@mui/icons-material/SecurityUpdateWarning';
import {ErrInfoTable} from "../../section/errInfo-edit/ErrInfoTable.jsx";
import {useContext, useEffect} from "react";
import {Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {DashboardContext} from "../../context/dashboardContext.jsx";
import {ErrInfoContext} from "../../context/errInfoContext.jsx";
import {themes} from "../../theme/darkThme.jsx";


export const ErrInfoEdit = () => {
    const {
        ErrInfoByDateOnSubmit,
        errStart, setErrStart,
        errEnd, setErrEnd,
    } = useContext(ErrInfoContext);
    const {
        allData,
        setSelectHour,
        selectHour,
    } = useContext(DashboardContext);


    useEffect(() => {
        ErrInfoByDateOnSubmit();
    }, [selectHour,errStart,errEnd]);

    //10분에 한번씩 reload
    useEffect(() => {
        setInterval(() => {
            ErrInfoByDateOnSubmit();
        }, 1000 * 60 * 5 );
    }, []);


    return(
        <div className="dashboard" style={themes.dashboard_bg}>
            <div className="inner-dash" style={themes.dashboard_inner}>
                <div className="real-time-layout" style={themes.real_layout_h1}>
                    <h1 style={themes.real_layout_h1}><SecurityUpdateWarningIcon/> 에러 이력 관리 </h1>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12}>
                            <div className="start-input">
                                <span>시작일</span>
                                <input
                                    type="date"
                                    style={themes.real_layout_input}
                                    value={errStart}
                                    onChange={(e) => setErrStart(e.target.value)}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <div className="end-input">
                                <span>종료일</span>
                                <input
                                    type="date"
                                    style={themes.real_layout_input}
                                    value={errEnd}
                                    onChange={(e) => setErrEnd(e.target.value)}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Box sx={{minWidth: 240}}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        defaultValue="EUR"
                                        value={selectHour}
                                        onChange={(e) => setSelectHour(e.target.value)}
                                        SelectProps={{MenuProps: {sx: {maxHeight: 500}}}} // add this line
                                    >
                                        <MenuItem value={0}>전체 모니터링</MenuItem>
                                        {
                                            allData.map((arr) => (
                                                <MenuItem value={arr.id}>『 {arr.name} 』 &nbsp; {arr.site_info}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </FormControl>
                            </Box>
                        </Grid>

                    </Grid>

                    <ErrInfoTable/>

                </div>
            </div>
        </div>
    )
}
