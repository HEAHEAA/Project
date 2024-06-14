import {useNavigate} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../ContextServer/LoginContext";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {TablePagination} from "@mui/material";
import {
    DetailExitIcon,
    Paginations, TableCells,
    TableHeader,
    TextBlack,
    TextWhite
} from "../../../Componet/style-config/light-theme";

function UsContent03(){
    const {access,RefreshToken,userId} = useContext(LoginContext);
    const [user,setUser] = useState([]); //사용자 목록 list
    const [userBtn,setUserBtn] = useState(0);
    const [oneDayUser,setOneDayUser] = useState([]); // 일일 사용자 로그
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigate = useNavigate();
    const GoUs = () => {
        navigate('/users');
    }
    //사용자 로그
    useEffect(()=>{
        userOnDayLog();
    },[]);

    const userOnDayLog = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/log/list/page`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => setOneDayUser(res.data))
    }



    return(
        <div>
            <div className="Us-Detail01">
                <p className="k-icon k-i-x" style={DetailExitIcon} onClick={GoUs}></p>

                <div className="Us-Detail-table">
                    <h1 style={TextBlack}>사용자 로그</h1>

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
                                oneDayUser
                                    .slice(0).reverse()
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

                    <TablePagination
                        sx={{minWidth: "100%"}}
                        variant="outlined"
                        rowsPerPageOptions={[15, 30, 50, 100]}
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
        </div>
    )
}
export default UsContent03;