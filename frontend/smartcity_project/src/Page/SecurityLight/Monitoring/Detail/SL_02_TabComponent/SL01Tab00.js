import TableCell from "@mui/material/TableCell";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useContext, useState} from "react";
import TableBody from "@mui/material/TableBody";
import {CircularProgress, MenuItem, Select, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import {SecurityLightContext} from "../../../../../ContextServer/SecurityContext";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {SelectBoxs, TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function SL01Tab00(){
    const {setMapIdx,LampList,Loading,LampListArr,
        ResionOnSelect,
        LampResionSameArr, region} = useContext(SecurityLightContext);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //현재시간 날짜
    const offset = 1000 * 60 * 60 * 9
    const koreaNow =  new Date((new Date()).getTime() + offset)
    //한국현재시간
    const korea = koreaNow.toISOString().replace("T", " ").split('.')[0]

    let LampTime = [];
    for(let i = 0; i<LampList.length; i++){
        let lamp_timestamp = new Date( (new Date(LampList[i]?.lamp_timestamp)).getTime() + offset);
        const result = (koreaNow.getTime() - lamp_timestamp.getTime())/60000

        //60,000 = 1분
        LampTime.push(result);
    }


    return(
        <div>
            {
                Loading === true ? <Box sx={{display: 'flex'}} style={{marginLeft: "45%"}}>
                    <CircularProgress size={"7rem"} color={'info'}/>
                </Box> : null
            }
            <FormControl fullWidth sx={SelectBoxs}>
                <InputLabel id="demo-simple-select-label">지역선택</InputLabel>
                <Select
                    sx={{color: "white"}}
                    label="지역선택"
                    value={region}
                    onChange={(e) => ResionOnSelect(e)}
                >
                    <MenuItem value={0}>전체</MenuItem>

                    {
                        LampListArr.map(function (arr,inx){
                            return(
                                <MenuItem value={arr.lamp_gateway} key={inx}>{arr.lamp_region}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>

            <div className="fa06">
                <TableContainer>
                    <Table sx={{minWidth: "100%"}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell size={"small"} style={TextWhite} align={'center'}>지역</TableCell>
                                <TableCell size={"small"} style={TextWhite} align={'center'}>장비번호</TableCell>
                                <TableCell size={"small"} style={TextWhite} align={'center'}>상태</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                region === 0 ? <>
                                    {
                                        LampList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(function (a,i){
                                                return(
                                                    <TableRow
                                                        className="tableHover"
                                                        key={(rowsPerPage * page) + i}
                                                        onClick={()=>{setMapIdx(a.lamp_id);}}
                                                    >
                                                        <TableCell size={"small"} style={TableCells}>{a.lamp_region}</TableCell>
                                                        <TableCell size={"small"} style={TableCells}>{a.lamp_id}</TableCell>
                                                        <TableCell size={"small"} style={TableCells}>
                                                            {
                                                                //마지막 데이터가 5분이상이 넘어가면 비가동 처리
                                                                LampTime[(rowsPerPage * page) + i] < 5 ? '가동중' : '비가동'
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }

                                </> : <>

                                    {
                                        LampResionSameArr.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(function (a,i){
                                                return(
                                                    <TableRow
                                                        className="tableHover"
                                                        key={(rowsPerPage * page) + i}
                                                        onClick={()=>{setMapIdx(a.lamp_id);}}
                                                    >
                                                        <TableCell size={"small"}>{a.lamp_region}</TableCell>
                                                        <TableCell size={"small"}>{a.lamp_id}</TableCell>
                                                        <TableCell size={"small"}>
                                                            {
                                                                //마지막 데이터가 5분이상이 넘어가면 비가동 처리
                                                                LampTime[(rowsPerPage * page) + i] < 5 ? '가동중' : '비가동'
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }


                                </>
                            }




                        </TableBody>
                    </Table>
                </TableContainer>
            </div>



            {
                region === 0 ? <>
                    <TablePagination
                        rowsPerPageOptions={[20, 40, 60, 100]}
                        component="div"
                        count={LampList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{width: "100%", backgroundColor: "#1c63c2",color:"white"}}
                    />
                </> : <>
                    <TablePagination
                        rowsPerPageOptions={[20, 40, 60, 100]}
                        component="div"
                        count={LampResionSameArr.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{width: "100%", backgroundColor: "#1c63c2",color:"white"}}
                    />

                </>
            }


        </div>
    )
}
export default SL01Tab00;