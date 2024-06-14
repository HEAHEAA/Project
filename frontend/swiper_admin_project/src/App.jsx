import './_style/App.css'
import {LightTheme} from "./theme/mui-theme.jsx";
import {ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/sign-up/SignUp.jsx";
import Main from "./route/Main.jsx";
import {LoginProvider} from "./context/login/LoginContext.jsx";
import {SignupProvider} from "./context/login/SignupContext.jsx";
import {ClientProvider} from "./context/client/ClientContext.jsx";
import {DateProvider} from "./context/config/DateContext.jsx";

function App() {
  return (
    <div>
      <ThemeProvider theme={LightTheme}>
          <LoginProvider>
              <SignupProvider>
                  <ClientProvider>
                      <DateProvider>
                          <Routes>
                              <Route path="/" element={<Login/>}/>
                              <Route path="/signup" element={<SignUp/>}/>
                              <Route path="/dashboard" element={<Main/>}/>
                              <Route path="/notice/alarm" element={<Main/>}/>
                              <Route path="/notice/schedule" element={<Main/>}/>
                              <Route path="/excellent" element={<Main/>}/>
                              <Route path="/bid" element={<Main/>}/>
                              <Route path="/news" element={<Main/>}/>
                              <Route path="/group-news" element={<Main/>}/>
                              <Route path="/group-news/add" element={<Main/>}/>
                              <Route path="/group-news/edit" element={<Main/>}/>
                              <Route path="/book" element={<Main/>}/>
                              <Route path="/book/add" element={<Main/>}/>
                              <Route path="/book/update" element={<Main/>}/>
                              <Route path="/client" element={<Main/>}/>
                              <Route path="/user" element={<Main/>}/>
                              <Route path="/dashboard-edit" element={<Main/>}/>
                              <Route path="/dashboard-edit/detail" element={<Main/>}/>
                          </Routes>
                      </DateProvider>
                  </ClientProvider>
              </SignupProvider>
          </LoginProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
