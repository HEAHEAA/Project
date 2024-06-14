import {useContext, useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {TablePagination} from "@mui/material";
import * as React from "react";
import {SecurityLightContext} from "../../../../ContextServer/SecurityContext";
import SecurityFacUpdate from "./FacUpdate/SecurityFacUpdate";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function SecurityFacAllList(){
    const { facAllList,SecurityFacList,GetEditFacId  } = useContext(SecurityLightContext);

    useEffect(()=>{
        SecurityFacList();
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

    //입력 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div>
            <SecurityFacUpdate open={open} handleClose={handleClose}/>
            <div className="fa01">
                <TableContainer style={{cursor: "default"}}>
                    <Table sx={{minWidth: "100%"}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell align={"center"} style={TextWhite}>수정 </TableCell>
                                <TableCell align={"center"} style={{width: 50, color: TextWhite.color}}>지점명</TableCell>
                                <TableCell align={"center"} style={{width: 150,color: TextWhite.color}}>설치주소</TableCell>
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
                                                    <Button color="secondary" variant="outlined" size={"small"} onClick={()=>{
                                                        GetEditFacId(a.fl_idx);
                                                        handleOpen();
                                                    }}>
                                                        수정
                                                    </Button>
                                                </TableCell>

                                                <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.fl_code}</TableCell>
                                                <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.fl_name}</TableCell>
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
                    style={Paginations}
                    size={"small"}
                />
            </div>
        </div>
    )
}
export default SecurityFacAllList;