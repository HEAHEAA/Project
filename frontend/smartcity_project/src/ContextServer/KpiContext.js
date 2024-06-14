import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";
import Kpi01 from "../Page/KPI/chart/Detail/Kpi01";
import Kpi02 from "../Page/KPI/chart/Detail/Kpi02";
import Kpi04 from "../Page/KPI/chart/Detail/Kpi04";
import Highcharts from "highcharts";
import KpiAdminEdit from "../Page/KPI/manage/Detail/KpiAdminEdit";
import KpiDataTable from "../Page/KPI/manage/Detail/KpiDataTable";

export const KpiContext = createContext({});

export const KpiProvider = ({children}) => {
    const {access, RefreshToken} = useContext(LoginContext);
    const [getData, setGetData] = useState([]); //범죄사고 Data
    const [heat, setHeat] = useState([]); //온열질환자 DATA
    const [kpiAllList, setKpiAllList] = useState([]); //kpi 전체 리스트

    const [category, setCategory] = useState(0); // 범죄사고 POST 통계치 넣어줄 카테고리 hook
    const [month, setMonth] = useState("");//범죄사고 post  월별 hook
    const [count, setCount] = useState(0); // 범죄사고 post 건수 hook


    //범죄 교통사고  GET API
    const getKPiAPI = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/kpi/ca`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setGetData(res.data);
            })
    }

//온열질환자 GET DATA
    const getHeat = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/kpi/heat`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setHeat(res.data);
            })
    }

    //KPi Post
    const PostKpi = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/kpi/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                category: category,
                kmonth: month,
                count: count
            })
        }).then((res) => res.json())
            .then((res) => {
                KpiList();
            })
    }


    const KpiList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/kpi/dataList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setKpiAllList(res.data)
        })
    }

    const d = new Date();
    const day = d.getDay();
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10))
    const [TempList, setTotalList] = useState([]);

    //정류장 실내/실외 미세먼지 통계조회
    const StationTempGet = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/report/monthly?cate=dust&sdate=2023-01-01&edate=${endDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setTotalList(res.data);
        })
    }


    const [shadeKpiList, setShadeKpiList] = useState([]);
    const StationShadeGet = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/report/monthly?cate=shade&sdate=2023-01-01&edate=${endDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setShadeKpiList(res.data);
        })
    }


    //1. 기간별 조회
    const [dateSurveyList, setDateSurveyList] = useState([]);
    const [sdate, setSdate] = useState(new Date(new Date().setDate(day - 1)).toISOString().slice(0, 10));
    const [edate, setEdate] = useState(new Date().toISOString().slice(0, 10).replaceAll('T', ' '));
    const DateSurveyDataOnSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/result?sdate=${sdate}&edate=${edate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setDateSurveyList(res.data);
        })
    }


    //타일

    const KpTile = [
        {widgetId: "1", col: 1, colSpan: 5, rowSpan: 3,},
        {widgetId: "2", col: 6, colSpan: 3, rowSpan: 6,},
        {widgetId: "3", col: 1, colSpan: 5, rowSpan: 3,}
    ];

    const getPositions08 = KpTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard08")) || KpTile
        );
    };

    const KpNavigate = useNavigate();
    const GoKpDetail01 = () => {
        KpNavigate('/kpi/1');
    }
    const GoKpDetail02 = () => {
        KpNavigate('/kpi/2');
    }
    const GoKpDetail04 = () => {
        KpNavigate('/kpi/4');
    }

    const KpConfig = [
        {
            id: "1",
            header: "KPI 통계분석",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoKpDetail01} className="tile-icon"/>
                    </div>
                    <Kpi01/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "KPI 군민만족도 조사 통계",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoKpDetail02} className="tile-icon"/>
                    </div>
                    <Kpi02/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header: "KPI 통계분석",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoKpDetail04} className="tile-icon"/>
                    </div>
                    <Kpi04/>
                </div>,
            active: true,
        },
    ];


    const [positions08, setPositions08] = useState(getPositions08(KpTile));
    const [widgets08, setWidgets08] = useState(KpConfig);


    const activeWidgets08 = useMemo(() => {
        return widgets08.reduce((acc, widget08) => {
            if (!widget08.active) return acc;
            acc.push(widget08);
            return acc;
        }, []);
    }, [widgets08]);

    const filteredPositions08 = useMemo(() => {
        return positions08.filter(positions08 => {
            return activeWidgets08.find(widget08 => widget08.id === positions08.widgetId)
                ?.active;
        });
    }, [activeWidgets08, positions08]);

    const handleReposition08 = e => {
        setPositions08(e.value);
        localStorage.setItem("dashboard08", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout08 = () => {
        setPositions08(KpTile);
        localStorage.setItem(
            "dashboard08",
            JSON.stringify(KpTile)
        );
    };

    const onToggleWidget08 = e => {
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets08 = widgets08.map(widget08 => {
            if (widget08.id === id) {
                return {
                    ...widget08,
                    active: value,
                };
            }
            return widget08;
        });
        setWidgets08(updatedWidgets08);
    }


    ///군민만족도 조사
    const [surveyList, setSurveyList] = useState([]);
    let falseFilter = surveyList.filter((datas) => datas.useyn === true);

    useEffect(() => {
        Survey();
    }, []);
    const Survey = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey?currentPage=1&currentElement=100000`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setSurveyList(res.data)
        })
    }




    //////KPI 편집관리 /// kpi/manage
    const KpMGTile = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 6,},
        {widgetId: "2", col: 5, colSpan: 4, rowSpan: 6,},
    ];

    const getPositions09 = KpTile => {
        return (
            JSON.parse(localStorage.getItem("dashboardMG")) || KpTile
        );
    };

    const KpMGConfig = [
        {
            id: "1",
            header: "KPI 사용자 편집",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={GoKpDetail04}/>
                    </div>
                    <KpiAdminEdit/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "KPI 통계 등록 리스트",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={()=>{
                            KpNavigate('/kpi/3');
                        }}/>
                    </div>
                    <KpiDataTable/>
                </div>,
            active: true,
        }
    ];


    const [positions09, setPositions09] = useState(getPositions09(KpMGTile));
    const [widgets09, setWidgets09] = useState(KpMGConfig);


    const activeWidgets09 = useMemo(() => {
        return widgets09.reduce((acc, widget09) => {
            if (!widget09.active) return acc;
            acc.push(widget09);
            return acc;
        }, []);
    }, [widgets09]);

    const filteredPositions09 = useMemo(() => {
        return positions09.filter(positions09 => {
            return activeWidgets09.find(widget09 => widget09.id === positions09.widgetId)
                ?.active;
        });
    }, [activeWidgets09, positions09]);

    const handleReposition09 = e => {
        setPositions09(e.value);
        localStorage.setItem("dashboardMG", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout09 = () => {
        setPositions09(KpMGTile);
        localStorage.setItem(
            "dashboardMG",
            JSON.stringify(KpMGTile)
        );
    };

    const onToggleWidget09 = e => {
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets09 = widgets09.map(widget09 => {
            if (widget09.id === id) {
                return {
                    ...widget09,
                    active: value,
                };
            }
            return widget09;
        });
        setWidgets09(updatedWidgets09);
    }


    const [editDetailPage,setEditDetailPage] = useState(false);

    return (
        <KpiContext.Provider value={{
            falseFilter,

            getData, setGetData,
            heat, setHeat,
            category, setCategory,
            month, setMonth,
            count, setCount,
            PostKpi,
            KpiList,
            kpiAllList, setKpiAllList,
            StationTempGet,
            TempList, setTotalList,
            StationShadeGet,
            shadeKpiList, setShadeKpiList,


            onResetLayout08,
            widgets08,
            onToggleWidget08,
            filteredPositions08,
            activeWidgets08,
            handleReposition08,
            getKPiAPI,
            getHeat,

            onResetLayout09,
            widgets09,
            onToggleWidget09,
            filteredPositions09,
            activeWidgets09,
            handleReposition09,


            positions08, setPositions08,


            dateSurveyList, setDateSurveyList,
            sdate, setSdate,
            edate, setEdate,
            DateSurveyDataOnSubmit,
            Survey,


            editDetailPage,setEditDetailPage,


        }}>
            {children}
        </KpiContext.Provider>
    )
}