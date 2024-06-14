import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {Pagination} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../../../../api/all/GroupContext.jsx";
import {MakeUseContext} from "../../../../api/total/MakeUseContext.jsx";

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
        marginTop: 2,
        marginLeft: 1,
        height: "4vh",
        float: "right",
        marginRight: 2
    },
    phone: {
        marginTop: 2,
        height: "5vh",
        marginLeft: 1,
        width: "95%"
    }
}


const ButtonBox = {
    pc: {
        marginTop: 2,
        marginLeft: 1,
        height: "4vh",
        float: "right"
    },
    tablet: {
        marginTop: 2,
        marginLeft: 1,
        height: "4vh",
        float: "right"
    },
    phone: {
        marginTop: 2,
        marginLeft: 1,
        height: "5vh",
        width: "95%"
    }
}

// 검색 인풋
const InputBox = {
    pc: {
        marginTop: 2,
        width: "15%",
        marginLeft: 1,
        float: "right"
    },
    tablet: {
        marginTop: 2,
        width: "75%",
        marginLeft: 1,
        float: "left"
    },
    phone: {
        marginTop: 2,
        width: "95%",
        marginLeft: 1
    }
}



function GroupUseBoardList() {
    const {
        groupList,
        groupSelect, setGroupSelect,
        handleGroupSelect
    } = useContext(GroupContext);

    const {
        //전체 회사별 사용자 데이터
        GroupUseDataOnSubmit,
        groupUseList,
        makeUseExcelDown,
    } = useContext(MakeUseContext);



    //1. 회사별 사용 현황 데이터 가져오기
    useEffect(() => {
        GroupUseDataOnSubmit();
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
    const lastPage = obj.length % 5 === 0 ? obj.length / 5 : obj.length / 5 + 1;  //마지막 페이지
    let allPage = Math.ceil(obj.length / 5);
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(obj.slice(5 * (page - 1)));
        } else {
            setData(obj.slice(5 * (page - 1), 5 * (page - 1) + 5));
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
    const lastPage01 = selectData.length % 5 === 0 ? selectData.length / 5 : selectData.length / 5 + 1;  //마지막 페이지
    let allPage01 = Math.ceil(selectData.length / 5);
    useEffect(() => {
        if (page01 === lastPage01) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData01(selectData.slice(5 * (page01 - 1)));
        } else {
            setData01(selectData.slice(5 * (page01 - 1), 5 * (page01 - 1) + 5));
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
                        <Button variant="contained" color={"success"}
                                sx={len > 1200 ? excelBox.pc :
                                    (len > 750 ? excelBox.tablet :
                                        (len > 0 ? excelBox.phone :
                                            null))} type={"submit"}>
                            Excel
                        </Button>
                    </form>

                    <Button variant="contained"
                            sx={len > 1200 ? ButtonBox.pc :
                                (len > 750 ? ButtonBox.tablet :
                                    (len > 0 ? ButtonBox.phone :
                                        null))}>
                        검색
                    </Button>


                    <FormControl
                        sx={len > 1200 ? InputBox.pc :
                            (len > 750 ? InputBox.tablet :
                                (len > 0 ? InputBox.phone :
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


                    {/*<div className="gu-start">*/}
                    {/*    <TextField id="outlined-basic"*/}
                    {/*               type={"date"}*/}
                    {/*               value={endDate}*/}
                    {/*               onChange={(e) => setEndDate(e.target.value)}*/}
                    {/*               variant="outlined"*/}
                    {/*               sx={window.innerWidth > 1200 ? {marginTop: 2, float: "right"} : null}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="gu-smooth">*/}
                    {/*    <span> ~ </span>*/}
                    {/*</div>*/}
                    {/*<div className="gu-End">*/}
                    {/*    <TextField id="outlined-basic"*/}
                    {/*               type={"date"}*/}
                    {/*               value={startDate}*/}
                    {/*               onChange={(e) => setStartDate(e.target.value)}*/}
                    {/*               variant="outlined"*/}
                    {/*               sx={window.innerWidth > 1200 ? {marginTop: 2, float: "right"} : null}*/}
                    {/*    />*/}
                    {/*</div>*/}

                </div>
            </div>

            <div className="ml-section-body-group">
                <TableContainer>
                    <Table>
                        <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>회사명</TableCell>
                                <TableCell>사용자</TableCell>
                                <TableCell>사용일</TableCell>
                                <TableCell>사용시간(h)</TableCell>
                                <TableCell>사용률</TableCell>
                                <TableCell>일평균 사용률</TableCell>
                                <TableCell>월 누적 사용시간(h)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                groupSelect === '전체' ? <>
                                    {
                                        data.map((arr, inx) => (
                                            <TableRow key={data.length * (page - 1) + inx + 1}>
                                                <TableCell>{data.length * (page - 1) + inx + 1}</TableCell>
                                                <TableCell>{arr.orgName}</TableCell>
                                                <TableCell>{arr.userId}</TableCell>
                                                <TableCell>{arr.date.length}일</TableCell>
                                                <TableCell>{arr.use_time.length}회</TableCell>
                                                <TableCell>{arr.all_count} %</TableCell>
                                                <TableCell>{arr.all_time_avg}</TableCell>
                                                <TableCell>{arr.all_time}(h)</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </> : <>
                                    {
                                        data01.map((arr, inx) => (
                                            <TableRow key={data01.length * (page01 - 1) + inx + 1}>
                                                <TableCell>{data01.length * (page01 - 1) + inx + 1}</TableCell>
                                                <TableCell>{arr.orgName}</TableCell>
                                                <TableCell>{arr.userId}</TableCell>
                                                <TableCell>{arr.date.length}일</TableCell>
                                                <TableCell>{arr.use_time.length}회</TableCell>
                                                <TableCell>{arr.all_count} %</TableCell>
                                                <TableCell>{arr.all_time_avg}</TableCell>
                                                <TableCell>{arr.all_time}(h)</TableCell>
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

        </div>
    )
}

export default GroupUseBoardList;