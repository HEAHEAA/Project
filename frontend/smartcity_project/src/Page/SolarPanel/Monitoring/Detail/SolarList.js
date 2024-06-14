import {useContext, useEffect, useState} from "react";
import {SolarPanelContext} from "../../../../ContextServer/SolarPanelContext";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@mui/material";
import * as React from "react";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function SolarList() {
    const {solarList,SolarGetListData,setSolarMapId} = useContext(SolarPanelContext);

    useEffect(() => {
        SolarGetListData();
    }, []);

    const [count,setCount] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <div className="shade-table">
                <Button></Button>
                <TableContainer style={{marginTop: "-3vh", cursor: "default"}} sx={{
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
                    <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell size={"small"} style={TextWhite}>시설물 주소</TableCell>
                                <TableCell size={"small"} style={TextWhite}>시설물 명</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                solarList
                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    ?.map(function (a, i) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + i} onClick={()=>{
                                            setSolarMapId(a.posnm)
                                            setCount(a.pos_addr);
                                        }} className={count === a.pos_addr ? 'tableHovers' : ''}>
                                            <TableCell size={"small"} style={TableCells}>{a.posnm}</TableCell>
                                            <TableCell size={"small"} style={TableCells}>{a.pos_addr}</TableCell>
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
                    rowsPerPageOptions={[20, 40, 60, 100]}
                    component="div"
                    count={solarList.length}
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

export default SolarList;