import './style/App.css';
import './style/Login.css';
import './style/FileList.css';
import './style/PlayBack.css';
import './style/UiEdit.css';
import './style/Signup.css';
import './style/DisplayResponsive.css';
import {Route, Routes} from "react-router-dom";
import Login from "./sections/login/Login.jsx";
import Main from "./routes/Main.jsx";
import SignUp from "./sections/login/SignUp.jsx";
import MainPlace from "./sections/place/MainPlace.jsx";
import {LoginProvider} from "./context/LoginContext.jsx";
import {ReactQueryDevtools} from "react-query/devtools";
import {NodeProvider} from "./context/NodeContext.jsx";

function App() {
    return (
        <div className="app">
            <LoginProvider>
                <NodeProvider>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/place" element={<MainPlace/>}/>
                        <Route path="/home" element={<Main/>}/>
                        <Route path="/home/play" element={<Main/>}/>
                        <Route path="/home/ui" element={<Main/>}/>
                        <Route path="/home/membership" element={<Main/>}/>
                    </Routes>
                </NodeProvider>
            </LoginProvider>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
        </div>
    )
}

export default App
