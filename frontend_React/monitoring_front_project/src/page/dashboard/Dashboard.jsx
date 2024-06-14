import {useContext, useEffect} from "react";
import {DashboardContext} from "../../context/dashboardContext.jsx";
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {LayoutData} from "../../context/layout_hook/UseLayout.jsx";
import {themes} from "../../theme/darkThme.jsx";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MapInfo from "../../section/dashboard/MapInfo.jsx";
import {Select} from "@mui/material";
import Button from "@mui/material/Button";
import PageviewTwoToneIcon from "@mui/icons-material/PageviewTwoTone";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import WarningIcon from '@mui/icons-material/Warning';
import {DashTable} from "../../section/dashboard/DashTable.jsx";
import {DashHourChart} from "../../section/dashboard/DashHourChart.jsx";
import {DashPercentChart} from "../../section/dashboard/DashPercentChart.jsx";
import {DashErrorTable} from "../../section/dashboard/DashErrorTable.jsx";
import EditNotificationsTwoToneIcon from '@mui/icons-material/EditNotificationsTwoTone';
import TopicTwoToneIcon from '@mui/icons-material/TopicTwoTone';
import {useNavigate} from "react-router-dom";
import {RealtimeContext} from "../../context/realtimeContext.jsx";


const ResponsiveGridLayout = WidthProvider(Responsive);

export const Dashboard = () => {
    const navigate = useNavigate();
    const {
        siteState,
        setSiteState,
        allData,
        successData,
        failData,
        AvgTodayDataOnsubmit,
        siteInfoData,
        loginLastInfoData,
        dragOpen,
        layout,
        setLayout,
        handleLayoutChange,
    } = useContext(DashboardContext);
    const {realTimeModal, handleRealTimeOpen} = useContext(RealtimeContext);

    useEffect(() => {
        const now = new Date();
        const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
        const koreaTimeDiff = 9 * 120 * 60 * 1000;
        const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
        const update = koreaNow.replaceAll('T', ' ');
        const Nows = update.replaceAll('Z', ' ').substring(0, 10);

        localStorage.setItem("today", Nows);
        siteInfoData();
        AvgTodayDataOnsubmit();
        loginLastInfoData();
    }, [dragOpen]);

    useEffect(() => {
        setInterval(() => {
            location.reload();
        }, 1000 * 60 * 5);
    }, []);

    const {isLoading: layoutLoading, data: layoutList, isError: layoutError} = LayoutData();

    useEffect(() => {
        if (layoutList && layoutList.data && layoutList.data.data) {
            const newLayout = layoutList.data.data.map(item => ({
                i: item.i,
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
                isDraggable: dragOpen,
                isResizable: dragOpen
            }));
            setLayout(newLayout);
        } else {
            setLayout([]);
        }
    }, [layoutList, dragOpen]);


    if (layoutLoading) return <div>잠시만 기다려주세요.</div>
    if (layoutError) return <div>에러가 발생 되었습니다.</div>

    return (
        <div className="dashboard" style={themes.dashboard_bg}>
            <div className="inner-dash" style={themes.dashboard_inner}>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={{lg: layout}}
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                    rowHeight={30}
                    onLayoutChange={handleLayoutChange}
                >
                    <div key={"a"} className="dash-map">
                        <header style={themes.map_header}>
                            <section style={{color: themes.color}}>&nbsp;&nbsp;전체 <strong>{allData.length}</strong></section>
                            <section style={{color: themes.color}}>&nbsp;&nbsp;활성화 <strong>{successData.length}</strong></section>
                            <section style={{color: themes.color}}>&nbsp;&nbsp;비활성화 <strong>{failData.length}</strong></section>

                            <section>
                                <Box sx={{minWidth: '100%'}}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={siteState}
                                            onChange={(e) => setSiteState(e.target.value)}
                                        >
                                            <MenuItem value={0}>전체</MenuItem>
                                            <MenuItem value={1}>활성화</MenuItem>
                                            <MenuItem value={2}>비활성화</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </section>
                        </header>
                        <MapInfo/>

                    </div>
                    <div key={"b"} className="dash-list" style={themes.dash_chart_bg}>
                        <header style={themes.map_header}>
                            <section style={{color: themes.color}}><AccessTimeFilledIcon
                                sx={{fontSize: 25,}}/>&nbsp; 실시간 데이터
                            </section>
                            <section style={{color: themes.color}} onClick={() => {
                                navigate('/realtime');
                            }}>
                                이력 조회 <TopicTwoToneIcon/>
                            </section>
                            <div className="realtime-btn-realtable">
                                <Button variant="contained" color={"warning"}
                                        onClick={() => {
                                            handleRealTimeOpen();
                                        }}>
                                    실시간 데이터 확인 &ensp;<PageviewTwoToneIcon/>
                                </Button>
                            </div>
                        </header>
                        <DashTable/>
                    </div>

                    <div key={"c"} className="now-chart" style={themes.dash_chart_bg}>
                        <header style={themes.map_header}>
                            <section style={{color: themes.color}}><LeaderboardIcon
                                sx={{fontSize: 25, color: '#14af98'}}/>&nbsp; 시간 별 차트
                            </section>
                        </header>
                        <DashHourChart/>
                    </div>


                    <div key={"d"} className="time-chart" style={themes.dash_chart_bg}>
                        <header style={themes.map_header}>
                            <section style={{color: themes.color}}>
                                <DataSaverOffIcon sx={{fontSize: 25, color: '#14af98'}}/>&nbsp; 확률 데이터 &ensp;
                                <small>{allData[0]?.time.slice(0, 16)} 기준</small>
                            </section>
                        </header>
                        <DashPercentChart/>
                    </div>


                    <div key={"e"} className="error-list" style={themes.dash_chart_bg}>
                        <header style={themes.map_header}>
                            <section style={{color: themes.color}}><WarningIcon
                                sx={{fontSize: 25, color: '#ff883a'}}/>&nbsp; 실시간 에러발생 &ensp;
                                {/*<small>{allData[0]?.time.slice(0, 16)} 기준</small>*/}
                            </section>
                            <section style={{color: themes.color}} onClick={() => {
                                navigate('/errinfo/edit')
                            }}>
                                시간별 에러조회 <EditNotificationsTwoToneIcon/>
                            </section>
                        </header>
                        <DashErrorTable/>
                    </div>

                </ResponsiveGridLayout>
            </div>
        </div>
    );
}
