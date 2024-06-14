import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highcharts";
import HCMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";
import Loading from '../../../../assets/img/loading.gif';

HCMore(Highcharts);
SolidGauge(Highcharts);

//시스템 사용률
function SystemUseChart() {
    const {
        clientUserLoading,
        checkClientList,
        tdYdCheckList,
        ydtdList,
        clientUse,
        clientCheck
    } = useContext(DashboardContext);

    //선택되었을 시
    let yesterDate = Math.ceil(tdYdCheckList[0]?.usageRate);
    let todayData = Math.ceil(checkClientList[0]?.usageRate);

    //전일
    let notSelectYester = Math.ceil(ydtdList[0]?.usageRate);
    let notSelectTody = Math.ceil(clientUse[0]?.usageRate);


    const NOTyesterday = {
        chart: {
            type: "solidgauge",
            marginTop: 4
        },
        title: {
            text: "전일",
            y: 120
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: "100%",
                    innerRadius: "70%",
                    backgroundColor: "#e8e8e8",
                    borderWidth: 0
                }
            ]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    y: -25,
                    style: {
                        fontWeight: 'bold',
                        fontSize: 18
                    }
                },
                linecap: "round",
                stickyTracking: false,
                rounded: true
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: "어제",
                data: [{
                    color: "#ff7f57",
                    radius: "100%",
                    name: "어제",
                    innerRadius: "70%",
                    y: notSelectYester
                }]
            }
        ]
    };


    const NOTtoday = {
        chart: {
            type: "solidgauge",
            marginTop: 4
        },
        title: {
            text: "당일",
            y: 120,
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: "100%",
                    innerRadius: "70%",
                    backgroundColor: "#e8e8e8",
                    borderWidth: 0
                }
            ]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: [],
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    y: -25,
                    style: {
                        fontWeight: 'bold',
                        fontSize: 18
                    }
                },
                linecap: "round",
                stickyTracking: false,
                rounded: true
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: "오늘",
                data: [{
                    color: "#57b9ff",
                    radius: "100%",
                    innerRadius: "70%",
                    label: "ddd",
                    y: notSelectTody
                }]
            }
        ]
    }


    const yesterday = {
        chart: {
            type: "solidgauge",
            marginTop: 4
        },
        title: {
            text: "전일",
            y: 120
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: "100%",
                    innerRadius: "70%",
                    backgroundColor: "#e8e8e8",
                    borderWidth: 0
                }
            ]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    y: -25,
                    style: {
                        fontWeight: 'bold',
                        fontSize: 18
                    }
                },
                linecap: "round",
                stickyTracking: false,
                rounded: true
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: "어제",
                data: [{
                    color: "#ff7f57",
                    radius: "100%",
                    name: "어제",
                    innerRadius: "70%",
                    y: yesterDate
                }]
            }
        ]
    };


    const today = {
        chart: {
            type: "solidgauge",
            marginTop: 4
        },
        title: {
            text: "당일",
            y: 120,
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [
                {
                    outerRadius: "100%",
                    innerRadius: "70%",
                    backgroundColor: "#e8e8e8",
                    borderWidth: 0
                }
            ]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: [],
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    y: -25,
                    style: {
                        fontWeight: 'bold',
                        fontSize: 18
                    }
                },
                linecap: "round",
                stickyTracking: false,
                rounded: true
            }
        },
        credits: {
            enabled: false
        },
        series: [
            {
                name: "오늘",
                data: [{
                    color: "#57b9ff",
                    radius: "100%",
                    innerRadius: "70%",
                    label: "ddd",
                    y: todayData
                }]
            }
        ]
    }


    return (
        <div>
            {
                clientUserLoading === false ?
                    <div>
                        <img src={Loading} alt="로딩중" className="dash-loading"/>
                    </div>
                    :
                    <div>
                        {
                            clientCheck === '' ? <div>
                                    <div className="dashboard-chart-yesterday">
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={NOTyesterday}
                                            containerProps={{className: "dashboard-chart-yesterday-chart"}}
                                        />
                                    </div>
                                    <div className="dashboard-chart-yesterday">
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={NOTtoday}
                                            containerProps={{className: "dashboard-chart-yesterday-chart"}}
                                        />
                                    </div>

                                </div> :
                                <div>
                                    <div className="dashboard-chart-yesterday">
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={yesterday}
                                            containerProps={{className: "dashboard-chart-yesterday-chart"}}
                                        />
                                    </div>
                                    <div className="dashboard-chart-yesterday">
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={today}
                                            containerProps={{className: "dashboard-chart-yesterday-chart"}}
                                        />
                                    </div>
                                </div>
                        }
                    </div>
            }





        </div>
    )
}

export default SystemUseChart;