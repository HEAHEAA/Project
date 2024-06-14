import * as React from "react";
import {AiOutlineNotification} from "react-icons/ai";
import {Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Pagination} from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {useContext, useEffect, useState} from "react";
import {NoticeContext} from "../../../api/system/NoticeContext.jsx";
import {useNavigate} from "react-router-dom";


let len = window.innerWidth;
const selectBox = {
    pc: {
        marginTop: 2,
        width: 150
    },
    tablet: {
        marginTop: 0,
        width: "95%",
        marginLeft: "5%"
    },
    phone: {
        marginTop: 2,
        width: "95%",
        marginLeft: 2.5
    }
}

const InputBox = {
    pc: {
        marginTop: 2,
        marginLeft: 1,
        width: "500px"
    },
    tablet: {
        marginTop: 2,
        marginLeft: "5%",
        width: "75%",
    },
    phone: {
        marginTop: 2,
        marginLeft: 2.5,
        width: "70%"
    }
}


const ButtonBox = {
    pc: {
        marginTop: 2,
        marginLeft: 1,
        height: "4vh"
    },
    tablet: {
        marginTop: 2,
        marginLeft: 1,
        height: "4.5vh"
    },
    phone: {
        marginTop: 2,
        marginLeft: 1,
        height: "8vh"
    }
}


const successBox = {
    pc: {
        marginTop: 2,
        marginLeft: 2,
        height: "4vh",
        width: 100
    },
    tablet: {
        marginTop: 2,
        marginLeft: "5%",
        height: "4vh",
        width: "30%"
    },
    phone: {
        marginTop: 2,
        marginLeft: 3,
        height: "7vh",
        width: "40%"
    }
}

