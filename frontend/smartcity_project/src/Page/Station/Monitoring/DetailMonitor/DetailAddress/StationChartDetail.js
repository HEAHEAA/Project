import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {AppBar, Chip, Stack} from "@mui/material";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../../Componet/style-config/light-theme";

function StationChartDetail(){
    const {
        nodeId,
        dv,arco,
        ArcoList,nodAll,
        devicesAllData,
        dvAllData,
    } = useContext(StationContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(()=>{
        ArcoList();
        devicesAllData();
    },[nodeId]);

    let autoTemp = []; //설정온도
    let indrTemp = []; //실내 온도
    let nodeNm = []; //지점명

    //전체 지점 설정온도,실내온도 데이터 추출
    for (let i = 0; i < arco?.length; i++) {
        autoTemp.push(arco[i]?.data.autoTemp);
        indrTemp.push(arco[i]?.data.indrTemp);
        // nodeNm.push(dv[i].nodeNm);
    }

    //전체지점 지점명 데이터 추출
    for(let i = 0 ; i<nodAll.length; i++){
        nodeNm.push(nodAll[i].nodeNm);
    }



    const dvArco = [];  //냉난방기 데이터
    const dvArss = [];//환경센서 데이터
    //하나의 지점에 대한 냉난방기 데이터 추출
    for (let i = 0; i < dv?.length; i++) {
        if (dv[i]?.dvcTypeCd === "ARCO") {
            dvArco.push(dv[i]?.data);
        }
        if (dv[i].dvcTypeCd === "ARSS") {
            dvArss.push(dv[i]?.data);
        }
    }





    let totalData = [];
    let temp = [];
    let auto = [];
    let temp_node_name = [];
    for(let i = 0; i <dvAllData.length; i++){
        for(let j = 0; j<nodeNm.length; j++){
            if(dvAllData[i].nodeNm === nodeNm[j]){

                totalData.push({
                    node_name: dvAllData[i].nodeNm,
                    temp: dvAllData[i].data.temp,
                    auto_temp: arco[j].data.autoTemp
                })

                temp.push(dvAllData[i].data.temp);
                auto.push(arco[j].data.autoTemp);
                temp_node_name.push(dvAllData[i].nodeNm);
            }
        }
    }



    const optionChart = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
            style: {
                color: '#1c1c1c',
                fontSize: 13,
            },
            align: 'center'
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: temp_node_name,
            labels: {
                style: {
                    color: 'black'
                }
            },
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        legend: {
            itemStyle: {
                color: 'black',
            },
        },

        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: '설정온도(℃)',
                data: auto,
                color: {
                    linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                    stops: [
                        [0, '#43CBFF'],
                        [1, '#1d5970']
                    ]
                },
            },
            {
                name: '실내온도(℃)',
                data: temp,
                color: {
                    linearGradient: {x1: 0, x2: 0, y1: 0, y2: 1},
                    stops: [
                        [0, '#e467f8'],
                        [1, '#882598']
                    ]
                },
            }
        ]
    }


    return(
        <div>
            <div className="Se-Detail01">
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {navigate(`/station/status`)}}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="정류장 냉난방 정보" value="1"/>
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
                                    <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                                        <TableHead style={TableHeader}>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell style={TextWhite}>운전</TableCell>
                                                <TableCell style={TextWhite}>운전모드</TableCell>
                                                <TableCell style={TextWhite}>바람세기</TableCell>
                                                <TableCell style={TextWhite}>제상모드</TableCell>
                                                <TableCell style={TextWhite}>설정온도</TableCell>
                                                <TableCell style={TextWhite}>실내온도</TableCell>
                                                <TableCell style={TextWhite}>상태</TableCell>
                                                <TableCell style={TextWhite}>운영시간</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={TableHeader}>냉난방기</TableCell>
                                                {
                                                    dvArco.map(function (a, i) {
                                                        return (
                                                            <>
                                                                <TableCell key={i} style={TableCells}>
                                                                    {dvArco[i]?.oprt === 1 ? '자동' : '수동'}
                                                                </TableCell>
                                                                <TableCell style={TableCells}>{dvArco[i]?.oprtMode === "0" ? '냉방' :
                                                                    (dvArco[i]?.oprtMode === "1" ? '제습' :
                                                                        (dvArco[i]?.oprtMode === "2" ? '송풍' :
                                                                            (dvArco[i]?.oprtMode === "3" ? '자동' :
                                                                                (dvArco[i]?.oprtMode === "4" ? '난방' : '모드가 설정되지 않았습니다.'))))}
                                                                </TableCell>
                                                                <TableCell style={TableCells}>{dvArco[i]?.windSts === "1" ? '약' :
                                                                    (dvArco[i]?.windSts === "2" ? '중' :
                                                                        (dvArco[i]?.windSts === "3" ? '강' :
                                                                            (dvArco[i]?.windSts === "4" ? '자동' : '바람세기가 설정되지 않았습니다.')))}
                                                                </TableCell>
                                                                <TableCell style={TableCells}>
                                                                    <Stack direction="row" spacing={1}>
                                                                        {
                                                                            dvArco[i]?.dfrst === 1 ? <Chip label="자동" /> : <Chip label="수동" variant="outlined" />
                                                                        }
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell style={TableCells}>{dvArco[i]?.autoTemp}℃</TableCell>
                                                                <TableCell style={TableCells}>{dvArss[i]?.temp}℃</TableCell>
                                                                <TableCell style={TableCells}>{dvArco[i]?.errCd === '0' ? '정상' : '연결실패'}</TableCell>
                                                                <TableCell style={TableCells}>
                                                                    {dvArco[i]?.oprtStHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')} ~
                                                                    {dvArco[i]?.oprtEdHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}
                                                                </TableCell>
                                                            </>

                                                        )
                                                    })
                                                }
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <HighchartsReact highcharts={Highcharts} options={optionChart}
                                                 containerProps={{className: "statusChart"}}/>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>

        </div>
    )
}
export default StationChartDetail;