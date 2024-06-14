import {createContext, useContext, useState} from "react";
import {DashboardContext} from "./dashboardContext.jsx";
import {Nows} from "../util/mydate.jsx";

export const ErrInfoContext = createContext({});
export const ErrInfoProvider = ({children}) => {
    const {selectHour,siteInfo} = useContext(DashboardContext);

    const [errStart, setErrStart] = useState(Nows);
    const [errEnd, setErrEnd] = useState(Nows);

    const [todayErr, setTodayErr] = useState([]);
    const [errInfoData, setErrInfoData] = useState([]);

    const ErrInfoByDateOnSubmit = async () => {
        if (window.location.pathname === '/') {
            await fetch(`/api/err/all?start=${Nows.toString()} 00:00:00&end=${Nows.toString()} 23:59:59`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then(res => res.json()).then(res => {
                setTodayErr(res.data);
            })
        } else {
            if (selectHour === 0) {
                await fetch(`/api/err/all?start=${errStart.toString()} 00:00:00&end=${errEnd.toString()} 23:59:59`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                }).then(res => res.json()).then(res => {
                    setErrInfoData(res.data);
                })
            } else {
                await fetch(`/api/err?start=${errStart.toString()} 00:00:00&end=${errEnd.toString()} 23:59:59&id=${selectHour}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                }).then(res => res.json()).then(res => {
                    setErrInfoData(res.data);
                })
            }
        }
    }

    let todayErrTotal = [];
    for (let i = 0; i < siteInfo.length; i++) {
        for (let j = 0; j < todayErr.length; j++) {
            if(siteInfo[i].site_id === todayErr[j].site_idx){
                todayErrTotal.push({
                    site_id: todayErr[j].site_idx,
                    error_id: todayErr[j].error_id,
                    name: siteInfo[i].site_region,
                    error_state: todayErr[j].error_state,
                    error_break_date: todayErr[j].error_break_date,
                    error_renew_date: todayErr[j].error_renew_date,
                    error_update_check: todayErr[j].error_update_check,
                    error_reason: todayErr[j].error_reason,
                    error_reason_user: todayErr[j].error_reason_user
                })
            }
        }
    }




    let logErrTotal = [];
    for (let i = 0; i < siteInfo.length; i++) {
        for (let j = 0; j < errInfoData.length; j++) {
            if(siteInfo[i].site_id === errInfoData[j].site_idx){
                logErrTotal.push({
                    site_id: errInfoData[j].site_idx,
                    error_id: errInfoData[j].error_id,
                    name: siteInfo[i].site_region,
                    error_state: errInfoData[j].error_state,
                    error_break_date: errInfoData[j].error_break_date,
                    error_renew_date: errInfoData[j].error_renew_date,
                    error_update_check: errInfoData[j].error_update_check,
                    error_reason: errInfoData[j].error_reason,
                    error_reason_user: errInfoData[j].error_reason_user
                })
            }
        }
    }



    //에러 이력값 수정
    const [errUpdateData, setErrUpdateData] = useState({
        site_idx: 0,
        error_id: 0,
        error_region: "",
        error_state: 0,
        error_break_date: 0,
        error_renew_date: 0,
        error_update_check: false,
        error_reason: "",
        error_reason_user: ""
    });
    const GetEditErrId = async (id) => {
        for (let list of logErrTotal) {
            if (list.site_id === id) {
                setErrUpdateData({
                    site_idx: list.site_id,
                    error_id: list.error_id,
                    error_region: list.name,
                    error_state: list.error_state,
                    error_break_date: list.error_break_date,
                    error_renew_date: list.error_renew_date,
                    error_update_check: list.error_update_check,
                    error_reason: list.error_reason,
                    error_reason_user: list.error_reason_user === "관리자" ? '' : list.error_reason_user
                })
            }
        }
    }


    const ErrInfoUpdateSubmit = async () => {
        await fetch(`/api/errInfo/update/${errUpdateData.error_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                site_idx: errUpdateData.site_idx,
                error_state: errUpdateData.error_state,
                error_break_date: errUpdateData.error_break_date,
                error_renew_date: errUpdateData.error_renew_date.replace('T', ' '),
                error_update_check: errUpdateData.error_update_check,
                error_reason: errUpdateData.error_reason,
                error_reason_user: errUpdateData.error_reason_user
            })
        }).then(res => res.json()).then(() => {

            fetch(`/api/loginInfo/update/${errUpdateData.site_idx}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({
                    login_success: errUpdateData.error_update_check,
                    login_data_success: errUpdateData.error_update_check,
                    login_bigo: errUpdateData.error_reason,
                    site_idx: errUpdateData.site_idx,
                    login_timestamp: errUpdateData.error_break_date
                })
            }).then(res => res.json()).then(() => {
                console.log("login변경완료");
            });
            console.log("err 변경 완료");
        }).finally(() => {
            ErrInfoByDateOnSubmit();
            setErrUpdateData({
                site_idx: 0,
                error_id: 0,
                error_region: "",
                error_state: 0,
                error_break_date: 0,
                error_renew_date: 0,
                error_update_check: false,
                error_reason: "",
                error_reason_user: ""
            });
            console.log("초기화");
        });
    }


    return (
        <ErrInfoContext.Provider value={{
            ErrInfoByDateOnSubmit,
            errStart, setErrStart,
            errEnd, setErrEnd,

            todayErrTotal,logErrTotal,
            todayErr, setTodayErr,
            errInfoData, setErrInfoData,


            errUpdateData,
            setErrUpdateData,
            GetEditErrId,

            ErrInfoUpdateSubmit,
        }}>
            {children}
        </ErrInfoContext.Provider>
    )
}
