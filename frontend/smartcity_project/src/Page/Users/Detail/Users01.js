import {useContext, useState} from "react";
import {UserContext} from "../../../ContextServer/UserContext";
import {TablePagination} from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import TableBody from "@mui/material/TableBody";
import UserAuth from "./UserAuthPopUp/UserAuth";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../Componet/style-config/light-theme";

function Users01() {
    const {user, userBtn, setUserBtn,GetEditUserId} = useContext(UserContext);
    let useFilter = user.filter((data) => data.user_status_nm === "사용");


    //권한부여 모달 표출 시, 현재값 보여주는 hook
    const [userModal,setUserModal] = useState(false);

    //권한관리 모달 띄워주는 이벤
    const [open, setOpen] = React.useState(false);

    //페이지
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //권한모달 띄우는 이벤트
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const[userId,setUserId] = useState('');


    return (
        <div style={{marginTop: "-3vh"}}>
            <UserAuth open={open} setOpen={setOpen} handleClose={handleClose}
                userModal={userModal} setUserModal={setUserModal} userId={userId}
            />


            <div className="ur01">
                <TableContainer>
                    <Table sx={{minWidth: 550}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell style={TextWhite}>번호</TableCell>
                                <TableCell style={TextWhite}>사용자</TableCell>
                                <TableCell style={TextWhite}>사용자 이름</TableCell>
                                <TableCell style={TextWhite}>사용자 구분</TableCell>
                                <TableCell style={TextWhite}>사용유무</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                useFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(function (arr, inx) {
                                    return (
                                        <TableRow onClick={() => {
                                            setUserBtn(inx + 1);
                                            GetEditUserId(arr.user_id);
                                            handleOpen();
                                            setUserModal(true);
                                            setUserId(arr.user_id);
                                        }} className="tableHover" key={(rowsPerPage * page) + inx}>
                                            <TableCell style={TableCells}>{inx+1}</TableCell>
                                            <TableCell style={TableCells}>{arr?.user_id}</TableCell>
                                            <TableCell style={TableCells}>{arr?.user_name}</TableCell>
                                            <TableCell style={TableCells}>{arr?.sys_op_user_class_id === "1" ? '관리자' : (
                                                arr?.sys_op_user_class_id === "2" ? '일반관리자' : (
                                                    arr?.sys_op_user_class_id === "3" ? '일반사용자' : '권한없음'
                                                )
                                            )}</TableCell>
                                            <TableCell style={TableCells}>{arr?.user_status_nm}</TableCell>
                                        </TableRow>
                                    )

                                })
                            }
                        </TableBody>
                    </Table>

                </TableContainer>

            </div>
            <TablePagination
                sx={{minWidth: "100%"}}
                variant="outlined"
                rowsPerPageOptions={[5, 14, 21, 100]}
                component="div"
                count={useFilter.length -1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={Paginations}
                size={"small"}
            />

        </div>
    )
}

export default Users01;
