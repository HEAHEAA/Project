import {createContext, useContext, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";
import CrossWalk01 from "../Page/CrossWork/Monitoring/Detail/CrossWalk01";
import CrossWalk02 from "../Page/CrossWork/Monitoring/Detail/CrossWalk02";
import Highcharts from "highcharts";
import * as React from "react";
import CrossFacMap from "../Page/CrossWork/Facility/Map/CrossFacMap";
import CrossFacAllList from "../Page/CrossWork/Facility/Detail/CrossFacAllList";
import CrossFacUpdateList from "../Page/CrossWork/Facility/Detail/CrossFacUpdateList";
import CrossTotalList from "../Page/CrossWork/Total/Detail/CrossTotalList";
import CrossPerson from "../Page/CrossWork/Total/Detail/CrossPerson";
import CrossCar from "../Page/CrossWork/Total/Detail/CrossCar";

export const CrossWalkContext = createContext({});

export const CrossWalkProvider = ({children}) => {
    const {access, RefreshToken} = useContext(LoginContext);
    const [list, setList] = useState([]); // 장치목록
    const [total, setTotal] = useState([]); // 장치통계
    const [car, setCar] = useState([]); //차량통계
    const [nodeId, setNodeId] = useState(0); //통계 데이터 노드아이디


    const [crossList, setCrossList] = useState([]); //내부 횡단보도 리스트


    //장치통계데이터
    const [sysNum, setSysNum] = useState(109);
    const d = new Date();
    const day = d.getDate();

    const [startDate, setStartDate] = useState(new Date(new Date().setDate(day - 1)).toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));


    const [start02, setStart02] = useState(new Date(new Date().setDate(day - 1)).toISOString().slice(0, 10));
    const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));


    //장비목록 데이터 연결
    const ListSubmit = async () => {
        await fetch(`/nodeApi/smartCross`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(res => {
            setList(res.result);
        })
    }

    //내부장비목록 리스트
    const LocalCrossList = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/cross/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setCrossList(res.data);
        })
    }




    //장치통계 데이터 연결
    const ListTotalSubmit = async () => {
        await fetch(`/nodeApi/smartCrossEvent?node_id=${sysNum}&stdate=${startDate}&eddate=${endDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(res => {
            setTotal(res.result);
        })
    }


    // smartCrossLaneEvent?node_id&stdate&eddate
    //
    //차량통계 데이터연결
    const ListCarTotalSubmit = async () => {
        await fetch(`/nodeApi/smartCrossCarLineEvent?node_id=${sysNum}&stdate=${start02}&eddate=${endDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(res => {
            setCar(res.result)
        })
    }


    //타일
    const CrossTile = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 6,},
        {widgetId: "2", col: 5, colSpan: 4, rowSpan: 6,},
    ];

    const getPositions01 = CrossTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard01")) || CrossTile
        );
    };

    const CrNavigate = useNavigate();
    const GoCrDetail01 = () => {
        CrNavigate('/crosswalk/1');
    }
    const GoCrDetail02 = () => {
        CrNavigate('/crosswalk/2');
    }


    const CrossConfig = [
        {
            id: "1",
            header: "스마트횡단보도 정상 모니터링",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoCrDetail01} className="tile-icon"/>
                    </div>
                    <CrossWalk01/>
                </div>,
            active: true,
        },
        {
            id: "2",
            header: "오류 리스트",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoCrDetail02} className="tile-icon"/>
                    </div>
                    <CrossWalk02/>
                </div>,
            active: true,
        },
    ];


    const [positions01, setPositions01] = useState(getPositions01(CrossTile));
    const [widgets01, setWidgets01] = useState(CrossConfig);


    const activeWidgets01 = useMemo(() => {
        return widgets01.reduce((acc, widget01) => {
            if (!widget01.active) return acc;
            acc.push(widget01);
            return acc;
        }, []);
    }, [widgets01]);

    const filteredPositions01 = useMemo(() => {
        return positions01.filter(position01 => {
            return activeWidgets01.find(widget01 => widget01.id === position01.widgetId)
                ?.active;
        });
    }, [activeWidgets01, positions01]);

    const handleReposition01 = e => {
        setPositions01(e.value);
        localStorage.setItem("dashboard01", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout01 = () => {
        setPositions01(CrossTile);
        localStorage.setItem(
            "dashboard01",
            JSON.stringify(CrossTile)
        );
    };

    const onToggleWidget01 = e => {
        setPositions01(CrossTile);
        localStorage.setItem(
            "dashboard01",
            JSON.stringify(CrossTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets01 = widgets01.map(widget01 => {
            if (widget01.id === id) {
                return {
                    ...widget01,
                    active: value,
                };
            }
            return widget01;
        });
        setWidgets01(updatedWidgets01);
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
            header: "스마트횡단보도 시설물정보",
            body: <div>
                <div>
                    <div className="icon-line" >
                    </div>
                    <CrossFacMap/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트횡단보도 시설물 목록",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{FaNavigate('/crosswalk/facility/1')}}/>
                    </div>
                    <CrossFacAllList/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header: "스마트횡단보도 관리 수정이력",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{FaNavigate('/crosswalk/facility/2')}}/>
                    </div>
                    <CrossFacUpdateList/>
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




    ////// 횡단보도 통계
    const CrossTile02 = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 6,},
        {widgetId: "2", col: 5, colSpan: 4, rowSpan: 3,},
        {widgetId: "3", col: 5, colSpan: 4, rowSpan: 3,},
    ];


    const navigate = useNavigate();


    const getPositions02 = CrossTile02 => {
        return (
            JSON.parse(localStorage.getItem("dashCross")) || CrossTile02
        );
    };


    const CrossConfig02 = [
        {
            id: "1",
            header: "스마트횡단보도 통계목록",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{navigate('/crosswalk/total/1')}} />
                    </div>
                    <CrossTotalList/>
                </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트횡단보도 통계",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{navigate('/crosswalk/total/2')}}/>
                    </div>
                    <CrossPerson/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header: "스마트횡단보도 차량통계",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{navigate('/crosswalk/total/3')}}/>
                    </div>
                    <CrossCar/>
                </div>,
            active: true,
        }
    ];


    const [positions02, setPositions02] = useState(getPositions02(CrossTile02));
    const [widgets02, setWidgets02] = useState(CrossConfig02);

    const activeWidgets02 = useMemo(() => {
        return widgets02.reduce((acc, widget01) => {
            if (!widget01.active) return acc;
            acc.push(widget01);
            return acc;
        }, []);
    }, [widgets02]);

    const filteredPositions02 = useMemo(() => {
        return positions02.filter(position01 => {
            return activeWidgets02.find(widget01 => widget01.id === position01.widgetId)
                ?.active;
        });
    }, [activeWidgets02, positions02]);

    const handleReposition02 = e => {
        setPositions02(e.value);
        localStorage.setItem("dashCross", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout02 = () => {
        setPositions02(CrossTile02);
        localStorage.setItem(
            "dashCross",
            JSON.stringify(CrossTile02)
        );
    };

    const onToggleWidget02 = e => {
        setPositions02(CrossTile02);
        localStorage.setItem(
            "dashCross",
            JSON.stringify(CrossTile02)
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



    ///1. 스마트 횡단보도 시설물관리목록
    const [facAllList, setFacAllList] = useState([]);

    const CrossFacList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/list?code=4`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacAllList(res.data);
        })
    }

    //2. 스마트 횡단보도 시설물수정목록
    const [facRecordList, setFacRecordList] = useState([]); // 이력조회리스트

    const CrossUpdateList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/recordList?code=4`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacRecordList(res.data);
        })
    }


    ///3. 시설물목록
    const [AddCode, setAddCode] = useState('');
    const [AddName, setAddName] = useState('');
    const [AddCrossLng, setAddCrossLng] = useState(0); //경도
    const [AddCrossLat, setAddCrossLat] = useState(0); //위도

    const CrossFacNewSubmit = async () => {
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
                fl_lng: AddCrossLng,
                fl_lat: AddCrossLat,
                fl_category: 4
            })
        })
        setAddCode('');
        setAddName('');
        setAddCrossLng(0);
        setAddCrossLat(0);
        CrossFacList();
        CrossUpdateList();
    }

    //시설물수정 아이디값 가져오기
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [CrossLng, setCrossLng] = useState(0); //경도
    const [CrossLat, setCrossLat] = useState(0); //위도


    const [UpdateId, setUpdateId] = useState(0);
    const GetEditFacId = async (id) => {
        for (let list of facAllList) {
            if (list.fl_idx === id) {
                setCode(list.fl_code);
                setName(list.fl_name);
                setCrossLng(list.fl_lng);
                setCrossLat(list.fl_lat);
            }
        }
        setUpdateId(id);
    }

    //시설물수정
    const CrossUpdateSubmit = async () => {
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
                        fl_lng: CrossLng,
                        fl_lat: CrossLat,
                        fl_category: 4
                    })
                })
            }
        }
        setCode('');
        setName('');
        setCrossLng(0);
        setCrossLat(0);
        CrossFacList();
        CrossUpdateList();
    }

    //5. 시설물데이터 삭제
    const CrossFacDelete = async () => {
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
        CrossFacList();
        CrossUpdateList();
    }



    const [moniNum,setMoniNum] = useState("예산 여자 중학교");


    return (
        <CrossWalkContext.Provider value={{
            moniNum,setMoniNum,

            list, setList,
            total, setTotal,
            car, setCar,
            ListSubmit,
            startDate, setStartDate, endDate, setEndDate,
            sysNum, setSysNum,
            nodeId, setNodeId,

            start02, setStart02, end, setEnd,
            ListTotalSubmit,
            ListCarTotalSubmit,

            // ListTotalSubmit,ListCarTotalSubmit
            LocalCrossList,
            crossList, setCrossList,

            onResetLayout01,
            widgets01,
            onToggleWidget01,
            filteredPositions01,
            activeWidgets01,
            handleReposition01,

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

            //횡단보도 시설물조회
            CrossFacList,
            facAllList, setFacAllList,

            //횡단보도 시설물수정조회
            CrossUpdateList,
            facRecordList, setFacRecordList,

            //횡단보도 시설추가
            AddCode, setAddCode,
            AddName, setAddName,
            AddCrossLng, setAddCrossLng,
            AddCrossLat, setAddCrossLat,
            CrossFacNewSubmit,
            GetEditFacId,

            //시설물 수정
            code, setCode,
            name, setName,
            CrossLng, setCrossLng,
            CrossLat, setCrossLat,
            CrossUpdateSubmit,

            //시설물삭제
            CrossFacDelete,
        }}>
            {children}
        </CrossWalkContext.Provider>
    )


}