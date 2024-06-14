import {useContext} from "react";
import {DashboardContext} from "../../context/dashboardContext.jsx";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);

export const DashPercentChart = () => {
    const {
        successMath,failMath,layout
    } = useContext(DashboardContext);

    const options = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            },
            backgroundColor: 'transparent',
        },
        title: {
            text: '',
            align: 'left'
        },
        subtitle: {
            text: '',
            align: 'left'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' +
                '<b>{point.y:.2f}%</b> <br/>'
        },
        series: [{
            name: '실시간 성공률',
            data: [
                [`성공 ${successMath}%`, successMath],
                [`실패 ${failMath}%`, failMath],
            ]
        }]
    };


    return(
        <div className="percent-chart">
            <div className="percent-inner-chart" style={{height: layout[3]?.h * 38}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{className: "chart-donut"}}

                />
            </div>

        </div>
    )
}
