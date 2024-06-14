import {Pagination, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {RealtimeContext} from "../../context/realtimeContext.jsx";
import {themes} from "../../theme/darkThme.jsx";

export const RealTimeTable = () => {
    const {RealTime,realTimeData} = useContext(RealtimeContext);


    //페이징처리
    const [page, setPage] = useState(1);
    const [data, setData] = useState(RealTime);
    const lastPage = RealTime.length % 20 === 0 ? RealTime.length / 20 : RealTime.length / 20 + 1;
    let allPage = Math.ceil(RealTime.length / 20);

    useEffect(() => {
        if (page === lastPage) {
            setData(RealTime.slice(20 * (page - 1)));
        } else {
            setData(RealTime.slice(20 * (page - 1), 20 * (page - 1) + 20));
        }
    }, [page, RealTime,realTimeData]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }



    return (
        <div>

            <div className={localStorage.getItem('mode') === 'dark' ? "real-time-table" : "real-time-table-l"}>
                <Table stickyHeader>
                    <TableHead sx={themes.dash_table_head}>
                        <TableRow>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>지역</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>사이트 정보</h4>
                            </TableCell>

                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}> 사이트 URL</h4>
                            </TableCell>

                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>성공 유/무</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>시간</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>업데이트 적용 내용</h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={themes.dash_table_body}>
                        {
                            data.map((arr) => (
                                <TableRow key={arr.login_id}>
                                    <TableCell size={"small"} sx={{color:themes.color}}>
                                        <h4 style={{textAlign: "center"}}>{arr.name}</h4>
                                    </TableCell>
                                    <TableCell size={"small"} sx={{color:themes.color}}>
                                        <h4 style={{textAlign: "center"}}>{arr.site_info}</h4>
                                    </TableCell>
                                    <TableCell size={"small"} sx={{color:themes.color}}>
                                        <h4 style={{textAlign: "center"}}>{arr.url}</h4>
                                    </TableCell>
                                    <TableCell size={"small"}
                                               sx={arr.login_success === true ? {color: 'blue'} : {color: 'red'}}>
                                        <h4 style={{textAlign: "center"}}>
                                            {arr.login_success === true ? 'O' : 'X'}
                                        </h4>
                                    </TableCell>
                                    <TableCell size={"small"} sx={{color:themes.color}}>
                                        <h4 style={{textAlign: "center"}}>
                                            {arr.time}
                                        </h4>
                                    </TableCell>
                                    <TableCell size={"small"} sx={{color:themes.color}}>
                                        <h4 style={{textAlign: "center"}}>
                                            {arr.bigo === null ? '-' : arr.bigo}
                                        </h4>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </div>

            <Pagination count={allPage}
                        shape="rounded"
                        sx={{float: "right", color: 'white', marginBottom: 1}}
                        onChange={(e) => handlePage(e)}
            />
        </div>
    )
}
