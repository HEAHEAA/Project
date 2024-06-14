import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Station03ARSSChart({dvList}) {
    //온도
    let temp = [];

    //습도
    let hmdt = [];

    //미세먼지
    let fineDust = [];

    //초미세먼지
    let ufineDust = [];

    //이산화탄소
    let co2 = [];

    //VOCs 휘발성 유기화합물
    let vocs = [];

    //날짜
    let dtm = [];

    for (let i = 0; i < dvList.length; i++) {
        temp.push(dvList[i].temp);
        hmdt.push(dvList[i].hmdt);
        fineDust.push(dvList[i].fineDust);
        ufineDust.push(dvList[i].ufineDust);
        co2.push(dvList[i].co2);
        vocs.push(dvList[i].vocs);
        dtm.push(dvList[i].dtm);
    }


    const Options_ARSS = {
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
            categories: dtm,
            labels: {
                enabled: false,// disable labels
                style: {
                    color: "lightBlue"
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
                color: '#ffff',
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
            data: temp,
            color: '#AF87CE'
        }, {
            name: '습도(%)',
            data: hmdt,
            color: '#EA1A7F'
        }, {
            name: '미세먼지',
            data: fineDust,
            color: '#FEC603'
        }, {
            name: '초미세먼지',
            data: ufineDust,
            color: '#A8F387'
        }, {
            name: '이산화탄소',
            data: co2,
            color: '#16D6FA'

        }, {
            name: 'VOCs 휘발성화합물',
            data: vocs,
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

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={Options_ARSS}
                             containerProps={{className: "chart01-4"}}/>
        </div>
    )
}

export default Station03ARSSChart;