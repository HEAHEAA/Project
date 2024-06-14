import './_style/App.css';
import './_style/map.css';
import './_style/realtime.css';
import './_style/errInfoedit.css';
import './_style/media/dashboardMedia.css';
import './_style/media/realTImeMedia.css';
import './_style/media/errInfoMedia.css';
import './_style/layout/layout.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Route, Routes} from "react-router-dom";
import {Main} from "./route/Main.jsx";
import {DashboardProvider} from "./context/dashboardContext.jsx";
import {RealTimeProvider} from "./context/realtimeContext.jsx";
import {ErrInfoProvider} from "./context/errInfoContext.jsx";
import {darkMode} from "./theme/darkThme.jsx";
import {ReactQueryDevtools} from "react-query/devtools";


function App() {
    if(localStorage.length === 0){
        localStorage.setItem('theme', JSON.stringify(darkMode));
        localStorage.setItem('mode', 'dark');
        location.reload();
        return (
            <DashboardProvider>
                    <ErrInfoProvider>
                        <RealTimeProvider>
                            <Routes>
                                <Route path="/" element={<Main/>}/>
                                <Route path="/realtime" element={<Main/>}/>
                                <Route path="/errinfo/edit" element={<Main/>}/>
                            </Routes>
                            {/*<ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>*/}
                        </RealTimeProvider>
                    </ErrInfoProvider>
            </DashboardProvider>
        )
    }else {
        return (
            <DashboardProvider>
                    <ErrInfoProvider>
                        <RealTimeProvider>
                            <Routes>
                                <Route path="/" element={<Main/>}/>
                                <Route path="/realtime" element={<Main/>}/>
                                <Route path="/errinfo/edit" element={<Main/>}/>
                            </Routes>
                            {/*<ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>*/}
                        </RealTimeProvider>
                    </ErrInfoProvider>
            </DashboardProvider>
        )
    }

}

export default App
