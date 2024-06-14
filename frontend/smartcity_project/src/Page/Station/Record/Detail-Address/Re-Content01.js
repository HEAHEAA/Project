import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {StationContext} from "../../../../ContextServer/StationContext";
import InputLabel from "@mui/material/InputLabel";
import {
    AppBar,
    MenuItem,
    Select,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import moment from "moment";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function ReContent01(){
    const {
        GetAllNodes,
        nodAll,
        nodId,
        setNodId,
        startDate, setStartDate,
        endDate, setEndDate,
        agent, setAgent,
        timeList,
        StationRecordData,
    } = useContext(StationContext);



    //페이징이벤트
    const [page, setPage] = useState(0); //현재페이지
    const [rowsPerPage, setRowsPerPage] = useState(15); //현재페이지에서 보여줄 리스트갯수


    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        GetAllNodes();
    }, []);

    useEffect(()=>{
        StationRecordData();
    },[agent]);



    const navigate = useNavigate();
    const GoRe = () => {
        navigate('/station/record');
    }

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



    return(
        <div>
            <div className="Se-Detail01">
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/station/record`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="시설물 목록" value="1"/>
                                </TabList>
                            </Box>

                            <TabPanel value="1">

                                <FormControl variant="standard" fullWidth id="dropdown03">
                                    <InputLabel id="demo-simple-select-label">시설물목록</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="시설물"
                                        value={nodId}
                                        onChange={(e) => setNodId(e.target.value)}
                                    >
                                        {
                                            nodAll.map(function (a,i){
                                                return(
                                                    <MenuItem value={a.nodeId}>{a.nodeNm}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" fullWidth id="dropdown04">
                                    <InputLabel id="demo-simple-select-label">디바이스선택</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="시설물"
                                        value={agent}
                                        onChange={(e) => setAgent(e.target.value)}
                                    >


                                        <MenuItem value="arss">미세먼지</MenuItem>
                                        <MenuItem value="ppct">피플카운터</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="standard" fullWidth id="dropdown05" sx={{marginTop: 3, zIndex: 9999999}}>
                                    <TextField
                                        type={"date"}
                                        variant="outlined"
                                        size={"small"}
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        className="cw-input02"
                                    />
                                </FormControl>
                                <FormControl variant="standard" fullWidth id="dropdown06" sx={{marginTop: 3, zIndex: 9999999}}>
                                    <TextField
                                        type={"date"}
                                        variant="outlined"
                                        size={"small"}
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        className="cw-input02"
                                    />
                                </FormControl>


                                <Button variant="contained" className="re-btn" style={{marginTop: "1vh", marginLeft: "1vh"}} onClick={()=>{
                                    StationRecordData();
                                }}>조회</Button>
                                <Button variant="contained" className="re-btn" style={{marginTop: "1vh", marginLeft: "1vh"}} color={"success"}>엑셀다운로드</Button>

                                <TableContainer style={{marginTop: "-3vh",cursor: "default"}} sx={{
                                    "&::-webkit-scrollbar": {
                                        width: 10,
                                        height:10,
                                        cursor: "default"
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        backgroundColor: "#565656",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#282828",
                                        borderRadius: 0
                                    }
                                }} >
                                    <Table sx={{minWidth: '100%', fontSize: 11}} aria-label="simple table" className="cw02Table">
                                        <TableHead style={TableHeader}>
                                            {
                                                agent === "arss" ? <TableRow>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>측정시간</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>온도(℃)</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>습도(%)</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>미세먼지</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>초미세먼지</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>이산화탄소</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>VOCs휘발성 화합물</TableCell>
                                                </TableRow> : null
                                            }
                                            {
                                                agent === "ppct" ? <TableRow>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>측정시간</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>금일입실시간</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={{color: TextWhite.color,fontSize: TextWhite.fontSize}}>금일퇴실수</TableCell>
                                                </TableRow> : null
                                            }
                                        </TableHead>
                                        <TableBody>
                                            {
                                                timeList
                                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    ?.map(function (arr, i) {
                                                        return (
                                                            <TableRow>
                                                                {
                                                                    agent === "arss" ? <>
                                                                        <TableCell style={{backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}} size={"small"}  align={"center"}> {arr.intime} </TableCell>
                                                                        {
                                                                            arr.vals?.map((data) => (
                                                                                <>
                                                                                    <TableCell style={{backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                                                               size={"small"}  align={"center"}>{data?.toFixed(2)}</TableCell>
                                                                                </>
                                                                            ))
                                                                        }

                                                                    </> : null
                                                                }

                                                                {
                                                                    agent === "ppct" ? <>
                                                                        <TableCell style={{width: 100,backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                                                   size={"small"} align={"left"}> {arr.intime} </TableCell>

                                                                        {
                                                                            arr.vals?.map((data) => (
                                                                                <>
                                                                                    <TableCell style={{width: 50,backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                                                               size={"small"} align={"left"}>{data}</TableCell>
                                                                                </>
                                                                            ))
                                                                        }

                                                                    </> : null
                                                                }
                                                            </TableRow>
                                                        )
                                                    })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <TablePagination
                                    variant="outlined"
                                    rowsPerPageOptions={[15, 30, 45, 100]}
                                    component="div"
                                    count={timeList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    style={{width: "100%", backgroundColor: "#1c63c2",color:"white"}}
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
export default ReContent01;