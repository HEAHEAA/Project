import {useContext, useEffect, useRef, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import Button from "@mui/material/Button";
import {StationContext} from "../../../../ContextServer/StationContext";
import * as React from "react";
import TextField from "@mui/material/TextField";
import moment from "moment";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";


function Record01() {
    const {
        GetAllNodes,
        nodAll,
        nodId,
        setNodId,
        setRecordName,
        startDate, setStartDate,
        endDate, setEndDate,
        agent, setAgent,
        timeList,
        StationRecordData,
        excelDownload
    } = useContext(StationContext);


    useEffect(() => {
        GetAllNodes();
    }, []);


    useEffect(()=>{
        StationRecordData();
    },[agent]);

    const [page, setPage] = useState(0); //현재페이지
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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


    return (
        <div>
            <div className="dpMenu">
                <FormControl variant="standard" fullWidth id="dropdown03" sx={{marginTop: 2, zIndex: 999999}}>
                    <InputLabel id="demo-simple-select-label">시설물목록</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="시설물"
                        value={nodId}
                        onChange={(e) => setNodId(e.target.value)}
                    >
                        {
                            nodAll.map(function (a, i) {
                                return (
                                    <MenuItem value={a.nodeId} onClick={() => {
                                        setRecordName(a.nodeNm)
                                        StationRecordData();
                                    }}>{a.nodeNm}</MenuItem>

                                )
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl variant="standard" fullWidth id="dropdown04" sx={{marginTop: 2, zIndex: 999999}}>
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
            </div>

            <Button variant="contained" className="re-btn" style={{marginTop: "2vh", marginLeft: "1vh", zIndex: 999999}}
                    onClick={() => {StationRecordData();}}>조회</Button>

            <form onSubmit={excelDownload}>
                <Button variant="contained" color={"success"} className="re-btn"
                        style={{marginTop: "2vh", marginLeft: "1vh", zIndex: 999999}} type={"submit"}>
                    엑셀 다운로드
                </Button>
            </form>


            <div className="fa01">
                <TableContainer style={{cursor: "default"}} sx={{
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
                    marginTop: -30
                }}>
                    <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table" className="cw02Table">
                        <TableHead style={TableHeader}>
                            {
                                agent === "arss" ? <TableRow>
                                    <TableCell align={"center"} size={"small"} style={{width: 100, color: TextWhite.color,fontSize: TextWhite.fontSize}}>측정시간</TableCell>
                                    <TableCell align={"center"} size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>온도(℃)</TableCell>
                                    <TableCell align={"center"} size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>습도(%)</TableCell>
                                    <TableCell align={"center"} size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>미세먼지</TableCell>
                                    <TableCell  align={"center"}size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>초미세먼지</TableCell>
                                    <TableCell align={"center"} size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>이산화탄소</TableCell>
                                    <TableCell align={"center"} size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>VOCs휘발성 화합물</TableCell>
                                </TableRow> : null
                            }
                            {
                                agent === "ppct" ? <TableRow>
                                    <TableCell align={"center"} size={"small"} style={{width: 100,color: TextWhite.color,fontSize: TextWhite.fontSize}}>측정시간</TableCell>
                                    <TableCell align={"center"} size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>금일입실 수</TableCell>
                                    <TableCell align={"center"} size={"small"} style={{width: 50,color: TextWhite.color,fontSize: TextWhite.fontSize}}>금일퇴실 수</TableCell>
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
                                                        <TableCell style={{width: 100,backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}} size={"small"} > {arr.intime} </TableCell>
                                                        {
                                                            arr.vals?.map((data) => (
                                                                <>
                                                                    <TableCell style={{width: 50,backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                                               size={"small"}>{data?.toFixed(2)}</TableCell>
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
            </div>
            <TablePagination
                variant="outlined"
                rowsPerPageOptions={[7, 15, 30, 100]}
                component="div"
                count={timeList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{width: "100%", backgroundColor: "#1c63c2",color:"white"}}
                size={"small"}
            />
        </div>
    )
}

export default Record01;