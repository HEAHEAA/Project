import './style/App.css';
import './style/Login.css';
import './style/FileList.css';
import './style/PlayBack.css';
import './style/UiEdit.css';
import './style/Signup.css';
import './style/DisplayResponsive.css';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login.jsx";
import Main from "./main/Main.jsx";
import SignUp from "./login/SignUp.jsx";
import {LoginProvider} from "./api/Login/LoginContext.jsx";
import {SignupProvider} from "./api/Login/SignupContext.jsx";
import Test from "./main/test/Test.jsx";

function App() {
    return (
        <div className="app">
            <LoginProvider>
                <SignupProvider>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/home" element={<Main/>}/>
                        <Route path="/home/play" element={<Main/>}/>
                        <Route path="/home/ui" element={<Main/>}/>
                        <Route path="/home/membership" element={<Main/>}/>
                    </Routes>
                </SignupProvider>
            </LoginProvider>
        </div>
    )
}

export default App
