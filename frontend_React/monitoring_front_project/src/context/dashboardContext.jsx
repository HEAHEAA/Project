import {createContext, useEffect, useState} from "react";
import {Nows} from "../util/mydate.jsx";
import {UpdateLayout} from "./layout_hook/UseLayout.jsx";

export const DashboardContext = createContext({});
export const DashboardProvider = ({children}) => {
    // 0.전체 1. 활성화 2. 비활성화
    const [siteState, setSiteState] = useState(0);
    const handleSiteState = (e) => {
        setSiteState(e.target.value);
    }

    //데이터 select - 시간 별 차트
    const [selectHour, setSelectHour] = useState(0);


    //사이트 데이터
    const [siteInfo,setSiteInfo] = useState([]);
    const siteInfoData = async () => {
        await fetch(`/api/siteInfo`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json()).then(res => {
            setSiteInfo(res.data);
            // console.log(res);
        })
    }

    //마지막 시간값 데이터
    const [loginLastInfo,setLoginLastInfo] = useState([]);
    const loginLastInfoData = async () => {
        await fetch(`/api/loginInfo/last`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json()).then(res => {
            setLoginLastInfo(res.data);
        })
    }

    //총괄 데이터
    let StateData = []; //각 선택 값
    let allData = [];
    let successData = [];
    let failData = [];
    let xy = [];



    for(let i = 0; i<loginLastInfo.length; i++){
        for(let j = 0; j<siteInfo.length; j++){

            if( siteInfo[j].site_id === loginLastInfo[i].site_idx){
                //전체 값
                allData.push({
                    id: loginLastInfo[i].site_idx,
                    name: siteInfo[j].site_region,
                    site_info: siteInfo[j].site_name,
                    url: siteInfo[j].site_url,
                    x: siteInfo[j].xpos,
                    y: siteInfo[j].ypos,
                    login_success: loginLastInfo[i].login_success,
                    login_data_success: loginLastInfo[i].login_data_success,
                    time: loginLastInfo[i].login_timestamp,
                    bigo: loginLastInfo[i].login_bigo,
                });

                if (siteState === 0) {
                    StateData.push({
                        id: loginLastInfo[i].site_idx,
                        name: siteInfo[j].site_region,
                        site_info: siteInfo[j].site_name,
                        url: siteInfo[j].site_url,
                        x: siteInfo[i].xpos,
                        y: siteInfo[i].ypos,
                        login_success: loginLastInfo[i].login_success,
                        login_data_success: loginLastInfo[i].login_data_success,
                        time: loginLastInfo[i].login_timestamp,
                        bigo: loginLastInfo[i].login_bigo,
                    });
                    xy.push([siteInfo[i].xpos, siteInfo[i].ypos]);
                }

                //success 가 true일때
                if (loginLastInfo[i].login_success === true) {
                    successData.push({
                        id: loginLastInfo[i].site_idx,
                        name: siteInfo[j].site_region,
                        site_info: siteInfo[j].site_name,
                        url: siteInfo[j].site_url,
                        x: siteInfo[j].xpos,
                        y: siteInfo[i].ypos,
                        login_success: loginLastInfo[i].login_success,
                        login_data_success: loginLastInfo[i].login_data_success,
                        time: loginLastInfo[i].login_timestamp,
                        bigo: loginLastInfo[i].login_bigo,
                    })
                }
                // siteState btn=1 이고 success가 true 일때
                if (siteState === 1 && loginLastInfo[i].login_success === true) {
                    StateData.push({
                        id: loginLastInfo[i].site_idx,
                        name: siteInfo[j].site_region,
                        site_info: siteInfo[j].site_name,
                        url: siteInfo[j].site_url,
                        x: siteInfo[j].xpos,
                        y: siteInfo[i].ypos,
                        login_success: loginLastInfo[i].login_success,
                        login_data_success: loginLastInfo[i].login_data_success,
                        time: loginLastInfo[i].login_timestamp,
                        bigo: loginLastInfo[i].login_bigo,
                    });
                    xy.push([siteInfo[i].xpos, siteInfo[i].ypos]);
                }

                if (loginLastInfo[j].login_success === false) {
                    failData.push({
                        id: loginLastInfo[i].site_idx,
                        name: siteInfo[j].site_region,
                        site_info: siteInfo[j].site_name,
                        url: siteInfo[j].site_url,
                        x: siteInfo[j].xpos,
                        y: siteInfo[i].ypos,
                        login_success: loginLastInfo[i].login_success,
                        login_data_success: loginLastInfo[i].login_data_success,
                        time: loginLastInfo[i].login_timestamp,
                        bigo: loginLastInfo[i].login_bigo,
                    })
                }

                //siteState가 2이고 success 가 false 일때
                if (siteState === 2 && loginLastInfo[j].login_success === false) {
                    StateData.push({
                        id: loginLastInfo[i].site_idx,
                        name: siteInfo[j].site_region,
                        site_info: siteInfo[j].site_name,
                        url: siteInfo[j].site_url,
                        x: siteInfo[j].xpos,
                        y: siteInfo[i].ypos,
                        login_success: loginLastInfo[i].login_success,
                        login_data_success: loginLastInfo[i].login_data_success,
                        time: loginLastInfo[i].login_timestamp,
                        bigo: loginLastInfo[i].login_bigo,
                    });
                    xy.push([siteInfo[i].xpos, siteInfo[i].ypos]);
                }



            }
        }
    }



    //성공률
    const successMath = (successData.length / 30).toFixed(2) * 100;
    const failMath = (failData.length / 30).toFixed(2) * 100;


    //대시보드 평균값 계산
    const [avgChartData,setAvgChartData] = useState([]);
    const AvgTodayDataOnsubmit = async () => {
        await fetch(`/api/today/avg?start=${Nows} 00:00:00&end=${Nows} 23:59:59`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json()).then(res => {
            setAvgChartData(res.data);
        })
    }





    // ============= 레이아웃 =========== //
    const [dragOpen,setDragOpen] = useState(false);
    const [layout,setLayout] = useState(null);


    const handleUpdateLayout = () => {
        for(let i = 0 ; i<layout.length; i++){
            let updateValue= {
                i: layout[i].i,
                x: layout[i].x,
                y: layout[i].y,
                w: layout[i].w,
                h: layout[i].h,
            }
            UpdateLayout(i+1,  updateValue);
        }
    }


    const resetLayout = [
        { i: 'a', x: 0, y: 0, w: 7, h: 19 },
        { i: 'b', x: 7, y: 0, w: 5, h: 19 },
        { i: 'c', x: 0, y: 19, w: 5, h: 15 },
        { i: 'd', x: 5, y: 19, w: 2, h: 15 },
        { i: 'e', x: 7, y: 19, w: 5, h: 15 },
    ];

    const handleResetLayout = () => {
        for(let i = 0; i<resetLayout.length; i++){
            let updateValue= {
                i: resetLayout[i].i,
                x: resetLayout[i].x,
                y: resetLayout[i].y,
                w: resetLayout[i].w,
                h: resetLayout[i].h,
            }
            UpdateLayout(i+1,  updateValue);
        }
    }

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout); // 항상 동일한 순서로 호출되도록 보장
    };


    return (
        <DashboardContext.Provider value={{
            siteInfoData,
            siteInfo,setSiteInfo,
            loginLastInfoData,
            loginLastInfo,setLoginLastInfo,

            allData,
            successData,
            failData,
            StateData,
            successMath,
            failMath,
            xy,

            //map- 이벤트 처리 상태값
            siteState, setSiteState,
            handleSiteState,

            //지역 선택
            selectHour, setSelectHour,

            //하루 평균값 데이터
            AvgTodayDataOnsubmit,
            avgChartData,setAvgChartData,


            //레이아웃
            dragOpen,setDragOpen,
            layout,setLayout,
            handleLayoutChange,
            handleUpdateLayout,
            handleResetLayout,
        }}>
            {children}
        </DashboardContext.Provider>
    )
}
