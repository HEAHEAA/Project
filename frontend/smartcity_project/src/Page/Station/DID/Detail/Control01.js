import * as React from "react";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import FileList from "../Detail_Tab/Tab01/FileList";
import PlayList from "../Detail_Tab/Tab02/PlayList";
import {useContext, useState} from "react";
import {ControlContext} from "../../../../ContextServer/ControlContext";

function Control01() {
    const {
       setPlayBtn02, setPlayBtn
    } = useContext(ControlContext);

    const [value, setValue] = useState('1');

    //재생목록생성 모달
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <div className="file-list-form">
                <Box sx={{ width: '100%', typography: 'body1' }}>

                    <TabContext value={value}>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop: -3 }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="파일관리" value="1" />
                                <Tab label="재생목록관리" value="2" />
                            </TabList>
                        </Box>

                        <TabPanel value="1" onClick={()=>{
                            setPlayBtn(true);
                            setPlayBtn02(false);
                        }}>
                            <FileList/>
                        </TabPanel>
                        <TabPanel value="2" onClick={()=>{
                            setPlayBtn(false);
                            setPlayBtn02(true);
                        }}>
                            <PlayList/>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </div>
    )
}

export default Control01;