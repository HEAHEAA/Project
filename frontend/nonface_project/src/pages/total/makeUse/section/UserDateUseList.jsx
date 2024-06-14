import * as React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Pagination} from "@mui/lab";
import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../../../../api/all/GroupContext.jsx";
import {MakeUseContext} from "../../../../api/total/MakeUseContext.jsx";
import Loading from '../../../../assets/img/loading.gif';


function UserDateUseList() {
    const {
        //1.그룹 선택
        groupSelect,
        //2. 그룹리스트
        groupList,
    } = useContext(GroupContext);
    const {
        TimeUseListOnSubmit,
        timeUseList,
        timeUseLoading,


        //회사별 유저 아이디 선택 훅
        userIdChoi, setUserIdChoi,
    } = useContext(MakeUseContext);


    //1. 오브젝트유형으로 된 회사별 사용 데이터 첫번째 키값만 빼기
    useEffect(() => {
        TimeUseListOnSubmit();
    }, [groupList, groupSelect]);


    //1. 셀렉트가 전체일때 받는 데이터
    let arr = Object.keys(timeUseList);
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        array.push(...timeUseList[Object.keys(timeUseList)[i]])
    }

    //1. len 받기
    let selectDate = array[0]?.date;
    let selectTime = array[0]?.use_time;
    let arrData = [];
    for (let i = 0; i < selectDate?.length; i++) {
        arrData.push({date: selectDate[i], time: selectTime[i],})
    }
    const [page, setPage] = useState(1); //첫페이지
    const [data, setData] = useState([]);
    const lastPage = arrData.length % 15 === 0 ? arrData.length / 15 : arrData.length / 15 + 1;  //마지막 페이지
    let allPage = Math.ceil(arrData.length / 15);
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(arrData.slice(15 * (page - 1)));
        } else {
            setData(arrData.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, timeUseList, userIdChoi]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    //2. 유저가 회원을 선택했을시
    let userSelectData = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].userId === userIdChoi) {
            userSelectData.push(array[i])
        }
    }
    let userSelectDate = userSelectData[0]?.date;
    let userSelectTime = userSelectData[0]?.use_time;
    let userArrData = [];
    for (let i = 0; i < userSelectDate?.length; i++) {
        userArrData.push({date: userSelectDate[i], time: userSelectTime[i],})
    }

    const [page01, setPage01] = useState(1); //첫페이지
    const [data01, setData01] = useState([]);
    const lastPage01 = userArrData.length % 15 === 0 ? userArrData.length / 15 : userArrData.length / 15 + 1;  //마지막 페이지
    let allPage01 = Math.ceil(userArrData.length / 15);
    useEffect(() => {
        if (page01 === lastPage01) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData01(userArrData.slice(15 * (page01 - 1)));
        } else {
            setData01(userArrData.slice(15 * (page01 - 1), 15 * (page01 - 1) + 15));
        }
    }, [page01, timeUseList, userIdChoi]);

    const handlePage01 = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage01(nowPageInt);
    }


    return (
        <div>
            <div className="ml-section-head">
                <div className="ml-section-head-title">
                    <h3>■ 사용자의 일별 사용 현황 : {
                        userIdChoi === '' ? array[0]?.userId : userSelectData[0]?.userId
                    }</h3>
                </div>
            </div>
            <div className="ml-section-body">
                {
                    timeUseLoading === false ? <div>
                        <img src={Loading} alt="로딩중.." />
                        </div> :
                        <div className="customer-user-table-date">
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>사용일자</TableCell>
                                            <TableCell>사용시간</TableCell>
                                            <TableCell>누적 사용시간(H)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {
                                            userIdChoi === '' ? <>
                                                {
                                                    data.map((arr, inx) => (
                                                        <TableRow key={data.length * (page - 1) + inx + 1}>
                                                            <TableCell>{data.length * (page - 1) + inx + 1}</TableCell>
                                                            <TableCell>{arr.date}</TableCell>
                                                            <TableCell>{arr.time}</TableCell>
                                                            <TableCell>{array[0]?.all_time}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </> : <>
                                                {
                                                    data01.map((arr, inx) => (
                                                        <TableRow key={data01.length * (page01 - 1) + inx + 1}>
                                                            <TableCell>{data01.length * (page01 - 1) + inx + 1}</TableCell>
                                                            <TableCell>{arr.date}</TableCell>
                                                            <TableCell>{arr.time}</TableCell>
                                                            <TableCell>{array[0]?.all_time}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {
                                userIdChoi === '' ?
                                    <Pagination count={allPage} variant="outlined" sx={
                                        window.innerWidth > 1200 ? {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                                            {width: "100%", marginLeft: "0%", marginTop: "1vh"}
                                    } onChange={(e) => handlePage(e)}/>
                                    :
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

export default UserDateUseList;