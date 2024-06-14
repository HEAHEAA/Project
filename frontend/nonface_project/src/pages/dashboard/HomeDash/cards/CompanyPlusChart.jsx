//가입사 증가율
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

function CompanyPlusChart(){
    const {clientPlusList} = useContext(DashboardContext);

    let intime = []; //카테고리
    let data = []; //데이터
    for(let i=0; i<clientPlusList.length; i++){
        intime.push(clientPlusList[i].intime.substring(5,10));
        data.push(clientPlusList[i].increase);
    }







    const company = {
        chart:{
          marginTop: 20
        },
        title: {
            text: '',
            align: 'left'
        },

        subtitle: {
            text: '',
            align: 'left'
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        xAxis: {
            accessibility: {
                rangeDescription: ''
            },
            categories: intime,
        },

        legend: {
            layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },

        series: [{
            name: '가입사 증가율',
            data: data,
            color: "#726bea"
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


    return(
        <div>
            <div className="dashboard-allUseChart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={company}
                    containerProps={{className: "dashboard-allUseChart"}}
                />
            </div>

        </div>
    )
}
export default CompanyPlusChart;