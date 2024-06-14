import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Pagination} from "@mui/lab";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {MakeUseContext} from "../../../../api/total/MakeUseContext.jsx";
import Loading from '../../../../assets/img/loading.gif';

function DateUseList() {
    const {
        startDate, setStartDate,
        endDate, setEndDate,

        userIdChoi, setUserIdChoi,
        HourUseDataOnSubmit,
        hourLoading,
        HourUseList,
    } = useContext(MakeUseContext);

    useEffect(() => {
        HourUseDataOnSubmit();
    }, [startDate, endDate, userIdChoi]);

    let selectInTIme = HourUseList.intime;
    let selectLogCount = HourUseList.log_count;
    let selectLogRatio = HourUseList.log_ratio;
    let timeArr = [];
    for (let i = 0; i < selectInTIme?.length; i++) {
        timeArr.push({intime: selectInTIme[i], log_count: selectLogCount[i], log_ratio: selectLogRatio[i]})
    }

    const [page, setPage] = useState(1); //첫페이지
    const [data, setData] = useState([]);
    const lastPage = timeArr.length % 15 === 0 ? timeArr.length / 15 : timeArr.length / 15 + 1;  //마지막 페이지
    let allPage = Math.ceil(timeArr.length / 15);
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(timeArr.slice(15 * (page - 1)));
        } else {
            setData(timeArr.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, HourUseList, userIdChoi]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    return (
        <div>
            <div className="ml-section-head ">
                <div className="ml-section-head-title">
                    <h3>■ 시간대별 사용 현황 :{userIdChoi} </h3>
                </div>
            </div>

            <div className="ml-section-body">
                {
                    hourLoading === false ? <div>
                        <img src={Loading} alt="로딩중.."/>
                        </div> :
                        <div className="customer-user-table-date">
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>사용 시간</TableCell>
                                            <TableCell>사용 횟수</TableCell>
                                            <TableCell>평균사용시간</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data.map((arr, inx) => (
                                                <TableRow key={data.length * (page - 1) + inx + 1}>
                                                    <TableCell>{data.length * (page - 1) + inx + 1}</TableCell>
                                                    <TableCell>{arr.intime}</TableCell>
                                                    <TableCell>{arr.log_count}</TableCell>
                                                    <TableCell>{arr.log_ratio}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Pagination variant="outlined" count={allPage} sx={
                                window.innerWidth > 1200 ? {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                                    {width: "100%", marginLeft: "0%", marginTop: "1vh"}
                            } onChange={(e) => handlePage(e)}/>

                        </div>
                }

            </div>

        </div>
    )
}

export default DateUseList;