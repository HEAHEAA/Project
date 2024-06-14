import {Pagination, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {ErrInfoUpdateModal} from "./ErrInfoUpdateModal.jsx";
import {ErrInfoContext} from "../../context/errInfoContext.jsx";
import {themes} from "../../theme/darkThme.jsx";

export const ErrInfoTable = () => {
    const {
        GetEditErrId,
        logErrTotal
    } = useContext(ErrInfoContext);


    //페이징처리
    const [page, setPage] = useState(1);
    const [data, setData] = useState(logErrTotal);
    const lastPage = logErrTotal.length % 20 === 0 ? logErrTotal.length / 20 : logErrTotal.length / 20 + 1;
    let allPage = Math.ceil(logErrTotal.length / 20);

    useEffect(() => {
        if (page === lastPage) {
            setData(logErrTotal.slice(20 * (page - 1)));
        } else {
            setData(logErrTotal.slice(20 * (page - 1), 20 * (page - 1) + 20));
        }
    }, [page, logErrTotal]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    //모달 클릭
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div>
            {/*모달*/}
            <ErrInfoUpdateModal open={open} handleClose={handleClose}/>

            <div className={localStorage.getItem('mode') === 'dark' ? "err-info-table" : "err-info-table-l"}>
                <Table stickyHeader>
                    <TableHead sx={themes.dash_table_head}>
                        <TableRow>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>번호</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>지역</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>에러 정보</h4>
                            </TableCell>

                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>발생 시간</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>해결 여/부</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>완료 시간</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>관리자</h4>
                            </TableCell>
                            <TableCell size={"small"} sx={{color: themes.color, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#1f212d' : '#b6cefa'}}>
                                <h4 style={{textAlign: "center"}}>수정</h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={themes.dash_table_body}>
                        {
                            logErrTotal.length === 0 ? <div className="not-error-text" style={{color: localStorage.getItem('mode') === 'dark' ? 'white' : 'black'}}>
                                해당하는 일 자 에는 에러가 없습니다.
                            </div> : <>
                                {
                                    data.map((arr, i) => (
                                        <TableRow key={arr.error_id}>
                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={{textAlign: "center"}}>
                                                    {i + 1}
                                                </h4>
                                            </TableCell>
                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={{textAlign: "center"}}>{arr.name}</h4>
                                            </TableCell>

                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={{textAlign: "center"}}>{arr.error_state}</h4>
                                            </TableCell>

                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={{textAlign: "center"}}>{arr.error_break_date.slice(5,16)}</h4>
                                            </TableCell>
                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={arr.error_update_check === false ? {color: "red", textAlign: "center"} : {color:themes.color,textAlign: "center"}}>
                                                    {arr.error_update_check === true ? 'Y': 'N'}
                                                </h4>
                                            </TableCell>
                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={{textAlign: "center"}}>
                                                    {arr.error_renew_date === null ? '-' : arr.error_renew_date}
                                                </h4>
                                            </TableCell>
                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={{textAlign: "center"}}>
                                                    {arr.error_reason_user === '관리자' ? '-' : arr.error_reason_user}
                                                </h4>
                                            </TableCell>
                                            <TableCell size={"small"} sx={{color:themes.color}}>
                                                <h4 style={{textAlign: "center"}}>
                                                    <Button variant="contained" color="info" onClick={() => {
                                                        handleOpen();
                                                        GetEditErrId(arr.site_id);
                                                    }}>
                                                        수정
                                                    </Button>
                                                </h4>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </>


                        }
                    </TableBody>
                </Table>
            </div>
            <br/>
            <Pagination count={allPage}
                        shape="rounded"
                        sx={{float: "right", color: 'white', marginBottom: 1}}
                        onChange={(e) => handlePage(e)}
            />

        </div>
    )
}
