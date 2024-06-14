import {useContext, useEffect} from "react";
import {MenuContext} from "../ContextServer/MenuContext";
import PcCrossWalk from "./CrossWork/Monitoring/PcCrossWalk";
import StationStatusDetailMap from "./Station/Monitoring/DetailMonitor/Map/StationStatusDetailMap";
import PCShadeFaility from "./Shade/Facility/PCShadeFaility";
import PcSecurityLight from "./SecurityLight/Monitoring/PcSecurityLight";
import PcSolarPanel from "./SolarPanel/Monitoring/PcSolarPanel";
import PcKPI from "./KPI/chart/PcKPI";
import PcUsers from "./Users/PcUsers";
import {CircularProgress} from "@mui/material";
import {ThemeBar} from "../Componet/style-config/ThemeBar";

function FirstPage() {
    const {menu, GetMenuSubmit} = useContext(MenuContext);

    useEffect(() => {
        GetMenuSubmit();
    }, []);

    return (
        <div>
            {
                menu && menu[0]?.id === '1' ? <StationStatusDetailMap/> : (
                    menu && menu[0]?.id === '9' ? <PcCrossWalk/> : (
                        menu && menu[0]?.id === '14' ? <PCShadeFaility/> : (
                            menu && menu[0]?.id === '17' ? <PcSecurityLight/> : (
                                    menu && menu[0]?.id === '20' ? <PcSolarPanel/> : (
                                        menu && menu[0]?.id === '24' ? <PcKPI/> : (
                                            menu && menu[0]?.id === '23' ? <PcUsers/> : <>
                                                <div style={{width: "100%", height: "100vh", backgroundColor: "#ebebeb"}}>
                                                    <h1 style={{color: "white"}}>잠시만 기다려주세요.</h1>
                                                    <CircularProgress color="success"  style={{width: "300px", height: "300px"}}/>
                                                </div>
                                            </>
                                        )
                                    )
                            )
                        )
                    )
                )
            }
        </div>
    )
}

export default FirstPage;