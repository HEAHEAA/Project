
import {useContext} from "react";
import {DashboardContext} from "../../context/dashboardContext.jsx";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const DashHourChart = () => {
    const {avgChartData, layout} = useContext(DashboardContext);

    let tdyTime = [];
    let tdyAvg = [];

    for (let i = 0; i < avgChartData.length; i++) {
        if (avgChartData[i].login_timestamp?.substring(14, 16) === '00') {
            tdyTime.push(avgChartData[i].login_timestamp?.substring(5, 16));
            tdyAvg.push((avgChartData[i].count / 30).toFixed(2) * 100);
        }
    }

    let avgData = [];
    for(let i = 0; i<tdyTime.length; i++){
        avgData.push({
            name: tdyTime[i],
            y: tdyAvg[i]
        })
    }

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
        },
        title: {
            align: 'left',
            text: ''
        },
        subtitle: {
            align: 'left',
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            categories: tdyTime,
            type: 'category',
            labels: {
                style: {
                    color: localStorage.getItem('mode') === 'dark' ? 'white' : 'black',
                }
            },
        },
        yAxis: {
            title: {
                text: ''
            }

        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.2f}%</b> <br/>'
        },

        series: [
            {
                name: '로그인 성공률',
                colorByPoint: true,
                data: avgData
            }
        ]
    }

    return (
        <div className="dash-hour-chart" style={{height: layout[2]?.h * 28}}>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{className: "chart-hour"}}/>
        </div>
    )
}
