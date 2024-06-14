import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import * as React from "react";
import {Pagination} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../../../../api/all/GroupContext.jsx";
import {MakeUseContext} from "../../../../api/total/MakeUseContext.jsx";
import Loading from '../../../../assets/img/loading.gif';

let len = window.innerWidth;
const excelBox = {
    pc: {
        marginTop: 2,
        marginLeft: 1,
        height: "4vh",
        float: "right",
        marginRight: 2
    },
    tablet: {
        marginTop: 0,
        marginLeft: 1,
        height: "4vh",
        float: "right",
        marginRight: 2
    },
    phone: {
        marginTop: 2,
        marginLeft: 1,
        height: "4vh",
        float: "none",
        width: "90%",
        marginRight: 2
    }
}

const ButtonBox = {
    pc: {
        marginTop: 2, marginLeft: 1, height: "4vh", float: "right", marginRight: 2
    },
    tablet: {
        marginTop: 0, marginLeft: 1, height: "4vh", float: "right", marginRight: 0
    },
    phone: {
        marginTop: 2, marginLeft: 1, height: "5vh", marginRight: 2, width: "90%"
    }
}

const searchBox = {
    pc: {
        marginTop: 2, width: "15%", marginLeft: 1, float: "right"
    },
    tablet: {
        marginTop: 0, width: "75%", marginLeft: 1, float: "left"
    },
    phone: {
        marginTop: 2, width: "90%", marginLeft: 1
    }
}

