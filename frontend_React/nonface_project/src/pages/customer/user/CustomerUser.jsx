import {MdPersonSearch} from "react-icons/md";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import * as React from "react";
import {Pagination} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../api/all/UserContext.jsx";
import {GroupContext} from "../../../api/all/GroupContext.jsx";
import {useNavigate} from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import MethodModal from "./modal/MethodModal.jsx";
import AllUserUploadExcel from "./modal/AllUserUploadExcel.jsx";

function CustomerUser() {
    const {
        userListGetOnSubmit,

        //체크값
        checkItem,
        setCheckItem,
        handleAllCheck,
        handleAllCheck01,
        handleCheck,

        //리스트 페이지 네이션
        data,data01,allPageCount,allPageCount01,
        handlePage, handlePage01,

        //pw초기화
        PwResetDataOnSubmit,

        //휴먼해제
        SleepUserWakeUp,

        //잠금해제
        CheckUserRock,
    } = useContext(UserContext);
    const {
        groupList,
        groupSelect,
        handleGroupSelect,
        groupListGetOnSubmit,
    } = useContext(GroupContext);
    const navigate = useNavigate();


    useEffect(() => {
        userListGetOnSubmit();
        groupListGetOnSubmit();
    }, []);


    //3. input 검색용
    const [searchFilter, setSearchFilter] = useState('');



    //도움말 모달
    const [MethodOpen, setMethodOpen] = useState(false);
    const handleMethodOpen = () => setMethodOpen(true);
    const handleMethodClose = () => setMethodOpen(false);


    //일괄등록 모달
    const [excelOpen, setExcelOpen] = useState(false);
    const handleExcelOpen = () => setExcelOpen(true);
    const handleExcelClose = () => setExcelOpen(false);


    console.log(data01);



    return (
        <div>
            <MethodModal open={MethodOpen} handleClose={handleMethodClose}/>
            <AllUserUploadExcel open={excelOpen} handleClose={handleExcelClose}/>


            <div className="dashboard">
                <div className="customer-head">
                    <div className="customer-head-icon">
                        <MdPersonSearch style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                    </div>
                    <div className="customer-head-p">
                        <span>사용자 관리</span>
                    </div>
                </div>
                <div className="customer-user">
                    <div className="customer-user-head">
                        <FormControl sx={
                            window.innerWidth > 1200 ? {marginLeft: 1, marginTop: 1, width: "10%"} :
                                {marginLeft: 1, marginTop: 1, width: "90%"}
                        }>
                            <InputLabel id="demo-simple-select-label">조직명 전체</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={groupSelect || ""}
                                onChange={(e) => {handleGroupSelect(e);}}
                            >
                                <MenuItem value="전체">전체</MenuItem>
                                {
                                    groupList.map((arr, inx) => {
                                        return (
                                            <MenuItem value={arr.clnt_org_id}>{arr.clnt_org_id}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>


                        <TextField id="outlined-basic"
                                   label="사용자명ID 검색"
                                   variant="outlined"
                                   sx={{marginLeft: 1, marginTop: 1}}
                                   value={searchFilter}
                                   onChange={(e) => {
                                       const inputValue = e.target.value;
                                       setSearchFilter(inputValue);
                                   }}

                        />


                        <div className="customer-user-head-detail">
                            <Button variant="contained" size={"large"} sx={{marginLeft: 1, marginTop: 1, width: "10%", height: "4.5vh"}} onClick={()=>{
                                handleExcelOpen();
                            }}>
                                일괄등록
                            </Button>
                            <Button variant="contained" size={"large"}
                                    sx={{marginLeft: 1, marginTop: 1, width: "10%", height: "4.5vh"}} onClick={()=>{
                                        navigate('/signup');
                            }}>
                                등록
                            </Button>
                            <Button variant="contained" size={"large"}
                                    sx={{marginLeft: 1, marginTop: 1, width: "10%", height: "4.5vh"}}
                                    onClick={()=>{
                                        if(window.confirm('정말 초기화 하시겠습니까?')){
                                            PwResetDataOnSubmit();
                                        }
                                    }}
                            >
                                PW 초기화
                            </Button>
                            <Button variant="contained" size={"large"}
                                    sx={{marginLeft: 1, marginTop: 1, width: "10%", height: "4.5vh"}}
                                onClick={()=>{
                                    CheckUserRock();
                                }}
                            >
                                잠김해제
                            </Button>
                            <Button variant="contained" size={"large"}
                                    sx={{marginLeft: 1, marginTop: 1, width: "10%", height: "4.5vh"}}
                                    onClick={()=>{SleepUserWakeUp();}}
                            >
                                휴먼해제
                            </Button>
                            <Button variant="contained" size={"large"}
                                    sx={{marginLeft: 1, marginTop: 1, width: "10%", height: "4.5vh"}}>
                                모바일 앱 다운로드
                            </Button>

                            <Button variant="contained" color={"warning"} size={"large"}
                                    sx={{marginLeft: 1, marginTop: 1, width: "10%", height: "4.5vh"}}>
                                삭제
                            </Button>

                            <Button color={"inherit"} size={"large"} sx={{float: "right"}} onClick={()=>{
                                handleMethodOpen();
                            }}>
                                <MdErrorOutline/>
                                도움말
                            </Button>

                        </div>
                    </div>

                    <div className="customer-user-body">
                        <div className="customer-user-table">
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                        <TableRow>
                                            {
                                                groupSelect === '전체' ?
                                                    <TableCell>
                                                        <input type={"checkbox"} name="select-all" onChange={(e) => handleAllCheck(e.target.checked)}/>
                                                    </TableCell> :
                                                    <TableCell>
                                                        <input type={"checkbox"} name="select-all" onChange={(e) => handleAllCheck01(e.target.checked)}/>
                                                    </TableCell>
                                            }


                                            <TableCell>사용자ID</TableCell>
                                            <TableCell>사용자명</TableCell>
                                            <TableCell>사용자구분</TableCell>
                                            <TableCell>연락처</TableCell>
                                            <TableCell>메일주소</TableCell>
                                            <TableCell>조직명</TableCell>
                                            <TableCell>알람여부</TableCell>
                                            <TableCell>잠김여부</TableCell>
                                            <TableCell>휴먼여부</TableCell>
                                            <TableCell>개인정보활용동의일</TableCell>
                                            <TableCell>등록일</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>


                                        {
                                            groupSelect === "전체" ? <>

                                                {
                                                    data
                                                        .filter((data) => {
                                                            const title = data.clnt_user_id.toLowerCase();
                                                            const input = searchFilter.toLowerCase();
                                                            return title.includes(input);
                                                        })
                                                        .map(function (a, i) {
                                                            return (
                                                                <TableRow key={i}>
                                                                    <TableCell>
                                                                        <input type={"checkbox"} name={`select-${a.clnt_user_id}`}
                                                                               onChange={(e) => handleCheck(e.target.checked, a.clnt_user_id)}
                                                                               checked={checkItem.includes(a.clnt_user_id)}/>
                                                                    </TableCell>
                                                                    <TableCell>{a.clnt_user_id}</TableCell>
                                                                    <TableCell>{a.clnt_user_name}</TableCell>
                                                                    <TableCell>{a.clnt_user_type}</TableCell>
                                                                    <TableCell>{a.user_phone}</TableCell>
                                                                    <TableCell>{a.user_email}</TableCell>
                                                                    <TableCell>{a.clnt_org_id}</TableCell>
                                                                    <TableCell>{a.user_alarm_enable === false ? '비활성' : '활성'}</TableCell>
                                                                    <TableCell>{a.user_active_status === true ? '활성화' : '비활성'}</TableCell>
                                                                    <TableCell>{a.user_sleep_status === true ? '휴먼중' : "사용중"}</TableCell>
                                                                    <TableCell>{a.user_info_cnst_date}</TableCell>
                                                                    <TableCell>{a.user_reg_date.substring(0, 16).replaceAll('T', ' ')}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }
                                            </> : <>
                                                {
                                                    data01
                                                        .filter((data) => {
                                                            const title = data.clnt_user_id.toLowerCase();
                                                            const input = searchFilter.toLowerCase();
                                                            return title.includes(input);
                                                        })
                                                        .map(function (a, i) {
                                                            return (
                                                                <TableRow key={i}>
                                                                    <TableCell>
                                                                        <input type={"checkbox"} name={`select-${a.clnt_user_id}`}
                                                                               onChange={(e) => handleCheck(e.target.checked, a.clnt_user_id)}
                                                                               checked={checkItem.includes(a.clnt_user_id)}/>
                                                                    </TableCell>
                                                                    <TableCell>{a.clnt_user_id}</TableCell>
                                                                    <TableCell>{a.clnt_user_name}</TableCell>
                                                                    <TableCell>{a.clnt_user_type}</TableCell>
                                                                    <TableCell>{a.user_phone}</TableCell>
                                                                    <TableCell>{a.user_email}</TableCell>
                                                                    <TableCell>{a.clnt_org_id}</TableCell>
                                                                    <TableCell>{a.user_alarm_enable === false ? '비활성' : '활성'}</TableCell>
                                                                    <TableCell>{a.user_active_status === true ? '활성화' : '비활성'}</TableCell>
                                                                    <TableCell>{a.user_sleep_status === true ? '휴먼중' : "사용중"}</TableCell>
                                                                    <TableCell>{a.user_info_cnst_date}</TableCell>
                                                                    <TableCell>{a.user_reg_date.substring(0, 16).replaceAll('T', ' ')}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }
                                            </>
                                        }




                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>

                    {
                        groupSelect === '전체' ?
                            <Pagination count={allPageCount} variant="outlined"
                                        defaultPage={1}
                                        sx={
                                            window.innerWidth > 1200 ?
                                                {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                                                {width: "100%", marginLeft: "2%", marginTop: "1vh"}
                                        }
                                        onChange={(e) => handlePage(e)}
                            /> :
                            <Pagination count={allPageCount01} variant="outlined"
                                        defaultPage={1}
                                        sx={
                                            window.innerWidth > 1200 ?
                                                {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                                                {width: "100%", marginLeft: "2%", marginTop: "1vh"}
                                        }
                                        onChange={(e) => handlePage01(e)}
                            />
                    }




                </div>


            </div>
        </div>
    )
}

export default CustomerUser;