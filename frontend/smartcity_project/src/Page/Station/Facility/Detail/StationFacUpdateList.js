import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@mui/material";
import * as React from "react";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function StationFacUpdateList(){
    const {FacCheckList, facRecordList} = useContext(StationContext);

    useEffect(()=>{
        FacCheckList();
    },[]);

    //페이징 함수
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <div>
            <div className="fa01">
                <TableContainer style={{cursor: "default"}}>
                    <Table sx={{minWidth: "100%"}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell align={"center"} style={TextWhite}>구분</TableCell>
                                <TableCell align={"center"} style={TextWhite}>지점명</TableCell>
                                <TableCell align={"center"} style={TextWhite}>업로드시간</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                [...facRecordList]
                                    ?.reverse()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(function (a, i) {
                                        return (
                                            <TableRow key={(rowsPerPage * page) + i}>
                                                <TableCell style={TableCells}>{a.fr_division}</TableCell>
                                                <TableCell style={TableCells}>{a.fr_code}</TableCell>
                                                <TableCell style={TableCells}>{a.update_time}</TableCell>
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
                    rowsPerPageOptions={[5, 15, 45, 100]}
                    component="div"
                    count={facRecordList.length}
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
export default StationFacUpdateList;