import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select, TablePagination} from "@mui/material";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {AppBar} from "@progress/kendo-react-layout";
import {LoginContext} from "../../../ContextServer/LoginContext";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import {
    DetailExitIcon,
    Paginations, TableCells,
    TableHeader,
    TextBlack,
    TextWhite
} from "../../../Componet/style-config/light-theme";


function UsContent01() {
    const navigate = useNavigate();
    const GoUs = () => {
        navigate('/users');
    }


    const {access, RefreshToken, userId} = useContext(LoginContext);
    const [user, setUser] = useState([]); //사용자 목록 list
    const [userBtn, setUserBtn] = useState(0);
    const [oneDayUser, setOneDayUser] = useState([]); // 일일 사용자 로그
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //사용자 목록 리스트 GET API
    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/user/userList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setUser(res.data);
            })
    }


    return (
        <div>
            <AppBar themeColor={"light"}>
                <div className="Us-Detail01">
                    <p className="k-icon k-i-x" style={DetailExitIcon} onClick={GoUs}></p>
                    <div className="Us-Detail-table">
                        <h1 style={TextBlack}>사용자 목록</h1>

                        <FormControl variant="filled" sx={{m: 1, minWidth: "20%"}} id="dropdown04">
                            <InputLabel id="demo-simple-select-filled-label">전체</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled">
                                <MenuItem>관리자</MenuItem>
                                <MenuItem>사용자</MenuItem>
                            </Select>
                        </FormControl>

                        <Button variant="contained" size={"large"} className="user-btn"
                                style={{marginRight: "0.5vh", marginTop: "1vh"}}>조회</Button>

                        <TableContainer>
                            <Table sx={{minWidth: "100%"}} aria-label="simple table">
                                <TableHead style={TableHeader}>
                                    <TableRow>
                                        <TableCell style={TextWhite}>번호</TableCell>
                                        <TableCell style={TextWhite}>사용자</TableCell>
                                        <TableCell style={TextWhite}>사용자 구분</TableCell>
                                        <TableCell style={TextWhite}>사용유무</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user
                                        .filter((users) => users.user_status === 1)
                                        .map(function (arr, inx) {
                                            return (
                                                <TableRow onClick={() => {
                                                    setUserBtn(inx);
                                                }} className="tableHover">
                                                    <TableCell style={TableCells}>{inx + 1}</TableCell>
                                                    <TableCell style={TableCells}>{arr?.user_id}</TableCell>
                                                    <TableCell style={TableCells}>{arr?.user_name}</TableCell>
                                                    <TableCell style={TableCells}>{arr?.user_status_nm}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[5, 14, 21, 100]}
                            component="div"
                            count={user.length - 1}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={Paginations}
                            size={"small"}
                        />
                    </div>
                </div>
            </AppBar>

        </div>
    )
}

export default UsContent01;
