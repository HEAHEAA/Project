import {createContext, useContext, useEffect, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";
import {GroupContext} from "../all/GroupContext.jsx";
import axios from "axios";

//통계분석 - 활용내역
export const MakeUseContext = createContext({});
export const MakeUseProvider = ({children}) => {
    const {RefreshToken} = useContext(LoginContext);
    const {
        groupSelect
    } = useContext(GroupContext);

    const d = new Date();
    const day = d.getDate();

    const [startDate, setStartDate] = useState(new Date(new Date().setDate(day - 1)).toISOString().slice(0, 10))
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10).replaceAll('T', ' '));


    //1. 회사별 사용현황
    const [groupUseLoading,setGroupUseLoading] = useState(false);
    const [groupUseList, setGroupUseList] = useState([]);
    const GroupUseDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/rate/usageByAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setGroupUseList(res.data)
        })
        setGroupUseLoading(true);
    }


    //2.사용자별 날짜 사용시간
    const [userIdChoi, setUserIdChoi] = useState('');
    const [timeUseList, setTimeUseList] = useState([]);
    const [timeUseLoading,setTimeUseLoading] = useState(false);
    const TimeUseListOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/rate/useTimes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setTimeUseList(res.data);
        })
        setTimeUseLoading(true);
    }


    //3.
    const startT = startDate.replaceAll('T', ' ')
    const [hourLoading,setHourLoading] = useState(false);
    const [HourUseList,setHourUseList] = useState([]);
    const HourUseDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/rate/usageByHour/user?sdate=${startT} 00:00&edate=${endDate} 00:00&id=${userIdChoi}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setHourUseList(res.data);
        })
        setHourLoading(true);
    }




    //4. 엑셀 내용 다운로드
    const makeUseExcelDown = async (e) => {
        e.preventDefault()
        RefreshToken();
        await axios({
            url:`/api/excel/usage`,
            method: 'POST',
            responseType: 'blob',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            data: {
                token : localStorage.getItem("login"),
                sdate: startDate,
                edate : endDate,
                org_id : groupSelect
            },
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data], {
                type: res.headers['content-type']
            }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'xlsx');
            document.body.appendChild(link);
            link.click();
            window.location.reload();
        })
    }




    return (
        <MakeUseContext.Provider value={{
            startDate, setStartDate,
            endDate, setEndDate,


            //1. 회사별 사용 현황
            GroupUseDataOnSubmit,
            groupUseLoading,
            groupUseList,

            //1-1. 회사별 사용자 선택 훅
            userIdChoi, setUserIdChoi,


            //2. 사용자의 일별 사용 현황
            TimeUseListOnSubmit,
            timeUseLoading,
            timeUseList,

            //3. 시간대별 사용 현황
            HourUseDataOnSubmit,
            hourLoading,
            HourUseList,


            makeUseExcelDown,
        }}>
            {children}
        </MakeUseContext.Provider>
    )
}