function CompanyList() {
    const {
        //1.그룹 선택
        groupSelect, setGroupSelect,
        handleGroupSelect,
        //2. 그룹리스트
        groupList,
    } = useContext(GroupContext);
    const {
        //1. 스타트 엔드 데이터
        startDate, setStartDate,
        endDate, setEndDate,

        //전체 회사별 사용자 데이터
        GroupUseDataOnSubmit,
        groupUseLoading,
        groupUseList,

        //회사별 유저 아이디 선택 훅
        userIdChoi, setUserIdChoi,

        makeUseExcelDown,
    } = useContext(MakeUseContext);


    //1. 회사별 사용 현황 데이터 가져오기
    useEffect(() => {
        GroupUseDataOnSubmit();
        setUserIdChoi('dummytest3');
    }, [groupList, groupSelect]);


    //2. 오브젝트 형식 키값만 가져와서 반복문으로 전체 데이터 리스트화
    //2-1. 전체 데이터 가져오기
    let objKey = Object.keys(groupUseList);
    let obj = [];
    for (let i = 0; i < objKey.length; i++) {
        obj.push(...groupUseList[Object.keys(groupUseList)[i]])
    }

    const [page, setPage] = useState(1); //첫페이지
    const [data, setData] = useState([]);
    const lastPage = obj.length % 15 === 0 ? obj.length / 15 : obj.length / 15 + 1;  //마지막 페이지
    let allPage = Math.ceil(obj.length / 15);
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(obj.slice(15 * (page - 1)));
        } else {
            setData(obj.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, groupUseList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    //2-2. 셀렉트한 데이터 가져오기
    let selectData = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].orgId === groupSelect) {
            selectData.push(obj[i])
        }
    }

    const [page01, setPage01] = useState(1); //첫페이지
    const [data01, setData01] = useState([]);
    const lastPage01 = selectData.length % 15 === 0 ? selectData.length / 15 : selectData.length / 15 + 1;  //마지막 페이지
    let allPage01 = Math.ceil(selectData.length / 15);
    useEffect(() => {
        if (page01 === lastPage01) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData01(selectData.slice(15 * (page01 - 1)));
        } else {
            setData01(selectData.slice(15 * (page01 - 1), 15 * (page01 - 1) + 15));
        }
    }, [page01, groupUseList]);

    const handlePage01 = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage01(nowPageInt);
    }


    return (
        <div>
            <div className="ml-section-head">
                <div className="ml-section-head-title">
                    <h3>■ 회사별 사용 현황</h3>
                </div>


                <div className="ml-section-head-search">

                    <form onSubmit={makeUseExcelDown}>
                        <Button variant="contained" sx={len > 1200 ? excelBox.pc :
                            (len > 750 ? excelBox.tablet :
                                (len > 0 ? excelBox.phone :
                                    null))} color={"success"} type={"submit"}>
                            Excel
                        </Button>
                    </form>

                    <Button variant="contained"
                            sx={len > 1200 ? ButtonBox.pc :
                                (len > 750 ? ButtonBox.tablet :
                                    (len > 0 ? ButtonBox.phone :
                                        null))}
                    >
                        검색
                    </Button>


                    <FormControl
                        sx={len > 1200 ? searchBox.pc :
                            (len > 750 ? searchBox.tablet :
                                (len > 0 ? searchBox.phone :
                                    null))}
                    >
                        <InputLabel id="demo-simple-select-label">조직 별</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={groupSelect || ""}
                            onChange={(e) => {
                                handleGroupSelect(e);
                            }}
                        >
                            <MenuItem value="전체">전체</MenuItem>
                            {
                                groupList.map((arr) => {
                                    return (
                                        <MenuItem value={arr.clnt_org_id}>
                                            {arr.clnt_org_id}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>


                    <div className="ml-start">
                        <TextField id="outlined-basic"
                                   type={"date"}
                                   value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}
                                   variant="outlined"
                                   sx={{marginTop: 2, float: "right"}}
                        />
                    </div>
                    <div className="ml-smooth">
                        <span> ~ </span>
                    </div>
                    <div className="ml-End">
                        <TextField id="outlined-basic"
                                   value={startDate}
                                   onChange={(e) => setStartDate(e.target.value)}
                                   type={"date"}
                                   variant="outlined"
                                   sx={{marginTop: 2, float: "right"}}
                        />
                    </div>

                </div>
            </div>

            <div className="ml-section-body-company">
                {
                    groupUseLoading === false ? <div>
                        <img src={Loading} alt="로딩중" />
                    </div> :
                        <div className="total-user-table-client">
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>회원사명</TableCell>
                                            <TableCell>사용자</TableCell>
                                            <TableCell>사용일</TableCell>
                                            <TableCell>사용시간 (h)</TableCell>
                                            <TableCell>사용율</TableCell>
                                            <TableCell>일평균 사용율</TableCell>
                                            <TableCell>월 누적 사용시간(h)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            groupSelect === '전체' ? <>
                                                {
                                                    data.map((arr, inx) => (
                                                        <TableRow
                                                            onClick={() => {setUserIdChoi(arr.userId);}}
                                                            key={data.length * (page - 1) + inx + 1}
                                                        >
                                                            <TableCell>{data.length * (page - 1) + inx + 1}</TableCell>
                                                            <TableCell>{arr.orgName}</TableCell>
                                                            <TableCell>{arr.userId}</TableCell>
                                                            <TableCell>{arr.date.length}일</TableCell>
                                                            <TableCell>{arr.use_time.length}회</TableCell>
                                                            <TableCell>{arr.all_count} %</TableCell>
                                                            <TableCell>{arr.all_time_avg}</TableCell>
                                                            <TableCell>{arr.all_time}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </> : <>
                                                {
                                                    data01.map((arr, inx) => (
                                                        <TableRow onClick={() => {
                                                            setUserIdChoi(arr.userId);
                                                        }} key={data01.length * (page01 - 1) + inx + 1}>
                                                            <TableCell>{data01.length * (page01 - 1) + inx + 1}</TableCell>
                                                            <TableCell>{arr.orgName}</TableCell>
                                                            <TableCell>{arr.userId}</TableCell>
                                                            <TableCell>{arr.date.length}일</TableCell>
                                                            <TableCell>{arr.use_time.length}회</TableCell>
                                                            <TableCell>{arr.all_count} %</TableCell>
                                                            <TableCell>{arr.all_time_avg}</TableCell>
                                                            <TableCell>{arr.all_time}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }

                                            </>
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {
                                groupSelect === '전체' ? <Pagination count={allPage} variant="outlined" sx={
                                        window.innerWidth > 1200 ? {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                                            {width: "100%", marginLeft: "0%", marginTop: "1vh"}
                                    } onChange={(e) => handlePage(e)}/> :
                                    <Pagination count={allPage01} variant="outlined" sx={
                                        window.innerWidth > 1200 ? {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                                            {width: "100%", marginLeft: "0%", marginTop: "1vh"}
                                    } onChange={(e) => handlePage01(e)}/>
                            }
                        </div>
                }



            </div>


        </div>
    )
}

export default CompanyList;