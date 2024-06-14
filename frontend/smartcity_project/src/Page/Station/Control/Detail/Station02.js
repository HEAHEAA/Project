import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Station02Ud from "../Detail-Update/Station02Ud";
import Button from "@mui/material/Button";
import {BsArrowRepeat} from "react-icons/bs";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function Station02() {
    const {
        dv, setDvcId, nodeAgent, setNodeAgent,
        DvList, Load02, GetEditId, setDvcTypeCd,
        nodeNm, setDvType,
        dvPostAPI,
        agent, setAgent, StationRecordData,
        filteredPositions,
    } = useContext(StationContext);

    //선택 디바이스 색상변경 훅
    const [btnAct, setBtnAct] = useState(0);


    //디바이스 목록 처리 api 연결 이벤트
    useEffect(() => {
        DvList();
    }, [nodeAgent]);

    useEffect(() => {
        StationRecordData();
    }, [agent]);


    //수정 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    //디바이스목록 가나다순 정렬
    let copy = [...dv];
    copy.sort((a, b) => a.dvcNm.toUpperCase() < b.dvcNm.toUpperCase() ? -1 : 1);


    if (Load02 === false) {
        return (<>
                {/*<Button onClick={() => {*/}
                {/*    dvPostAPI();*/}
                {/*}} className="refresh-btn" sx={{position: "absolute", marginLeft: "25%"}} style={{marginTop: "-9vh"}}>*/}
                {/*    실시간 데이터확인 <BsArrowRepeat style={{marginLeft: "1vh"}}/>*/}
                {/*</Button>*/}
                <Station02Ud open={open}
                             handleClose={handleClose}
                />
                <div>
                    <div className="fa00">
                        <TableContainer style={{marginTop: "-3vh", cursor: "default"}}>
                            <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table"
                                   className="cw02Table">
                                <TableHead style={TableHeader}>
                                    <TableRow>
                                        <TableCell size={"small"} align={"center"} style={TextWhite}>설정제어</TableCell>
                                        <TableCell size={"small"} align={"center"} style={TextWhite}>시설명</TableCell>
                                        <TableCell size={"small"} align={"center"} style={TextWhite}> 디바이스 명</TableCell>
                                        <TableCell size={"small"} align={"center"} style={TextWhite}>실시간</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{maxHeight: `${filteredPositions[1]?.rowSpan}5vh`}}>
                                    {
                                        copy.map(function (arr, inx) {
                                            return (
                                                <TableRow onClick={() => {
                                                    setNodeAgent(arr.dvcId);
                                                    setDvType(arr.dvcTypeCd);
                                                    setBtnAct(arr.dvcId);

                                                    if (arr.dvcTypeCd === "ARSS") {
                                                        setAgent('arss');
                                                    }
                                                    if (arr.dvcTypeCd === "PPCT") {
                                                        setAgent('ppct');
                                                    }

                                                    DvList();
                                                }} className={btnAct === arr.dvcId ? 'tableHovers' : ''}>

                                                    {
                                                        arr.dvcNm === '미세먼지센서' ?
                                                            <TableCell size={"small"} style={TableCells}>
                                                                <Button variant="contained"
                                                                        sx={{width: 80}}
                                                                        onClick={() => {
                                                                            setDvcId(arr.dvcId);
                                                                            GetEditId(arr.ordNo);
                                                                            setDvcTypeCd(arr.dvcTypeCd);
                                                                            handleOpen();
                                                                        }}>정보보기
                                                                </Button>
                                                            </TableCell> : (
                                                                arr.dvcNm === '피플카운터' ?
                                                                    <TableCell size={"small"} style={TableCells}>
                                                                        <Button variant="contained"
                                                                                sx={{width: 80}}
                                                                                onClick={() => {
                                                                                    setDvcId(arr.dvcId);
                                                                                    GetEditId(arr.ordNo);
                                                                                    setDvcTypeCd(arr.dvcTypeCd);
                                                                                    handleOpen();
                                                                                }}>정보보기
                                                                        </Button>
                                                                    </TableCell> :
                                                                    <TableCell size={"small"} style={TableCells}>
                                                                        <Button variant="contained" onClick={() => {
                                                                            setDvcId(arr.dvcId);
                                                                            GetEditId(arr.ordNo);
                                                                            setDvcTypeCd(arr.dvcTypeCd);
                                                                            handleOpen();
                                                                        }}>제어
                                                                        </Button>
                                                                    </TableCell>
                                                            )
                                                    }

                                                    <TableCell
                                                        size={"small"} style={TableCells}>{nodeNm === '' ? '지점을 선택해주세요.' : nodeNm}</TableCell>
                                                    <TableCell size={"small"} style={TableCells}>{arr?.dvcNm}</TableCell>
                                                    <TableCell
                                                        size={"small"} style={TableCells}>{arr.dtm?.substring(0, 16)}</TableCell>

                                                </TableRow>
                                            )
                                        })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div>
                원하는 시설물을 선택해주세요.
            </div>
        )
    }

}

export default Station02;