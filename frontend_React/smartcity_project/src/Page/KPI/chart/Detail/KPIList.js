import {useContext, useEffect, useState} from "react";
import {KpiContext} from "../../../../ContextServer/KpiContext";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import TableBody from "@mui/material/TableBody";
import {Table} from "react-bootstrap";
import KpiListModal from "../Modal/KpiListModal";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {TablePagination} from "@mui/material";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function KPIList() {
    const {KpiList, kpiAllList,filteredPositions08,} = useContext(KpiContext);
    const {access, RefreshToken} = useContext(LoginContext);
    const [open, setOpen] = React.useState(false);
    const [editId, setEditId] = useState('');

    const [cate, setCate] = useState('');
    const [kmoth, setKmonth] = useState('');
    const [count, setCount] = useState(0);



    //페이징처리
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const GetEditId = async (id) => {
        for (let list of kpiAllList) {
            if (list.kpi_idx === id) {
                setCate(list.category);
                setKmonth(list.kmonth);
                setCount(list.count);
            }
        }
        setEditId(id);
    }



    const EditKpiData = async () => {
        for (let list of kpiAllList) {
            if (list.kpi_idx === editId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/kpi/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        category: cate,
                        kmonth: kmoth,
                        count: count,
                        kpi_idx: list.kpi_idx
                    })
                })
            }
        }
        setCate('');
        setKmonth('');
        setCount(0);
        KpiList();
    }

    const Delete = async () => {
        for (let list of kpiAllList) {
            if (list.kpi_idx === editId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/kpi/delete`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        kpi_idx: list.kpi_idx
                    })
                })
            }
        }
        KpiList();
    }


    return (
        <div>


                    <KpiListModal
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        EditKpiData={EditKpiData}
                        cate={cate}
                        setCate={setCate}
                        kmoth={kmoth}
                        setKmonth={setKmonth}
                        count={count}
                        setCount={setCount}
                        Delete={Delete}
                    />
            <div className="kpi01">
                    <TableContainer>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead style={TableHeader}>
                                <TableRow>
                                    <TableCell align={"center"} style={TextWhite}>날짜</TableCell>
                                    <TableCell align={"center"} style={TextWhite}>카테고리</TableCell>
                                    <TableCell align={"center"} style={TextWhite}>횟수</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ maxHeight: `${filteredPositions08[2].rowSpan}0vh`}}>
                                {
                                    kpiAllList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (a, i) {
                                            return (
                                                <TableRow className="tableHover" onClick={() => {
                                                    handleOpen();
                                                    GetEditId(a.kpi_idx);
                                                }}>
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
                        rowsPerPageOptions={[5, 6, 9, 100]}
                        component="div"
                        count={kpiAllList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={Paginations}
                    />

                </div>

        </div>
    )
}

export default KPIList;