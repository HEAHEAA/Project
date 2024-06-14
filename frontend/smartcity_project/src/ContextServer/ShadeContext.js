import {createContext, useContext, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";
import Highcharts from "highcharts";
import Shade01 from "../Page/Shade/Monitoring/Detail/Shade01";
import ShadeMap from "../Page/Shade/Monitoring/map/ShadeMap";
import * as React from "react";
import ShadeFacMap from "../Page/Shade/Facility/Map/ShadeFacMap";
import ShadeFacAllList from "../Page/Shade/Facility/Dtail/ShadeFacAllList";
import ShadeFacUpdateList from "../Page/Shade/Facility/Dtail/ShadeFacUpdateList";
import {LoginContext} from "./LoginContext";

export const ShadeContext = createContext({});

export const ShadeProvider = ({children}) => {
    const {access, RefreshToken} = useContext(LoginContext);
    const [shadeList, setShadeList] = useState([]);
    const [mapOnClick, setMapOnClick] = useState(0);//리스트 클릭 시, mapId값으로 비교
    const [loading, setLoading] = useState(true);

    const ShadeGetList = async () => {
        await fetch(`/nodeApi/smartShade`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(res => {
            setShadeList(res.result)
            setLoading(false);
        })
    }


    const [rowNum, setRowNum] = useState(1);
    const [onOff, setOnOff] = useState(1); //1. 자동 //2. 접힘 //3. 전체자동  //4. 전체수동
    const shadeOffOnControlSubmit = async () => {
        await fetch(`/nodeApi/remoteShadeOnOff`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rowno: rowNum,
                onoff: onOff
            })
        })
        setRowNum(1);
        setOnOff(1);
        ShadeGetList();
        window.location.reload();
    }


    const shadeTile = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 4,},
        {widgetId: "2", col: 5, colSpan: 4, rowSpan: 4,},
    ];

    const getPositions02 = shadeTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard02")) || shadeTile
        );
    };


    const ShNavigate = useNavigate();
    const GoShDetail01 = () => {
        ShNavigate('/smart_shade/1');
    }
    const GoShDetail02 = () => {
        ShNavigate('/smart_shade/2');
    }


    const shadeConfig = [
        {
            id: "1",
            header: "스마트그늘막 시설물 목록",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoShDetail01} className="tile-icon"/>
                    </div>
                    <Shade01/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트그늘막 현황판",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoShDetail02} className="tile-icon"/>
                    </div>
                    <ShadeMap/>
                </div>,
            active: true,
        }
    ];

    const [positions02, setPositions02] = useState(getPositions02(shadeTile));
    const [widgets02, setWidgets02] = useState(shadeConfig);


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
        localStorage.setItem("dashboard02", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout02 = () => {
        setPositions02(shadeTile);
        localStorage.setItem(
            "dashboard02",
            JSON.stringify(shadeTile)
        );
    };

    const onToggleWidget02 = e => {
        setPositions02(shadeTile);
        localStorage.setItem(
            "dashboard02",
            JSON.stringify(shadeTile)
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
            header: "스마트그늘막 시설물정보",
            body: <div>
                <div>
                    <div className="icon-line">
                    </div>
                    <ShadeFacMap/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트그늘막 시설물 목록",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={() => {
                            FaNavigate('/smart_shade/facility/1')
                        }}/>
                    </div>
                    <ShadeFacAllList/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header: "스마트그늘막 관리 수정이력",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={() => {
                            FaNavigate('/smart_shade/facility/2')
                        }}/>
                    </div>
                    <ShadeFacUpdateList/>
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


    ///스마트그늘막 1.시설물관리 목록
    const [facAllList, setFacAllList] = useState([]);

    const ShadeFacList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/list?code=5`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacAllList(res.data);
        })
    }
    //2. 관리 수정이력
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
        await fetch(`/api/fac/recordList?code=5`, {
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
    const [AddShadeLng, setAddShadeLng] = useState(0); //경도
    const [AddShadeLat, setAddShadeLat] = useState(0); //위도

    const ShadeFacNewSubmit = async () => {
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
                fl_lng: AddShadeLng,
                fl_lat: AddShadeLat,
                fl_category: 5
            })
        })
        setAddCode('');
        setAddName('');
        setAddShadeLng(0);
        setAddShadeLat(0);
        ShadeFacList();
        FacCheckList();
    }


    //시설물수정 아이디값 가져오기
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [ShadeLng, setShadeLng] = useState(0); //경도
    const [ShadeLat, setShadeLat] = useState(0); //위도

    const [UpdateId, setUpdateId] = useState(0);

    const GetEditFacId = async (id) => {
        for (let list of facAllList) {
            if (list.fl_idx === id) {
                setCode(list.fl_code);
                setName(list.fl_name);
                setShadeLng(list.fl_lng);
                setShadeLat(list.fl_lat);
            }
        }
        setUpdateId(id);
    }


    //4. 시설물수정
    const ShadeUpdateSubmit = async () => {
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
                        fl_lng: ShadeLng,
                        fl_lat: ShadeLat,
                        fl_category: 5
                    })
                })
            }
        }
        setCode('');
        setName('');
        setShadeLng(0);
        setShadeLat(0);
        ShadeFacList();
        FacCheckList();
    }

    //5. 시설물데이터 삭제
    const ShadeFacDelete = async () => {
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
        ShadeFacList();
        FacCheckList();
    }


    return (
        <ShadeContext.Provider value={{

            rowNum, setRowNum,
            onOff, setOnOff,
            shadeOffOnControlSubmit,


            shadeList, setShadeList,
            ShadeGetList,
            mapOnClick, setMapOnClick,
            loading, setLoading,

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


            //시설물조회
            ShadeFacList,
            facAllList, setFacAllList,
            //시설물 수정이력
            FacCheckList,
            facRecordList, setFacRecordList,


            //횡단보도 시설추가
            AddCode, setAddCode,
            AddName, setAddName,
            AddShadeLng, setAddShadeLng,
            AddShadeLat, setAddShadeLat,
            ShadeFacNewSubmit,
            GetEditFacId,

            //시설물 수정
            code, setCode,
            name, setName,
            ShadeLng, setShadeLng,
            ShadeLat, setShadeLat,
            ShadeUpdateSubmit,

            //시설물삭제
            ShadeFacDelete


        }}>
            {children}
        </ShadeContext.Provider>
    )
}