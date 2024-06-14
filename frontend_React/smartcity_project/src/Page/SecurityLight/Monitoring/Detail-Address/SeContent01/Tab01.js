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
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function Tab01() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {open01, setOpen, num01, setNum01} = useContext(SecurityLightContext);
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


    const [opens, setOpens] = useState(false);

    return (
        <div>
            <TableContainer>

                <Table sx={{minWidth: 1250}} aria-label="simple table">
                    <TableHead style={{backgroundColor: "#232323"}}>
                        <TableRow>
                            <TableCell>장비번호</TableCell>
                            <TableCell>요청내역</TableCell>
                            <TableCell>등 구분</TableCell>
                            <TableCell>업체</TableCell>
                            <TableCell>지역</TableCell>
                            <TableCell>요청일자</TableCell>
                            <TableCell>상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a, i) {
                                    return (
                                        <TableRow key={i} onClick={() => {
                                            setOpens(true);
                                            setNum01((rowsPerPage * page) + i);
                                            setIndex(a.sl_exam_idx)
                                        }} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                  className="tableHover">
                                            <TableCell>{a.lamp_id}</TableCell>
                                            <TableCell>{a.exam_content}</TableCell>
                                            <TableCell>{a.lamp_cate}</TableCell>
                                            <TableCell>{a.exam_company}</TableCell>
                                            <TableCell>{a.lamp_region}</TableCell>
                                            <TableCell>{a.exam_bgn_date}</TableCell>
                                            <TableCell>{a.exam_status}</TableCell>
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
                style={{width: "100%", backgroundColor: "#2c2c2c"}}

            />


        </div>
    )
}


export default Tab01;