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
import {useContext, useEffect, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import Button from "@mui/material/Button";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function AllMonitorTime(){
    const {
        AllBusDataOnSubmit,
        allBusData,
        EcoOutSideGetData,
        ecoOutSideList,
        setEcoOutSideList
    } = useContext(StationContext);
    const navigate = useNavigate();

    useEffect(()=>{
        AllBusDataOnSubmit();
        EcoOutSideGetData();
    },[]);



    let outTemp = []; //실외 온도
    for (let i = 0; i < ecoOutSideList.length; i++) {
        if (ecoOutSideList[i].name === '온도') {
            outTemp.push(ecoOutSideList[i].value);
        }
    }


    //중복제거
    let listArr = [...allBusData];
    const result = listArr.filter((item,id) => {
        return listArr.findIndex((item1,id2) => {
            return item.nodeNm === item1.nodeNm
        }) === id
    })


    //냉난방기
    let cool = [];
    //미세먼지 센서
    let arss = [];

    for(let i = 0; i< allBusData.length; i++){
        if(allBusData[i].dvcNm === '미세먼지센서'){
            arss.push(allBusData[i]);
        }
        if(allBusData[i].dvcNm === '냉난방기'){
            cool.push(allBusData[i]);
        }
    }





    /////////////////////////////////////////////////////////

    let data = [];
    for(let i  = 0; i<cool.length; i++){
        for(let j =0; j<arss.length; j++){

            if(cool[i].nodeNm === arss[j].nodeNm){
                data.push({
                    nodeNm: cool[i].nodeNm,
                    useYn:cool[i].useYn,
                    oprtMode: cool[i].data.oprtMode,
                    windSts: cool[i].data.windSts,
                    autoTemp: cool[i].data.autoTemp,
                    indrTemp:cool[i].data.indrTemp,
                    oprtStHm: cool[i].data.oprtStHm,
                    oprtEdHm: cool[i].data.oprtEdHm,
                    ufineDust:arss[j].data.ufineDust,
                    fineDust:arss[j].data.fineDust,
                    co2:arss[j].data.co2,
                    vocs: arss[j].data.vocs,
                    temp: arss[j].data.temp,
                    hmdt:arss[j].data.hmdt
                })
            }
        }
    }

    console.log("미세먼지 센서 :" ,arss);
    console.log("에어컨 센서 :" , cool);
    console.log("total : ", data);




    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



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
    return(
        <div>
            <div className="Se-Detail01">
                <AppBar themeColor={"light"} sx={{width: "100%", height: "100vh", backgroundColor: "#ebebeb", overflow: 'auto'}}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={{float: "right", fontSize: "24px", marginRight: "1vh", marginTop: "1vh",color: "black"}}
                               onClick={() => {navigate(`/station/status`)}}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="스마트 정류장 전체 모니터링" value="1" sx={{fontSize: 25}}/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <TableContainer style={{cursor: "default"}} sx={{
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
                                    <Table sx={{minWidth: "100%", fontSize: 25}} aria-label="simple table">
                                        <TableHead style={TableHeader}>
                                            <TableRow>
                                                <TableCell style={TextWhite}>지점명</TableCell>
                                                <TableCell style={TextWhite}>상태</TableCell>
                                                <TableCell style={TextWhite}>운전모드</TableCell>
                                                <TableCell style={TextWhite}>바람세기</TableCell>
                                                <TableCell style={TextWhite}>설정온도</TableCell>

                                                <TableCell style={TextWhite}>에어컨 실내온도</TableCell>
                                                <TableCell style={TextWhite}>미세먼지센서 온도</TableCell>

                                                <TableCell style={TextWhite}>실외온도</TableCell>
                                                <TableCell style={TextWhite}>운영시간</TableCell>

                                                <TableCell style={TextWhite}>초미세먼지</TableCell>
                                                <TableCell style={TextWhite}>미세먼지</TableCell>
                                                <TableCell style={TextWhite}>CO2</TableCell>
                                                <TableCell style={TextWhite}>VOCs</TableCell>
                                                <TableCell style={TextWhite}>습도</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(function (arr,inx){
                                                    return(
                                                        <TableRow>
                                                            {/*지점명*/}
                                                            <TableCell
                                                                style={{width: "7%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color, fontSize: TextWhite.fontSize}}
                                                            >
                                                                {arr.nodeNm}
                                                            </TableCell>

                                                            {/*상태*/}
                                                            <TableCell
                                                                style={{width: "2%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}>
                                                                {arr.useYn === 1 ? '정상' : '오류'}
                                                            </TableCell>

                                                            {/*운전모드*/}
                                                            <TableCell
                                                                style={{width: "4%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                            >
                                                                {arr.oprtMode === "0" ? '냉방' :
                                                                    (arr.oprtMode === "1" ? '제습' :
                                                                        (arr.oprtMode === "2" ? '송풍' :
                                                                            (arr.oprtMode === "3" ? '자동' :
                                                                                (arr.oprtMode === "4" ? '난방' : <Button color={"error"}>OFF</Button>))))}
                                                            </TableCell>


                                                            {/*바람세기*/}
                                                            <TableCell
                                                                style={{width: "4%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                            >
                                                                {arr?.windSts === "1" ? '약' :
                                                                    (arr?.windSts === "2" ? '중' :
                                                                        (arr?.windSts === "3" ? '강' :
                                                                            (arr?.windSts === "4" ? '자동' : <Button color={"error"}>OFF</Button>)))}
                                                            </TableCell>


                                                            {/*설정온도*/}
                                                            <TableCell
                                                                style={{width: "5%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}>
                                                                {arr?.autoTemp}℃
                                                            </TableCell>

                                                            {/*에어컨 실내온도*/}
                                                            <TableCell
                                                                style={{width: "5%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                            >{arr?.indrTemp}℃
                                                            </TableCell>

                                                            {/*미세먼지 센서온도 */}
                                                            <TableCell
                                                                style={{width: "5%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                            >{arr?.temp}℃</TableCell>

                                                            {/*미세먼지 실외온도 */}
                                                            <TableCell
                                                                style={{width: "5%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                            >{outTemp[0]}℃</TableCell>



                                                            {/*운영시간*/}
                                                            <TableCell
                                                                style={{width: "5%",
                                                                    backgroundColor: TableCells.backgroundColor,
                                                                    color: TableCells.color,fontSize: TextWhite.fontSize}}
                                                            >
                                                                {arr?.oprtStHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')} ~ <br/>
                                                                {arr?.oprtEdHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}
                                                            </TableCell>

                                                            {/*초미세먼지*/}
                                                            <TableCell style={{width: "5%", backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}>{arr?.ufineDust} ㎍/㎡</TableCell>

                                                            {/*미세먼지*/}
                                                            <TableCell style={{width: "5%", backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}>{arr?.fineDust} ㎍/㎡</TableCell>

                                                            {/*Co2*/}
                                                            <TableCell style={{width: "5%", backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}>{arr?.co2} ppm</TableCell>

                                                            {/*Vocs*/}
                                                            <TableCell style={{width: "5%", backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}>{arr?.vocs} ppb</TableCell>



                                                            {/*습도*/}
                                                            <TableCell style={{width: "5%", backgroundColor: TableCells.backgroundColor, color: TableCells.color,fontSize: TextWhite.fontSize}}>{arr?.hmdt} %</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    variant="outlined"
                                    rowsPerPageOptions={[10, 15, 30, 100]}
                                    component="div"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    style={{backgroundColor: "#1c63c2", marginLeft: "0vh",color:"white"}}
                                    size={"small"}
                                />
                            </TabPanel>

                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}
export default AllMonitorTime;