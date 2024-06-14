import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import Tab02 from "./SeContent01/Tab02";
import Tab03 from "./SeContent01/Tab03";
import Tab00 from "./SeContent01/Tab00";
import {AppBar} from "@mui/material";
import {DetailExitIcon, DetailPageBg} from "../../../../Componet/style-config/light-theme";

function SeContent02(){
    const navigate = useNavigate();
    const GoSe = () => {
        navigate('/securityLight');
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return(
        <div>
            <div>
                <div className="Se-Detail01">
                    <AppBar style={DetailPageBg}>
                        <Box sx={{width: '100%', typography: 'body1'}}>
                            <BsXLg style={DetailExitIcon} onClick={GoSe}/>

                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="스마트보안등전체목록" value="1"/>
                                        <Tab label="유지보수 신청 이력" value="2"/>
                                        <Tab label="장비관리" value="3"/>
                                    </TabList>
                                </Box>

                                <TabPanel value="1">
                                    <div style={{width: "100%", height: "89.5vh"}}>
                                        <Tab00/>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div style={{width: "100%", height: "89.5vh"}}>
                                        <Tab02/>
                                    </div>
                                </TabPanel>
                                <TabPanel value="3">
                                    <div style={{width: "100%", height: "89.5vh"}}>
                                        <Tab03/>
                                    </div>
                                </TabPanel>

                            </TabContext>
                        </Box>


                    </AppBar>
                </div>

            </div>
        </div>
    )
}
export default SeContent02;

