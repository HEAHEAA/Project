import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {AppBar, TablePagination} from "@mui/material";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {DetailExitIcon, DetailPageBg, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function StContent00() {
    const {nodAll} = useContext(StationContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    //페이징 함수
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/station`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="스마트 정류장 목록" value="1"/>
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
                                    },
                                    marginTop: 5
                                }}>
                                    <Table sx={{minWidth: 1280, fontSize: 11}} aria-label="simple table"
                                           className="cw02Table">
                                        <TableHead style={TableHeader}>
                                            <TableRow>
                                                <TableCell style={TextWhite}>시설물명</TableCell>
                                                <TableCell style={TextWhite}>설치위치</TableCell>
                                                <TableCell style={TextWhite}>설치일자</TableCell>
                                                <TableCell style={TextWhite}>설치위도</TableCell>
                                                <TableCell style={TextWhite}>설치경도</TableCell>
                                                <TableCell style={TextWhite}>설치업체명</TableCell>
                                                <TableCell style={TextWhite}>연결여부</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                nodAll
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(function (a, i) {
                                                        return (
                                                            <TableRow>
                                                                <TableCell style={{width: 180}}>{a.nodeNm}</TableCell>
                                                                <TableCell
                                                                    style={{width: 200}}>{a.instlAddr}</TableCell>
                                                                <TableCell style={{width: 150}}>{a.instlYmd}</TableCell>
                                                                <TableCell
                                                                    style={{width: 150}}>{a.instlLattd}</TableCell>
                                                                <TableCell
                                                                    style={{width: 150}}>{a.instlLngtd}</TableCell>
                                                                <TableCell
                                                                    style={{width: 150}}>{a.instlCmpnyNm}</TableCell>
                                                                <TableCell
                                                                    style={{width: 130}}> {a.useYn === 1 ? '정상' : '오류'}</TableCell>
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
                                    count={nodAll.length}
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
}

export default StContent00;