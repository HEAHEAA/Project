import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Table from "@mui/material/Table";
import {useContext, useEffect, useState} from "react";
import {FacilityContext} from "../../../ContextServer/FacilityContext";
import {TablePagination} from "@mui/material";

function Facility03(){
    const { FlRecordList, record,setRecord,} = useContext(FacilityContext);
    useEffect(()=>{
        FlRecordList();
    },[]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return(
        <div>
            <div className="fa02">
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
                                record
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(function (a,i){
                                    return(
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
                <TablePagination
                    sx={{minWidth: "100%"}}
                    variant="outlined"
                    rowsPerPageOptions={[5, 10, 15, 100]}
                    component="div"
                    count={record.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{width: "100%", backgroundColor: "#2c2c2c"}}
                    size={"small"}
                />

            </div>

        </div>
    )
}
export default Facility03;

