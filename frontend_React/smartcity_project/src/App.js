/* eslint-disable */

import './Scss/App.scss';
import './Scss/Media.scss';
import './Scss/FullHD.scss';
import SideMenu from "./Componet/SideBar/SideMenu";
import {Route, Routes} from "react-router-dom";
import StContent01 from "./Page/Station/Control/Detail-Address/St-Content01";
import StContent02 from "./Page/Station/Control/Detail-Address/St-Content02";
import StContent03 from "./Page/Station/Control/Detail-Address/St-Content03";
import CrContent01 from "./Page/CrossWork/Monitoring/Detail-Address/Cr-Content01";
import CrContent02 from "./Page/CrossWork/Monitoring/Detail-Address/Cr-Content02";
import SeContent02 from "./Page/SecurityLight/Monitoring/Detail-Address/Se-Content02";
import UsContent01 from "./Page/Users/Detail-Address/Us-Content01";
import UsContent02 from "./Page/Users/Detail-Address/Us-Content02";
import UsContent03 from "./Page/Users/Detail-Address/Us-Content03";
import KpContent01 from "./Page/KPI/chart/Detail-Address/Kp-Content01";
import KpContent02 from "./Page/KPI/chart/Detail-Address/Kp-Content02";
import KpContent03 from "./Page/KPI/chart/Detail-Address/Kp-Content03";
import Login from "./Page/Login/Login";
import PcCrossWalk from "./Page/CrossWork/Monitoring/PcCrossWalk";
import PcShade from "./Page/Shade/Monitoring/PcShade";
import PcUsers from "./Page/Users/PcUsers";
import PcKPI from "./Page/KPI/chart/PcKPI";
import {LoginProvider} from "./ContextServer/LoginContext";
import {StationProvider} from "./ContextServer/StationContext";
import PcSecurityLight from "./Page/SecurityLight/Monitoring/PcSecurityLight";
import {SurveyProvider} from "./ContextServer/SurveyContext";
import {SecurityProvider} from "./ContextServer/SecurityContext";
import SignUpMain from "./Page/Login/Signup/SignUpMain";
import {SignUpProvider} from "./ContextServer/SIgnUpContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CrossWalkProvider} from "./ContextServer/CrossWalkContext";
import PcStation from "./Page/Station/Control/PcStation";
import {ControlProvider} from "./ContextServer/ControlContext";
import {ShadeProvider} from "./ContextServer/ShadeContext";
import KPContent04 from "./Page/KPI/chart/Detail-Address/KP-Content04";
import {MenuProvider} from "./ContextServer/MenuContext";
import StContent00 from "./Page/Station/Control/Detail-Address/St-Content00";
import CrossWalkBigMap from "./Page/CrossWork/Monitoring/map/CrossWalkBigMap";
import PcSolarPanel from "./Page/SolarPanel/Monitoring/PcSolarPanel";
import {SolarProvider} from "./ContextServer/SolarPanelContext";
import SolarListDetail from "./Page/SolarPanel/Monitoring/Detail-Address/SolarListDetail";
import SolarBigMap from "./Page/SolarPanel/Monitoring/map/SolarBigMap";
import {FacilityProvider} from "./ContextServer/FacilityContext";
import PcStationStatus from "./Page/Station/Monitoring/DetailMonitor/PcStationStatus";
import StationChartDetail from "./Page/Station/Monitoring/DetailMonitor/DetailAddress/StationChartDetail";
import StationARCOARSSDetail from "./Page/Station/Monitoring/DetailMonitor/DetailAddress/StationARCOARSSDetail";
import StationOtherDetail from "./Page/Station/Monitoring/DetailMonitor/DetailAddress/StationOtherDetail";
import IntegrationNotistack from "./Page/Station/Monitoring/DetailMonitor/Map/StationStatusDetailMap";
import ModalDetailMap from "./Page/SecurityLight/Monitoring/Map/ModalDetailMap";
import {KpiProvider} from "./ContextServer/KpiContext";
import {UserProvider} from "./ContextServer/UserContext";
import PCStationFacility from "./Page/Station/Facility/PCStationFacility";
import PCStationRecord from "./Page/Station/Record/PCStationRecord";
import PCStationDID from "./Page/Station/DID/PCStationDID";
import ShContent01 from "./Page/Shade/Monitoring/Detail-Address/Sh-Content01";
import ShadeBigMap from "./Page/Shade/Monitoring/map/ShadeBigMap";
import PCCrossWorkFacility from "./Page/CrossWork/Facility/PCCrossWorkFacility";
import PCShadeFaility from "./Page/Shade/Facility/PCShadeFaility";
import SecurityLightFacility from "./Page/SecurityLight/Facility/SecurityLightFacility";
import PCSolarPanelFacility from "./Page/SolarPanel/Facility/PCSolarPanelFacility";
import StationfacAllListDetail from "./Page/Station/Facility/FacDetail-Address/StationfacAllListDetail";
import StationFacUpdateListDetail from "./Page/Station/Facility/FacDetail-Address/StationFacUpdateListDetail";
import CrossFacAllListDetail from "./Page/CrossWork/Facility/FacDetail-Address/CrossFacAllListDetail";
import CrossFacUpdateDetail from "./Page/CrossWork/Facility/FacDetail-Address/CrossFacUpdateDetail";
import ShadeFacAllListDetail from "./Page/Shade/Facility/FacDetail-Address/ShadeFacAllListDetail";
import ShadeFacUpdateListDetail from "./Page/Shade/Facility/FacDetail-Address/ShadeFacUpdateListDetail";
import SecurityFacAllListDetail from "./Page/SecurityLight/Facility/FacDetail-Address/SecurityFacAllListDetail";
import SecurityFacUpdateListDetail from "./Page/SecurityLight/Facility/FacDetail-Address/SecurityFacUpdateListDetail";
import SolarFacAllListDetail from "./Page/SolarPanel/Facility/Detail-Address/SolarFacAllListDetail";
import SolarFacUpdateListDetail from "./Page/SolarPanel/Facility/Detail-Address/SolarFacUpdateListDetail";
import ReContent01 from "./Page/Station/Record/Detail-Address/Re-Content01";
import ReContent02 from "./Page/Station/Record/Detail-Address/Re-Content02";
import ReContent03 from "./Page/Station/Record/Detail-Address/Re-Content03";
import CoContent01 from "./Page/Station/DID/Detail-Address/Co-Content01";
import CoContent06 from "./Page/Station/DID/Detail-Address/Co-Content06";
import {SurveysProvider} from "./ContextServer/SurveysContext";
import UserSurveyDetailPage from "./Page/Station/Survey/UsersMode/UserSurveyDetailPage";
import UserSurveyPage from "./Page/Station/Survey/UsersMode/UserSurveyPage";
import NewSurveyPage from "./Page/Station/Survey/New/NewSurveyPage";
import QuestAdd from "./Page/Station/Survey/New/Add/QuestAdd";
import QuestEdit from "./Page/Station/Survey/New/Edit/QuestEdit";
import NotFoundPage from "./Page/404/NotFoundPage";
import PcCrossTotal from "./Page/CrossWork/Total/PcCrossTotal";
import CrossPersonDetail from "./Page/CrossWork/Total/Detail-Address/CrossPersonDetail";
import CrossCarDetail from "./Page/CrossWork/Total/Detail-Address/CrossCarDetail";
import CrossTotalListDetail from "./Page/CrossWork/Total/Detail-Address/CrossTotalListDetail";
import AllMonitorTime from "./Page/Station/Monitoring/AllMonitor/AllMonitorTime";
import FirstPage from "./Page/FirstPage";
import PcKPIManage from "./Page/KPI/manage/PcKPIManage";


