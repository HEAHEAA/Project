import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import FileList from "../Detail_Tab/Tab01/FileList";
import PlayList from "../Detail_Tab/Tab02/PlayList";
import * as React from "react";
import {BsXLg} from "react-icons/bs";
import {AppBar} from "@mui/material";
import {DetailExitIcon, DetailPageBg} from "../../../../Componet/style-config/light-theme";

function CoContent01(){
    const navigate = useNavigate();


    const [value, setValue] = useState('1');

    //재생목록생성 모달
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return(
        <div>
            <div className="Se-Detail01">
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/station/did`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="파일관리" value="1"/>
                                    <Tab label="현재 재생목록 관리" value="2"/>
                                </TabList>
                            </Box>

                            <TabPanel value="1">
                                <FileList/>
                            </TabPanel>

                            <TabPanel value="2">
                                <PlayList/>
                            </TabPanel>

                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}

export default CoContent01;