function NoticeSystem() {
    const {
        NoticeGetOnSubmit
        , data, handlePage,
        GetNoticeEditId,
        checkItem, setCheckItem,
        handleAllCheck,
        handleCheck,
        DeleteNoticeOnSubmit,
        allPage,

        startDate, setStartDate,
        endDate, setEndDate,

    } = useContext(NoticeContext);
    const navigate = useNavigate();

    const [filter,setFilter] = useState(''); //검색용

    useEffect(() => {
        NoticeGetOnSubmit();
    }, [startDate,endDate]);



    return (
        <div>
            <div className="dashboard">
                <div className="customer-head">
                    <div className="customer-head-icon">
                        <AiOutlineNotification
                            style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                    </div>
                    <div className="customer-head-p">
                        <span>공지사항 관리</span>
                    </div>
                </div>
                <div className="total-ml-content">
                    <div className="al-section-head">
                        <div className="al-start">
                            <TextField id="outlined-basic"
                                       type={"date"}
                                       variant="outlined"
                                       sx={{marginTop: 2,}}
                                       value={startDate}
                                       onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="al-smooth">
                            <span> ~ </span>
                        </div>
                        <div className="al-End">
                            <TextField id="outlined-basic"
                                       type={"date"}
                                       variant="outlined"
                                       sx={{marginTop: 2}}
                                       value={endDate}
                                       onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className="al-section-head2">
                        {/*<FormControl*/}
                        {/*    sx={len > 1200 ? selectBox.pc :*/}
                        {/*        (len > 750 ? selectBox.tablet :*/}
                        {/*            (len > 0 ? selectBox.phone :*/}
                        {/*                null))}*/}
                        {/*>*/}
                        {/*    <InputLabel id="demo-simple-select-label">전체</InputLabel>*/}
                        {/*    <Select*/}
                        {/*        labelId="demo-simple-select-label"*/}
                        {/*        id="demo-simple-select"*/}
                        {/*        label="Age"*/}
                        {/*    >*/}
                        {/*        <MenuItem>제목순</MenuItem>*/}
                        {/*        <MenuItem>내용순</MenuItem>*/}
                        {/*    </Select>*/}
                        {/*</FormControl>*/}

                        <TextField id="outlined-basic"
                                   variant="outlined"
                                   sx={len > 1200 ? InputBox.pc :
                                       (len > 750 ? InputBox.tablet :
                                           (len > 0 ? InputBox.phone :
                                               null))}
                                   onChange={(e) => {
                                       const inputValue = e.target.value;
                                       setFilter(inputValue);
                                   }} value={filter}
                        />
                        <Button variant="contained"
                                sx={len > 1200 ? ButtonBox.pc :
                                    (len > 750 ? ButtonBox.tablet :
                                        (len > 0 ? ButtonBox.phone :
                                            null))}
                                color={"inherit"}>
                            검색
                        </Button>


                        <Button variant="contained"
                                sx={len > 1200 ? successBox.pc :
                                    (len > 750 ? successBox.tablet :
                                        (len > 0 ? successBox.phone :
                                            null))}
                                onClick={() => {
                                    navigate('/system/notice/add')
                                }}
                        >
                            등록
                        </Button>
                        <Button variant="contained"
                                sx={len > 1200 ? successBox.pc :
                                    (len > 750 ? successBox.tablet :
                                        (len > 0 ? successBox.phone :
                                            null))}
                                color={"warning"} onClick={()=>{
                                    if(window.confirm('정말 삭제하시겠습니까?')){
                                        DeleteNoticeOnSubmit();
                                    }
                        }}>
                            삭제
                        </Button>


                    </div>


                    <div className="notice-body">
                        <TableContainer>
                            <Table>
                                <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                    <TableRow>
                                        <TableCell>
                                            <input type="checkbox" name="select-all" onChange={(e) => handleAllCheck(e.target.checked)}/>
                                        </TableCell>
                                        <TableCell>제목</TableCell>
                                        <TableCell>내용</TableCell>
                                        <TableCell>업로드일</TableCell>
                                        <TableCell>게시시작일</TableCell>
                                        <TableCell>게시종료일</TableCell>
                                        <TableCell>작성자</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        [...data]
                                            .reverse()
                                            .filter((data) => {
                                                const title = data.notice_title.toLowerCase();
                                                const input  = filter.toLowerCase();
                                                return title.includes(input)
                                            })
                                            .map((arr, inx) => (
                                            <TableRow key={arr.notice_idx}>
                                                <TableCell>
                                                    <input type={"checkbox"} name={`select-${arr.notice_idx}`}
                                                           onChange={(e) => handleCheck(e.target.checked, arr.notice_idx)}
                                                           checked={checkItem.includes(arr.notice_idx)}/>
                                                </TableCell>
                                                <TableCell onClick={() => {GetNoticeEditId(arr.notice_idx);navigate('/system/notice/detail')}}>
                                                    {arr.notice_title}
                                                </TableCell>
                                                <TableCell onClick={() => {GetNoticeEditId(arr.notice_idx);navigate('/system/notice/detail')}}>
                                                    {arr.notice_content?.substring(0, 30)}...
                                                </TableCell>
                                                <TableCell onClick={() => {GetNoticeEditId(arr.notice_idx);navigate('/system/notice/detail')}}>
                                                    {arr.notice_reg_date?.substring(0, 16)}
                                                </TableCell>
                                                <TableCell onClick={() => {GetNoticeEditId(arr.notice_idx);navigate('/system/notice/detail')}}>
                                                    {arr.notice_start_date?.substring(0, 16)}
                                                </TableCell>
                                                <TableCell>{arr.notice_end_date?.substring(0, 16)}</TableCell>
                                                <TableCell onClick={() => {GetNoticeEditId(arr.notice_idx);navigate('/system/notice/detail')}}>
                                                    YJTECH
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Pagination count={allPage} variant="outlined"
                                defaultPage={1}
                                sx={
                                    window.innerWidth > 1200 ? {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                                        {width: "100%", marginLeft: "0%", marginTop: "1vh"}}
                                onChange={(e) => handlePage(e)}
                    />
                </div>
            </div>

        </div>
    )
}

export default NoticeSystem;