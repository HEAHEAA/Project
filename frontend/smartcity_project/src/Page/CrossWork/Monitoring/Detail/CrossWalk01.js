import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useContext, useEffect, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import {TablePagination} from "@mui/material";
import Table from "@mui/material/Table";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";
import {List, CrossList} from "../mock_server";

function CrossWalk01() {
    const {
        list,
        ListSubmit,
        LocalCrossList,
        crossList,
        moniNum, setMoniNum,
    } = useContext(CrossWalkContext);

    useEffect(() => {
        ListSubmit();
        LocalCrossList();
    }, []);


    //페이징 처리 이벤트
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    let array = [...List];
    // let array = [...list];
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
    let seq106_1 = [reArrayList[5],reArrayList[6]]; //석탐사거리 1 -7
    let seq106_2 = []; //석탐사거리 2 -8
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
        if (crossList[i].cross_name === "쌍송배기") {
            seq111.push(crossList[i]);
        }
    }


    // //예시용
    // for (let i = 0; i < CrossList.length; i++) {
    //     if (CrossList[i].cross_name === "예산 여자 중학교") {
    //         seq101.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "벛꽃로 155번길 입구") {
    //         seq102.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "터미널 사거리 1") {
    //         seq103_1.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "터미널 사거리 2") {
    //         seq103_2.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "대산아파트 앞") {
    //         seq104.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "아뜨리움 아파트 앞") {
    //         seq105.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "석탐사거리 1") {
    //         seq106_1.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "석탐사거리 2") {
    //         seq106_2.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "무한교차로") {
    //         seq107.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "치유의 숲") {
    //         seq108.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "예산고등학교") {
    //         seq109.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "예화여자고등학교 앞 ") {
    //         seq110.push(CrossList[i]);
    //     }
    //     if (CrossList[i].cross_name === "쌍송배기") {
    //         seq111.push(CrossList[i]);
    //     }
    // }


    //1. 예산 여자중학교 완료
    let seq101Sort = seq101?.sort((a, b) => a.device_name.toLowerCase() < b.device_name.toLowerCase() ? -1 : 1);
    let seq101Result = seq101Sort?.filter((data) => data?.device_id !== 1301);


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



    //예산 여자중학교
    let seq101_Error = seq101Result?.filter((data) => data?.status === 0);
    let seq101Data = seq101_Error.length > 0 ?
        {cross_id: "101", cross_name: "예산 여자 중학교", status: "오류", time: seq101Result[0]?.update_time} :
        {cross_id: "101", cross_name: "예산 여자 중학교", status: "정상", time: seq101Result[0]?.update_time}


    //벚꽃로 155
    let seq102_Error = seq102Result.filter((data) => data?.status === 0);
    let seq102Data = seq102_Error.length > 0 ?
        {cross_id: "102", cross_name: "벛꽃로 155번길 입구", status: "오류", time: seq102Result[0]?.update_time} :
        {cross_id: "102", cross_name: "벛꽃로 155번길 입구", status: "정상", time: seq102Result[0]?.update_time}

    //터미널 사거리 1
    let seq103_1_Error = seq103_1Result.filter((data) => data?.status === 0);
    let seq103_1Data = seq103_1_Error.length > 0 ?
        {cross_id: "103-1", cross_name: "터미널 사거리 1", status: "오류", time: seq103_1Result[0]?.update_time} :
        {cross_id: "103-1", cross_name: "터미널 사거리 1", status: "정상", time: seq103_1Result[0]?.update_time}



    //터미널사거리 2
    let seq103_2_Error = seq103_2Result.filter((data) => data?.status === 0);
    let seq103_2Data = seq103_2_Error.length > 0 ?
        {cross_id: "103-2", cross_name: "터미널 사거리 2", status: "오류", time: seq103_2Result[0]?.update_time} :
        {cross_id: "103-2", cross_name: "터미널 사거리 2", status: "정상", time: seq103_2Result[0]?.update_time}

    //대산아파트
    let seq104_Error = seq104Result.filter((data) => data?.status === 0);
    let seq104Data = seq104_Error.length > 0 ?
        {cross_id: "104", cross_name: "대산아파트 앞", status: "오류", time: seq104Result[0]?.update_time} :
        {cross_id: "104", cross_name: "대산아파트 앞", status: "정상", time: seq104Result[0]?.update_time}


    //아뜨리움 아파트 앞
    let seq105_Error = seq105Result.filter((data) => data?.status === 0);
    let seq105Data = seq105_Error.length > 0 ?
        {cross_id: "105", cross_name: "아뜨리움 아파트 앞", status: "오류", time: seq105Result[0]?.update_time} :
        {cross_id: "105", cross_name: "아뜨리움 아파트 앞", status: "정상", time: seq105Result[0]?.update_time}


    //석탐사거리1
    let seq106_1_Error = seq106_1Result.filter((data) => data?.status === 0);
    let seq106_1Data = seq106_1_Error.length > 0 ?
        {cross_id: "106-1", cross_name: "석탐사거리 1", status: "오류", time: seq106_1Result[0]?.update_time} :
        {cross_id: "106-1", cross_name: "석탐사거리 1", status: "정상", time: seq106_1Result[0]?.update_time}



    //석탐사거리2
    let seq106_2_Error = seq106_2Result.filter((data) => data?.status === 0);
    let seq106_2Data = seq106_2_Error.length > 0 ?
        {cross_id: "106-2", cross_name: "석탐사거리 2", status: "오류", time: seq106_2Result[0]?.update_time} :
        {cross_id: "106-2", cross_name: "석탐사거리 2", status: "정상", time: seq106_2Result[0]?.update_time}


    //무한교차로
    let seq107_Error = seq107Result.filter((data) => data?.status === 0);
    let seq107Data = seq107_Error.length > 0 ?
        {cross_id: "107", cross_name: "무한교차로", status: "오류", time: seq107Result[0]?.update_time} :
        {cross_id: "107", cross_name: "무한교차로", status: "정상", time: seq107Result[0]?.update_time}


    //치유의숲
    let seq108_Error = seq108Result.filter((data) => data?.status === 0);
    let seq108Data = seq108_Error.length > 0 ?
        {cross_id: "108", cross_name: "치유의 숲", status: "오류", time: seq108Result[0]?.update_time} :
        {cross_id: "108", cross_name: "치유의 숲", status: "정상", time: seq108Result[0]?.update_time}


    //예산고등학교
    let seq109_Error = seq109Result.filter((data) => data?.status === 0);
    let seq109Data = seq109_Error.length > 0 ?
        {cross_id: "109", cross_name: "예산고등학교", status: "오류", time: seq109Result[0]?.update_time} :
        {cross_id: "109", cross_name: "예산고등학교", status: "정상", time: seq109Result[0]?.update_time}


    //예화여자고등학교 에러검출
    let seq110_Error = seq110Result.filter((data) => data?.status === 0);
    let seq110Data = seq110_Error.length > 0 ?
        {cross_id: "110", cross_name: "예화여자고등학교 앞 ", status: "오류", time: seq110Result[0]?.update_time} :
        {cross_id: "110", cross_name: "예화여자고등학교 앞 ", status: "정상", time: seq110Result[0]?.update_time}


    //쌍송배기 에러검출
    let seq111_Error = seq111Result.filter((data) => data?.status === 0);
    let seq111Data = seq111_Error.length > 0 ?
        {cross_id: "111", cross_name: "쌍송배기", status: "오류", time: seq111Result[0]?.update_time} :
        {cross_id: "111", cross_name: "쌍송배기", status: "정상", time: seq111Result[0]?.update_time}


    /**
     * 스마트횡단보도 모니터링 데이터
     */
    let seqData = [
        seq101Data,
        seq102Data,
        seq103_1Data,
        seq103_2Data,
        seq104Data,
        seq105Data,
        seq106_1Data,
        seq106_2Data,
        seq107Data,
        seq108Data,
        seq109Data,
        seq110Data,
        seq111Data
    ]

    // console.log("테이블 01 :", seqData);
    // console.log("테이블 02 :", List);



    return (
        <Box sx={{width: '100%', typography: 'body1', marginTop: -6, zIndex: 9999999, position: 'absolute'}}>
            <div className="fa04">
                <TableContainer style={{marginTop: "3vh", cursor: "default", marginLeft: "-2vh"}}>
                    <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                        <TableHead style={TableHeader}>
                            <TableRow>
                                <TableCell align={"center"} style={TextWhite}>관리번호</TableCell>
                                <TableCell align={"center"} style={TextWhite}>관리명</TableCell>
                                <TableCell align={"center"} style={TextWhite}>시설물 상태</TableCell>
                                <TableCell align={"center"} style={TextWhite}>업로드 시간</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                seqData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((arr,inx) => (
                                    <TableRow key={(rowsPerPage * page) + inx}
                                              className={moniNum === arr.cross_name ? 'tableHovers' : ''}
                                              onClick={() => {setMoniNum(arr.cross_name)}}>

                                        <TableCell style={TableCells}>{arr.cross_id}</TableCell>
                                        <TableCell style={TableCells}>{arr.cross_name}</TableCell>

                                        {
                                            arr.status == "정상" ?
                                                <TableCell style={TableCells}><Button>정상</Button></TableCell> :
                                                <TableCell style={TableCells}><Button
                                                    color={"error"}>오류</Button></TableCell>
                                        }


                                        <TableCell style={TableCells}>
                                            {arr.time}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TablePagination
                sx={{minWidth: "100%"}}
                variant="outlined"
                rowsPerPageOptions={[15, 15, 30, 100]}
                component="div"
                count={seqData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{width: "100%", backgroundColor: "#1c63c2", color: "white", marginLeft: '-2vh'}}
                size={"small"}
            />
        </Box>

    )
}

export default CrossWalk01;