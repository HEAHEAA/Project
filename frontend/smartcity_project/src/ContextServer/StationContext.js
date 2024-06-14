import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";
import Station00 from "../Page/Station/Control/Detail/Station00";
import Station02 from "../Page/Station/Control/Detail/Station02";
import Station03 from "../Page/Station/Control/Detail/Station03";

import Highcharts from "highcharts";
import * as React from "react";
import StationStatusMap from "../Page/Station/Monitoring/DetailMonitor/Map/StationStatusMap";
import StationStatusChart from "../Page/Station/Monitoring/DetailMonitor/Detail/StationStatusChart";
import StationARCOARSS from "../Page/Station/Monitoring/DetailMonitor/Detail/StationARCOARSS";
import StationOther from "../Page/Station/Monitoring/DetailMonitor/Detail/StationOther";
import Record01 from "../Page/Station/Record/Detail/Record01";
import Record02 from "../Page/Station/Record/Detail/Record02";
import Record03 from "../Page/Station/Record/Detail/Record03";
import StationFacMap from "../Page/Station/Facility/Map/StationFacMap";
import StationFacAllList from "../Page/Station/Facility/Detail/StationFacAllList";
import StationFacUpdateList from "../Page/Station/Facility/Detail/StationFacUpdateList";
import Control01 from "../Page/Station/DID/Detail/Control01";
import Control02 from "../Page/Station/DID/Detail/Control02";
import axios from "axios";
import {menuIcon} from "@progress/kendo-svg-icons";


export const StationContext = createContext({});

