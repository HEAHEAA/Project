import {Sidebar} from "../component/Sidebar.jsx";
import {Dashboard} from "../page/dashboard/Dashboard.jsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {RealTime} from "../page/real-time/RealTime.jsx";
import {ErrInfoEdit} from "../page/errInfo-edit/ErrInfoEdit.jsx";

export const Main = () => {

    const darkTheme = createTheme({
        palette: {
            mode: localStorage.getItem('mode') === 'dark' ? 'dark' : 'light',
        },
        typography: {
            fontFamily: 'LINE-KR-Rg',
            fontWeight: 300
        }
    });

    return(
        <div>
            <ThemeProvider theme={darkTheme}>
                <Sidebar/>

                {
                    window.location.pathname === '/' ?  <Dashboard/>: (
                        window.location.pathname === '/realtime' ? <RealTime/> : (
                            window.location.pathname === '/errinfo/edit' ? <ErrInfoEdit/> : null
                        )
                    )
                }

            </ThemeProvider>
        </div>
    )
}
