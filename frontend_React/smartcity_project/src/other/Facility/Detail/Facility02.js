import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import TableBody from "@mui/material/TableBody";
import {useContext, useEffect, useState} from "react";
import {FacilityContext} from "../../../ContextServer/FacilityContext";
import {TablePagination} from "@mui/material";
import Button from "@mui/material/Button";
import Fac02Update from "./Fac02Update/Fac02Update";

function Facility02() {
    const {
        selectList,
        flIdx,
        setFlIdx,
        FacListSelet,
        GetEditId,
    } = useContext(FacilityContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    //수정 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        FacListSelet();
    }, [flIdx]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Fac02Update open={open} handleClose={handleClose} />
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
                    }
                }}>
                    <Table sx={{minWidth: 1250}} aria-label="simple table">
                        <TableHead style={{backgroundColor: "#232323"}}>
                            <TableRow>
                                <TableCell align={"center"}>수정 </TableCell>
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
                                                <TableCell>
                                                    <Button onClick={() => {
                                                        handleOpen();
                                                        GetEditId(a.fl_idx);
                                                    }}>수정</Button>
                                                </TableCell>
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
                <TablePagination
                    sx={{minWidth: "100%"}}
                    variant="outlined"
                    rowsPerPageOptions={[8, 16, 30, 100]}
                    component="div"
                    count={selectList.length}
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

export default Facility02;
