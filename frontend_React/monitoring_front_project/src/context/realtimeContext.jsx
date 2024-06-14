import {createContext, useContext, useEffect, useState} from "react";
import {DashboardContext} from "./dashboardContext.jsx";
import {Nows} from "../util/mydate.jsx";
import axios from "axios";

export const RealtimeContext = createContext({});

export const RealTimeProvider = ({children}) => {
    const {
        siteInfo,
        selectHour,
        loginLastInfoData
    } = useContext(DashboardContext);


    const [loginStart,setLoginStart] = useState(Nows);
    const [loginEnd,setLoginEnd] = useState(Nows);

    let [realTimeData,setRealTimeData] = useState([]);
    const RealTimeDataByIdOnSubmit = async () => {
        if(selectHour === 0){
            //날짜별 전체  fetch
            await fetch(`/api/login/all?start=${loginStart.toString() + " 00:00:00"}&end=${loginEnd.toString() + " 23:59:59"}`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then(res => res.json()).then(res => {
                setRealTimeData(res.data);
            })
        }else {
            // id 값별 fetch
            await fetch(`/api/login?start=${loginStart.toString() + " 00:00:00"}&end=${loginEnd.toString() + " 23:59:59"}&id=${selectHour}`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then(res => res.json()).then(res => {
                setRealTimeData(res.data);
            })
        }
    }


    //날짜별 데이터 정렬
    let RealTime = [];
    for(let i = 0; i<realTimeData.length; i++){
        for(let j=0; j<siteInfo.length; j++){
            if(siteInfo[j].site_id === realTimeData[i].site_idx){
                RealTime.push({
                    id: realTimeData[i].site_idx,
                    name: siteInfo[j].site_region,
                    site_info: siteInfo[j].site_name ,
                    url: siteInfo[j].site_url,
                    x: siteInfo[j].xpos,
                    y: siteInfo[j].ypos,
                    login_success: realTimeData[i].login_success,
                    login_data_success: realTimeData[i].login_data_success,
                    time: realTimeData[i].login_timestamp,
                    bigo: realTimeData[i].login_bigo,
                })
            }
        }
    }


    const [realTimeModal, setRealTimeModal] = useState(false);
    const handleRealTimeOpen = () => setRealTimeModal(true);
    const handleRealTimeClose = () => setRealTimeModal(false);

    //실시간 서버연결
    const sendDataToServer = async () => {
        // 버튼 클릭 시 서버로 데이터 전송
        await axios.post('/data/ws', { message: 'call_data' })
            .then(response => {
                console.log('Server response:', response.data);
                let lastSite = setTimeout(()=> loginLastInfoData(), 3000);
                return () => clearTimeout(lastSite);

            })
            .catch(error => {
                console.error('Error sending data to server:', error);
            });
    };

    useEffect(() => {
        if(realTimeModal === true){
            sendDataToServer();
        }
    }, [realTimeModal]);

    return(
        <RealtimeContext.Provider value={{
            loginStart,setLoginStart,
            loginEnd,setLoginEnd,

            //날짜 id 별 로그인 이력 데이터
            RealTime,
            realTimeData,setRealTimeData,
            RealTimeDataByIdOnSubmit,

            //실시간 데이터 모달 상태값
            realTimeModal, setRealTimeModal,
            handleRealTimeOpen,
            handleRealTimeClose
        }}>
            {children}
        </RealtimeContext.Provider>
    )
}
