import * as React from "react";
import {FaBuffer} from "react-icons/fa6";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmailPOP from "./emailPopUp/EmailPOP.jsx";
import {CiEdit, CiCircleRemove} from "react-icons/ci";
import {AiOutlineDelete} from "react-icons/ai";
import {Pagination} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../api/customer/AppContext.jsx";


let len = window.innerWidth;

//검색용 셀렉트 박스
const selectBox = {
    pc: {
        marginLeft: 1,
        marginTop: 1,
        width: "10%"
    },
    tablet: {
        marginLeft: 1,
        marginTop: 1,
        width: "95%"
    },
    phone: {
        marginLeft: 1,
        marginTop: 1,
        width: "95%"
    }
}

//검색용 인풋박스
const InputBox = {
    pc: {
        marginLeft: 1,
        marginTop: 1,
        width: "20%"
    },
    tablet: {
        marginLeft: 1,
        marginTop: 1,
        width: "80%"
    },
    phone: {
        marginLeft: 1,
        marginTop: 1,
        width: "100%"
    }
}


//검색용 버튼박스
const ButtonBox = {
    pc: {
        marginLeft: 1,
        marginTop: 1.2,
        width: "6%",
        height: "5vh"
    },
    tablet: {
        marginLeft: 1,
        marginTop: 1.2,
        width: "10%",
        height: "5vh"
    },
    phone: {
        marginLeft: 1,
        marginTop: 1.2,
        width: "20%",
        height: "7vh"
    }
}


//검색용 이메일박스
const emailBox = {
    pc: {
        marginLeft: 1,
        marginTop: 1,
        width: "45%",
        height: "4.5vh"
    },
    tablet: {
        marginLeft: 1,
        marginTop: 1,
        width: "45%",
        height: "4.5vh"
    },
    phone: {
        marginLeft: 2,
        marginTop: 1,
        width: "45%",
        height: "4.5vh",
    }
}

function CustomerAppDown() {
    const {
        //데이터 리스트
        AppListGetOnSubmit,
        handlePage,
        data,allPage,

        //데이터 선택
        handleAllCheck, handleCheck,
        checkItem,

        //데이터삭제
        DeleteUserAppSubmit,

    } = useContext(AppContext);

    useEffect(() => {
        AppListGetOnSubmit();
    }, []);



    //3.아이디 입력등록
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [filter,setFilter] = useState(''); //검색용


    return (
        <div>
            <EmailPOP open={open} handleClose={handleClose}/>


            <div className="dashboard">
                <div className="customer-head">
                    <div className="customer-head-icon">
                        <FaBuffer style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                    </div>
                    <div className="customer-head-p">
                        <span>앱설치현황 </span>
                    </div>
                </div>
                <div className="customer-user">
                    <div className="customer-user-app-head">
                        {/*<FormControl sx={len > 1200 ? selectBox.pc :*/}
                        {/*    (len > 750 ? selectBox.tablet :*/}
                        {/*        (len > 0 ? selectBox.phone :*/}
                        {/*            null))}>*/}
                        {/*    <InputLabel id="demo-simple-select-label">전체</InputLabel>*/}
                        {/*    <Select*/}
                        {/*        labelId="demo-simple-select-label"*/}
                        {/*        id="demo-simple-select"*/}
                        {/*        className="customer-user-head-select"*/}
                        {/*    >*/}
                        {/*        <MenuItem>휴대전화번호</MenuItem>*/}
                        {/*    </Select>*/}
                        {/*</FormControl>*/}


                        <TextField id="outlined-basic"
                                   label="검색"
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

                        <div className="customer-user-head-detail2">
                            <Button variant="contained" color={"warning"} size={"large"}
                                    sx={len > 1200 ? emailBox.pc :
                                        (len > 750 ? emailBox.tablet :
                                            (len > 0 ? emailBox.phone :
                                                null))}
                                    onClick={()=>{
                                        DeleteUserAppSubmit();
                                    }}
                            >
                                삭제 <AiOutlineDelete style={{fontSize: 20, marginLeft: 5}}/>
                            </Button>
                            <Button variant="contained" size={"large"}
                                    sx={len > 1200 ? emailBox.pc :
                                        (len > 750 ? emailBox.tablet :
                                            (len > 0 ? emailBox.phone :
                                                null))}
                                    onClick={handleOpen}
                            >
                                사용자 ID 등록 <CiEdit style={{fontSize: 20, marginLeft: 5}}/>
                            </Button>
                        </div>
                    </div>
                    <div className="customer-user-body">
                        <div className="customer-user-table">
                        <TableContainer>
                            <Table>
                                <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                    <TableRow>
                                        <TableCell>
                                            <input type={"checkbox"} name="select-all" onChange={(e) => handleAllCheck(e.target.checked)}/>
                                        </TableCell>
                                        <TableCell>사용자ID</TableCell>
                                        <TableCell>설치일</TableCell>
                                        <TableCell>최종업데이트일</TableCell>
                                        <TableCell>삭제일</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data
                                            .filter((data) => {
                                                const title = data.clnt_user_id.toLowerCase();
                                                const input  = filter.toLowerCase();
                                                return title.includes(input)
                                            })
                                            .map((arr, inx) => (
                                            <TableRow>
                                                <TableCell>
                                                    <input type={"checkbox"} name={`select-${arr.clnt_user_id}`}
                                                           onChange={(e) => handleCheck(e.target.checked, arr.clnt_user_id)}
                                                           checked={checkItem.includes(arr.clnt_user_id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{arr.clnt_user_id}</TableCell>
                                                <TableCell>{arr.app_install_date?.substring(0,16)}</TableCell>
                                                <TableCell>{arr.app_install_date?.substring(0,16)}</TableCell>
                                                <TableCell>{arr.app_delete_date?.substring(0,16)}</TableCell>

                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
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

export default CustomerAppDown;