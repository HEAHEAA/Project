//사용시간
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

function UseDateTime() {
    const {useTimeList} = useContext(DashboardContext);

    if (useTimeList.intime?.length < 1) {
        const dateTime = {
            chart: {
                type: 'area',
                marginTop: 20

            },
            accessibility: {
                description: ''
            },
            title: {
                text: '데이터가 없습니다.'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                accessibility: {
                    rangeDescription: ''
                }

            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormat: '<br/>{point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 0,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '사용시간',
                data: [0,0,0,0],
                color: "#6c63ff"
            },]
        }
        return (
            <div>
                <div className="dashboard-allUseChart">
                    <div className="dashboard-allUseChart">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={dateTime}
                            containerProps={{className: "dashboard-allUseChart"}}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        const dateTime = {
            chart: {
                type: 'area',
                marginTop: 20

            },
            accessibility: {
                description: ''
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,
                accessibility: {
                    rangeDescription: ''
                },
                categories: useTimeList.intime
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormat: '<br/>{point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 0,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '사용시간',
                data: useTimeList.log_count,
                color: "#6c63ff"
            },]
        }


        return (
            <div>
                <div className="dashboard-allUseChart">
                    <div className="dashboard-allUseChart">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={dateTime}
                            containerProps={{className: "dashboard-allUseChart"}}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default UseDateTime;