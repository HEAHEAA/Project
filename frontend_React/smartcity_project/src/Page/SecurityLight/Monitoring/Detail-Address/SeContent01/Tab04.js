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
import {TableCells} from "../../../../../Componet/style-config/light-theme";
function Tab04() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {setNum03} = useContext(SecurityLightContext);
    const [getList, setGetList] = useState([]);
    const [index, setIndex] = useState(0);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        fetch(`/api/strLamp/dm/select`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => setGetList(res.data))
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <TableContainer>
                <Table sx={{minWidth: 1280}} aria-label="simple table">
                    <TableHead style={{backgroundColor: "#232323"}}>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>프로파일 ID</TableCell>
                            <TableCell>프로파일명</TableCell>
                            <TableCell>연결된 게이트웨이</TableCell>
                            <TableCell>적용유형</TableCell>
                            <TableCell>적용 시작일</TableCell>
                            <TableCell>동적 디밍갯수</TableCell>
                            <TableCell>사용여부</TableCell>
                            <TableCell>등록일자</TableCell>
                            <TableCell>등록자</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{backgroundColor: "#3a3a3a"}}>
                        {
                            getList.map(function (a, i) {
                                return (
                                    <TableRow key={i} onClick={() => {
                                        setNum03((rowsPerPage * page) + i);
                                        setIndex(a.sldm_idx)
                                    }} className="tableHover">
                                        <TableCell style={TableCells}>{i + 1}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_profile}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_profile_name}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_gateway}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_apply_category}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_apply_bgn_date}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_dynamic_diming}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_use === '1' ? '사용' : '미사용'}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_reg_date}</TableCell>
                                        <TableCell style={TableCells}>{a.sldm_user}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 15, 25]}
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


export default Tab04;