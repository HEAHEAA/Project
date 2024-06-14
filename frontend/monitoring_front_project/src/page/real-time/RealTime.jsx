import {useContext, useEffect} from "react";
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {Grid, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {DashboardContext} from "../../context/dashboardContext.jsx";
import {RealTimeTable} from "../../section/real-time/RealTimeTable.jsx";
import {RealtimeContext} from "../../context/realtimeContext.jsx";
import {themes} from "../../theme/darkThme.jsx";


export const RealTime = () => {
    const {
        loginStart,setLoginStart,
        loginEnd,setLoginEnd,
        RealTimeDataByIdOnSubmit,
    } = useContext(RealtimeContext);

    const {
        allData,
        setSelectHour,
        selectHour,
        siteInfoData,
        loginLastInfoData,
    } = useContext(DashboardContext);


    useEffect(() => {
        siteInfoData();
        RealTimeDataByIdOnSubmit();
        loginLastInfoData();
    }, [selectHour,loginStart,loginEnd]);

    //10분에 한번씩 reload
    useEffect(() => {
        setInterval(() => {
            siteInfoData();
            RealTimeDataByIdOnSubmit();
            loginLastInfoData();
        }, 1000 * 60 * 5 );
    }, []);


    return (
        <div className="dashboard" style={themes.dashboard_bg}>
            <div className="inner-dash" style={themes.dashboard_inner}>
                <div className="real-time-layout" style={themes.real_layout_h1}>
                    <h1 style={themes.real_layout_h1}><MarkAsUnreadIcon/> 로그인 이력 조회 </h1>


                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={12}>
                            <div className="start-input">
                                <span>시작일</span>
                                <input
                                    type="date"
                                    style={themes.real_layout_input}
                                    value={loginStart}
                                    onChange={(e) => setLoginStart(e.target.value)}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <div className="end-input">
                                <span>종료일</span>
                                <input
                                    type="date"
                                    style={themes.real_layout_input}
                                    value={loginEnd}
                                    onChange={(e) => setLoginEnd(e.target.value)}
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
                                                <MenuItem value={arr.id} key={arr.id}>『 {arr.name} 』 &nbsp; {arr.site_info}</MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </FormControl>
                            </Box>
                        </Grid>

                    </Grid>

                    <RealTimeTable/>

                </div>
            </div>
        </div>
    )

}