function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'light',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });


    let week = ['일','월','화','수','목','금','토'];
    let date = ['2024-01-30','2024-02-01','2024-02-02','2024-02-03','2024-01-30','2024-01-30'];
    let chartDate = [];
    for(let i = 0; i<date.length; i++){
        chartDate.push(week[new Date(date[i]).getDay()])
    }



    let today = new Date('2024-01-30').getDay();
    let todayLabel=week[today];





    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <LoginProvider> {/*로그인*/}
                    <SignUpProvider> {/*회원가입*/}
                        <SurveyProvider> {/*설문조사*/}
                            <StationProvider> {/*스마트정류장*/}
                                <SecurityProvider> {/*스마트보안등*/}
                                    <CrossWalkProvider> {/*스마트 횡단보도*/}
                                        <ControlProvider> {/*DID 관리*/}
                                            <ShadeProvider> {/*스마트그늘막*/}
                                                <SolarProvider>{/*스마트 태양열*/}
                                                    <FacilityProvider>{/*시설물관리*/}
                                                        <SurveysProvider>
                                                            <KpiProvider>
                                                                <UserProvider>
                                                                    <MenuProvider>
                                                                        <SideMenu/>
                                                                        <Routes>
                                                                            <Route path="/" element={<Login/>}/>
                                                                            <Route path="/signup" element={<SignUpMain/>}/>

                                                                            <Route path="/main" element={<FirstPage/>}/>


                                                                            {/* 스마트 정류장 모니터링*/}
                                                                            <Route path="/station/status"
                                                                                   element={<PcStationStatus/>}/>
                                                                            <Route path="/station/status/1"
                                                                                   element={<StationChartDetail/>}/>
                                                                            <Route path="/station/status/2"
                                                                                   element={<StationARCOARSSDetail/>}/>
                                                                            <Route path="/station/status/3"
                                                                                   element={<StationOtherDetail/>}/>
                                                                            <Route path="/station/status/map"
                                                                                   element={<IntegrationNotistack/>}/>

                                                                            {/* 스마트 정류장 전체 모니터링*/}
                                                                            <Route path="/station/all/monitor"
                                                                                   element={<AllMonitorTime/>}/>

                                                                            {/* 스마트 정류장 제어관리*/}
                                                                            <Route path="/station" element={<PcStation/>}/>
                                                                            <Route path="/station/0"
                                                                                   element={<StContent00/>}/>
                                                                            <Route path="/station/1"
                                                                                   element={<StContent01/>}/>
                                                                            <Route path="/station/2"
                                                                                   element={<StContent02/>}/>
                                                                            <Route path="/station/3"
                                                                                   element={<StContent03/>}/>


                                                                            {/* 스마트 정류장 시설물관리*/}
                                                                            <Route path="/station/facility"
                                                                                   element={<PCStationFacility/>}/>
                                                                            <Route path="/station/facility/1"
                                                                                   element={<StationfacAllListDetail/>}/>
                                                                            <Route path="/station/facility/2"
                                                                                   element={<StationFacUpdateListDetail/>}/>

                                                                            {/* 스마트 정류장 시설물이력*/}
                                                                            <Route path="/station/record"
                                                                                   element={<PCStationRecord/>}/>
                                                                            <Route path="/record/1"
                                                                                   element={<ReContent01/>}/>
                                                                            <Route path="/record/2"
                                                                                   element={<ReContent02/>}/>
                                                                            <Route path="/record/3"
                                                                                   element={<ReContent03/>}/>


                                                                            {/* 스마트 정류장 DID*/}
                                                                            <Route path="/station/did" element={<PCStationDID/>}/>
                                                                            <Route path="/control/1" element={<CoContent01/>}/>
                                                                            <Route path="/control/2" element={<CoContent06/>}/>


                                                                            {/* 스마트 정류장 설문조사 New 버전*/}
                                                                            <Route path="/station/survey" element={<NewSurveyPage/>}/>
                                                                            <Route path="/survey/post" element={<QuestAdd/>}/>
                                                                            <Route path="/survey/put/:seqno" element={<QuestEdit/>}/>
                                                                            {/* 스마트 정류장 설문조사(유저) */}
                                                                            <Route path="/survey/user/home" element={<UserSurveyPage/>}/>
                                                                            <Route path="/survey/user/home/detail" element={<UserSurveyDetailPage/>}/>


                                                                            {/* 스마트 횡단보도 모니터링 */}
                                                                            <Route path="/crosswalk/map"
                                                                                   element={<CrossWalkBigMap/>}/>

                                                                            {/* 스마트 횡단보도 모니터링 조회 */}
                                                                            <Route path="/crosswalk"
                                                                                   element={<PcCrossWalk/>}/>
                                                                            <Route path="/crosswalk/1"
                                                                                   element={<CrContent01/>}/>
                                                                            <Route path="/crosswalk/2"
                                                                                   element={<CrContent02/>}/>

                                                                            {/* 스마트 횡단보도 통계 조회 */}
                                                                            <Route path="/crosswalk/total" element={<PcCrossTotal/>}/>
                                                                            <Route path="/crosswalk/total/1" element={<CrossTotalListDetail/>}/>
                                                                            <Route path="/crosswalk/total/2" element={<CrossPersonDetail/>}/>
                                                                            <Route path="/crosswalk/total/3" element={<CrossCarDetail/>}/>




                                                                            {/* 스마트 횡단보도 시설물관리 */}
                                                                            <Route path="/crosswalk/facility"
                                                                                   element={<PCCrossWorkFacility/>}/>
                                                                            <Route path="/crosswalk/facility/1"
                                                                                   element={<CrossFacAllListDetail/>}/>
                                                                            <Route path="/crosswalk/facility/2"
                                                                                   element={<CrossFacUpdateDetail/>}/>


                                                                            {/* 스마트 그늘막 모니터링*/}
                                                                            <Route path="/smart_shade"
                                                                                   element={<PcShade/>}/>
                                                                            <Route path="/smart_shade/1"
                                                                                   element={<ShContent01/>}/>
                                                                            <Route path="/smart_shade/2"
                                                                                   element={<ShadeBigMap/>}/>



                                                                            {/* 스마트 그늘막 시설물관리*/}
                                                                            <Route path="/smart_shade/facility"
                                                                                   element={<PCShadeFaility/>}/>
                                                                            <Route path="/smart_shade/facility/1"
                                                                                   element={<ShadeFacAllListDetail/>}/>
                                                                            <Route path="/smart_shade/facility/2"
                                                                                   element={<ShadeFacUpdateListDetail/>}/>


                                                                            {/* 스마트 보안등 모니터링*/}
                                                                            <Route path="/securityLight"
                                                                                   element={<PcSecurityLight/>}/>
                                                                            <Route path="/securityLight/sub1"
                                                                                   element={<ModalDetailMap/>}/>
                                                                            <Route path="/securityLight/sub2"
                                                                                   element={<SeContent02/>}/>
                                                                            {/* 스마트 보안등 시설물관리*/}
                                                                            <Route path="/securityLight/facility"
                                                                                   element={<SecurityLightFacility/>}/>
                                                                            <Route path="/securityLight/facility/1"
                                                                                   element={<SecurityFacAllListDetail/>}/>
                                                                            <Route path="/securityLight/facility/2"
                                                                                   element={
                                                                                       <SecurityFacUpdateListDetail/>}/>


                                                                            {/*스마트 태양열지도 모니터링*/}
                                                                            <Route path="/solarPanel"
                                                                                   element={<PcSolarPanel/>}/>
                                                                            <Route path="/solarPanel/1"
                                                                                   element={<SolarListDetail/>}/>
                                                                            <Route path="/solarPanel/2"
                                                                                   element={<SolarBigMap/>}/>
                                                                            {/*스마트 태양열지도 시설물관리*/}
                                                                            <Route path="/solarPanel/facility"
                                                                                   element={<PCSolarPanelFacility/>}/>
                                                                            <Route path="/solarPanel/facility/1"
                                                                                   element={<SolarFacAllListDetail/>}/>
                                                                            <Route path="/solarPanel/facility/2"
                                                                                   element={<SolarFacUpdateListDetail/>}/>


                                                                            {/* 사용자 관리*/}
                                                                            <Route path="/users" element={<PcUsers/>}/>
                                                                            <Route path="/users/sub/1"
                                                                                   element={<UsContent01/>}/>
                                                                            <Route path="/users/sub/2"
                                                                                   element={<UsContent02/>}/>
                                                                            <Route path="/users/sub/3"
                                                                                   element={<UsContent03/>}/>


                                                                            {/*  kpi */}
                                                                            <Route path="/kpi" element={<PcKPI/>}/>
                                                                            <Route path="/kpi/1" element={<KpContent01/>}/>
                                                                            <Route path="/kpi/2" element={<KpContent02/>}/>
                                                                            <Route path="/kpi/3" element={<KpContent03/>}/>
                                                                            <Route path="/kpi/4" element={<KPContent04/>}/>


                                                                            <Route path="/kpi/manage" element={<PcKPIManage/>}/>
                                                                            <Route path="/kpi/manage/1" element={<PcKPIManage/>}/>
                                                                            <Route path="/kpi/manage/2" element={<PcKPIManage/>}/>


                                                                            <Route path="/*" element={<NotFoundPage/>}/>
                                                                        </Routes>
                                                                    </MenuProvider>
                                                                </UserProvider>
                                                            </KpiProvider>
                                                        </SurveysProvider>
                                                    </FacilityProvider>
                                                </SolarProvider>
                                            </ShadeProvider>
                                        </ControlProvider>
                                    </CrossWalkProvider>
                                </SecurityProvider>
                            </StationProvider>
                        </SurveyProvider>
                    </SignUpProvider>
                </LoginProvider>
            </ThemeProvider>

        </div>
    )
}

export default App;
