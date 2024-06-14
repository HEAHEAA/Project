import {createContext, useContext, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";
import SolarList from "../Page/SolarPanel/Monitoring/Detail/SolarList";
import SolarMap from "../Page/SolarPanel/Monitoring/map/SolarMap";
import Highcharts from "highcharts";
import * as React from "react";
import SolarFacMap from "../Page/SolarPanel/Facility/Map/SolarFacMap";
import SolarFacAllList from "../Page/SolarPanel/Facility/Detail/SolarFacAllList";
import SolarFacUpdateList from "../Page/SolarPanel/Facility/Detail/SolarFacUpdateList";
import {LoginContext} from "./LoginContext";


export const SolarPanelContext = createContext({});

export const SolarProvider = ({children}) => {
    const {access, RefreshToken, role} = useContext(LoginContext);
    const [solarList,setSolarList] = useState([]);
    const [solarMapId,setSolarMapId] = useState('');

    const SolarGetListData = async () => {
        await fetch(`/nodeApi/solarPos`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setSolarList(res.result)
        })
    }


    const solarTile = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 4,},
        {widgetId: "2", col: 5, colSpan: 4, rowSpan: 4,},
    ];

    const getPositions02 = solarTile => {
        return (
            JSON.parse(localStorage.getItem("dash02")) || solarTile
        );
    };

    const navigate = useNavigate();


    const solarConfig = [
        {
            id: "1",
            header: "스마트 태양열 시설물 목록",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{navigate('/solarPanel/1')}}/>
                    </div>
                    <SolarList/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트태양열 현황판",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{
                            navigate('/solarPanel/2')
                        }}/>
                    </div>
                    <SolarMap/>
                </div>,
            active: true,
        }
    ];


    const [positions02, setPositions02] = useState(getPositions02(solarTile));
    const [widgets02, setWidgets02] = useState(solarConfig);


    const activeWidgets02 = useMemo(() => {
        return widgets02.reduce((acc, widget02) => {
            if (!widget02.active) return acc;
            acc.push(widget02);
            return acc;
        }, []);
    }, [widgets02]);

    const filteredPositions02 = useMemo(() => {
        return positions02.filter(positions02 => {
            return activeWidgets02.find(widget02 => widget02.id === positions02.widgetId)
                ?.active;
        });
    }, [activeWidgets02, positions02]);

    const handleReposition02 = e => {
        setPositions02(e.value);
        localStorage.setItem("dash02", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout02 = () => {
        setPositions02(solarTile);
        localStorage.setItem(
            "dash02",
            JSON.stringify(solarTile)
        );
    };

    const onToggleWidget02 = e => {
        setPositions02(solarTile);
        localStorage.setItem(
            "dash02",
            JSON.stringify(solarTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets02 = widgets02.map(widget02 => {
            if (widget02.id === id) {
                return {
                    ...widget02,
                    active: value,
                };
            }
            return widget02;
        });
        setWidgets02(updatedWidgets02);
    }




    ///스마트정류장 시설물목록 타일
    const FaTile = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 2,},
        {widgetId: "2", col: 5, colSpan: 4, rowSpan: 1,},
        {widgetId: "3", col: 5, colSpan: 4, rowSpan: 1,},
    ];

    const getPositions05 = FaTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard05")) || FaTile
        );
    };

    const FaNavigate = useNavigate();

    const FaConfig = [
        {
            id: "1",
            header:"태양열벽부등 시설물정보",
            body: <div>
                <div>
                    <div className="icon-line">
                    </div>
                    <SolarFacMap/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header:"태양열 벽부등 시설물 목록",
            body:
                <div>
                    <div className="icon-line" onClick={()=>{FaNavigate('/solarPanel/facility/1')}}>
                        <BiCustomize  className="tile-icon"/>
                    </div>
                    <SolarFacAllList/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header:"태양열 벽부등 관리 수정이력",
            body:
                <div>
                    <div className="icon-line" onClick={()=>{FaNavigate('/solarPanel/facility/2')}}>
                        <BiCustomize  className="tile-icon" />
                    </div>
                    <SolarFacUpdateList/>
                </div>,
            active: true,
        },
    ];

    const [positions05, setPositions05] = useState(getPositions05(FaTile));
    const [widgets05, setWidgets05] = useState(FaConfig);


    const activeWidgets05 = useMemo(() => {
        return widgets05.reduce((acc, widget05) => {
            if (!widget05.active) return acc;
            acc.push(widget05);
            return acc;
        }, []);
    }, [widgets05]);

    const filteredPositions05 = useMemo(() => {
        return positions05.filter(positions05 => {
            return activeWidgets05.find(widget05 => widget05.id === positions05.widgetId)
                ?.active;
        });
    }, [activeWidgets05, positions05]);

    const handleReposition05 = e => {
        setPositions05(e.value);
        localStorage.setItem("dashboard05", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout05 = () => {
        setPositions05(FaTile);
        localStorage.setItem(
            "dashboard05",
            JSON.stringify(FaTile)
        );
    };

    const onToggleWidget05 = e => {
        setPositions05(FaTile);
        localStorage.setItem(
            "dashboard05",
            JSON.stringify(FaTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets05 = widgets05.map(widget05 => {
            if (widget05.id === id) {
                return {
                    ...widget05,
                    active: value,
                };
            }
            return widget05;
        });
        setWidgets05(updatedWidgets05);
    }



    ///태양열벽부등 시설물조회//
    const [facAllList,setFacAllList] = useState([]);

    const StationFacList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/list?code=2`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacAllList(res.data);
        })
    }


    //2. 시설물수정이력조회
    const [facRecordList,setFacRecordList] = useState([]); // 이력조회리스트

    const SolarUpdateList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/recordList?code=2`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacRecordList(res.data);
        })
    }

    //3. 시설물관리 생성
    const [AddCode, setAddCode] = useState('');
    const [AddName, setAddName] = useState('');
    const [AddSolarLng, setAddSolarLng] = useState(0); //경도
    const [AddSolarLat, setAddSolarLat] = useState(0); //위도


    const SolarFacNewSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                fl_code: AddCode,
                fl_name: AddName,
                fl_lng: AddSolarLng,
                fl_lat: AddSolarLat,
                fl_category: 2
            })
        })
        setAddCode('');
        setAddName('');
        setAddSolarLng(0);
        setAddSolarLat(0);
        StationFacList();
        SolarUpdateList();
    }


    //시설물수정 아이디값 가져오기
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [SolarLng, setSolarLng] = useState(0); //경도
    const [SolarLat, setSolarLat] = useState(0); //위도


    const [UpdateId, setUpdateId] = useState(0);

    const GetEditFacId = async (id) => {
        for (let list of facAllList) {
            if (list.fl_idx === id) {
                setCode(list.fl_code);
                setName(list.fl_name);
                setSolarLng(list.fl_lng);
                setSolarLat(list.fl_lat);
            }
        }
        setUpdateId(id);
    }



    //4. 시설물수정
    const SolarUpdateSubmit = async () => {
        for (let list of facAllList) {
            if (list.fl_idx === UpdateId) {
                RefreshToken();
                let ac = null;
                if (access === '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                    // ac = localStorage.getItem('login')
                } else {
                    ac = access
                }
                await fetch(`/api/fac/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        fl_idx: list.fl_idx,
                        fl_code: code,
                        fl_name: name,
                        fl_lng: SolarLng,
                        fl_lat: SolarLat,
                        fl_category: 2
                    })
                })
            }
        }
        setCode('');
        setName('');
        setSolarLng(0);
        setSolarLat(0);
        StationFacList();
        SolarUpdateList();
    }


    //5. 시설물데이터 삭제
    const SolarFacDelete = async () => {
        for(let list of facAllList){
            if(list.fl_idx === UpdateId){
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/fac/delete`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        fl_idx: list.fl_idx
                    })
                })
            }
        }
        StationFacList();
        SolarUpdateList();
    }





    return(
        <SolarPanelContext.Provider value={{
            solarList,setSolarList,
            SolarGetListData,
            solarMapId,setSolarMapId,


            onResetLayout02,
            widgets02,
            onToggleWidget02,
            filteredPositions02,
            activeWidgets02,
            handleReposition02,


            onResetLayout05,
            widgets05,
            onToggleWidget05,
            filteredPositions05,
            activeWidgets05,
            handleReposition05,


            ///시설물관리
            facAllList,setFacAllList,
            StationFacList,

            //시설물 수정조회
            SolarUpdateList,
            facRecordList,setFacRecordList,


            //태양열 시설추가
            AddCode, setAddCode,
            AddName, setAddName,
            AddSolarLng, setAddSolarLng,
            AddSolarLat, setAddSolarLat,
            SolarFacNewSubmit,
            GetEditFacId,

            //태양열 수정
            code, setCode,
            name, setName,
            SolarLng, setSolarLng,
            SolarLat, setSolarLat,
            SolarUpdateSubmit,

            //시설물삭제
            SolarFacDelete,
        }}>
            {children}
        </SolarPanelContext.Provider>
    )
}