import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useContext, useEffect} from "react";
import {KpiContext} from "../../../../ContextServer/KpiContext";


function Kpi01(){
    const {StationTempGet,TempList, StationShadeGet, shadeKpiList} = useContext(KpiContext);

    useEffect(()=>{
        StationTempGet();
        StationShadeGet();
    },[]);



    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
        },
        title: {
            text: '스마트 정류장 미세먼지 실내외 비교분석',
            align: 'left',
            style: {
                color: 'black',
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
                    color: 'black'
                }
            },
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
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
            data: TempList.series&&TempList.series[0].data,
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
                color: 'black',
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
                    color: 'black'
                }
            },
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
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
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{className: "chart01-6"}}/>
            <HighchartsReact highcharts={Highcharts} options={options01} containerProps={{className: "chart01-7"}}/>
        </div>
    )
}
export default Kpi01;