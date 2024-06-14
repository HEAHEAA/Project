import SideMenu from "../Componet/SideBar/SideMenu";
import FirstPage from "./FirstPage";
import PcStationStatus from "./Station/Monitoring/DetailMonitor/PcStationStatus";
import StationChartDetail from "./Station/Monitoring/DetailMonitor/DetailAddress/StationChartDetail";


function Main(){
    return(
        <div>
            <SideMenu/>
            {
                window.location.pathname === '/main' ? <FirstPage/> : (
                    window.location.pathname === '/station/status' ? <PcStationStatus/> : (
                        window.location.pathname === '/station/status/1' ? <StationChartDetail/> : null
                    )
                )
            }

        </div>
    )
}
export default Main;