import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import Button from "@mui/material/Button";
import {TablePagination} from "@mui/material";
import StationFacUpdate from "./FacUpdate/StationFacUpdate";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function StationFacAllList() {
    const {StationFacList, facAllList, GetEditFacId,} = useContext(StationContext);

    useEffect(() => {
        StationFacList();
    }, []);


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


    //입력 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <StationFacUpdate open={open} handleClose={handleClose}/>
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
                    <Table sx={{minWidth: "100%"}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell align={"center"} style={TextWhite}>수정 </TableCell>
                                <TableCell align={"center"} style={{width: 50, color:TextWhite.color}}>지점명</TableCell>
                                <TableCell align={"center"} style={{width: 150,color:TextWhite.color}}>설치주소</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                [...facAllList]
                                    .reverse()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(function (a, i) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + i}>
                                            <TableCell style={TableCells}>
                                                <Button color="secondary" variant="outlined" size={"small"} onClick={()=>{GetEditFacId(a.fl_idx);handleOpen();}}>수정</Button>
                                            </TableCell>

                                            <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>{a.fl_code}</TableCell>
                                            <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>{a.fl_name}</TableCell>
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
                    count={facAllList.length}
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

export default StationFacAllList;