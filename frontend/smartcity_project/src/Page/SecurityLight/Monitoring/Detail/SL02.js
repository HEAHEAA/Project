import {useNavigate} from "react-router-dom";
import {BiAddToQueue} from "react-icons/bi";
import {useContext, useState} from "react";
import {SecurityLightContext} from "../../../../ContextServer/SecurityContext";
import SL01Tab01 from "./SL_02_TabComponent/SL01Tab01";
import SL01Tab02 from "./SL_02_TabComponent/SL01Tab02";
import SL01Tab03 from "./SL_02_TabComponent/SL01Tab03";
import SL01Tab04 from "./SL_02_TabComponent/SL01Tab04";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import SL01Tab00 from "./SL_02_TabComponent/SL01Tab00";
import {ViewAllIcon} from "../../../../Componet/style-config/light-theme";

function SL02() {
    const {
        setBtn01,
        setBtn02,
        setBtn03,
        setBtn04,
    } = useContext(SecurityLightContext);
    const SeNavigate = useNavigate();
    const GoSeDetail02 = () => {
        SeNavigate('/securityLight/sub2');
    }


    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
                <button onClick={GoSeDetail02} className="bigger-icon2" style={ViewAllIcon}>
                    <BiAddToQueue/>
                </button>

                <Box sx={{ width: '100%', typography: 'body1', marginTop: -2 }} >
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="스마트보안등전체목록" value="1" onClick={() => {
                                    setBtn01(true);
                                    setBtn02(false);
                                    setBtn03(false);
                                    setBtn04(false);
                                }}/>
                                <Tab label="스마트 보안등 유지보수 신청 및 이력" value="3" onClick={() => {
                                    setBtn02(true);
                                    setBtn01(false);
                                    setBtn03(false);
                                    setBtn04(false);
                                }}/>
                                <Tab label="장비관리" value="4" onClick={() => {
                                    setBtn03(true);
                                    setBtn01(false);
                                    setBtn02(false);
                                    setBtn04(false);
                                }}/>
                                <Tab label="디밍관리" value="5" onClick={() => {
                                    setBtn04(true);
                                    setBtn01(false);
                                    setBtn02(false);
                                    setBtn03(false);
                                }} />

                            </TabList>
                        </Box>
                        <TabPanel value="1" style={{marginTop: "-2vh"}}><SL01Tab00/></TabPanel>
                        <TabPanel value="2" style={{marginTop: "-2vh"}}><SL01Tab01/></TabPanel>
                        <TabPanel value="3" style={{marginTop: "-2vh"}}><SL01Tab02/></TabPanel>
                        <TabPanel value="4" style={{marginTop: "-2vh"}}><SL01Tab03/></TabPanel>
                        <TabPanel value="5" style={{marginTop: "-2vh"}}><SL01Tab04/></TabPanel>
                    </TabContext>
                </Box>

        </div>
    )
}

export default SL02;

