import * as React from "react";
import {AppBar, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";
import {CrossList} from "../mock_server";

function CrContent02() {
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();
    const {
        list,
        ListSubmit,
        LocalCrossList,
        crossList,
        moniNum, setMoniNum,
    } = useContext(CrossWalkContext);

    //선택 함수토글
    const [btnAct, setBtnAct] = useState(0);

    useEffect(() => {
        ListSubmit();
        LocalCrossList();
    }, []);


    //페이징 처리 이벤트
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    let array = [...list];
    const FilterResult = array.filter((item, id) => {
        return array.findIndex((item1, id2) => {
            return item.node_seq === item1.node_seq
        }) === id
    });
    let reArrayList = [];
    for (let i = 0; i < FilterResult.length; i++) {
        reArrayList.push({
            cross_id: FilterResult[i].node_seq?.toString(),
            cross_name: FilterResult[i].node_name === '예산여자중학교_운전자측' ? '예산 여자 중학교' : (
                FilterResult[i].node_name === '터미널사거리1_운전자측' ? "터미널 사거리 1" : (
                    FilterResult[i].node_name === '터미널사거리2_독립형측' ? "터미널 사거리 2" : (
                        FilterResult[i].node_name === '대산아파트앞_운전자측' ? "대산아파트 앞" : (
                            FilterResult[i].node_name === '석탑사거리1_독립형측' ? "석탐사거리 1" : (
                                FilterResult[i].node_name === '석탑사거리2_독립형측' ? "석탐사거리 2" : (
                                    FilterResult[i].node_name === '치유의숲_운전자측' ? "치유의 숲" : (
                                        FilterResult[i].node_name === '터미널사거리1_독립형측' ? "터미널 사거리 1" : FilterResult[i].node_name
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            status: FilterResult[i].led_status?.substring(14, 16) === "OK" ? 1 : 0,
            device_name: "바닥형 보행신호등 1",
            update_time: FilterResult[i].ai_time?.substring(0, 10) + " " + FilterResult[i].ai_time?.substring(11, 19)
        })
    }


    let seq101 = [reArrayList[0]]; // 예산여자중학교_운전자 1
    let seq102 = []; // 벚꽃로 155번길 입구 2
    let seq103_1 = [reArrayList[1], reArrayList[2]]; //터미널 사거리 1 -3
    let seq103_2 = [reArrayList[3]]; //터미널 사거리 2 - 4
    let seq104 = [reArrayList[4]]; //대산아파트 앞 -5
    let seq105 = []; //아뜨리움 아파트 앞 - 6
    let seq106_1 = [reArrayList[5]]; //석탐사거리 1 -7
    let seq106_2 = [reArrayList[6]]; //석탐사거리 2 -8
    let seq107 = []; //무한교차로 - 9
    let seq108 = [reArrayList[7]]; //치유의 숲 - 10
    let seq109 = []; //예산고등학교 -11
    let seq110 = []; //예화여자고등학교 앞 -12
    let seq111 = []; //쌍송배기 -13


    for (let i = 0; i < crossList.length; i++) {
        if (crossList[i].cross_name === "예산 여자 중학교") {
            seq101.push(crossList[i]);
        }
        if (crossList[i].cross_name === "벛꽃로 155번길 입구") {
            seq102.push(crossList[i]);
        }
        if (crossList[i].cross_name === "터미널 사거리 1") {
            seq103_1.push(crossList[i]);
        }
        if (crossList[i].cross_name === "터미널 사거리 2") {
            seq103_2.push(crossList[i]);
        }
        if (crossList[i].cross_name === "대산아파트 앞") {
            seq104.push(crossList[i]);
        }
        if (crossList[i].cross_name === "아뜨리움 아파트 앞") {
            seq105.push(crossList[i]);
        }
        if (crossList[i].cross_name === "석탐사거리 1") {
            seq106_1.push(crossList[i]);
        }
        if (crossList[i].cross_name === "석탐사거리 2") {
            seq106_2.push(crossList[i]);
        }
        if (crossList[i].cross_name === "무한교차로") {
            seq107.push(crossList[i]);
        }
        if (crossList[i].cross_name === "치유의 숲") {
            seq108.push(crossList[i]);
        }
        if (crossList[i].cross_name === "예산고등학교") {
            seq109.push(crossList[i]);
        }
        if (crossList[i].cross_name === "예화여자고등학교 앞 ") {
            seq110.push(crossList[i]);
        }
        if (CrossList[i].cross_name === "쌍송배기") {
            seq111.push(crossList[i]);
        }
    }



    //1. 예산 여자중학교 완료
    let seq101Sort = seq101.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq101Result = seq101Sort.filter((data) => data?.device_id !== 1301);


    //2. 벚꽃로 155번길 입구 완료
    let seq102Result = seq102.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);


    //3. 터미널사거리 1 완료
    let seq103_1Sort = seq103_1.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq103_1Result = seq103_1Sort.filter((data) => data?.device_id !== 1306 && data?.device_id !== 1307);

    //4. 터미널사거리 2 완료
    let seq103_2Sort = seq103_2.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq103_2Result = seq103_2Sort.filter((data) => data?.device_id !== 1308);

    //대산아파트 완료
    let seq104Sort = seq104.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq104Result = seq104Sort.filter((data) => data?.device_id !== 1309);

    //아뜨리움 아파트 앞 완료
    let seq105Result = seq105.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);

    //석탐사거리 1 완료
    let seq106_1Sort = seq106_1.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq106_1Filter = seq106_1Sort.filter((data) => data?.device_id !== 1311 && data?.device_id !== 1312);
    let seq106_1Result = [];
    for(let i = 0; i<seq106_1Filter.length; i++){
        seq106_1Result.push({
            cross_id: seq106_1Filter[i]?.cross_id === '108' ? '107' : '107',
            cross_name: seq106_1Filter[i]?.cross_name === '석탐사거리 2'? "석탐사거리 1" : "석탐사거리 1",
            status: seq106_1Filter[i]?.status,
            device_name : seq106_1Filter[i]?.cross_id === '108' ? '바닥형 보행신호등 2' : seq106_1Filter[i]?.device_name,
            update_time: seq106_1Filter[i]?.update_time
        })
    }


    //석탐사거리 2 완료
    let seq106_2Sort = seq106_2.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq106_2Result = [];
    for(let i = 0 ; i<seq106_2Sort.length; i++){
        seq106_2Result.push({
            cross_id: seq106_2Sort[i]?.cross_id,
            cross_name:seq106_2Sort[i]?.cross_name,
            status: seq106_2Sort[i]?.status,
            device_name :(seq106_2Sort[i]?.device_name).length > 16 ?(seq106_2Sort[i]?.device_name)?.substring(8,20) : seq106_2Sort[i]?.device_name,
            update_time: seq106_2Sort[i]?.update_time
        })
    }

    //무한교차로 완료
    let seq107Result = seq107.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);

    //치유의숲 완료
    let seq108Sort = seq108.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq108Result = seq108Sort.filter((data) => data?.device_id !== 1316);

    // 예산고등학교 완료
    let seq109Result = seq109.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);

    //예화여자고등학교 완료
    let seq110Result = seq110.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);

    //쌍송배기
    let seq111Result = seq111.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);


    let seqResult = [
        ...seq101Result,
        ...seq102Result,
        ...seq103_1Result,
        ...seq103_2Result,
        ...seq104Result,
        ...seq105Result,
        ...seq106_1Result,
        ...seq106_2Result,
        ...seq107Result,
        ...seq108Result,
        ...seq109Result,
        ...seq110Result,
        ...seq111Result
    ];


    let nodeData = [];
    for (let i = 0; i < seqResult?.length; i++) {
        if (moniNum === seqResult[i]?.cross_name) {
            nodeData.push(seqResult[i]);
        }
    }



    return (
        <div>
            <div className="Se-Detail01">
                <AppBar style={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/crosswalk`);
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="스마트횡단보도 장치 모니터링" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>
                                    <TableContainer style={{marginTop: "-2vh", cursor: "default", marginLeft: "0vh"}}>
                                        <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                                            <TableHead style={TableHeader}>
                                                <TableRow>
                                                    <TableCell size={"small"} align={"center"} style={TextWhite}>관리번호</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={TextWhite}>관리명</TableCell>
                                                    <TableCell size={"small"} align={"center"} style={TextWhite}>상태</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    nodeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((arr, inx) => (
                                                            <TableRow
                                                                key={(rowsPerPage * page) + inx}
                                                                className={moniNum === arr.cross_id ? 'tableHovers' : ''}
                                                                onClick={() => {
                                                                    setMoniNum(arr.cross_id);
                                                                }}
                                                            >

                                                                <TableCell align={"center"} style={TableCells}>{arr.cross_name}</TableCell>
                                                                <TableCell align={"center"} style={TableCells}>{arr.device_name}</TableCell>

                                                                {
                                                                    arr.status === 1 ?
                                                                        <TableCell align={"center"} style={TableCells}><Button>정상</Button></TableCell> :
                                                                        <TableCell align={"center"} style={TableCells}><Button
                                                                            color={"error"}>오류</Button></TableCell>
                                                                }
                                                            </TableRow>
                                                        ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <TablePagination
                                        sx={{minWidth: "100%"}}
                                        variant="outlined"
                                        rowsPerPageOptions={[10, 15, 30, 100]}
                                        component="div"
                                        count={nodeData.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        style={{width: "100%", backgroundColor: "#1c63c2",color:"white",marginLeft: '-2vh'}}
                                        size={"small"}
                                    />

                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>

        </div>
    )
}

export default CrContent02;