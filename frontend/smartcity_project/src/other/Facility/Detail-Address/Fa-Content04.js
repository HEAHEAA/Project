import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import SideMenu from "../../../Componet/SideBar/SideMenu";
import {AppBar} from "@progress/kendo-react-layout";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {FacilityContext} from "../../../ContextServer/FacilityContext";

function FaContent04() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');
    const {FlRecordList, record, setRecord,} = useContext(FacilityContext);
    useEffect(() => {
        FlRecordList();
    }, []);

    return (
        <div>
            <div className="Se-Detail01">
                <AppBar themeColor={"dark"}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={{float: "right", fontSize: "24px", marginRight: "1vh", marginTop: "1vh"}}
                               onClick={() => {
                                   navigate(`/facility`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="속성정보 편집" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>
                                    <TableContainer>
                                        <Table sx={{minWidth: 650}} aria-label="simple table">
                                            <TableHead style={{backgroundColor: "#232323"}}>
                                                <TableRow>
                                                    <TableCell align={"center"}>구분</TableCell>
                                                    <TableCell align={"center"}>지점명</TableCell>
                                                    <TableCell align={"center"}>시간</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    record.map(function (a, i) {
                                                        return (
                                                            <TableRow>
                                                                <TableCell>{a.fr_division}</TableCell>
                                                                <TableCell>{a.fr_code}</TableCell>
                                                                <TableCell>{a.update_time}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}

export default FaContent04;


