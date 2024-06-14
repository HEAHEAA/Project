import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import * as React from "react";
import Box from "@mui/material/Box";
import {CircularProgress, MenuItem, Select, TablePagination} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {SecurityLightContext} from "../../../../../ContextServer/SecurityContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {
    Paginations,
    SelectBoxs,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../../Componet/style-config/light-theme";

function Tab00(){
    const {setMapIdx,LampListArr, ResionOnSelect, LampResionSameArr, region} = useContext(SecurityLightContext);
    const {access, RefreshToken} = useContext(LoginContext);
    const [LampList,setLampList]  = useState([]);
    const [Loading,setLoading] = useState(true);


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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //스마트보안등 전체 목록 리스트 GET
    useEffect(()=>{
        GetLampData();
    },[]);
    const GetLampData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/strLamp/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setLampList(res.data);
            setLoading(false);
        })
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
                    value={region}
                    onChange={(e) => ResionOnSelect(e)}
                >
                    <MenuItem value={0}>전체</MenuItem>

                    {
                        LampListArr.map(function (arr,inx){
                            return(
                                <MenuItem value={arr.lamp_gateway}>{arr.lamp_region}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>

            <div className="fa03">
                <TableContainer>
                    <Table sx={{minWidth: 1250}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell align={"center"} style={TextWhite}>장비번호</TableCell>
                                <TableCell align={"center"} style={TextWhite}>명칭</TableCell>
                                <TableCell align={"center"} style={TextWhite}>지역</TableCell>
                                <TableCell align={"center"} style={TextWhite}>게이트웨이</TableCell>
                                <TableCell align={"center"} style={TextWhite}>주파수</TableCell>
                                <TableCell align={"center"} style={TextWhite}>x좌표</TableCell>
                                <TableCell align={"center"} style={TextWhite}>y좌표</TableCell>
                                <TableCell align={"center"} style={TextWhite}>가동확인</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                region === 0 ? <>
                                    {
                                        LampList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(function (a,i){
                                                return(
                                                    <TableRow className="tableHover" key={(rowsPerPage * page) + i} onClick={()=>{setMapIdx(a.lamp_id);}}>
                                                        <TableCell style={TableCells}>{a.lamp_id}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_region}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_addr}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_gateway}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_frequency}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_xpos}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_ypos}</TableCell>
                                                        <TableCell style={TableCells}>
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
                                                    <TableRow className="tableHover" key={(rowsPerPage * page) + i} onClick={()=>{setMapIdx(a.lamp_id);}}>
                                                        <TableCell style={TableCells}>{a.lamp_id}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_region}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_addr}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_gateway}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_frequency}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_xpos}</TableCell>
                                                        <TableCell style={TableCells}>{a.lamp_ypos}</TableCell>
                                                        <TableCell style={TableCells}>
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


            <TablePagination
                rowsPerPageOptions={[30, 60, 100, 120]}
                component="div"
                count={LampList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={Paginations}
            />

        </div>
    )
}
export default Tab00;