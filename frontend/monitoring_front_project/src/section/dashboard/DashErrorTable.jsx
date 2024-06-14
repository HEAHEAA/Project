import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ErrInfoContext} from "../../context/errInfoContext.jsx";
import {DashboardContext} from "../../context/dashboardContext.jsx";


export const DashErrorTable = () => {
    const {ErrInfoByDateOnSubmit, todayErrTotal,} = useContext(ErrInfoContext);
    const {failData, successData, layout} = useContext(DashboardContext);

    useEffect(() => {
        ErrInfoByDateOnSubmit();
    }, []);


    //페이징 처리
    const [page, setPage] = useState(1);
    const [data, setData] = useState(failData);
    const lastPage = failData.length % 10 === 0 ? failData.length / 10 : failData.length / 10 + 1;
    let allPage = Math.ceil(todayErrTotal.length / 10);

    useEffect(() => {
        if (page === lastPage) {
            setData(failData.slice(10 * (page - 1)));
        } else {
            setData(failData.slice(10 * (page - 1), 10 * (page - 1) + 10));
        }
    }, [page, failData]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }



    return (
        <div className="error-list-layout">
            <TableContainer sx={{maxHeight: layout[4]?.h * 30}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell size={"small"} sx={{color: 'white'}}>
                                <h4>지역</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: 'white'}}>
                                <h4>사이트명</h4>
                            </TableCell>

                            <TableCell size={"small"} sx={{color: 'white'}}>
                                <h4>에러 시간</h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            failData.length === 0 ?

                                <TableRow sx={{color: localStorage.getItem('mode') === 'dark' ? 'white' : 'black'}}>
                                    <TableCell size={"small"}>
                                        실시간 에러 사이트가 없습니다 :)
                                    </TableCell>
                                    <TableCell size={"small"}>
                                    </TableCell>
                                    <TableCell size={"small"}>
                                    </TableCell>
                                </TableRow>
                                : data.map((arr) => (
                                    <TableRow key={arr.site_id}>
                                        <TableCell size={"small"}>
                                            <h4 style={{color: "tomato"}}>
                                                {arr.name}
                                            </h4>
                                        </TableCell>
                                        <TableCell size={"small"}>
                                            <h4 style={{color: "tomato"}}>
                                                {arr.site_info}
                                            </h4>
                                        </TableCell>

                                        <TableCell size={"small"}>
                                            <h4 style={{color: "tomato"}}>
                                                {arr.time}
                                            </h4>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>


            </TableContainer>
            <Pagination count={allPage}
                        shape="rounded"
                        sx={{float: "right", color: 'white', marginBottom: 1}}
                        onChange={(e) => handlePage(e)}
            />
        </div>
    )

}
