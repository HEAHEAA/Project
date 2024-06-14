import Sidebars from "../component/pc/Sidebars.jsx";
import MobileTopBar from "../component/mobile/MobileTopBar.jsx";
import MobileBottom from "../component/mobile/MobileBottom.jsx";
import {UserProvider} from "../api/all/UserContext.jsx";
import {GroupProvider} from "../api/all/GroupContext.jsx";
import {MakeUseProvider} from "../api/total/MakeUseContext";
import {DashboardProvider} from "../api/dashboard/DashboardContext";
import {NoticeProvider} from "../api/system/NoticeContext";
import {AppProvider} from "../api/customer/AppContext";
import {CustomerGroupProvider} from "../api/customer/CustomerGroupContext.jsx";
import {SubScriptProvider} from "../api/subscription/SubScriptContext.jsx";
import {AlarmProvider} from "../api/system/AlarmContext.jsx";


function Main() {
    //1. 홈 대시보드 url : /home (Dashboard.jsx);
    //2. 관제현황 url : /home/control (DashControl.jsx)

    return (
        <div>
            <DashboardProvider>
                <GroupProvider>
                    <CustomerGroupProvider>
                        <UserProvider>
                            <MakeUseProvider>
                                <AppProvider>
                                    <SubScriptProvider>
                                        <AlarmProvider>
                                            {
                                                //윈도우 넓이가 1200px 이상이면 보여주고 아니면 안보여준다.
                                                window.innerWidth > 1200 ? <Sidebars/> : <>
                                                    <MobileTopBar/>
                                                    <MobileBottom/>
                                                </>
                                            }
                                        </AlarmProvider>

                                    </SubScriptProvider>
                                </AppProvider>
                            </MakeUseProvider>
                        </UserProvider>
                    </CustomerGroupProvider>
                </GroupProvider>
            </DashboardProvider>

        </div>
    )
}

export default Main;