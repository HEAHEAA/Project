import {useContext, useState} from "react";
import {UserContext} from "../../../ContextServer/UserContext";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import {TablePagination} from "@mui/material";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../Componet/style-config/light-theme";

function Users03() {
    const {oneDayUser} = useContext(UserContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <div className="ur02">
                <TableContainer>
                    <Table sx={{minWidth: 550}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell style={TextWhite}>번호</TableCell>
                                <TableCell style={TextWhite}>사용자구분</TableCell>
                                <TableCell style={TextWhite}>사용메뉴</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                oneDayUser.slice(0).reverse()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(function (arr,inx) {
                                    return(
                                        <TableRow className="tableHover" key={(rowsPerPage * page) + inx}>
                                            <TableCell style={TableCells}>{inx+1}</TableCell>
                                            <TableCell style={TableCells}>{arr?.user_id}</TableCell>
                                            <TableCell style={TableCells}>{arr?.url}</TableCell>
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
                    rowsPerPageOptions={[5, 14, 21, 100]}
                    component="div"
                    count={oneDayUser.length}
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

export default Users03;