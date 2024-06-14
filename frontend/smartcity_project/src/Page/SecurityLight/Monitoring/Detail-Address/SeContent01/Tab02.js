import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import {SecurityLightContext} from "../../../../../ContextServer/SecurityContext";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@mui/material";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function Tab02() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {num01, setNum01} = useContext(SecurityLightContext);
    const [getList, setGetList] = useState([]);
    const [index, setIndex] = useState(0);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        fetch(`/api/exam/selectExamList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => setGetList(res.data))
    }


    return (
        <div>
            <TableContainer>
                <Table sx={{minWidth: 1280}} aria-label="simple table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell style={TextWhite}>장비번호</TableCell>
                            <TableCell style={TextWhite}>신고내역</TableCell>
                            <TableCell style={TextWhite}>요청일자</TableCell>
                            <TableCell style={TextWhite}>민원처리상태</TableCell>
                            <TableCell style={TextWhite}>신고자성명</TableCell>
                            <TableCell style={TextWhite}>담당자업체</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a, i) {
                                    return (
                                        <TableRow onClick={() => {
                                            setNum01((rowsPerPage * page) + i);
                                            setIndex(a.sl_exam_idx)
                                        }} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                  className="tableHover">
                                            <TableCell style={{width: "10px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.lamp_id}</TableCell>
                                            <TableCell style={{width: "10px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_content}</TableCell>
                                            <TableCell style={{width: "10px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_bgn_date}</TableCell>
                                            <TableCell style={{width: "20px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_status}</TableCell>
                                            <TableCell style={{width: "20px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_user}</TableCell>
                                            <TableCell>{a.exam_company}</TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 15, 25]}
                component="div"
                count={getList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={Paginations}

            />
        </div>
    )
}

export default Tab02;