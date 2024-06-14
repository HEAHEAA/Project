import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {useContext} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";

function Record02() {
    const {RecordName, timeList, agent} = useContext(StationContext);

    let values = [];
    let dust = [];
    for (let i = 0; i < timeList.length; i++) {
        if(agent === 'arss'){
            values.push(timeList[i].vals);
        }
    }

    let good = [];
    let better = [];
    let bad = [];
    let veryBad = [];
    for (let j = 0; j < values.length; j++) {
        if (agent === 'arss') {
            dust.push(values[j][2]);

            if (0 <= values[j][2] && values[j][2] <= 15) {
                good.push(values[j][2]);
            }
            if (15 < values[j][2] && values[j][2] <= 35) {
                better.push(values[j][2]);
            }
            if (36 < values[j][2] && values[j][2] <= 76) {
                bad.push(values[j][2]);
            }
            if (76 < values[j][2]) {
                veryBad.push(values[j][2]);
            }
        }
    }


    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: "transparent",
        },
        title: {
            text: '',
            align: 'left'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            accessibility: {
                enabled: false
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%',
                enabled: false
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                color: '#2c2c2c',
                fontWeight: 'light'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: RecordName,
            colorByPoint: true,
            data: [{
                name: `좋음 (${good.length}건)`,
                y: good.length,
                sliced: true,
                selected: true,
                color: "#61c1ff"
            }, {
                name: `보통 (${better.length}건)`,
                y: better.length,
                color: "#ffe250"
            }, {
                name: `나쁨 (${bad.length}건)`,
                y: bad.length,
                color: "coral"
            }, {
                name: `매우나쁨 (${veryBad.length}건)`,
                y: veryBad.length,
                color: "red"
            }]
        }]
    };

    return (
        <div>
            {
                agent === "arss" ? <HighchartsReact highcharts={Highcharts} options={options}
                                                    containerProps={{className: "chart01-5"}}/>
                    : null
            }

        </div>
    )
}

export default Record02;

