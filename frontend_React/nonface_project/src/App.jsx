
//라이브러리
import {Route, Routes} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";

//스타일
import './style/App.css';
import './style/pages/Login.css';
import './style/pages/dashboard.css';
import './style/pages/subScrip.css';
import './style/pages/customer.css';
import './style/pages/total.css';
import './style/pages/system.css';

//api
import {LoginProvider} from "./api/login/LoginContext";

//page
import Login from "./pages/login/Login.jsx";
import Main from "./pages/Main.jsx";
import Error from './component/404/Error.jsx';
import SignUp from "./pages/signup/SignUp.jsx";
import {HomeControlProvider} from "./api/dashboard/HomeControlContext.jsx";
import MapTest from "./pages/Test/MapTest.jsx";
import {SignupProvider} from "./api/login/SignupContext.jsx";
import {NoticeProvider} from "./api/system/NoticeContext.jsx";



function App() {
    //1. 전체 테마 설정
    const Theme = createTheme({
        typography: {
            fontFamily: 'SUITE-Regular',
            // fontFamily: 'NanumSquareNeo-Variable',
            fontWeight: 300
        }
    });
    return (
        <div>
            <ThemeProvider theme={Theme}>
                {/*Context Start*/}
                <LoginProvider>
                    <NoticeProvider>
                    <SignupProvider>
                        <HomeControlProvider>

                            {/*Router Start*/}
                            <Routes>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/test" element={<MapTest/>}/>

                                <Route path="/signup" element={<SignUp/>}/>

                                <Route path="/home" element={<Main/>}/>
                                <Route path="/home/control" element={<Main/>}/>

                                <Route path="/scrip" element={<Main/>}/>
                                <Route path="/scripList" element={<Main/>}/>

                                <Route path="/customer" element={<Main/>}/>
                                <Route path="/customer/user" element={<Main/>}/>
                                <Route path="/customer/app" element={<Main/>}/>

                                <Route path="/total" element={<Main/>}/>
                                <Route path="/total/group" element={<Main/>}/>

                                <Route path="/system/alarm" element={<Main/>}/>
                                <Route path="/system/alarm/list" element={<Main/>}/>
                                <Route path="/system/notice" element={<Main/>}/>
                                <Route path="/system/notice/add" element={<Main/>}/>
                                <Route path="/system/notice/detail" element={<Main/>}/>


                                <Route path="/*" element={<Error/>}/>
                            </Routes>
                            {/*Router End*/}


                        </HomeControlProvider>
                    </SignupProvider>
                    </NoticeProvider>
                </LoginProvider>
            </ThemeProvider>
            {/*Context End*/}
        </div>
    )
}

export default App
