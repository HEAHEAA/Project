import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {CircularProgress, TablePagination} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Station01Ud from "../Detail-Update/Station01Ud";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function Station00() {
    const {
        GetAllNodes,
        nodAll,
        setNodId,
        Loading,
        setNodeIds,
        setMapIdx,
        setNodeNm,
        setNodAll,
        filteredPositions,
    } = useContext(StationContext);

    //선택 함수토글
    const [btnAct, setBtnAct] = useState(0);

    //페이징 함수
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //수정 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        GetAllNodes();
    }, []);

    //지점 별 운전모드 반복문 돌리기위한 각 수동/자동 value 값 구하는 함수
    const [useYn, setUseYn] = useState(0);
    let yn = [];
    for(let i = 0; i < nodAll.length; i++) {
        yn.push(nodAll[i].autoCtrlYn);
    }

    const onEdit = (targetId,newNum) => {
        setNodAll(
            nodAll.map((it) => it.nodeId === targetId ? {...it, autoCtrlYn : useYn} : it)
        )
    }


    const NodeUpdate = async () => {
        nodAll.forEach((el,idx) => {
            fetch(`/nodeApi/nodesUpdate/${nodAll[idx].nodeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    autoCtrlYn: yn[idx],
                })
            }).then(res => res.json()).then(res => {
            });
        })
        GetAllNodes();
    }





    return (
        <div>
                <Station01Ud NodeUpdate={NodeUpdate} open={open} handleClose={handleClose} useYn={useYn}
                             setUseYn={setUseYn}/>

                <Button variant="contained"  fullWidth sx={{marginTop: -4, zIndex: 9999999999, position: "relative",backgroundColor: "#1c63c2", color: "white"}}
                onClick={()=>{handleOpen();}}
                >적용
                </Button>

                <div className="fa03">
                    <TableContainer style={{marginTop: "-0vh", cursor: "default"}}>
                        <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table" className="cw02Table">
                            <TableHead style={TableHeader}>
                                <TableRow>
                                    <TableCell align={"center"} style={TextWhite}>운전모드 변경</TableCell>
                                    <TableCell align={"center"} style={TextWhite}>시설물명</TableCell>
                                    <TableCell align={"center"} style={TextWhite}>자동수동 여부</TableCell>
                                    <TableCell align={"center"} style={TextWhite}>연결여부</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                Loading === true ? <Box sx={{display: 'flex'}} style={{marginLeft: "45%"}}>
                                    <CircularProgress size={"7rem"} color={'info'}/>
                                </Box> : null
                            }
                            <TableBody style={{maxHeight: `${filteredPositions[0]?.rowSpan * 10 - 5}vh`}}>
                                {
                                    nodAll
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (a, i) {
                                            return (
                                                <TableRow onClick={() => {
                                                    setNodId(a.nodeId);
                                                    setNodeNm(a.nodeNm);
                                                    setMapIdx(a.nodeId);
                                                    setBtnAct(a.nodeId);
                                                }} className={btnAct === a.nodeId ? 'tableHovers' : ''}>

                                                    <TableCell size={"small"} style={TableCells}>

                                                        {
                                                            a.autoCtrlYn === 0 ?
                                                                <Button variant="contained" onClick={() => {
                                                                    setNodeIds(a.nodeId);
                                                                    setUseYn(0);
                                                                    alert('현재수동모드입니다.')
                                                                    onEdit(a.nodeId)
                                                                }}>수동</Button>
                                                                : <Button variant="outlined" onClick={() => {
                                                                    setNodeIds(a.nodeId);
                                                                    setUseYn(0);
                                                                    onEdit(a.nodeId)
                                                                }}>수동</Button>
                                                        }

                                                        {
                                                            a.autoCtrlYn === 1 ?
                                                                <Button variant="contained" onClick={() => {
                                                                    setNodeIds(a.nodeId);
                                                                    setUseYn(1);
                                                                    onEdit(a.nodeId)
                                                                    alert('현재수동모드입니다.')
                                                                }}>자동</Button>
                                                                : <Button variant="outlined" onClick={() => {
                                                                    setNodeIds(a.nodeId);
                                                                    setUseYn(1);
                                                                    onEdit(a.nodeId)
                                                                }}>자동</Button>
                                                        }


                                                    </TableCell>

                                                    <TableCell size={"small"} style={TableCells}>{a.nodeNm}</TableCell>
                                                    <TableCell size={"small"} style={TableCells}>
                                                        {a.autoCtrlYn === 1 ? '자동' : '수동'}
                                                    </TableCell>

                                                    <TableCell size={"small"} style={TableCells}>
                                                        {a.useYn === 1 ? '정상' : '오류'}
                                                    </TableCell>


                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <TablePagination
                    sx={{minWidth: "100%"}}
                    variant="outlined"
                    rowsPerPageOptions={[15, 30, 45, 100]}
                    component="div"
                    count={nodAll.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={Paginations}
                    size={"small"}
                />

        </div>
    )
}

export default Station00;