import DashboardMap from "./Map/DashboardMap.jsx";
import SystemUseChart from "./cards/SystemUseChart.jsx";
import UseUserCount from "./cards/UseUserCount.jsx";
import AllCompanyCount from "./cards/AllCompanyCount.jsx";
import CompanyPlusChart from "./cards/CompanyPlusChart.jsx";
import AllUserUseCount from "./cards/AllUserUseCount.jsx";
import NoneUseUserCount from "./cards/NoneUseUserCount.jsx";
import MeanUseTime from "./cards/MeanUseTime.jsx";
import UseDateTime from "./cards/UseDateTime.jsx";
import {useContext, useEffect} from "react";
import {DashboardContext} from "../../../api/dashboard/DashboardContext.jsx";
import {LoginContext} from "../../../api/login/LoginContext.jsx";

function Dashboard() {
    const {RefreshToken} = useContext(LoginContext);
    const {
        AVGTimeDataOnSubmit,
        ClientCountGetOnSubmit,
        ClientUseCountOnSubmit,
        clientCheck,
        useTimeDataOnSubmit,
        YdTdDataOnSubmit,
        ClientPlusDataOnSubmit,
    } = useContext(DashboardContext);

    useEffect(()=>{
        //1. 전체가입사
        ClientCountGetOnSubmit();
        //2. 고객사 별 사용자
        ClientUseCountOnSubmit();
        //3. 고객별 사용 시간데이터
        useTimeDataOnSubmit();

        //4.활용시간 평균데이터
        AVGTimeDataOnSubmit();

        //5. 전일 사용율 데이터
        YdTdDataOnSubmit();

        //6. 가입사 증가율
        ClientPlusDataOnSubmit();
    },[clientCheck]);



    const HourUseDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/rate/usageByOrg/all?sdate=2023-10-01 10:00&edate=2023-10-10 10:00`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
           console.log(res);
        })
    }

   useEffect(()=>{
       HourUseDataOnSubmit();
   },[]);


    return (
        <div>
            <div className="dashboard-map">
                <DashboardMap/>
            </div>
            <div className="dashboard-total">
                <section>
                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>시스템 사용률</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <SystemUseChart/>
                        </div>
                    </div>

                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>활성 사용자수</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <UseUserCount/>
                        </div>
                    </div>

                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>전체 가입사 수</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <AllCompanyCount/>
                        </div>
                    </div>

                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>사용 시간</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <UseDateTime/>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>전체사용자 수</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <AllUserUseCount/>
                        </div>
                    </div>

                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>미활성 사용자 수</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <NoneUseUserCount/>
                        </div>
                    </div>

                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>가입사 증가율</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <CompanyPlusChart/>
                        </div>
                    </div>

                    <div className="dashboard-total-box">
                        <div className="dashboard-total-box-head">
                            <h3>평균 활용 시간</h3>
                        </div>
                        <div className="dashboard-total-box-body">
                            <MeanUseTime/>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default Dashboard;