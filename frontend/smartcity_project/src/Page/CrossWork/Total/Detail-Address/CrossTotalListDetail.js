import {useContext, useEffect, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import {AppBar, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function CrossTotalListDetail() {
    const {
        list,
        setSysNum,
        ListSubmit,
        LocalCrossList,
    } = useContext(CrossWalkContext);
    const navigate = useNavigate();

    useEffect(() => {
        ListSubmit();
        LocalCrossList();
    }, []);


    //선택 함수토글
    const [btnAct, setBtnAct] = useState(0);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //중복제거
    let listArr = [...list];
    const result = listArr.filter((item, id) => {
        return listArr.findIndex((item1, id2) => {
            return item.node_seq === item1.node_seq
        }) === id
    })


    let resultFilter = result.filter((data) =>
        data.node_seq !== 103
        && data.node_seq !== 105
        && data.node_seq !== 107
        && data.node_seq !== 108
    );


    return (
        <div>
            <div className="Se-Detail01">
                <AppBar style={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/crosswalk/total`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="횡단보도 통계목록" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>
                                    <TableContainer style={{marginTop: "0vh"}} sx={{
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
                                        <Table sx={{minWidth: 850}} aria-label="simple table">
                                            <TableHead style={TableHeader}>
                                                <TableRow>
                                                    <TableCell size={"small"} style={TextWhite}>관리번호</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>관리명</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>바닥신호등상태</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>바닥신호등 업로드</TableCell>

                                                    <TableCell size={"small"} style={TextWhite}>LED 상태</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>LED 업로드</TableCell>

                                                    <TableCell size={"small"} style={TextWhite}>카메라상태</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>카메라 업로드</TableCell>

                                                    <TableCell size={"small"} style={TextWhite}>pc 상태</TableCell>

                                                    <TableCell size={"small"} style={TextWhite}>AIBox</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>AIBox 업로드</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    resultFilter
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map(function (arr, inx) {
                                                            return (
                                                                <TableRow key={(rowsPerPage * page) + inx}
                                                                          onClick={() => {
                                                                              setSysNum(arr.node_seq);
                                                                              setBtnAct(arr.node_seq);
                                                                          }}
                                                                          className={btnAct === arr.node_seq ? 'tableHovers' : ''}
                                                                >
                                                                    <TableCell
                                                                        style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{arr.node_seq}</TableCell>
                                                                    <TableCell
                                                                        style={{width: 170,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{arr.node_name}</TableCell>

                                                                    {
                                                                        arr.trafficLight_status === '' ?
                                                                            <TableCell style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>데이터가
                                                                                없습니다.</TableCell> :
                                                                            <TableCell
                                                                                style={{width: 80,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>OK</TableCell>
                                                                    }
                                                                    <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>
                                                                        {arr.t_light_time?.substring(6, 7)}월 {arr.t_light_time?.substring(8, 10)} 일 &nbsp;
                                                                        {arr.t_light_time?.substring(11, 16)}
                                                                    </TableCell>


                                                                    {
                                                                        arr.led_status === '' ?
                                                                            <TableCell style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>데이터가
                                                                                없습니다.</TableCell> :
                                                                            <TableCell
                                                                                style={{width: 80,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>OK</TableCell>
                                                                    }
                                                                    <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>
                                                                        {arr.led_time?.substring(6, 7)}월 {arr.led_time?.substring(8, 10)} 일 &nbsp;
                                                                        {arr.led_time?.substring(11, 16)}
                                                                    </TableCell>

                                                                    {
                                                                        arr.camera_status === '' ?
                                                                            <TableCell style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>데이터가
                                                                                없습니다.</TableCell> :
                                                                            <TableCell
                                                                                style={{width: 80,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>OK</TableCell>
                                                                    }
                                                                    <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>
                                                                        {arr.cctv_time?.substring(6, 7)}월 {arr.cctv_time?.substring(8, 10)} 일 &nbsp;
                                                                        {arr.cctv_time?.substring(11, 16)}
                                                                    </TableCell>


                                                                    {
                                                                        arr.pc_status === '' ?
                                                                            <TableCell style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>데이터가
                                                                                없습니다.</TableCell> :
                                                                            <TableCell
                                                                                style={{width: 80,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>OK</TableCell>
                                                                    }

                                                                    {
                                                                        arr.aibox_status === '' ?
                                                                            <TableCell style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>데이터가
                                                                                없습니다.</TableCell> :
                                                                            <TableCell
                                                                                style={{width: 80,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>OK</TableCell>
                                                                    }
                                                                    <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>
                                                                        {arr.ai_time?.substring(6, 7)}월 {arr.ai_time?.substring(8, 10)} 일 &nbsp;
                                                                        {arr.ai_time?.substring(11, 16)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }

                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            variant="outlined"
                                            rowsPerPageOptions={[15, 30, 45, 100]}
                                            component="div"
                                            count={resultFilter.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2", color: "white"}}
                                            size={"small"}
                                        />
                                    </TableContainer>
                                </div>
                            </TabPanel>

                        </TabContext>
                    </Box>
                </AppBar>
            </div>

        </div>
    )
}

export default CrossTotalListDetail;