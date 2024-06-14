import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {AppBar, TablePagination} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import {DetailExitIcon, DetailPageBg, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function StContent02() {
    const {dv, setNodeAgent, DvList, Load02, nodeNm,} = useContext(StationContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    if (Load02 === false) {
        return (
            <div>
                <div className="Se-Detail01">
                    <AppBar sx={DetailPageBg}>
                        <Box sx={{width: '100%', typography: 'body1'}}>
                            <BsXLg style={DetailExitIcon}
                                   onClick={() => {
                                       navigate(`/station`)
                                   }}/>

                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                        <Tab label="스마트 정류장 디바이스 목록" value="1"/>
                                    </TabList>
                                </Box>


                                <TabPanel value="1">
                                    <TableContainer style={{marginTop: "1vh", cursor: "default"}} sx={{
                                        "&::-webkit-scrollbar": {
                                            width: 10,
                                            height: 10,
                                            cursor: "default"
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            backgroundColor: "#565656",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "#282828",
                                            borderRadius: 0
                                        }
                                    }}>
                                        <Table sx={{minWidth: 1280, fontSize: 11, marginTop: 5}}
                                               aria-label="simple table" className="cw02Table">
                                            <TableHead style={TableHeader}>
                                                <TableRow>
                                                    <TableCell style={{width: 50,color: TextWhite.color}}>시설명</TableCell>
                                                    <TableCell style={{width: 50,color: TextWhite.color}}> 디바이스 명</TableCell>
                                                    <TableCell style={{width: 50,color: TextWhite.color}}>조명</TableCell>
                                                    <TableCell style={{width: 50,color: TextWhite.color}}>(내부조명1) 시작</TableCell>
                                                    <TableCell style={{width: 50,color: TextWhite.color}}>(내부조명1) 종료</TableCell>
                                                    <TableCell style={{width: 50,color: TextWhite.color}}>(내부조명2) 시작</TableCell>
                                                    <TableCell style={{width: 50,color: TextWhite.color}}>(내부조명2) 종료</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    dv.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map(function (arr, inx) {
                                                            return (
                                                                <TableRow onClick={() => {
                                                                    setNodeAgent(arr.dvcId);
                                                                    DvList();
                                                                }} className="tableHover">
                                                                    <TableCell
                                                                        style={{width: 100}}>{nodeNm === '' ? '시설명을 선택해주세요.' : nodeNm}</TableCell>
                                                                    <TableCell
                                                                        style={{width: 100}}>{arr?.dvcNm}</TableCell>
                                                                    <TableCell
                                                                        style={{width: 100}}>{arr?.dvcTypeNm}</TableCell>
                                                                    <TableCell
                                                                        style={{width: 50}}>{arr.data.oprtStHm}</TableCell>
                                                                    <TableCell
                                                                        style={{width: 50}}>{arr.data.oprtEdHm}</TableCell>
                                                                    <TableCell
                                                                        style={{width: 50}}>{arr.data.oprtStHm2}</TableCell>
                                                                    <TableCell
                                                                        style={{width: 50}}>{arr.data.oprtEdHm2}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        sx={{minWidth: "100%"}}
                                        variant="outlined"
                                        rowsPerPageOptions={[10, 20, 30, 100]}
                                        component="div"
                                        count={dv?.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        style={{width: "100%", backgroundColor: "#1c63c2",color: "white"}}
                                        size={"small"}
                                    />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </AppBar>
                </div>
            </div>

        )
    } else {
        return (
            <div>
                <AppBar style={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/station`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="스마트 정류장 디바이스 목록" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                디바이스를 선택해주세요.
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        )
    }


}

export default StContent02;