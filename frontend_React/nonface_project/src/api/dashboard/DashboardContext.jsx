import {createContext, useContext, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";

export const DashboardContext = createContext({});
export const DashboardProvider = ({children}) => {
    const {RefreshToken} = useContext(LoginContext);

    //1. 전체가입사 수 리스트
    const [AllClientCount,setAllClientCount] = useState([]);
    const ClientCountGetOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/client/count`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setAllClientCount(res.data);
        })
    }

    //2. 고객사 별 사용자 수 / 비활성화 수 / 전체 인원
    const [clientUse,setClientUse] = useState([]);
    const [clientUserLoading,setClientLoading] = useState(false);
    const ClientUseCountOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/client/usage`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setClientUse(res.data)
        })
        setClientLoading(true);
    }

    //2-1. 고객사 별 지도에서 선택하기
    // 2-2. 선택한 고객사 id와 목록 id가 동일하다면 , 해당 리스트만 뽑는다.
    const [clientCheck,setClientCheck] = useState('혜선');
    const checkClientList = [];
    for(let i = 0; i<clientUse.length; i++ ){
        if(clientUse[i].clnt_org_id === clientCheck){
            checkClientList.push(clientUse[i]);
        }
    }


    //3.시간대별 사용시간 차트
    const d = new Date();
    const day = d.getDate();
    const [startDate, setStartDate] = useState('2023-09-01')
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10).replaceAll('T', ' '));
    const startT = startDate.replaceAll('T', ' ')

    const [useTimeList,setUseTimeList] = useState([]);
    const useTimeDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/rate/usageByHour/org?sdate=${startT} 00:00&edate=${endDate} 00:00&id=${clientCheck}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setUseTimeList(res.data);
        })
    }


    //4. 일자별 평균 활용시간
    const [avgTimeList,setAvgTimeList] = useState([]);
    const AVGTimeDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/rate/allAvgTime/all`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setAvgTimeList(res.data);
        })
    }


    //5. 전일 사용율
    const [ydtdList,setYdTdList] = useState([]);
    const YdTdDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/client/usagePrev`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setYdTdList(res.data);
        })
    }


    //선택시
    let tdYdCheckList = [];
    for(let i = 0; i<ydtdList.length; i++ ){
        if(ydtdList[i].clnt_org_id === clientCheck){
            tdYdCheckList.push(ydtdList[i]);
        }
    }





    //6. 가입사 증가율
    const [clientPlusList,setClientPlusList] = useState([]);
    const ClientPlusDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/client/increase/day`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setClientPlusList(res);
        })
    }




    return(
        <DashboardContext.Provider value={{
            ClientCountGetOnSubmit,AllClientCount,

            clientCheck,setClientCheck,
            clientUserLoading,
            checkClientList,
            ClientUseCountOnSubmit,clientUse,

            useTimeDataOnSubmit,
            useTimeList,setUseTimeList,

            AVGTimeDataOnSubmit,
            avgTimeList,

            YdTdDataOnSubmit,
            ydtdList,setYdTdList,
            tdYdCheckList,

            ClientPlusDataOnSubmit,
            clientPlusList,

        }}>
            {children}
        </DashboardContext.Provider>
    )
}