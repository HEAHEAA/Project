import {BiMoviePlay} from "react-icons/bi";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useContext, useEffect, useState} from "react";
import {createTheme, Tabs, ThemeProvider} from "@mui/material";
import NowPlayListPage from "./NowPlayList/NowPlayListPage.jsx";
import SelectPlayListPage from "./SelectPlayList/SelectPlayListPage.jsx";
import {FileListContext} from "../../../../api/FileList/FileListContext.jsx";
import {PlaybackContext} from "../../../../api/PlayBack/PlaybackContext.jsx";


function SelectTab() {

    //1. 탭바 이벤트
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //2. 테마
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });

    return (
        <div className="play-back-content">
            <div className="list-title">
                <strong><BiMoviePlay/> 재생 목록</strong><br/>
                현재 재생중 인 파일을 볼 수 있습니다.

            </div>

            <ThemeProvider theme={darkTheme}>
                <Box sx={{width: '100%', typography: 'body1'}}>

                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="재생 파일 수정" value="1"/>
                                <Tab label="재생 목록" value="2"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <SelectPlayListPage/>
                        </TabPanel>
                        <TabPanel value="2">
                            <NowPlayListPage/>
                        </TabPanel>
                    </TabContext>


                </Box>
            </ThemeProvider>
        </div>
    )
}

export default SelectTab;