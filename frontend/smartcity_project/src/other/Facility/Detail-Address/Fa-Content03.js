import Table from "react-bootstrap/Table";
import {useNavigate} from "react-router-dom";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import React, {useContext, useState} from "react";
import TabContext from "@mui/lab/TabContext";
import {AppBar} from "@progress/kendo-react-layout";
import TabPanel from "@mui/lab/TabPanel";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {FacilityContext} from "../../../ContextServer/FacilityContext";
import Button from "@mui/material/Button";

function FaContent03() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');
    const {
        selectList,
        setSelectList,
        flIdx,
        setFlIdx,
        FacListSelet,
        GetEditId,
    } = useContext(FacilityContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                                                    <TableCell align={"center"}>지점명</TableCell>
                                                    <TableCell align={"center"}>설치주소</TableCell>
                                                    <TableCell align={"center"}>x좌표</TableCell>
                                                    <TableCell align={"center"}>y좌표</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    selectList
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map(function (a, i) {
                                                            return (
                                                                <TableRow className="tableHover" onClick={() => {
                                                                    setFlIdx(a.fl_idx);
                                                                }}>
                                                                    <TableCell align={"center"}>{a.fl_code}</TableCell>
                                                                    <TableCell align={"center"}>{a.fl_name}</TableCell>
                                                                    <TableCell align={"center"}>{a.fl_lat}</TableCell>
                                                                    <TableCell align={"center"}>{a.fl_lng}</TableCell>
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

export default FaContent03;

