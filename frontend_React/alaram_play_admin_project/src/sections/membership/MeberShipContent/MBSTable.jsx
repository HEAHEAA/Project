import {Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import EditUser from "./modal/EditUser.jsx";
import {useContext, useEffect, useState} from "react";
import {MemberContext} from "../../../context/MemberContext.jsx";
//전체 회원
export const AllMemBer = () => {
    const {memberList, allFilter} = useContext(MemberContext);

    //1. 페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([memberList]);
    const lastPage = memberList.length % 15 === 0 ? memberList.length / 15 : memberList.length / 15 + 1;
    let allPage = Math.ceil(memberList.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(memberList.slice(15 * (page - 1)));
        } else {
            setData(memberList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, memberList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    return (
        <div>
            <br/>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>아이디</TableCell>
                            <TableCell>승인 여/부</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            data?.filter((dataIs) => {
                                const title = dataIs.user_id?.toLowerCase();
                                const input = allFilter.toLowerCase();
                                return title?.includes(input);
                            }).map((arr, inx) => (
                                <TableRow key={arr.dt_op_user_id}>
                                    <TableCell>{inx + 1}</TableCell>
                                    <TableCell>{arr.user_name}</TableCell>
                                    <TableCell>{arr.user_id}</TableCell>
                                    <TableCell>
                                        {arr.user_status === 1 ?
                                            <p style={{color: "#1c63c2"}}>승인완료</p> :
                                            <p style={{color: "#ff883a"}}>승인대기</p>}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Pagination
                count={allPage}
                onChange={(e) => handlePage(e)}
            />
        </div>
    )
}

//승인대기
export const MemberSignOff = () => {
    const {
        signupOffList,
        checkItem, //체크값
        handleAllCheck, //전체 체크값
        handleCheck, //싱글 체크값
        signOffFilter
    } = useContext(MemberContext);


    //1. 페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([signupOffList]);
    const lastPage = signupOffList.length % 15 === 0 ? signupOffList.length / 15 : signupOffList.length / 15 + 1;
    let allPage = Math.ceil(signupOffList.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(signupOffList.slice(15 * (page - 1)));
        } else {
            setData(signupOffList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, signupOffList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }
    return (
        <div>
            <br/>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                        <TableRow>
                            <TableCell>
                                <Checkbox name="select-all" onChange={(e) => handleAllCheck(e.target.checked)}/>
                            </TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>아이디</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>

                        {
                            data?.filter((dataIs) => {
                                const title = dataIs.user_id?.toLowerCase();
                                const input = signOffFilter.toLowerCase();
                                return title?.includes(input);
                            }).map((arr, inx) => (
                                <TableRow key={arr.dt_op_user_id}>
                                    <TableCell>
                                        <Checkbox name={`select-${arr.user_id}`}
                                                  onChange={(e) => handleCheck(e.target.checked, arr.user_id)}
                                                  checked={checkItem.includes(arr.user_id)}/>
                                    </TableCell>
                                    <TableCell>{arr.user_name}</TableCell>
                                    <TableCell>{arr.user_id}</TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={allPage}
                        onChange={(e) => handlePage(e)}/>
        </div>
    )
}

//승인완료
export const MemberSignOn = () => {
    const {signupOnList, GetEditUserInfo,signOnFilter} = useContext(MemberContext);

    //1. 페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([signupOnList]);
    const lastPage = signupOnList.length % 15 === 0 ? signupOnList.length / 15 : signupOnList.length / 15 + 1;
    let allPage = Math.ceil(signupOnList.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(signupOnList.slice(15 * (page - 1)));
        } else {
            setData(signupOnList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, signupOnList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    //정보수정 모달 이벤트
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <br/>
            <EditUser open={open} handleClose={handleClose}/>

            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>아이디</TableCell>
                            <TableCell>수정</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            data?.filter((dataIs) => {
                                const title = dataIs.user_id?.toLowerCase();
                                const input = signOnFilter.toLowerCase();
                                return title?.includes(input);
                            }).map((arr, inx) => (
                                <TableRow key={arr.dt_op_user_id}>
                                    <TableCell>{inx + 1}</TableCell>
                                    <TableCell>{arr.user_name}</TableCell>
                                    <TableCell>{arr.user_id}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" onClick={() => {
                                            handleOpen();
                                            GetEditUserInfo(arr.dt_op_user_id);
                                        }}>정보 수정</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={allPage}
                        onChange={(e) => handlePage(e)}/>
        </div>
    )
}
