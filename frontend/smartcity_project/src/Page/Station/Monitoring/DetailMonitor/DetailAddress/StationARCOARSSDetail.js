import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {BsXLg} from "react-icons/bs";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {AppBar} from "@mui/material";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../../Componet/style-config/light-theme";

function StationARCOARSSDetail() {
    const {dv, ARSSList, EcoOutSideGetData, ecoOutSideList,} = useContext(StationContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    useEffect(() => {
        ARSSList();
        EcoOutSideGetData();
    }, []);

    //탭바 이벤트
    const dvArco = [];  //냉난방기 데이터
    const dvArss = [];  //환경센서 데이터

    //특정 data 값만 추출
    for (let i = 0; i < dv?.length; i++) {
        if (dv[i]?.dvcTypeCd === "ARCO") {
            dvArco.push(dv[i]?.data);
        }
        if (dv[i].dvcTypeCd === "ARSS") {
            dvArss.push(dv[i]?.data);
        }
    }


    //차트 데이터값
    let temp = []; //온도
    let hmdt = []; //습도
    let fineDust = []; //미세먼지
    let ufineDust = []; //초미세먼지
    let co2 = []; //이산화탄소
    let vocs = []; //초미세먼지

    for (let i = 0; i < dvArss.length; i++) {
        temp.push(dvArss[i].temp);
        hmdt.push(dvArss[i].hmdt);
        fineDust.push(dvArss[i].fineDust);
        ufineDust.push(dvArss[i].ufineDust);
        co2.push(dvArss[i].co2);
        vocs.push(dvArss[i].vocs);

    }

    //실외 차트 데이터
    let outHmdt = []; //실외 습도
    let outTemp = []; //실외 온도
    let outDust = []; //실외 미세먼지
    let outUdust = []; //실외 초미세먼지
    let none1 = [0]; //실외 co2 (현재값 못받아옴)
    let none2 = [0];//실외 vocs (현재값 못받아옴)


    for(let i=0; i<ecoOutSideList.length; i++){
        if(ecoOutSideList[i].name === '습도'){
            outHmdt.push(ecoOutSideList[i].value);
        }
        if(ecoOutSideList[i].name === '온도'){
            outTemp.push(ecoOutSideList[i].value);
        }
        if(ecoOutSideList[i].name === '미세먼지'){
            outDust.push(ecoOutSideList[i].value);
        }
        if(ecoOutSideList[i].name === '초미세먼지'){
            outUdust.push(ecoOutSideList[i].value);
        }
    }





    const Options_ARSSDust = {
        chart: {
            backgroundColor: 'transparent',
            type: 'column'
        },
        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: ''
            }
        },
        xAxis: {
            categories: ['', '온도', '습도', '미세먼지', '초미세먼지'],
            labels: {
                enabled: true,// disable labels
                style: {
                    color: "#383838",
                }
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: 'black',
                fontWeight: 'lighter'
            }
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                lineWidth: 4,
                pointStart: 1,
                marker: {
                    radius: 0,
                }
            }
        },

        series: [{
            name: '실내',
            data: [temp[0], hmdt[0], fineDust[0], ufineDust[0]],
            color: '#AF87CE',
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'black',
            },
        }, {
            name: '실외',
            data: [outTemp[0], outHmdt[0], outDust[0], outUdust[0]],
            color: '#7e95f6',
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'black',
            },
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }



    const Options_ARSSCoVo = {
        chart: {
            backgroundColor: 'transparent',
            type: 'column'
        },
        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: ''
            }
        },
        xAxis: {
            categories: ['','CO2', 'VOCs'],
            labels: {
                enabled: true,// disable labels
                style: {
                    color: "#383838",
                }
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: 'black',
                fontWeight: 'lighter'
            }
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                lineWidth: 4,
                pointStart: 1,
                marker: {
                    radius: 0,
                }
            }
        },

        series: [{
            name: '실내',
            data: [co2[0], vocs[0]],
            color: '#AF87CE',
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'black',
            },
        }, {
            name: '실외',
            data: [none1, none2,],
            color: '#7e95f6',
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'black',
            },
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }


    return (
        <div>
            <div className="Se-Detail01">
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {navigate(`/station/status`)}}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="정류장 미세먼지 정보" value="1"/>
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
                                                    <TableCell style={TextWhite}>온도</TableCell>
                                                    <TableCell style={TextWhite}>습도</TableCell>
                                                    <TableCell style={TextWhite}>미세먼지</TableCell>
                                                    <TableCell style={TextWhite}>초미세먼지</TableCell>
                                                    <TableCell style={TextWhite}>CO2</TableCell>
                                                    <TableCell style={TextWhite}>VOCs</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell style={TableHeader}
                                                               size={"small"}>환경센서(실내)</TableCell>

                                                    {
                                                        dvArss.map(function (arr, inx) {
                                                            return (
                                                                <>
                                                                    <TableCell style={TableCells}>{arr.temp}℃</TableCell>
                                                                    <TableCell style={TableCells}>{arr.hmdt}%</TableCell>
                                                                    <TableCell style={TableCells}>{arr.fineDust}㎍/㎡</TableCell>
                                                                    <TableCell style={TableCells}>{arr.ufineDust}㎍/㎡</TableCell>
                                                                    <TableCell style={TableCells}>{arr.co2} ppm</TableCell>
                                                                    <TableCell style={TableCells}>{arr.vocs} ppb</TableCell>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </TableRow>

                                                <TableRow>
                                                    <TableCell style={TableHeader}>환경센서(실외)</TableCell>

                                                    <TableCell style={TableCells}>{outTemp[0]}℃</TableCell>
                                                    <TableCell style={TableCells}>{outHmdt[0]}%</TableCell>
                                                    <TableCell style={TableCells}>{outDust[0]}㎍/㎡</TableCell>
                                                    <TableCell style={TableCells}>{outUdust}㎍/㎡</TableCell>
                                                    <TableCell style={TableCells}> - </TableCell>
                                                    <TableCell style={TableCells}> - </TableCell>


                                                </TableRow>


                                                <TableRow>
                                                    <TableCell style={TableHeader}>상태기준</TableCell>

                                                    {
                                                        dvArss.map(function (arr, inx) {

                                                            //온도 함수
                                                            let temp = [];
                                                            if (0 > arr.temp) {
                                                                temp.push('낮음');
                                                            }
                                                            if (0 <= arr.temp && arr.temp <= 20) {
                                                                temp.push('좋음');
                                                            }
                                                            if (20 <= arr.temp && arr.temp <= 30) {
                                                                temp.push('보통');
                                                            }
                                                            if (30 <= arr.temp) {
                                                                temp.push('높음');
                                                            }

                                                            //습도 함수
                                                            let hmdt = [];
                                                            if (0 <= arr.hmdt && arr.hmdt <= 30) {
                                                                hmdt.push('낮음');
                                                            }
                                                            if (31 <= arr.hmdt && arr.hmdt <= 70) {
                                                                hmdt.push('보통');
                                                            }
                                                            if (71 <= arr.hmdt && arr.hmdt <= 100) {
                                                                hmdt.push('높음');
                                                            }


                                                            //미세먼지 함수
                                                            let dust = [];
                                                            let dustColor = [];
                                                            if (0 <= arr.fineDust && arr.fineDust <= 30) {
                                                                dust.push('좋음');
                                                                dustColor.push('#5b5be7');
                                                            }
                                                            if (31 <= arr.fineDust && arr.fineDust <= 80) {
                                                                dust.push('보통');
                                                                dustColor.push('#2cc000')
                                                            }
                                                            if (81 <= arr.fineDust && arr.fineDust <= 150) {
                                                                dust.push('나쁨');
                                                                dustColor.push('#ffa113')
                                                            }
                                                            if (151 <= arr.fineDust) {
                                                                dust.push('매우나쁨');
                                                                dustColor.push('#ff5114')
                                                            }


                                                            //초미세먼지 함수
                                                            let uDust = [];
                                                            let uDustColor = [];
                                                            if (0 <= arr.ufineDust && arr.ufineDust <= 15) {
                                                                uDust.push('좋음');
                                                                uDustColor.push('#5b5be7');
                                                            }
                                                            if (16 <= arr.ufineDust && arr.ufineDust <= 35) {
                                                                uDust.push('보통');
                                                                uDustColor.push('#2cc000');
                                                            }
                                                            if (36 <= arr.ufineDust && arr.ufineDust <= 75) {
                                                                uDust.push('나쁨');
                                                                uDustColor.push('#ffa113');
                                                            }
                                                            if (76 <= arr.ufineDust) {
                                                                uDust.push('매우나쁨');
                                                                uDustColor.push('#ff5114');
                                                            }


                                                            //co2 함수
                                                            let co2 = [];
                                                            let co2Color = [];
                                                            if (0 <= arr.co2 && arr.co2 <= 450) {
                                                                co2.push('좋음');
                                                                co2Color.push('#5b5be7');
                                                            }
                                                            if (451 <= arr.co2 && arr.co2 <= 1000) {
                                                                co2.push('보통');
                                                                co2Color.push('#2cc000');
                                                            }
                                                            if (1001 <= arr.co2 && arr.co2 <= 2000) {
                                                                co2.push('나쁨');
                                                                co2Color.push('#ffa113');
                                                            }
                                                            if (2001 <= arr.co2) {
                                                                co2.push('매우나쁨');
                                                                co2Color.push('#ff5114');
                                                            }

                                                            //vocs 함수
                                                            let vocs = [];
                                                            let vocsColor = [];
                                                            if (0 < arr.vocs && arr.vocs <= 300) {
                                                                vocs.push('좋음');
                                                                vocsColor.push('#5b5be7');
                                                            }
                                                            if (301 <= arr.vocs && arr.vocs <= 1000) {
                                                                vocs.push('보통');
                                                                vocsColor.push('#2cc000');
                                                            }
                                                            if (1001 <= arr.vocs) {
                                                                vocs.push('나쁨');
                                                                vocsColor.push('#ffa113');
                                                            }

                                                            return (
                                                                <>
                                                                    <TableCell style={TableCells}>{temp[0]}</TableCell>
                                                                    <TableCell style={TableCells}>{hmdt[0]}</TableCell>
                                                                    <TableCell style={{backgroundColor: dustColor[0],color:"white"}}>{dust[0]}</TableCell>
                                                                    <TableCell style={{backgroundColor: uDustColor[0],color:"white"}}>{uDust[0]}</TableCell>
                                                                    <TableCell style={{backgroundColor: co2Color[0],color:"white"}}>{co2[0]}</TableCell>
                                                                    <TableCell style={{backgroundColor: vocsColor[0],color:"white"}}>{vocs[0]}</TableCell>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                <HighchartsReact highcharts={Highcharts} options={Options_ARSSDust}
                                                 containerProps={{className: "statusChart2-b"}}/>
                                <HighchartsReact highcharts={Highcharts} options={Options_ARSSCoVo}
                                                 containerProps={{className: "statusChart2-b"}}/>

                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}

export default StationARCOARSSDetail;