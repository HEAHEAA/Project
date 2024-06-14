import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import {AppBar} from "@progress/kendo-react-layout";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ModalMap from "../../../Page/SecurityLight/Monitoring/Map/ModalMap";
import SolarMap from "../../../Page/SolarPanel/Monitoring/map/SolarMap";
import CrossWalkMap from "../../../Page/CrossWork/Monitoring/map/CrossWalkMap";
import {FacilityContext} from "../../../ContextServer/FacilityContext";

function FaContent01() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');
    const {
        selectNum,
        setSelectNum,
        setMapSize,
    } = useContext(FacilityContext)

    const onSelect = (e) => {
        e.preventDefault();
        setSelectNum(e.target.value);
    }

    return (
        <div>
            <div className="Se-Detail01">
                <AppBar themeColor={"dark"}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={{float: "right", fontSize: "24px", marginRight: "1vh", marginTop: "1vh"}}
                               onClick={() => {
                                   navigate(`/facility`)
                               }}
                        />

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="스마트횡단보도 장치목록" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>

                                    <div onClick={() => {
                                        setMapSize(true);
                                    }}>
                                        <FormControl variant="filled" sx={{m: 1, minWidth: 120,}}
                                                     style={{marginTop: "2vh"}}
                                                     id="dropdown02" size={"small"}>
                                            <InputLabel id="demo-simple-select-filled-label">전체</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                onChange={(e) => onSelect(e)}
                                                value={selectNum}
                                            >
                                                <MenuItem value="1">스마트 보안등</MenuItem>
                                                <MenuItem value="2">스마트 태양열지도</MenuItem>
                                                <MenuItem value="3">스마트 버스정류장</MenuItem>
                                                <MenuItem value="4">스마트 횡단보도</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    {
                                        selectNum === "1" ? <ModalMap/> : null
                                    }
                                    {
                                        selectNum === "2" ? <SolarMap/> : null
                                    }

                                    {
                                        selectNum === "4" ? <CrossWalkMap/> : null
                                    }
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}

export default FaContent01;