import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {TablePagination} from "@mui/material";
import {AppBar} from "@progress/kendo-react-layout";
import {
    DetailExitIcon,
    Paginations,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function KpContent03() {
    const {access, RefreshToken} = useContext(LoginContext);
    const [list, setList] = useState([]);

    const navigate = useNavigate();
    const GoKp = () => {
        navigate('/kpi/manage');
    }
    //페이징처리
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const KpiList = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/kpi/dataList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setList(res.data);
        })
    }

    useEffect(() => {
        KpiList();
    }, []);


    return (
        <div>
            <AppBar themeColor={"light"}>
                <div className="Kp-Detail01">
                    <p className="k-icon k-i-x" style={DetailExitIcon} onClick={GoKp}></p>
                    <h1>통계등록리스트</h1>
                    <TableContainer>
                        <Table sx={{minWidth: "90%"}} aria-label="simple table">
                            <TableHead style={TableHeader}>
                                <TableRow>
                                    <TableCell style={TextWhite}>날짜</TableCell>
                                    <TableCell style={TextWhite}>카테고리</TableCell>
                                    <TableCell style={TextWhite}>횟수</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    list
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (a, i) {
                                            return (
                                                <TableRow className="tableHover">
                                                    <TableCell style={TableCells}>{a.kmonth}</TableCell>
                                                    <TableCell style={TableCells}>{a.name}</TableCell>
                                                    <TableCell style={TableCells}>{a.count}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[15, 30, 60, 100]}
                        component="div"
                        count={list.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={Paginations}
                    />
                </div>
            </AppBar>
        </div>
    )
}

export default KpContent03;




