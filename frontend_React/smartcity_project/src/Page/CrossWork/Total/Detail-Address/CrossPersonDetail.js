import {useContext, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import moment from "moment/moment";
import {AppBar, MenuItem, Select, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function CrossPersonDetail(){
    const {
        total,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        ListTotalSubmit,
        list,
        sysNum,
        setSysNum,
    } = useContext(CrossWalkContext);
    const navigate = useNavigate();

    const [value, setValue] = React.useState('1');


    //페이징이벤트
    const [page, setPage] = useState(0); //현재페이지
    const [rowsPerPage, setRowsPerPage] = useState(15); //현재페이지에서 보여줄 리스트갯수

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [resultFalse, setResultFalse] = useState(false);


    //날짜 검색용

    const handleStartDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setStartDate(formattedDate);
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setEndDate(formattedDate);
        setEndDate(e.target.value);
    }

    //중복제거
    let listArr = [...list];
    const result = listArr.filter((item,id) => {
        return listArr.findIndex((item1,id2) => {
            return item.node_seq === item1.node_seq
        }) === id
    })
    return(
        <div>
            <div className="Se-Detail01">
                <AppBar style={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/crosswalk/total`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="스마트횡단보도 통계" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>


                                    <FormControl sx={{width: "30%", float: "left"}}>
                                        <InputLabel id="demo-simple-select-label">관리명</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sysNum}
                                            onChange={(e) => setSysNum(e.target.value)}
                                        >
                                            {
                                                result.map(function (a, i) {
                                                    return (
                                                        <MenuItem value={a.node_seq}>{a.node_name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        type={"date"}
                                        variant="outlined"
                                        style={{float: "left", marginRight: "0.5vh", marginLeft: "2vh"}}
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        className="cw-input02"
                                    />
                                    <TextField
                                        type={"date"}
                                        variant="outlined"
                                        style={{float: "left"}}
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        className="cw-input01"
                                    />

                                    <Button onClick={() => {
                                        ListTotalSubmit();
                                        setResultFalse(true);
                                    }}
                                            size={"large"}
                                            variant="contained"
                                            sx={{
                                                float: "left",
                                                width: 150,
                                                marginTop: 0,
                                                marginBottom: 1,
                                                height: 55,
                                                marginLeft: "2vh"
                                            }}
                                    >검색</Button>

                                    <TableContainer>
                                        <Table sx={{minWidth: 850}} aria-label="simple table">
                                            <TableHead style={TableHeader}>
                                                <TableRow>
                                                    <TableCell size={"small"} style={TextWhite}>관리번호</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>보행자합계</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>횡단자 합계</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>무단횡단자 합계</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>측정시각</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {
                                                    total
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map(function (arr, inx) {
                                                            return (
                                                                <TableRow key={(rowsPerPage * page) + inx}
                                                                          className="tableHover">
                                                                    <TableCell style={TableCells}>{arr.node_seq}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.person_cnt}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.crosswalk_cnt}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.crossing_cnt}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.reg_datetime?.replace(/(T|Z)/g, " ").replace(/-/g, ".")}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }

                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            variant="outlined"
                                            rowsPerPageOptions={[15, 30, 45, 100]}
                                            component="div"
                                            count={total.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2", color: "white"}}
                                            size={"small"}
                                        />

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
export default CrossPersonDetail;