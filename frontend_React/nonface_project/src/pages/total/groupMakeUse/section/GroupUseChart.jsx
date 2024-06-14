import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useContext, useEffect} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

function GroupUseChart(){
    const {ClientUseCountOnSubmit,clientUse} = useContext(DashboardContext);
    useEffect(()=>{
        ClientUseCountOnSubmit();
    },[]);


    //1. 기업별 사용률 데이터 반복문
    let useData = [];
    let useclntName = [];
    for(let i = 0; i<clientUse.length; i++){
        useData.push(Math.ceil(clientUse[i].usageRate));
        useclntName.push(clientUse[i].clnt_org_name);
    }


    const options = {
        chart: {
            type: 'column', // bar차트. 아무 설정이 없으면 line chart가 된다.
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'category',
            categories: useclntName,
        },
        legend: {
            reversed: false
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    format: "<b>{point.y}</b>",
                }
            }
        },
        series: [
            { name: "사용률(%)", data: useData, color: "#1b72bf"}
        ]

    }

    return(
        <div>
            <p style={{paddingLeft: "2vh"}}> ※ 현재 가입자가 있는 조직만 표출이 됩니다.</p>
            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{className: "groupUseChart"}}/>

        </div>
    )
}
export default GroupUseChart;