import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";
import SL02 from "../Page/SecurityLight/Monitoring/Detail/SL02";
import SL01 from "../Page/SecurityLight/Monitoring/Detail/SL01";
import Highcharts from "highcharts";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";
import * as React from "react";
import SecurityFacMap from "../Page/SecurityLight/Facility/Map/SecurityFacMap";
import SecurityFacAllList from "../Page/SecurityLight/Facility/Detail/SecurityFacAllList";
import SecurityFacUpdateList from "../Page/SecurityLight/Facility/Detail/SecurityFacUpdateList";

export const SecurityLightContext = createContext({});
export const SecurityProvider = ({children}) => {
    const {access, RefreshToken} = useContext(LoginContext);
    const [btn01, setBtn01] = useState(true); //스마트보안등전체목록
    const [btn02, setBtn02] = useState(false); //유지보수신청
    const [btn03, setBtn03] = useState(false); //장비관리
    const [btn04, setBtn04] = useState(false); //디밍관리
    const [MoMap, setMoMap] = useState(true);

    const [num01, setNum01] = useState(0);
    const [num02, setNum02] = useState(0);
    const [num03, setNum03] = useState(0);

    const [mbTab, setMbTab] = useState(false);
    const [em, setEm] = useState(false);
    const [dm, setDm] = useState(false);
    const [dmIndex, setDmIndex] = useState(0);


    const [mapIdx, setMapIdx] = useState(0);
    const [Loading, setLoading] = useState(true);


    //디밍제어 입력
    const [addProId, setAddProId] = useState('');
    const [addProName, setAddProName] = useState('');
    const [AddGate, setAddGate] = useState('');
    const [AddSslc, setAddSslc] = useState(0);
    const [AddRepeater, setAddRepeater] = useState(0);
    const [AddPir, setAddPir] = useState('');

    const [AddCate, setAddCate] = useState('');
    const [AddBgn, setAddBgn] = useState('');
    const [AddDynamic, setAddDynamic] = useState(0);
    const [AddUser, setAddUser] = useState('');
    const [AddlightCnt, setAddLightCnt] = useState(0);
    const [AddLightMode, setAddLightMode] = useState(0);
    const [AddReport, setAddReport] = useState(0);

    //보안등전체목록
    const [LampList, setLampList] = useState([]);


    //임시 데이터 보내기용 변수
    const [val01, setVal01] = useState(0);
    const [val02, setVal02] = useState(0);
    const [val03, setVal03] = useState(0);
    const [val04, setVal04] = useState(0);
    const [val05, setVal05] = useState(0);
    const [val06, setVal06] = useState(0);
    const [val07, setVal07] = useState(0);
    const [val08, setVal08] = useState(0);
    const [val09, setVal09] = useState(0);
    const [val10, setVal10] = useState(0);
    const [val11, setVal11] = useState(0);
    const [val12, setVal12] = useState(0);
    const [val13, setVal13] = useState(0);
    const [val14, setVal14] = useState(0);
    const [val15, setVal15] = useState(0);
    const [val16, setVal16] = useState(0);
    const [val17, setVal17] = useState(0);
    const [val18, setVal18] = useState(0);
    const [val19, setVal19] = useState(0);
    const [val20, setVal20] = useState(0);
    const [val21, setVal21] = useState(0);
    const [val22, setVal22] = useState(0);
    const [val23, setVal23] = useState(0);
    const [val24, setVal24] = useState(0);

    const [vals01, setVals01] = useState(0);
    const [vals02, setVals02] = useState(0);
    const [vals03, setVals03] = useState(0);
    const [vals04, setVals04] = useState(0);
    const [vals05, setVals05] = useState(0);
    const [vals06, setVals06] = useState(0);
    const [vals07, setVals07] = useState(0);
    const [vals08, setVals08] = useState(0);
    const [vals09, setVals09] = useState(0);
    const [vals10, setVals10] = useState(0);
    const [vals11, setVals11] = useState(0);
    const [vals12, setVals12] = useState(0);
    const [vals13, setVals13] = useState(0);
    const [vals14, setVals14] = useState(0);
    const [vals15, setVals15] = useState(0);
    const [vals16, setVals16] = useState(0);
    const [vals17, setVals17] = useState(0);
    const [vals18, setVals18] = useState(0);
    const [vals19, setVals19] = useState(0);
    const [vals20, setVals20] = useState(0);
    const [vals21, setVals21] = useState(0);
    const [vals22, setVals22] = useState(0);
    const [vals23, setVals23] = useState(0);
    const [vals24, setVals24] = useState(0);




    //디밍제어 수정폼

    //스마트보안등 전체 목록 리스트 GET
    const GetLampData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/strLamp/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setLampList(res.data);
            setLoading(false);
        })
    }


    ///스마트보안등 디밍장비 리스트
    const [getSysList, setGetSysList] = useState([]);
    const [ProfileId, setProfileId] = useState('');
    const [ProfileName, setProfileName] = useState('');
    const [gateWay, setGateWay] = useState(0);
    const [sslc, setSslc] = useState(0);
    const [repeater, setRepeater] = useState(0);
    const [use, setUse] = useState(1);
    const [pir, setPir] = useState(0);
    const [settings, setSettings] = useState([]);

    const getData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/strLamp/em/select`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json())
            .then(res => {
                setGetSysList(res.data);
                setLoading(false);
            });

    }



    //데이터 추가
    const AddEMData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/strLamp/em/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                slem_profile_id: addProId,
                slem_profile_name: addProName,
                slem_gateway: AddGate,
                slem_sslc: AddSslc,
                slem_repeater: AddRepeater,
                slem_use: "1",
                slem_pir_hold: AddPir,
                settings: [
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                ]
            })
        })
        setProfileId('');
        setProfileName('');
        setGateWay(0);
        setSslc(0);
        setRepeater(0);
        setPir(0);

        getData();
    }


    //장비관리 수정
    const [editId, setEditId] = useState('');

    const GetEditId = async (id) => {
        for (let list of getSysList) {
            if (list.slem_idx === id) {

                setProfileId(list.slem_profile_id);
                setProfileName(list.slem_profile_name);
                setGateWay(list.slem_gateway);
                setSslc(list.slem_sslc);
                setRepeater(list.slem_repeater);
                setUse(list.slem_use);
                setSettings(list.settings)

                setVal01(list.settings["0"] && settings[0][0]);
                setVal02(list.settings["0"] && settings[0][2]);
                setVal03(list.settings["0"] && settings[0][4]);
                setVal04(list.settings["0"] && settings[0][6]);
                setVal05(list.settings["0"] && settings[0][8]);
                setVal06(list.settings["0"] && settings[0][10]);
                setVal07(list.settings["0"] && settings[0][12]);
                setVal08(list.settings["0"] && settings[0][14]);
                setVal09(list.settings["0"] && settings[0][16]);
                setVal10(list.settings["0"] && settings[0][18]);
                setVal11(list.settings["0"] && settings[0][20]);
                setVal12(list.settings["0"] && settings[0][22]);

                setVal13(list.settings["1"] && settings[1][0]);
                setVal14(list.settings["1"] && settings[1][2]);
                setVal15(list.settings["1"] && settings[1][4]);
                setVal16(list.settings["1"] && settings[1][6]);
                setVal17(list.settings["1"] && settings[1][8]);
                setVal18(list.settings["1"] && settings[1][10]);
                setVal19(list.settings["1"] && settings[1][12]);
                setVal20(list.settings["1"] && settings[1][14]);
                setVal21(list.settings["1"] && settings[1][16]);
                setVal22(list.settings["1"] && settings[1][18]);
                setVal23(list.settings["1"] && settings[1][20]);
                setVal24(list.settings["1"] && settings[1][22]);

                setVals01(list.settings[0] && settings[0][1]);
                setVals02(list.settings[0] && settings[0][3]);
                setVals03(list.settings[0] && settings[0][5]);
                setVals04(list.settings[0] && settings[0][7]);
                setVals05(list.settings[0] && settings[0][9]);
                setVals06(list.settings[0] && settings[0][11]);
                setVals07(list.settings[0] && settings[0][13]);
                setVals08(list.settings[0] && settings[0][15]);
                setVals09(list.settings[0] && settings[0][17]);
                setVals10(list.settings[0] && settings[0][19]);
                setVals11(list.settings[0] && settings[0][21]);
                setVals12(list.settings[0] && settings[0][23]);


                setVals13(list.settings["1"] && settings[1][1]);
                setVals14(list.settings["1"] && settings[1][3]);
                setVals15(list.settings["1"] && settings[1][5]);
                setVals16(list.settings["1"] && settings[1][7]);
                setVals17(list.settings["1"] && settings[1][9]);
                setVals18(list.settings["1"] && settings[1][11]);
                setVals19(list.settings["1"] && settings[1][13]);
                setVals20(list.settings["1"] && settings[1][15]);
                setVals21(list.settings["1"] && settings[1][17]);
                setVals22(list.settings["1"] && settings[1][19]);
                setVals23(list.settings["1"] && settings[1][21]);
                setVals24(list.settings["1"] && settings[1][23]);
            }
        }
        setEditId(id);
    }



    const EditEMData = async () => {
        for (let list of getSysList) {
            if (list.slem_idx === editId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/strLamp/em/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        slem_idx: list.slem_idx,
                        slem_profile_id: ProfileId,
                        slem_profile_name: ProfileName,
                        slem_gateway: gateWay,
                        slem_sslc: sslc,
                        slem_repeater: repeater,
                        slem_use: 1,
                        settings: [
                            [val01, vals01],
                            [val02, vals02],
                            [val03, vals03],
                            [val04, vals04],
                            [val05, vals05],
                            [val06, vals06],
                            [val07, vals07],
                            [val08, vals08],
                            [val09, vals09],
                            [val10, vals10],
                            [val11, vals11],
                            [val12, vals12],
                            [val13, vals13],
                            [val14, vals14],
                            [val15, vals15],
                            [val16, vals16],
                            [val17, vals17],
                            [val18, vals18],
                            [val19, vals19],
                            [val20, vals20],
                            [val21, vals21],
                            [val22, vals22],
                            [val23, vals23],
                            [val24, vals24]
                        ]
                    })
                }).then(res => res.json()).then(res => {
                })
            }
        }
        getData()
    }

    const Deletes = async () => {
        for (let list of getSysList) {
            if (list.slem_idx === editId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/strLamp/em/del`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        slem_idx: list.slem_idx
                    })
                })
            }
        }
        getData();
    }




    ///타일
    const SeTile = [
        {widgetId: "1", col: 1, colSpan: 1, rowSpan: 4,},
        {widgetId: "2", col: 2, colSpan: 4, rowSpan: 4,},
    ];

    const getPositions03 = SeTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard11")) || SeTile
        );
    };


    const SeConfig = [
        {
            id: "1",
            header: "스마트 보안등 시설물 목록",
            body: <div>
                <SL02/>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트 보안등 현황판",
            body: <div>
                <SL01/>
            </div>,
            active: true,
        }
    ]


    const [positions03, setPositions03] = useState(getPositions03(SeTile));
    const [widgets03, setWidgets03] = useState(SeConfig);


    const activeWidgets03 = useMemo(() => {
        return widgets03.reduce((acc, widget03) => {
            if (!widget03.active) return acc;
            acc.push(widget03);
            return acc;
        }, []);
    }, [widgets03]);

    const filteredPositions03 = useMemo(() => {
        return positions03.filter(positions03 => {
            return activeWidgets03.find(widget03 => widget03.id === positions03.widgetId)
                ?.active;
        });
    }, [activeWidgets03, positions03]);

    const handleReposition03 = e => {
        setPositions03(e.value);
        localStorage.setItem("dashboard11", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout03 = () => {
        setPositions03(SeTile);
        localStorage.setItem(
            "dashboard11",
            JSON.stringify(SeTile)
        );
    };

    const onToggleWidget03 = e => {
        setPositions03(SeTile);
        localStorage.setItem(
            "dashboard11",
            JSON.stringify(SeTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets03 = widgets03.map(widget03 => {
            if (widget03.id === id) {
                return {
                    ...widget03,
                    active: value,
                };
            }
            return widget03;
        });
        setWidgets03(updatedWidgets03);
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
            header: "스마트보안등 시설물정보",
            body: <div>
                <div>
                    <div className="icon-line">
                    </div>
                    <SecurityFacMap/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "스마트보안등 시설물 목록",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={() => {
                            FaNavigate('/securityLight/facility/1')
                        }}/>
                    </div>
                    <SecurityFacAllList/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header: "스마트보안등 관리 수정이력",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize className="tile-icon" onClick={() => {
                            FaNavigate('/securityLight/facility/2')
                        }}/>
                    </div>
                    <SecurityFacUpdateList/>
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


    ///////////스마트보안등 시설물조회////////////
    const [facAllList, setFacAllList] = useState([]);

    const SecurityFacList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/list?code=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacAllList(res.data);
        })
    }


    ///2. 시설물 수정이력조회
    const [facRecordList, setFacRecordList] = useState([]); // 이력조회리스트

    const SecurityUpdateList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/recordList?code=1`, {
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
    const [AddSecurityLng, setAddSecurityLng] = useState(0); //경도
    const [AddSecurityLat, setAddSecurityLat] = useState(0); //위도

    const SecurityFacNewSubmit = async () => {
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
                fl_lng: AddSecurityLng,
                fl_lat: AddSecurityLat,
                fl_category: 1
            })
        })
        setAddCode('');
        setAddName('');
        setAddSecurityLng(0);
        setAddSecurityLat(0);
        SecurityFacList();
        SecurityUpdateList();
    }

    //시설물수정 아이디값 가져오기
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [SecurityLng, setSecurityLng] = useState(0); //경도
    const [SecurityLat, setSecurityLat] = useState(0); //위도

    const [UpdateId, setUpdateId] = useState(0);

    const GetEditFacId = async (id) => {
        for (let list of facAllList) {
            if (list.fl_idx === id) {
                setCode(list.fl_code);
                setName(list.fl_name);
                setSecurityLng(list.fl_lng);
                setSecurityLat(list.fl_lat);



            }
        }
        setUpdateId(id);
    }


    //4. 시설물수정
    const SecurityUpdateSubmit = async () => {
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
                        fl_lng: SecurityLng,
                        fl_lat: SecurityLat,
                        fl_category: 1
                    })
                })
            }
        }
        setCode('');
        setName('');
        setSecurityLng(0);
        setSecurityLat(0);
        SecurityFacList();
        SecurityUpdateList();
    }


    //5. 시설물데이터 삭제
    const SecurityFacDelete = async () => {
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
        SecurityFacList();
        SecurityUpdateList();
    }

    let LampListArr = LampList.filter((arr,index,callback) =>
        index === callback.findIndex((lamp) => lamp.lamp_region === arr.lamp_region));

    const [region,setResion] = useState(0);
    const ResionOnSelect = (e) => {
        e.preventDefault();
        setResion(e.target.value);
    }

    let LampResionSameArr = [];
    for(let i = 0; i<LampList.length; i++){
        if(LampList[i].lamp_gateway === region){
            LampResionSameArr.push(LampList[i]);
        }
    }


    return (
        <SecurityLightContext.Provider value={{
            //
            region,setResion,
            LampListArr,
            ResionOnSelect,
            LampResionSameArr,




            //장비조회
            getSysList, setGetSysList,
            getData,


            //장비수정
            GetEditId,
            EditEMData,
            Deletes,
            ProfileId, setProfileId,
            ProfileName, setProfileName,
            gateWay, setGateWay,
            sslc, setSslc,
            repeater, setRepeater,
            use, setUse,
            pir, setPir,
            settings, setSettings,


            //장비추가
            AddEMData,


            //시설물조회
            facAllList, setFacAllList,
            SecurityFacList,

            //횡단보도 시설추가
            AddCode, setAddCode,
            AddName, setAddName,
            AddSecurityLng, setAddSecurityLng,
            AddSecurityLat, setAddSecurityLat,
            SecurityFacNewSubmit,
            GetEditFacId,

            //시설물 수정
            code, setCode,
            name, setName,
            SecurityLng, setSecurityLng,
            SecurityLat, setSecurityLat,
            SecurityUpdateSubmit,

            //시설물삭제
            SecurityFacDelete,


            btn01, setBtn01,
            btn02, setBtn02,
            btn03, setBtn03,
            btn04, setBtn04,
            MoMap, setMoMap,
            num01, setNum01,
            num02, setNum02,
            num03, setNum03,
            mbTab, setMbTab,
            em, setEm,
            dm, setDm,
            dmIndex, setDmIndex,



            addProId, setAddProId,
            addProName, setAddProName,
            AddGate, setAddGate,
            AddCate, setAddCate,
            AddBgn, setAddBgn,
            AddDynamic, setAddDynamic,
            AddUser, setAddUser,
            AddlightCnt, setAddLightCnt,
            AddLightMode, setAddLightMode,
            AddReport, setAddReport,
            AddSslc, setAddSslc,
            AddRepeater, setAddRepeater,
            AddPir, setAddPir,


            val01, setVal01,
            val02, setVal02,
            val03, setVal03,
            val04, setVal04,
            val05, setVal05,
            val06, setVal06,
            val07, setVal07,
            val08, setVal08,
            val09, setVal09,
            val10, setVal10,
            val11, setVal11,
            val12, setVal12,
            val13, setVal13,
            val14, setVal14,
            val15, setVal15,
            val16, setVal16,
            val17, setVal17,
            val18, setVal18,
            val19, setVal19,
            val20, setVal20,
            val21, setVal21,
            val22, setVal22,
            val23, setVal23,
            val24, setVal24,

            vals01, setVals01,
            vals02, setVals02,
            vals03, setVals03,
            vals04, setVals04,
            vals05, setVals05,
            vals06, setVals06,
            vals07, setVals07,
            vals08, setVals08,
            vals09, setVals09,
            vals10, setVals10,
            vals11, setVals11,
            vals12, setVals12,
            vals13, setVals13,
            vals14, setVals14,
            vals15, setVals15,
            vals16, setVals16,
            vals17, setVals17,
            vals18, setVals18,
            vals19, setVals19,
            vals20, setVals20,
            vals21, setVals21,
            vals22, setVals22,
            vals23, setVals23,
            vals24, setVals24,



            mapIdx, setMapIdx,
            LampList, setLampList,
            Loading, setLoading,

            widgets03,
            onResetLayout03,
            filteredPositions03,
            onToggleWidget03,
            activeWidgets03,
            handleReposition03,


            onResetLayout05,
            widgets05,
            onToggleWidget05,
            filteredPositions05,
            activeWidgets05,
            handleReposition05,


            //시설물이력조회
            SecurityUpdateList,
            facRecordList, setFacRecordList,

            GetLampData

        }}>
            {children}
        </SecurityLightContext.Provider>
    )
}

