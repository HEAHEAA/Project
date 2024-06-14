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

function Tab03() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {setNum02} = useContext(SecurityLightContext);

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
        fetch(`/api/strLamp/em/select`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json())
            .then(res => setGetList(res.data))
    }

    return (
        <div>
            <TableContainer>
                <Table sx={{minWidth: 1280}} aria-label="simple table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell style={TextWhite}>번호</TableCell>
                            <TableCell style={TextWhite}>프로파일 ID</TableCell>
                            <TableCell style={TextWhite}>프로파일명</TableCell>
                            <TableCell style={TextWhite}>연결된 게이트 웨이</TableCell>
                            <TableCell style={TextWhite}>SSLC 수량</TableCell>
                            <TableCell style={TextWhite}>리피터 수량</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a, i) {
                                    return (
                                        <TableRow key={i} onClick={() => {
                                            setNum02((rowsPerPage * page) + i);
                                            setIndex(a.slem_idx);
                                        }} className="tableHover">
                                            <TableCell style={TableCells}>{i + 1}</TableCell>
                                            <TableCell style={TableCells}>{a.slem_profile_id}</TableCell>
                                            <TableCell style={TableCells}>{a.slem_profile_name}</TableCell>
                                            <TableCell style={TableCells}>{a.slem_gateway}</TableCell>
                                            <TableCell style={TableCells}>{a.slem_sslc}</TableCell>
                                            <TableCell style={TableCells}>{a.slem_repeater}</TableCell>
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

export default Tab03;