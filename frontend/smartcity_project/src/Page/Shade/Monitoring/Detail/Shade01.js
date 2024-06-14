import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {useContext, useEffect, useState} from "react";
import {ShadeContext} from "../../../../ContextServer/ShadeContext";
import Button from "@mui/material/Button";
import {CircularProgress, TablePagination} from "@mui/material";
import ShadeControls from "./ShadeControl/ShadeControls";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function Shade01() {
    const {shadeList, ShadeGetList,setMapOnClick, loading, setRowNum, setOnOff} = useContext(ShadeContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [count, setCount] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        ShadeGetList();
    }, []);


    //풍향값 연산함수
    let wind = [];
    for (let i = 0; i < shadeList.length; i++) {
        let cate = ['북', '북북동', '북동', '동북동', '동', '동남동', '남동', '남남동', '남', '남남서', '남서', '서남서', '서', '서북서', '북서', '북북서'];
        let ceil = cate[Math.ceil(shadeList[i].wind / 22.5)]
        wind.push(ceil);
    }

    let loc = [];
    for (let i = 0; i < shadeList.length; i++) {
        loc.push(shadeList[i].loc3);
    }


    //amode - 자동 - 펼침
    //status - 연결상태


    //제어 모달 띄워주는 이벤
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>

            <ShadeControls open={open} handleClose={handleClose}/>
            <div className="shade-table">
                <Button></Button>
                <TableContainer style={{marginTop: "-5vh", cursor: "default"}} sx={{
                    "&::-webkit-scrollbar": {
                        width: 10,
                        height: 10,
                        cursor: "default"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#565656",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#282828",
                        borderRadius: 0
                    }
                }}>
                    <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell size={"small"}>
                                    <Button
                                        sx={{zIndex: 99999999}}
                                        size={"small"}
                                        variant="contained"
                                        onClick={()=>{setRowNum(1); setOnOff(3); handleOpen();}}>
                                        전체 자동
                                    </Button>
                                    <Button
                                        sx={{marginLeft: 1,zIndex: 99999999}}
                                        color={"secondary"}
                                        size={"small"}
                                        variant="contained"
                                        onClick={()=>{setRowNum(1); setOnOff(4); handleOpen();}}>
                                        전체 접힘
                                    </Button>
                                </TableCell>
                                <TableCell size={"small"} style={TextWhite}>관리주소</TableCell>
                                <TableCell size={"small"} style={TextWhite}>풍향</TableCell>
                                <TableCell size={"small"} style={TextWhite}>온도</TableCell>
                                <TableCell size={"small"} style={TextWhite}>전원</TableCell>

                                <TableCell size={"small"} style={TextWhite}>동작</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            loading === true ? <CircularProgress sx={{fontSize: 30}}/> : null
                        }

                        <TableBody>
                            {
                                shadeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .sort((a, b) => a.id - b.id)
                                    .map(function (a, i) {
                                        return (
                                            <TableRow key={(rowsPerPage * page) + i} onClick={() => {
                                                setMapOnClick(a.id);
                                                setCount(a.id);
                                            }} className={count === a.id ? 'tableHovers' : ''}>
                                                <TableCell style={{width: 180,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>

                                                    {
                                                        a.amode === "0                   " ? <>
                                                                <Button size={"small"} variant="contained" onClick={() => {
                                                                    handleOpen();
                                                                    setRowNum((rowsPerPage * page) + i +1);
                                                                    setOnOff(1);
                                                                }}>자동</Button>
                                                                <Button size={"small"} variant="outlined" onClick={() => {
                                                                    handleOpen();
                                                                    setRowNum((rowsPerPage * page) + i +1);
                                                                    setOnOff(2);
                                                                }}>접힘</Button>
                                                            </> :
                                                            (a.amode === "1                   " ?
                                                                    <>
                                                                        <Button size={"small"}
                                                                                variant="outlined" onClick={() => {
                                                                            handleOpen();
                                                                            setRowNum((rowsPerPage * page) + i +1);
                                                                            setOnOff(1);
                                                                        }}>자동</Button>
                                                                        <Button size={"small"}
                                                                                variant="contained" onClick={() => {
                                                                            handleOpen();
                                                                            setRowNum((rowsPerPage * page) + i +1);
                                                                            setOnOff(2);
                                                                        }}>접힘</Button>
                                                                    </> : null
                                                            )
                                                    }

                                                </TableCell>
                                                <TableCell style={{width: 200,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.loc3}</TableCell>
                                                <TableCell
                                                    style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{wind[(rowsPerPage * page) + i]}</TableCell>
                                                <TableCell style={{width: 80,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.temp} ℃</TableCell>


                                                <TableCell
                                                    style={{width: 80,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.power?.substring(0, 2)}.{a.power?.substring(2, 5)} V</TableCell>


                                                <TableCell style={{width: 60,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>

                                                    {a.status === "1    " ? <Button color={"primary"}>펼침</Button> : (
                                                        a.status === "0    " ? <Button color={"secondary"}>접힘</Button> :
                                                            <Button color={"error"}>점검중</Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{minWidth: "100%"}}
                    variant="outlined"
                    rowsPerPageOptions={[10, 20, 30, 100]}
                    component="div"
                    count={shadeList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{width: "100%", backgroundColor: "#1c63c2", color:"white"}}
                    size={"small"}
                />

            </div>

        </div>
    )


}

export default Shade01;