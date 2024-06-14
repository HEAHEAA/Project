import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useContext, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import {SelectBoxs} from "../../../../Componet/style-config/light-theme";

function Record03() {
    const {timeList, agent, setAgent} = useContext(StationContext);


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


    //셀렉트박스
    const selectArr = [];
    for (let i = 0; i < timeList.length; i++) {
        selectArr.push(timeList[0]?.name);
    }

    const [select, setSelect] = useState(99);
    const [selectName, setSelectName] = useState('온도');
    const onSelect = (e) => {
        e.preventDefault();
        setSelect(e.target.value);
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

    let typeData = []; //타입별 데이터


    let week = ['일', '월', '화', '수', '목', '금', '토'];
    let dataData = [];


    for (let i = 0; i < timeList.length; i++) {
        type01.push({
            array: timeList[i].vals[0],
            intime:timeList[i].intime?.substring(11, 16)
        });
        type02.push({
            array: timeList[i].vals[1],
            intime:timeList[i].intime?.substring(11, 16)
        });
        type03.push({
            array: timeList[i].vals[2],
            intime:timeList[i].intime?.substring(11, 16)
        });
        type04.push({
            array:timeList[i].vals[3],
            intime:timeList[i].intime?.substring(11, 16)
        });
        type05.push({
            array: timeList[i].vals[4],
            intime:timeList[i].intime?.substring(11, 16)
        });
        type06.push({
            array: timeList[i].vals[5],
            intime:timeList[i].intime?.substring(11, 16)
        });


        if (selectName === '온도') {
            typeData.push({
                array: timeList[i].vals[0],
                intime:timeList[i].intime?.substring(11, 16)
            });
        } else if (selectName === '습도') {
            typeData.push({
                array: timeList[i].vals[1],
                intime:timeList[i].intime?.substring(11, 16)
            });
        } else if (selectName === '미세먼지') {
            typeData.push({
                array: timeList[i].vals[2],
                intime:timeList[i].intime?.substring(11, 16)
            });
        } else if (selectName === '초미세먼지') {
            typeData.push({
                array:timeList[i].vals[3],
                intime:timeList[i].intime?.substring(11, 16)
            });
        } else if (selectName === '이산화탄소') {
            typeData.push({
                array: timeList[i].vals[4],
                intime:timeList[i].intime?.substring(11, 16)
            });
        } else if (selectName === '총휘발성유기화합물') {
            typeData.push({
                array: timeList[i].vals[5],
                intime:timeList[i].intime?.substring(11, 16)
            });
        }
        typeDate.push(timeList[i].intime?.substring(0, 10));
        typeDate01.push(timeList[i].intime?.substring(8, 10))
        typeTime.push(timeList[i].intime?.substring(10, 16))
    }




    for (let i = 0; i < typeDate.length; i++) {
        dataData.push(typeDate01[i] + "(" + week[new Date(typeDate[i]).getDay()] + ")" + '<br/>' + typeTime[i]);
    }

    /**
     * 배열 거꾸로 뒤집기
     * */
    // let ReType01 = type01;
    // let ReType02 = type02;
    // let ReType03 = type03;
    // let ReType04 = type04;
    // let ReType05 = type05;
    // let ReType06 = type06;
    // let ReTypeDate = dataData;

    let ReType01 = []; //온도
    let ReType02 =[]; //습도
    let ReType03 = []; //미세먼지
    let ReType04 = []; //초미세먼지
    let ReType05 = []; //이산화탄소
    let ReType06 = []; //총휘발성
    let ReTypeDate = [];
    let SelectTypeData = [];


    //시간
    for(let i = 0; i<dataData.length; i++){
        if(dataData[i]?.substring(14,20) === "00" || dataData[i]?.substring(14,20) === "30" ){
            ReTypeDate.push(dataData[i])
        }
    }

    //온도
    for(let i = 0; i<type01.length; i++){
        if(type01[i]?.intime.substring(3,5) == "00" || type01[i]?.intime.substring(3,5) == "30"){
            ReType01.push(type01[i].array);
        }
    }

    //습도
    for(let i = 0; i<type02.length; i++){
        if(type02[i]?.intime.substring(3,5) == "00" || type02[i]?.intime.substring(3,5) == "30"){
            ReType02.push(type02[i].array);
        }
    }

    //미세먼지
    for(let i = 0; i<type03.length; i++){
        if(type03[i]?.intime.substring(3,5) == "00" || type03[i]?.intime.substring(3,5) == "30"){
            ReType03.push(type03[i].array);
        }
    }

    //초미세먼지
    for(let i = 0; i<type04.length; i++){
        if(type04[i]?.intime.substring(3,5) == "00" || type04[i]?.intime.substring(3,5) == "30"){
            ReType04.push(type04[i].array);
        }
    }

    //이산화탄소
    for(let i = 0; i<type05.length; i++){
        if(type05[i]?.intime.substring(3,5) == "00" || type05[i]?.intime.substring(3,5) == "30"){
            ReType05.push(type05[i].array);
        }
    }

    //이산화탄소
    for(let i = 0; i<type06.length; i++){
        if(type06[i]?.intime.substring(3,5) == "00" || type06[i]?.intime.substring(3,5) == "30"){
            ReType06.push(type06[i].array);
        }
    }


    //타입별데이터
    for(let i = 0; i<typeData.length; i++){
        if(typeData[i]?.intime.substring(3,5) == "00" || typeData[i]?.intime.substring(3,5) == "30"){
            SelectTypeData.push(typeData[i].array);
        }
    }

    let ReUnShift = ReTypeDate.unshift('현재');






    let timeEdit = [...timeList];

    let ppctTime = [];
    let ppctTime01 = [];
    let ppctTime02 = [];

    let ppctDataDate = [];

    let ppctData01 = []; //금일입실수
    let ppctData02 = []; //금일 퇴실수


    for (let i = 0; i < timeEdit.length; i++) {
        ppctTime.push(timeEdit[i].intime);

        ppctTime01.push(timeEdit[i].intime?.substring(8, 10));
        ppctTime02.push(timeEdit[i].intime?.substring(10, 16));

        ppctData01.push(timeEdit[i].vals[0]);
        ppctData02.push(timeEdit[i].vals[1]);
    }


    for (let i = 0; i < ppctTime.length; i++) {
        ppctDataDate.push(ppctTime01[i] + "(" + week[new Date(ppctTime[i]).getDay()] + ")" + '<br/>' + ppctTime02[i]);
    }




    let ReDataDate = ppctDataDate;
    let ReDataDateUn = ReDataDate.unshift('현재');
    let ReppctData01 = ppctData01;
    let ReppctData02 = ppctData02;




// 현재 시간 계산하기
    const options05 = {
        chart: {
            backgroundColor: 'transparent',
            scrollablePlotArea: {
                minWidth: 5000,
                scrollPositionX: -5000
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
            },
            opposite: true
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
            name: selectName,
            data: ReType01,
            color: '#AF87CE'
        },
            {
                name: '습도(%)',
                data: ReType02,
                color: '#EA1A7F'
            },
            {
                name: '미세먼지',
                data: ReType03,
                color: '#FEC603'
            },
            {
                name: '초미세먼지',
                data: ReType04,
                color: '#A8F387'
            },
            {
                name: '이산화탄소',
                data: ReType05,
                color: '#16D6FA'

            },
            {
                name: 'VOCs 휘발성화합물',
                data: ReType06,
                color: '#FE7A15'
            }
        ],
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

    const options06 = {
        chart: {
            backgroundColor: 'transparent',
            scrollablePlotArea: {
                minWidth: 5000,
                scrollPositionX: -5000
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
            name: selectName,
            data: SelectTypeData,
            color: '#1c63c2'
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

    const options07 = {
        chart: {
            backgroundColor: 'transparent',
            scrollablePlotArea: {
                minWidth: 3000,
                scrollPositionX: -3000
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
            {
                agent === 'arss' ? <FormControl fullWidth sx={{
                    marginTop: -4,
                    zIndex: 999999999,
                    position: "relative",
                    backgroundColor: SelectBoxs.backgroundColor,
                    border: SelectBoxs.border
                }}>
                    <InputLabel id="demo-simple-select-label">선택</InputLabel>
                    <Select
                        defaultValue={99}
                        sx={{color: "white"}}
                        onChange={(e) => onSelect(e)}
                    >
                        <MenuItem value={99}>전체</MenuItem>
                        {
                            selectArr[0]?.map(function (arr, inx) {
                                return (
                                    <MenuItem value={inx} onClick={() => {
                                        setSelectName(arr);
                                    }}>{arr}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl> : null
            }


            {
                agent === 'arss' ? (select === 99 ? <HighchartsReact highcharts={Highcharts} options={options05}
                                                                     containerProps={{className: "chart01-4-1"}}/> :
                        <HighchartsReact highcharts={Highcharts} options={options06}
                                         containerProps={{className: "chart01-4-1"}}/>
                ) : <HighchartsReact highcharts={Highcharts} options={options07}
                                     containerProps={{className: "chart01-4-1"}}/>
            }
        </div>
    )


}

export default Record03;



