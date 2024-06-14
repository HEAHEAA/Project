import {useContext, useEffect, useState} from "react";
import {SecurityLightContext} from "../../../../../ContextServer/SecurityContext";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {CircularProgress, TablePagination} from "@mui/material";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab03Dimming from "../SL01_TabComponent/Update/Tab03/Tab03Dimming";
import {TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function SL01Tab04() {
    const {getSysList, getData, Loading, GetEditId} = useContext(SecurityLightContext);

    // 모달
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        getData();
    },[]);


    const [title, setTitle] = useState('');

    //페이징 함수
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };





    return (
        <div>
            {
                Loading === true ? <Box sx={{display: 'flex'}} style={{marginLeft: "45%"}}>
                    <CircularProgress size={"7rem"} color={'info'}/>
                </Box> : null
            }

            <Tab03Dimming open={open} handleClose={handleClose} title={title}/>


            <TableContainer sx={{
                "&::-webkit-scrollbar": {
                    width: 10,
                    height: 10,
                    cursor: "default"
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "#565656",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#3d3d3d",
                    borderRadius: 0
                }
            }}>
                <Table sx={{minWidth: "100%", fontSize: "11px"}} aria-label="simple table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>프로파일명</TableCell>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>밝기도 수정</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getSysList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a, i) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + i} className="tableHover">
                                            <TableCell size={"small"} align={"center"} style={TableCells}>{a.slem_profile_name}</TableCell>

                                            <TableCell size={"small"} align={"center"} style={TableCells}>
                                                <Button variant="contained" size={"small"} onClick={() => {
                                                    GetEditId(a.slem_idx);
                                                    setTitle(a.slem_profile_name);
                                                    handleOpen();
                                                }}>
                                                    장비 밝기도 수정
                                                </Button>
                                            </TableCell>
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
                count={getSysList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{width: "100%", backgroundColor: "#1c63c2",color:"white"}}
            />


        </div>
    )
}

export default SL01Tab04;