import {useContext, useEffect, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import moment from "moment/moment";
import {createTheme, ThemeProvider} from "@mui/material/styles";
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

function CrossCar(){
    const {car, start02, setStart02, end, setEnd, ListCarTotalSubmit, sysNum} = useContext(CrossWalkContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        ListCarTotalSubmit();
    }, [sysNum]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleStartDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('DD-MM-YYYY');
        setStart02(formattedDate);
        setStart02(e.target.value);
    }

    const handleEndDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('DD-MM-YYYY');
        setEnd(formattedDate);
        setEnd(e.target.value);
    }


    //날짜값 중복제거
    let listArr = [...car];
    const result =  listArr.filter((item,id) => {
        return listArr.findIndex((item1,id2) => {
            return item.reg_datetime === item1.reg_datetime
        }) === id
    })

    return(
        <div>
            <div className="cw02">
                    <div className="cw02-date">
                        <Button
                            onClick={() => {
                                ListCarTotalSubmit();
                            }}
                            variant="contained"
                            style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}
                        ><AiOutlineSearch/></Button>

                        <TextField type={"date"}
                                   variant="outlined"
                                   size={"small"}
                                   style={{float: "right", marginRight: "0.5vh"}}
                                   defaultValue={end}
                                   onChange={handleEndDateChange}
                                   className="cw-input01"
                        />
                        <TextField type={"date"}
                                   variant="outlined"
                                   size={"small"}
                                   style={{float: "right"}}
                                   defaultValue={start02}
                                   onChange={handleStartDateChange}
                                   className="cw-input02"
                        />
                    </div>

                    <div className="fa02">
                        <TableContainer style={{marginTop: "-2.5vh", cursor: "default"}} sx={{
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
                            <Table sx={{minWidth: "100%"}} aria-label="simple table">
                                <TableHead style={TableHeader}>
                                    <TableRow>
                                        <TableCell size={"small"} align={"center"} style={{width: 50, color: TextWhite.color}}>관리번호</TableCell>
                                        <TableCell size={"small"} align={"center"} style={{width: 80,color: TextWhite.color}}>차선번호</TableCell>
                                        <TableCell size={"small"} align={"center"} style={{width: 80,color: TextWhite.color}}>차량평균속도</TableCell>
                                        <TableCell size={"small"} align={"center"} style={{width: 80,color: TextWhite.color}}>차선차량수</TableCell>
                                        <TableCell size={"small"} align={"center"} style={{width: 120,color: TextWhite.color}}>측정시각</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        result
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(function (arr, inx) {
                                                return (
                                                    <TableRow key={(rowsPerPage * page) + inx} className="tableHover">
                                                        <TableCell style={{width: 50,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.node_seq}</TableCell>
                                                        <TableCell style={{width: 80,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.lane}</TableCell>
                                                        <TableCell style={{width: 80,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.speed}</TableCell>
                                                        <TableCell style={{width: 80,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.COUNT}</TableCell>
                                                        <TableCell
                                                            style={{width: 120,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{arr.reg_datetime?.replace(/(T|Z)/g, " ").replace(/-/g, ".")}</TableCell>
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
                        style={{width: "100%", backgroundColor: "#1c63c2",color: "white"}}
                        size={"small"}
                    />
            </div>
        </div>
    )
}
export default CrossCar;