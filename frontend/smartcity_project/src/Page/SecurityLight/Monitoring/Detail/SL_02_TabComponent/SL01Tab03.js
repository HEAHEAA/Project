import {useContext, useEffect, useState} from "react";
import {SecurityLightContext} from "../../../../../ContextServer/SecurityContext";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {CircularProgress, Modal, TablePagination} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Tab03Update from "../SL01_TabComponent/Update/Tab03/Tab03Update";
import Button from "@mui/material/Button";
import {BsPlusLg} from "react-icons/bs";
import NewTab03 from "../SL01_TabComponent/Add/Tab03/NewTab03";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";


function SL01Tab03() {
    const {setNum02, getData, getSysList, GetEditId, Loading} = useContext(SecurityLightContext);

    useEffect(() => {
        getData();
    }, []);


    //데이터리스트
    const [getList, setGetList] = useState([]);
    const [index, setIndex] = useState(0);


    //페이징 처리 이벤트
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //모달오픈함수
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };


    const [AddOpen, setAddOpen] = useState(false);
    const handleAddOpen = () => {
        setAddOpen(true);
    };
    const handleAddClose = () => {
        setAddOpen(false);
    };

    return (
        <div>
            {
                Loading === true ? <Box sx={{display: 'flex'}} style={{marginLeft: "45%"}}>
                    <CircularProgress size={"7rem"} color={'info'}/>
                </Box> : null
            }


            <Tab03Update
                open={open}
                handleClose={handleClose}
                getData={getData}
            />

            <NewTab03
                AddOpen={AddOpen}
                setAddOpen={setAddOpen}
                handleAddClose={handleAddClose}
            />

            <Button variant="contained"
                    onClick={() => {
                        handleAddOpen()
                    }}
                    fullWidth sx={{marginTop: 1, marginBottom: 1}}>
                <BsPlusLg/> 장비추가
            </Button>

            <TableContainer className="table">
                <Table sx={{minWidth: "100%"}} aria-label="simple table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell size={"small"} style={{width: 20, color:TextWhite.color}}>번호</TableCell>
                            <TableCell size={"small"} style={{width: 70,color:TextWhite.color}}>프로파일 ID</TableCell>
                            <TableCell size={"small"} style={{width: 120,color:TextWhite.color}}>프로파일명</TableCell>
                            <TableCell size={"small"} style={{width: 100,color:TextWhite.color}}>연결된 게이트 웨이</TableCell>
                            <TableCell size={"small"} style={{width: 60,color:TextWhite.color}}>SSLC 수량</TableCell>
                            <TableCell size={"small"} style={{width: 70,color:TextWhite.color}}>리피터 수량</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getSysList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a, i) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + i} onClick={() => {
                                            GetEditId(a.slem_idx)
                                            handleOpen();
                                            setNum02((rowsPerPage * page) + i);
                                            setIndex(a.slem_idx);
                                        }} className="tableHover">

                                            <TableCell size={"small"}
                                                       style={{width: 20,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{(rowsPerPage * page) + i + 1}</TableCell>
                                            <TableCell size={"small"}
                                                       style={{width: 60,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.slem_profile_id}</TableCell>
                                            <TableCell size={"small"}
                                                       style={{width: 120,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.slem_profile_name}</TableCell>
                                            <TableCell size={"small"} style={{width: 80,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.slem_gateway}</TableCell>
                                            <TableCell size={"small"} style={{width: 60,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.slem_sslc}</TableCell>
                                            <TableCell size={"small"} style={{width: 60,backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.slem_repeater}</TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[15, 30, 60, 100]}
                component="div"
                count={getList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={Paginations}
            />
        </div>
    )
}


export default SL01Tab03;