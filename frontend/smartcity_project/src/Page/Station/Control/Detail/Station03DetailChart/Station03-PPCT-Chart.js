import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

function Station03PPCTChart({dvList}) {
    //입실수
    let inSide = [];

    //퇴실수
    let outSide = [];

    //금일 입실수
    let inTdy = [];

    //금일 퇴실수
    let outTdy = [];

    //체크 date
    let dtm = [];

    for (let i = 0; i < dvList.length; i++) {
        inSide.push(dvList[i].in);
        outSide.push(dvList[i].out);
        inTdy.push(dvList[i].inTdy);
        outTdy.push(dvList[i].outTdy);
        dtm.push(dvList[i].dtm);
    }

    const Options_PPCT = {
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
            name: '입실수',
            data: inSide,
            color: '#AF87CE'
        }, {
            name: '퇴실수',
            data: outSide,
            color: '#EA1A7F'
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


    const Options_PPCT2 = {
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
            name: '금일 입실수',
            data: inTdy,
            color: '#FEC603'
        }, {
            name: '금일퇴실수',
            data: outTdy,
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
            <HighchartsReact highcharts={Highcharts} options={Options_PPCT}
                             containerProps={{className: "chart01-4-mini"}}/>
            <HighchartsReact highcharts={Highcharts} options={Options_PPCT2}
                             containerProps={{className: "chart01-4-mini"}}/>
        </div>
    )
}

export default Station03PPCTChart;