import {useContext, useEffect, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import moment from "moment/moment";
import Button from "@mui/material/Button";
import {AiOutlineSearch} from "react-icons/ai";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@mui/material";
import * as React from "react";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function CrossPerson(){
    const {
        total,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        ListTotalSubmit,
        sysNum,
    } = useContext(CrossWalkContext);


    useEffect(() => {
        ListTotalSubmit();
    }, [sysNum]);

    //페이징이벤트
    const [page, setPage] = useState(0); //현재페이지
    const [rowsPerPage, setRowsPerPage] = useState(10); //현재페이지에서 보여줄 리스트갯수

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

    let listArr = [...total];
    const result =  listArr.filter((item,id) => {
        return listArr.findIndex((item1,id2) => {
            return item.reg_datetime === item1.reg_datetime
        }) === id
    })

    return(
        <div>
            <div className="cw02">
                <div className="cw02-date">
                    <Button onClick={() => {
                        ListTotalSubmit();
                        setResultFalse(true);
                    }}
                            variant="contained"
                            style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}
                    ><AiOutlineSearch/></Button>

                    <TextField
                        type={"date"}
                        variant="outlined"
                        size={"small"}
                        style={{float: "right", marginRight: "0.5vh"}}
                        value={endDate}
                        onChange={handleEndDateChange}

                        className="cw-input01"
                    />
                    <TextField
                        type={"date"}
                        variant="outlined"
                        size={"small"}
                        style={{float: "right"}}
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="cw-input02"
                    />
                </div>

                <div className="fa02">
                    <TableContainer style={{marginTop: "1vh", cursor: "default"}}>
                        <Table sx={{minWidth: "100%"}} aria-label="simple table">
                            <TableHead style={TableHeader}>
                                <TableRow>
                                    <TableCell size={"small"} align={"center"} style={{width: 50, color: TextWhite.color}}>관리번호</TableCell>
                                    <TableCell size={"small"} align={"center"} style={{width: 80,color: TextWhite.color}}>보행자합계</TableCell>
                                    <TableCell size={"small"} align={"center"} style={{width: 80,color: TextWhite.color}}>횡단자 합계</TableCell>
                                    <TableCell size={"small"} align={"center"} style={{width: 80,color: TextWhite.color}}>무단횡단자 합계</TableCell>
                                    <TableCell size={"small"} align={"center"} style={{width: 120,color: TextWhite.color}}>측정시각</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    result
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (arr, inx) {
                                            return (
                                                <TableRow key={(rowsPerPage * page) + inx}>
                                                    <TableCell style={{width: 50,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.node_seq}</TableCell>
                                                    <TableCell style={{width: 80,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.person_cnt}</TableCell>
                                                    <TableCell style={{width: 80,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.crosswalk_cnt}</TableCell>
                                                    <TableCell style={{width: 80,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.crossing_cnt}</TableCell>
                                                    <TableCell style={{width: 120,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.reg_datetime?.replace(/(T|Z)/g, " ").replace(/-/g, ".")}</TableCell>
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
                    rowsPerPageOptions={[10, 15, 30, 100]}
                    component="div"
                    count={result.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{width: "100%", backgroundColor: "#1c63c2", color: "white"}}
                    size={"small"}
                />
            </div>
        </div>
    )
}
export default CrossPerson;