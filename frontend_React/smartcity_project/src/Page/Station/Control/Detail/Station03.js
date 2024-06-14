import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {CircularProgress, TablePagination} from "@mui/material";
import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Station03ARCO from "./Station03Detail/Station03-ARCO";
import Station03ARSS from "./Station03Detail/Station03-ARSS";
import Station03UVCD from "./Station03Detail/Station03-UVCD";
import Station03CHGR from "./Station03Detail/Station03-CHGR";
import Station03LDLT from "./Station03Detail/Station03-LDLT";
import Station03ATOR from "./Station03Detail/Station03-ATOR";
import Station03HTBC from "./Station03Detail/Station03-HTBC";
import Station03PPCT from "./Station03Detail/Station03-PPCT";
import TextField from "@mui/material/TextField";
import moment from "moment";
import Button from "@mui/material/Button";
import {AiOutlineSearch} from "react-icons/ai";
import {TextWhite} from "../../../../Componet/style-config/light-theme";

function Station03() {
    const {
        dvList,
        Load03,
        dvType,
        startDate, setStartDate,
        endDate, setEndDate,
        DvList,
        DvListLoading,
        timeList,
        StationRecordData,
    } = useContext(StationContext);

    //페이징처리
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    //시간데이터 출력
    const handleStartDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setStartDate(formattedDate);
        setStartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setEndDate(formattedDate);
        setEndDate(e.target.value);
    }


    if (Load03 === false) {
        if (dvType === 'ARCO') {//냉난방기
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }

                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                DvList();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.1vh"}}>
                                <AiOutlineSearch/>
                            </Button>

                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />
                        </div>

                        <div className="fa01">
                            <Station03ARCO dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                        </div>

                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[10, 15, 30, 100]}
                            component="div"
                            count={dvList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />


                </div>
            )
        }
        if (dvType === 'ARSS') { //환경센서
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }

                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                StationRecordData();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}>
                                <AiOutlineSearch/>
                            </Button>

                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />


                        </div>

                        <div className="fa01">
                            <Station03ARSS page={page} rowsPerPage={rowsPerPage}/>
                        </div>

                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[10, 15, 30, 100]}
                            component="div"
                            count={timeList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />

                </div>
            )
        }

        if (dvType === 'UVLD') { // UVC LED
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }


                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                DvList();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}>
                                <AiOutlineSearch/>
                            </Button>


                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />

                        </div>

                        <div className="fa02">
                            <Station03UVCD dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                        </div>
                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[10, 15, 30, 100]}
                            component="div"
                            count={dvList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />

                </div>
            )
        }

        if (dvType === 'CHGR') { //충전기
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }

                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                DvList();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}>
                                <AiOutlineSearch/>
                            </Button>


                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />


                        </div>

                        <div className="fa02">
                            <Station03CHGR dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                        </div>
                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[10, 15, 30, 100]}
                            component="div"
                            count={dvList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />


                </div>
            )
        }

        if (dvType === 'LDLT') { //LED 조명
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }

                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                DvList();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}>
                                <AiOutlineSearch/>
                            </Button>


                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />


                        </div>

                        <div className="fa02">
                            <Station03LDLT dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                        </div>
                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[10, 15, 30, 100]}
                            component="div"
                            count={dvList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />


                </div>
            )
        }

        if (dvType === 'ATDR') { //자동문
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }
                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                DvList();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}>
                                <AiOutlineSearch/>
                            </Button>


                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />


                        </div>

                        <div className="fa02">
                            <Station03ATOR dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                        </div>
                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[10, 15, 30, 100]}
                            component="div"
                            count={dvList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />

                </div>
            )
        }

        if (dvType === 'HTBC') { //온열벤치
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }

                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                DvList();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}>
                                <AiOutlineSearch/>
                            </Button>


                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />


                        </div>

                        <div className="fa02">
                            <Station03HTBC dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                        </div>
                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[10, 15, 20, 100]}
                            component="div"
                            count={dvList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />

                </div>
            )
        }

        if (dvType === 'PPCT') { //피플카운터
            return (
                <div>
                    {
                        DvListLoading === true ? <CircularProgress size={24} color="secondary"/> : null
                    }

                        <div className="cw02-date">
                            <Button variant="contained" onClick={() => {
                                StationRecordData();
                            }} style={{float: "right", marginRight: "0.5vh", height: "4vh", marginTop: "0.2vh"}}>
                                <AiOutlineSearch/>
                            </Button>

                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", marginRight: "0.5vh", width: "140px", fontSize: 11}}
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="cw-input01"
                            />
                            <TextField
                                type={"date"}
                                variant="outlined"
                                size={"small"}
                                style={{float: "right", width: "140px", fontSize: 11}}
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="cw-input02"
                            />

                        </div>


                        <div className="fa01">
                            <Station03PPCT page={page} rowsPerPage={rowsPerPage}/>
                        </div>
                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[7, 14, 21, 100]}
                            component="div"
                            count={timeList?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#1c63c2",color:TextWhite.color}}
                            size={"small"}
                        />
                </div>
            )
        }
    } else {
        return (
            <div>
                디바이스 목록을 선택해주세요.
            </div>
        )
    }


}

export default Station03;