export const StationProvider = ({children}) => {
    const {access, RefreshToken, role} = useContext(LoginContext);
    const [nodAll, setNodAll] = useState([]); //시설물 전체목록 리스트
    const [dv, setDv] = useState([]); //디바이스 목록 리스트
    const [dvList, setDvList] = useState([]); //디바이스이력 목록리스트

    const [nodId, setNodId] = useState('SBS230046'); //디바이스목록 Id값
    const [nodeIds, setNodeIds] = useState('SBS230046'); //시설물목록 수정id 값
    const [nodeAgent, setNodeAgent] = useState('SBS230041-ARCO1'); //디바이스목록이력 id값
    const [nodeTypeCd, setNodeTypeCd] = useState('');// 시설물목록 type값
    const [dvcTypeCd, setDvcTypeCd] = useState('ARCO') //디바이스목록 타입값 가져오기
    const [nodeNm, setNodeNm] = useState(''); //노드 이름가져오기

    const [dvType, setDvType] = useState('ARCO'); //디바이스목록 -> 디바이스 이력 타입값 가져오기


    const [nodes, setNodes] = useState([]); //스마트정류장 시설물 목록
    const [nodies, setNodies] = useState([]);//스마트정류장 시설물 목록
    const [mapIdx, setMapIdx] = useState([]);// map이동idx 가져오기

    const [mapPop, setMapPop] = useState(false);//디테일 맵 팝업
    const [pop, setPop] = useState(false);//스마트정류장 시설물목록 팝업

    const [checkItem, setCheckItem] = useState([]); //시설물목록 체크된 아이템 담을 배열
    const [checkItem01, setCheckItem01] = useState([]); //디바이스 목록 체크 아이템 배열
    const [checkNodies, setCheckNodies] = useState([]); //

    const [dvcId, setDvcId] = useState(''); //디바이스목록 post dvcId값
    const [editId, setEditId] = useState(0); //수정할 숫자
    const [Loading, setLoading] = useState(true);
    const [Load02, setLoad02] = useState(true);
    const [Load03, setLoad03] = useState(true);


    const d = new Date();
    const day = d.getDate();

    const [startDate, setStartDate] = useState(new Date(new Date().setDate(day - 1)).toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10).replaceAll('T', ' '));


    //스마트 정류장 컨트롤
    const [nodeList, setNodeList] = useState([]);
    const [nodeId, setNodeId] = useState('');


    ///////////////////// 냉난방기 [ARCO] ///////////////////
    const [oprt, setOprt] = useState(0); //운전여부
    const [oprtMode, setOprtMode] = useState(''); //운전모드
    const [coolTemp, setCoolTemp] = useState(0); // 냉방온도
    const [heatTemp, setHeatTemp] = useState(0); //난방온도
    const [autoTemp, setAutoTemp] = useState(0); // 설정온도
    const [windSts, setWindSts] = useState(''); //바람세기
    const [indrTemp, setIndrTemp] = useState(0); // 실내온도
    const [alrm, setAlrm] = useState(0); //알람여부 0 - 정상  외 비정상
    const [errCd, setErrCd] = useState(0);// 에러코드 0 - 정상  외 비정상
    const [coolSTMd, setCoolStMd] = useState(''); //하정기 시작
    const [coolEdMd, setCoolEdMd] = useState(''); //하절기 종료
    const [winBtn, setWinBtn] = useState(0); //제상모드


    const [oprtStHm, setOprtStHm] = useState(''); //운영시간 시작 겸(내부조명1) 시작
    const [oprtEdHm, setOprtEdHm] = useState(''); //운전시간 (종료) (내부조명1) 종료
    const [oprtStHm2, setOprtStHm2] = useState(''); //운영시간 시작 (내부조명2) 시작
    const [oprtEdHm2, setOprtEdHm2] = useState(''); //운전시간 (종료) (내부조명2) 종료


    //////////////환경센서[ARSS.js]///////////////
    const [temp, setTemp] = useState(0); //온도 -90~90
    const [hmdt, setHmdt] = useState(0); //습도 % 0~100
    const [fineDust, setFineDust] = useState(0); //미세먼지 0~
    const [ufineDust, setUfineDust] = useState(0); //초미세먼지 0~
    const [co2, setCo2] = useState(0); //이산화탄소 0~
    const [vocs, setVocs] = useState(0); //VOCs, 휘발성 유기화합물 0~


    ///////////UVCD LED////////////
    const [UvPwr, setUvPwr] = useState(0);//전원여부 1|0
    const [UvOprtSt, setUvOprtSt] = useState('');  //운전시작 0000 ~ 2359
    const [UvoprtEd, setUvOprtEd] = useState('');//운전종료 0000 ~ 2359


    ///////충전기 [CHGR] //////////////////

    const [ChPwr, setChPwr] = useState(0); //충전기 전원여부
    const [ChOprtSt, setChOprtSt] = useState(''); //충전기 운전시간
    const [ChOprtEd, setChOprtEd] = useState(''); //충전기 운전 종료


    ////LED 조명  [LDLT] //////
    const [LdPwr, setLdPwr] = useState(0); // led 전원여부
    const [LdoprtStHm, setLdOprtStHm] = useState(''); //led 내부조명1 시작
    const [LdoprtEdHm, setLdOprtEdHm] = useState(''); //led 내부조명1 종료
    const [LdoprtStHm2, setLdOprtStHm2] = useState(''); //led 내부조명2 시작
    const [LdoprtEdHm2, setLdOprtEdHm2] = useState(''); //led 내부조명2 종료


    ////자동문 [ATDR] /////
    const [AtPwr, setAtPwr] = useState(0); //전원여부
    const [AtOpen, setAtOpen] = useState(0); //열림여부
    const [AtoprtSt, setAtOprtSt] = useState(''); //운영시작
    const [ArOprtEd, setArOprtEd] = useState(''); //운영 종료


    ////////온열벤치 [HTBC] //////
    const [HtPwr, setHtPwr] = useState(0); //전원여부
    const [HtStMd, setHtStMd] = useState(''); //시작일
    const [HtEdMd, setHtEdMd] = useState(''); //종료일
    const [HtStHm, setHtStHm] = useState(''); //시작시간
    const [HtEdHm, setHtEdHm] = useState(''); //종료시간


    /////////피플카운터[PPCT] /////
    const [PPin, setPPin] = useState(0); //설치이후 누적입실수
    const [PPout, setPPout] = useState(0); //설치이후 누적 퇴실수
    const [PPTdyIn, setPPTdIn] = useState(0); //당일 누적입실
    const [PPTdyOut, setPPTdyOut] = useState(0); //당일 누적 퇴실


    const [DvListLoading, setDvListLoading] = useState(true);

    const [RecordName, setRecordName] = useState('');
    const [type, setType] = useState('ARSS')


    //버스정류장 시설물 조회
    const GetAllNodes = async () => {
        await fetch(`/nodeApi/nodes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setNodAll(res.result.data);
            setLoading(false);
        })
    }



    useEffect(() => {
        dvPostAPI();
        EcoOutSideGetData();
        ArcoList();
    }, [nodId]);

    //디바이스 목록 api
    const dvPostAPI = async () => {
        await fetch(`/nodeApi/devices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nodeId: nodId,
                // deviceId: agent,
            })
        }).then((res) => res.json())
            .then((res) => {
                setDv(res.result.data);
                setLoad02(false);
            })
    }



    const [dvAllData,setDvAllData] = useState([]);
    const devicesAllData = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/bus/selectCodeAll?deviceTypeCd=arss`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setDvAllData(res.data);
        })
    }


    //////////////////////////////////////////////////////

    //수정할 데이터 가져오기
    const GetEditId = async (id) => {
        for (let list of dv) {
            if (list.ordNo === id) {
                //냉난방기
                setOprt(list.data.oprt);
                setOprtMode(list.data.oprtMode);
                setWindSts(list.data.windSts);
                setCoolTemp(list.data.coolTemp);
                setHeatTemp(list.data.heatTemp);
                setAutoTemp(list.data.autoTemp);
                setIndrTemp(list.data.indrTemp);
                setCoolStMd(list.data.coolStMd);
                setCoolEdMd(list.data.coolEdMd);
                setOprtStHm(list.data.oprtStHm);
                setOprtEdHm(list.data.oprtEdHm);
                setWinBtn(list.data.dfrst);


                setTemp(list.data.temp);
                setHmdt(list.data.hmdt);
                setFineDust(list.data.fineDust);
                setUfineDust(list.data.ufineDust);
                setCo2(list.data.co2);
                setVocs(list.data.vocs);

                //UV LED
                setUvOprtSt(list.data.oprtStHm);
                setUvOprtEd(list.data.oprtEdHm);

                //충전기
                setChOprtSt(list.data.oprtStHm)
                setChOprtEd(list.data.oprtEdHm)

                //LED 조명
                setLdOprtStHm(list.data.oprtStHm)
                setLdOprtEdHm(list.data.oprtEdHm)
                setLdOprtStHm2(list.data.oprtStHm2)
                setLdOprtEdHm2(list.data.oprtEdHm2)

                //자동문
                setAtOprtSt(list.data.oprtStHm)
                setArOprtEd(list.data.oprtEdHm)


                //온열벤치
                setHtStMd(list.data.oprtStMd)
                setHtEdMd(list.data.oprtEdMd)
                setHtStHm(list.data.oprtStHm)
                setHtEdHm(list.data.oprtEdHm)

                //피플카운트
                setPPin(list.data.in);
                setPPout(list.data.out);
                setPPTdIn(list.data.inTdy);
                setPPTdyOut(list.data.outTdy);
            }
        }
        setEditId(id);
    }


    ///////////////////////////

    //디바이스데이터 이력조회
    const DvList = async () => {
        await fetch(`/nodeApi/devicesDataHistory`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dvcId: nodeAgent,
                    stDtm: startDate.replaceAll('T', ' '),
                    edDtm: endDate.replaceAll('T', ' '),
                    limit: 100,
                    offset: 100,
                    desc: 0,
                })
            }).then(res => res.json())
            .then(res => {
                setDvList(res.result.data);
                setLoad03(false);
                setDvListLoading(false);
            })
    }


    //디바이스정보(냉난방기만)
    const [arco, setArco] = useState([]);

    const ArcoList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/bus/selectCodeAll?deviceTypeCd=arco`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setArco(res.data)
        })
    }

    //12시간 통계 API 환경센서
    const [ArssHour, setArssHour] = useState([]);
    const [ArssId, setArssId] = useState('SBS230049');

    const ARSSList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/bus/hour`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setArssHour(res.data);
        })
    }


    ///타일값 context 이동/// 제어관리
    const StationTile = [
        {widgetId: "0", col: 1, colSpan: 4, rowSpan: 6,},
        {widgetId: "1", col: 5, colSpan: 4, rowSpan: 3,},
        {widgetId: "2", col: 5, colSpan: 4, rowSpan: 3,},
    ];

    const getPositions = StationTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard")) || StationTile
        );
    };

    const navigate = useNavigate();
    const GoStDetail00 = () => {
        navigate('/station/0');
    }

    const GoStDetail01 = () => {
        navigate('/station/1');
    }
    const GoStDetail02 = () => {
        navigate('/station/2');
    }
    const GoStDetail03 = () => {
        navigate('/station/3');
    }

    const StationConfig = [
        {
            id: "0",
            header: "스마트 정류장 목록"
            ,
            body: <div>
                <div className="icon-line">
                    <BiCustomize onClick={GoStDetail00} className="tile-icon"/>
                </div>
                <Station00/>
            </div>,
            active: true,
        },
        {
            id: "1",
            header: "스마트 정류장 디바이스 목록",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoStDetail02} className="tile-icon"/>
                    </div>
                    <Station02/>
                </div>,
            active: true,
        },
        {
            id: "2",
            header: "디바이스 데이터 수정이력",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={GoStDetail03}/>
                    </div>
                    <Station03/>
                </div>,
            active: true,
        },
    ];

    const [positions, setPositions] = useState(getPositions(StationTile));
    const [widgets, setWidgets] = useState(StationConfig);


    const activeWidgets = useMemo(() => {
        return widgets.reduce((acc, widget) => {
            if (!widget.active) return acc;
            acc.push(widget);
            return acc;
        }, []);
    }, [widgets]);

    const filteredPositions = useMemo(() => {
        return positions.filter(position => {
            return activeWidgets.find(widget => widget.id === position.widgetId)
                ?.active;
        });
    }, [activeWidgets, positions]);

    const handleReposition = e => {
        setPositions(e.value);
        localStorage.setItem("dashboard", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout = () => {
        setPositions(StationTile);
        localStorage.setItem(
            "dashboard",
            JSON.stringify(StationTile)
        );
    };


    const onToggleWidget = e => {
        setPositions(StationTile);
        localStorage.setItem(
            "dashboard",
            JSON.stringify(StationTile)
        );

        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets = widgets.map(widget => {
            if (widget.id === id) {
                return {
                    ...widget,
                    active: value,
                };
            }
            return widget;
        });
        setWidgets(updatedWidgets);
    }


    //


    //스마트 현황판
    const StationTile01 = [
        {widgetId: "0", col: 1, colSpan: 4, rowSpan: 3,},
        {widgetId: "1", col: 5, colSpan: 4, rowSpan: 3,},
        {widgetId: "2", col: 1, colSpan: 4, rowSpan: 3,},
        {widgetId: "3", col: 5, colSpan: 4, rowSpan: 3,},
    ]

    const getPositions01 = StationTile => {
        return (
            JSON.parse(localStorage.getItem("stationStatus")) || StationTile
        );
    };

    const GoStDetail04 = () => {
        navigate('/station/status/1');
    }
    const GoStDetail05 = () => {
        navigate('/station/status/2');
    }
    const GoStDetail06 = () => {
        navigate('/station/status/3');
    }

    const GoStDetail07 = () => {
        navigate('/station/status/map');
    }

    const StationConfig01 = [
        {
            id: "0",
            header: "정류장 현황판",
            body: <div>
                <div className="icon-line">
                    <BiCustomize onClick={GoStDetail07} className="tile-icon"/>
                </div>
                <StationStatusMap/>
            </div>,
            active: true,
        },
        {
            id: "1",
            header: "정류장 냉난방 정보",
            body: <div>
                <div className="icon-line">
                    <BiCustomize onClick={GoStDetail04} className="tile-icon"/>
                </div>
                <StationStatusChart/>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "정류장 미세먼지 정보",
            body: <div>
                <div className="icon-line">
                    <BiCustomize onClick={GoStDetail05} className="tile-icon"/>
                </div>
                <StationARCOARSS/>
            </div>,
            active: true,
        },
        {
            id: "3",
            header: "정류장 기타 설정 매니저",
            body: <div>
                <div className="icon-line">
                    <BiCustomize onClick={GoStDetail06} className="tile-icon"/>
                </div>
                <StationOther/>
            </div>,
            active: true,
        }
    ]

    const [positions01, setPositions01] = useState(getPositions01(StationTile01));
    const [widgets01, setWidgets01] = useState(StationConfig01);

    const activeWidgets01 = useMemo(() => {
        return widgets01.reduce((acc, widget) => {
            if (!widget.active) return acc;
            acc.push(widget);
            return acc;
        }, []);
    }, [widgets01]);

    const filteredPositions01 = useMemo(() => {
        return positions01.filter(position => {
            return activeWidgets01.find(widget => widget.id === position.widgetId)
                ?.active;
        });
    }, [activeWidgets01, positions01]);

    const handleReposition01 = e => {
        setPositions01(e.value);
        localStorage.setItem("stationStatus", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout01 = () => {
        setPositions01(StationTile01);
        localStorage.setItem(
            "stationStatus",
            JSON.stringify(StationTile01)
        );
    };

    const onToggleWidget01 = e => {
        setPositions01(StationTile01);
        localStorage.setItem(
            "stationStatus",
            JSON.stringify(StationTile01)
        );

        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets01 = widgets01.map(widget => {
            if (widget.id === id) {
                return {
                    ...widget,
                    active: value,
                };
            }
            return widget;
        });
        setWidgets01(updatedWidgets01);
    }


    //Record
    const ReTile = [
        {widgetId: "1", col: 1, colSpan: 5, rowSpan: 1,},
        {widgetId: "2", col: 6, colSpan: 3, rowSpan: 1,},
        {widgetId: "3", col: 1, colSpan: 8, rowSpan: 1,},
    ];

    const getPositions07 = ReTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard07")) || ReTile
        );
    };

    const ReNavigate = useNavigate();
    const GoReDetail01 = () => {
        ReNavigate('/record/1');
    }
    const GoReDetail02 = () => {
        ReNavigate('/record/2');
    }
    const GoReDetail03 = () => {
        ReNavigate('/record/3');
    }

    const ReConfig = [
        {
            id: "1",
            header: "시설물 데이터 조회",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoReDetail01} className="tile-icon"/>
                    </div>
                    <Record01/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "실내 대기 미세먼지 차트",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoReDetail02} className="tile-icon"/>
                    </div>
                    <Record02/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header: "실시간 데이터 추이",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoReDetail03} className="tile-icon"/>
                    </div>
                    <Record03/>

                </div>,
            active: true,
        },
    ];

    const [positions07, setPositions07] = useState(getPositions07(ReTile));
    const [widgets07, setWidgets07] = useState(ReConfig);


    const activeWidgets07 = useMemo(() => {
        return widgets07.reduce((acc, widget07) => {
            if (!widget07.active) return acc;
            acc.push(widget07);
            return acc;
        }, []);
    }, [widgets07]);

    const filteredPositions07 = useMemo(() => {
        return positions07.filter(positions07 => {
            return activeWidgets07.find(widget07 => widget07.id === positions07.widgetId)
                ?.active;
        });
    }, [activeWidgets07, positions07]);

    const handleReposition07 = e => {
        setPositions07(e.value);
        localStorage.setItem("dashboard07", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout07 = () => {
        setPositions07(ReTile);
        localStorage.setItem(
            "dashboard07",
            JSON.stringify(ReTile)
        );
    };

    const onToggleWidget07 = e => {
        setPositions07(ReTile);
        localStorage.setItem(
            "dashboard07",
            JSON.stringify(ReTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets07 = widgets07.map(widget07 => {
            if (widget07.id === id) {
                return {
                    ...widget07,
                    active: value,
                };
            }
            return widget07;
        });
        setWidgets07(updatedWidgets07);
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
            header: "스마트정류장 시설물정보",
            body: <div>
                <div>
                    <div className="icon-line">
                    </div>
                    <StationFacMap/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트정류장 시설물 목록",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={() => {
                            navigate('/station/facility/1')
                        }} className="tile-icon"/>
                    </div>
                    <StationFacAllList/>

                </div>,
            active: true,
        },
        {
            id: "3",
            header: "스마트정류장 관리 수정이력",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={() => {
                            navigate('/station/facility/2')
                        }} className="tile-icon"/>
                    </div>
                    <StationFacUpdateList/>
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


    /////////////////////DID 타일
    const CoTile = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 4,},
        {widgetId: "2", col: 5, colSpan: 2, rowSpan: 4,},
        // {widgetId: "3", col: 4, colSpan: 3, rowSpan: 2,},
    ];

    const getPositions04 = CoTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard04")) || CoTile
        );
    };
    const CoNavigate = useNavigate();
    const GoCoDetail01 = () => {
        CoNavigate('/control/1');
    }
    const GoCoDetail02 = () => {
        CoNavigate('/control/2');
    }

    const CoConfig = [
        {
            id: "1",
            header: "미디어/홍보물 재생목록",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoCoDetail01} className="tile-icon"/>
                    </div>
                    <Control01/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "홍보물확인",
            body: <div>
                <div className="icon-line">
                    <BiCustomize onClick={GoCoDetail02} className="tile-icon"/>
                </div>
                <Control02/>
            </div>,
            active: true,
        },
    ];

    const [positions04, setPositions04] = useState(getPositions04(CoTile));
    const [widgets04, setWidgets04] = useState(CoConfig);


    const activeWidgets04 = useMemo(() => {
        return widgets04.reduce((acc, widget04) => {
            if (!widget04.active) return acc;
            acc.push(widget04);
            return acc;
        }, []);
    }, [widgets04]);

    const filteredPositions04 = useMemo(() => {
        return positions04.filter(positions04 => {
            return activeWidgets04.find(widget04 => widget04.id === positions04.widgetId)
                ?.active;
        });
    }, [activeWidgets04, positions04]);

    const handleReposition04 = e => {
        setPositions04(e.value);
        localStorage.setItem("dashboard04", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout04 = () => {
        setPositions04(CoTile);
        localStorage.setItem(
            "dashboard04",
            JSON.stringify(CoTile)
        );
    };

    const onToggleWidget04 = e => {
        setPositions04(CoTile);
        localStorage.setItem(
            "dashboard04",
            JSON.stringify(CoTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets04 = widgets04.map(widget04 => {
            if (widget04.id === id) {
                return {
                    ...widget04,
                    active: value,
                };
            }
            return widget04;
        });
        setWidgets04(updatedWidgets04);
    }


    ///////////////////////시설물관리 조회/////
    //1. 시설물목록
    const [facAllList, setFacAllList] = useState([]);

    const StationFacList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/list?code=3`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacAllList(res.data);
        })
    }

    //2. 시설목수정목록
    const [facRecordList, setFacRecordList] = useState([]); // 이력조회리스트
    const FacCheckList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/recordList?code=3`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacRecordList(res.data);
        })
    }


    //3.시설물입력
    const [AddCode, setAddCode] = useState('');
    const [AddName, setAddName] = useState('');
    const [StationLng, setStationLng] = useState(0); //경도
    const [StationLat, setStationLat] = useState(0); //위도

    const StationFacNewSubmit = async () => {
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
                fl_lng: StationLng,
                fl_lat: StationLat,
                fl_category: 3
            })
        })
        setAddCode('');
        setAddName('');
        setStationLng(0);
        setStationLat(0);
        FacCheckList();
        StationFacList();
    }

    //시설물수정 아이디값 가져오기
    const [UpdateId, setUpdateId] = useState(0);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [lng, setLng] = useState(0); //경도
    const [lat, setLat] = useState(0); //위도
    const GetEditFacId = async (id) => {
        for (let list of facAllList) {
            if (list.fl_idx === id) {
                setCode(list.fl_code);
                setName(list.fl_name);
                setLng(list.fl_lng);
                setLat(list.fl_lat);
            }
        }
        setUpdateId(id);
    }


    //4. 시설물수정
    const StationUpdateSubmit = async () => {
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
                        fl_lng: lng,
                        fl_lat: lat,
                        fl_category: 3
                    })
                })
            }
        }
        setCode('');
        setName('');
        setLng(0);
        setLat(0);
        FacCheckList();
        StationFacList();
    }

    //5. 시설물데이터 삭제
    const StationFacDelete = async () => {
        for (let list of facAllList) {
            if (list.fl_idx === UpdateId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/fac/delete`, {
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
        FacCheckList();
        StationFacList();
    }


    ////시설물이력데이터 get
    const [agent, setAgent] = useState('arss');



    const [timeList, setTimeList] = useState([]);

    const StationRecordData = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/bus/history/${nodId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                cate: agent,
                sdate: startDate,
                edate: endDate,
            })
        }).then(res => res.json()).then(res => {
            setTimeList(res.data);
        })
    }



    const excelDownload = async (e) => {
        e.preventDefault()
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await axios({
            url: `/api/excel/bus/${nodId}`,
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + ac,
            },
            data: {
                check: agent,
                sdate: startDate + " 00:00:00",
                edate: endDate + " 00:00:00"
            },
            responseType: 'blob'
        }).then(res => {

            const url = window.URL.createObjectURL(new Blob([res.data], {
                type: res.headers["content-type"],
            }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'xlsx');
            document.body.appendChild(link);
            link.click();
            window.location.reload();
        })
    }



    ////버스정류장 실외데이터 조회
    const [ecoOutSideList,setEcoOutSideList] = useState([]);

    const EcoOutSideGetData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/bus/outside`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setEcoOutSideList(res.data);
        })
    }





    /////////////////버스정류장 전체 모니터링 데이터 삽입
    const [allBusData,setAllBusData] = useState([]);

    const AllBusDataOnSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/bus/detail`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setAllBusData(res.data);
        })
    }

    return (
        <StationContext.Provider value={{
            //전체모니터링 데이터
            AllBusDataOnSubmit,
            allBusData,setAllBusData,



            //실외데이터
            EcoOutSideGetData,
            ecoOutSideList,

            //이력조회 엑셀다운로드
            excelDownload,


            ArcoList,
            arco, setArco,

            nodAll, setNodAll,
            nodes, setNodes,
            pop, setPop,
            checkItem, setCheckItem,
            checkItem01, setCheckItem01,
            mapPop, setMapPop,
            dv, setDv,
            nodies, setNodies,
            checkNodies, setCheckNodies,
            dvcId, setDvcId,
            nodeNm, setNodeNm,

            oprt, setOprt,
            oprtMode, setOprtMode,
            winBtn, setWinBtn,
            windSts, setWindSts,
            coolTemp, setCoolTemp,
            heatTemp, setHeatTemp,
            autoTemp, setAutoTemp,
            indrTemp, setIndrTemp,
            coolSTMd, setCoolStMd,
            coolEdMd, setCoolEdMd,
            dvList, setDvList,
            editId, setEditId,


            temp, setTemp,
            hmdt, setHmdt,
            fineDust, setFineDust,
            ufineDust, setUfineDust,
            co2, setCo2,
            vocs, setVocs,


            UvOprtSt, setUvOprtSt,
            UvoprtEd, setUvOprtEd,

            ChOprtSt, setChOprtSt,
            ChOprtEd, setChOprtEd,


            oprtStHm, setOprtStHm,
            oprtEdHm, setOprtEdHm,
            oprtStHm2, setOprtStHm2,
            oprtEdHm2, setOprtEdHm2,

            LdoprtStHm, setLdOprtStHm,
            LdoprtEdHm, setLdOprtEdHm,
            LdoprtStHm2, setLdOprtStHm2,
            LdoprtEdHm2, setLdOprtEdHm2,

            AtoprtSt, setAtOprtSt,
            ArOprtEd, setArOprtEd,

            PPin, setPPin,
            PPout, setPPout,
            PPTdyIn, setPPTdIn,
            PPTdyOut, setPPTdyOut,

            HtStMd, setHtStMd,
            HtEdMd, setHtEdMd,
            HtStHm, setHtStHm,
            HtEdHm, setHtEdHm,
            nodId, setNodId,
            nodeAgent, setNodeAgent,
            nodeTypeCd, setNodeTypeCd,
            mapIdx, setMapIdx,

            GetEditId,
            GetAllNodes,
            // getNodes,
            dvPostAPI,
            Loading, setLoading,
            DvList,

            Load02, setLoad02,
            Load03, setLoad03,
            nodeIds, setNodeIds,
            dvcTypeCd, setDvcTypeCd,
            dvType, setDvType,

            startDate, setStartDate,
            endDate, setEndDate,

            DvListLoading, setDvListLoading,
            nodeList, setNodeList,
            nodeId, setNodeId,

            RecordName, setRecordName,
            type, setType,


            ArssHour, setArssHour,
            ARSSList,
            ArssId, setArssId,


            onResetLayout,
            widgets,
            onToggleWidget,
            filteredPositions,
            activeWidgets,
            handleReposition,

            onResetLayout01,
            widgets01,
            onToggleWidget01,
            filteredPositions01,
            activeWidgets01,
            handleReposition01,


            onResetLayout07,
            widgets07,
            onToggleWidget07,
            filteredPositions07,
            activeWidgets07,
            handleReposition07,


            onResetLayout05,
            widgets05,
            onToggleWidget05,
            filteredPositions05,
            activeWidgets05,
            handleReposition05,


            onResetLayout04,
            widgets04,
            onToggleWidget04,
            filteredPositions04,
            activeWidgets04,
            handleReposition04,


            //스마트정류장 시설물관리 목록
            StationFacList,
            facAllList, setFacAllList,
            //스마트정류장 시설물관리이력 목록
            FacCheckList,
            facRecordList, setFacRecordList,

            //스마트정류장 시설추가
            AddCode, setAddCode,
            AddName, setAddName,
            StationLng, setStationLng,
            StationLat, setStationLat,
            StationFacNewSubmit,
            GetEditFacId,

            //시설물 수정
            code, setCode,
            name, setName,
            lng, setLng,
            lat, setLat,
            StationUpdateSubmit,


            //시설물삭제
            StationFacDelete,

            agent, setAgent,
            timeList, setTimeList,
            StationRecordData,


            //디바이스 전체 데이터 불러오기
            devicesAllData,
            dvAllData,setDvAllData,

        }}>
            {children}
        </StationContext.Provider>
    )
}