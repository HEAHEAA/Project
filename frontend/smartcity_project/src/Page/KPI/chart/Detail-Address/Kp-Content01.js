import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {KpiContext} from "../../../../ContextServer/KpiContext";
import {DetailExitIcon, DetailPageBg, TextBlack} from "../../../../Componet/style-config/light-theme";
import Text from "ol/style/Text";

function KpContent01(){
    const {access,RefreshToken} = useContext(LoginContext);
    const { StationShadeGet, shadeKpiList} = useContext(KpiContext);
    const [endDate,setEndDate] = useState(new Date().toISOString().slice(0, 10))
    const [TempList,setTotalList] = useState([]);

    useEffect(()=>{
        StationTempGet();
    },[]);

    useEffect(()=>{
        StationShadeGet();
    },[]);


    //정류장 실내 실외 통계조회
    const StationTempGet = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/report/monthly?cate=dust&sdate=2023-01-01&edate=${endDate}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setTotalList(res.data);
        })
    }
    const navigate = useNavigate();
    const GoKp = () => {
        navigate('/kpi');
    }

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
        },
        title: {
            text: '스마트 정류장 미세먼지 실내외 비교분석',
            align: 'left',
            style: {
                color: TextBlack,
                fontSize: 12,
            }
        },

        subtitle: {
            text: ''
        },

        xAxis: {
            categories: TempList.categories,
            labels: {
                style: {
                    color: TextBlack
                }
            },
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: -10,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#1c63c2',
            shadow: true,
            itemStyle: {
                color: '#ffff',
            },
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '실내 미세먼지',
            data:TempList.series&&TempList.series[0].data,
            color: {
                linearGradient: { x1: 1, x2: 0, y1: 0, y2: 0 },
                stops: [
                    [0, '#D3208B'],
                    [1, '#fd7200']
                ]
            },
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'white',
            },

        }, {
            name: '실외 미세먼지',
            data: TempList.series&&TempList.series[1].data,
            color: {
                linearGradient: { x1: 1, x2: 0, y1: 0, y2: 0 },
                stops: [
                    [0, '#621496'],
                    [1, '#3366AA']
                ]
            },
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'white',
            },
        }]
    };







    const options01 = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
        },
        title: {
            text: '스마트 그늘막 월별 온도 변화 차양 횟수 비교분석',
            align: 'left',
            style: {
                color: TextBlack,
                fontSize: 12,
            }
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: shadeKpiList.categories,
            labels: {
                style: {
                    color: TextBlack
                }
            },
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: -10,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#1c63c2',
            shadow: true,
            itemStyle: {
                color: '#ffff',
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '차양횟수',
            data: shadeKpiList.series&&shadeKpiList.series[1].data,
            color: {
                linearGradient: { x1: 1, x2: 0, y1: 0, y2: 0 },
                stops: [
                    [0, '#D3208B'],
                    [1, '#fd7200']
                ]
            },
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'white',
            },
        }, {
            name: '온도',
            data: shadeKpiList.series&&shadeKpiList.series[0].data,
            color: {
                linearGradient: { x1: 1, x2: 0, y1: 0, y2: 0 },
                stops: [
                    [0, '#621496'],
                    [1, '#3366AA']
                ]
            },
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'white',
            },
        }]
    };

    return(
        <div>
            <div style={DetailPageBg}>
                <p className="k-icon k-i-x" style={DetailExitIcon} onClick={GoKp}></p>

                <div className="Kp-Detail-table">
                    <h1 style={TextBlack}>통계분석</h1>

                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{className: "chart01-6-B"}}/>
                    <HighchartsReact highcharts={Highcharts} options={options01} containerProps={{className: "chart01-7-B"}}/>
                </div>
            </div>
        </div>
    )
}
export default KpContent01;
