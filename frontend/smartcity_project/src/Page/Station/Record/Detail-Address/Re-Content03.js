import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import * as React from "react";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import {AppBar} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import {DetailExitIcon, DetailPageBg} from "../../../../Componet/style-config/light-theme";

function ReContent03() {
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const GoUs = () => {
        navigate('/station/record');
    }

    const {timeList, agent, setAgent,} = useContext(StationContext);



    let arss = [];
    let ppct = [];

    for (let i = 0; i < timeList.length; i++) {
        if (agent === 'arss') {
            arss.push(timeList[i].vals);
        }
        if (agent === 'ppct') {
            ppct.push(timeList[i].vals);
        }
    }



    let type01 = []; //온도
    let type02 = []; //습도
    let type03 = []; //미세먼지
    let type04 = []; //초미세먼지
    let type05 = []; //이산화탄소
    let type06 = []; //총휘발성
    let typeDate = [];
    let typeDate01 = [];
    let typeTime = [];

    let week = ['일','월','화','수','목','금','토'];
    let dataData = [];

    for(let i=0; i<timeList.length; i++){
        type01.push(timeList[i].vals[0]);
        type02.push(timeList[i].vals[1]);
        type03.push(timeList[i].vals[2]);
        type04.push(timeList[i].vals[3]);
        type05.push(timeList[i].vals[4]);
        type06.push(timeList[i].vals[5]);

        typeDate.push(timeList[i].intime);
        typeDate01.push(timeList[i].intime?.substring(8,10))
        typeTime.push(timeList[i].intime?.substring(10, 16))
    }

    for(let i = 0; i<typeDate.length; i++){
        dataData.push(  typeDate01[i] + "(" + week[new Date(typeDate[i]).getDay()] + ")"+ '<br/>' + typeTime[i])
    }


    /**
     * 배열 거꾸로 뒤집기
     * */
    let ReType01 = type01;
    let ReType02 = type02;
    let ReType03 = type03;
    let ReType04 = type04;
    let ReType05 = type05;
    let ReType06 = type06;
    let ReTypeDate = dataData;
    let ReUnShift = ReTypeDate.unshift('현재');

    //셀렉트박스
    const selectArr = [];
    for (let i = 0; i < timeList.length; i++) {
        selectArr.push(timeList[0]?.name);
    }






    let timeEdit = [...timeList];
    let ppctTime = [];
    let ppctTime01 = [];
    let ppctTime02 = [];

    let ppctDataDate = [];

    let ppctData01 = []; //금일입실수
    let ppctData02 = []; //금일 퇴실수


    for(let i = 0; i<timeEdit.length; i++){
        ppctTime.push(timeEdit[i].intime);
        ppctTime01.push(timeEdit[i].intime?.substring(8,10));
        ppctTime02.push(timeEdit[i].intime?.substring(10, 16));

        ppctData01.push(timeEdit[i].vals[0]);
        ppctData02.push(timeEdit[i].vals[1]);
    }

    for(let i = 0; i<ppctTime.length; i++){
        ppctDataDate.push(ppctTime01[i] + "(" +  week[new Date(ppctTime[i]).getDay()] + ")"+ '<br/>' + ppctTime02[i]);
    }


    let ReDataDate = ppctDataDate;
    let ReDataDateUn = ReDataDate.unshift('현재');
    let ReppctData01 = ppctData01;
    let ReppctData02 = ppctData02;



    const options = {
        chart: {
            backgroundColor: 'transparent',
            height: 40 + '%',
            scrollablePlotArea: {
                minWidth: 38000,
                scrollPositionX: -38000
            }
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
            categories: ReTypeDate,
            type: 'datetime',
            labels: {
                overflow: "justify",
                style: {
                    color: 'black',
                    fontWeight: "bold"
                }
            },
            accessibility: {
                enabled: false
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
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
            name: '온도(℃)',
            data: ReType01,
            color: '#AF87CE'
        }, {
            name: '습도(%)',
            data: ReType02,
            color: '#EA1A7F'
        }, {
            name: '미세먼지',
            data: ReType03,
            color: '#FEC603'
        }, {
            name: '초미세먼지',
            data: ReType04,
            color: '#A8F387'
        }, {
            name: '이산화탄소',
            data: ReType05,
            color: '#16D6FA'

        }, {
            name: 'VOCs 휘발성화합물',
            data: ReType06,
            color: '#FE7A15'
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

    const option = {
        chart: {
            backgroundColor: 'transparent',
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
            categories: ReDataDate,
            labels: {
                style: {
                    color: 'black'
                }
            },
            accessibility: {
                enabled: false
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
            name: '금일입실수',
            data: ReppctData01,
            color: '#1c63c2'
        }, {
            name: '금일퇴실수',
            data: ReppctData02,
            color: '#ff883a'
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
                               onClick={() => {
                                   navigate(`/station/record`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="실시간 데이터 추이" value="1"/>
                                </TabList>
                            </Box>

                            <TabPanel value="1">
                                {
                                    agent === "arss" ? <HighchartsReact highcharts={Highcharts} options={options}  containerProps={{className: "chart01-4-2"}}/> :
                                        <HighchartsReact highcharts={Highcharts} options={option}  containerProps={{className: "chart01-4-2"}}/>
                                }
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )

}

export default ReContent03;



