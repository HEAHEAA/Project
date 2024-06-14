import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";
import Users01 from "../Page/Users/Detail/Users01";
import Users02 from "../Page/Users/Detail/Users02";
import Users03 from "../Page/Users/Detail/Users03";
import Highcharts from "highcharts";

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const {access, RefreshToken, role} = useContext(LoginContext);
    const [user, setUser] = useState([]); //사용자 목록 list
    const [userBtn, setUserBtn] = useState(0);
    const [oneDayUser, setOneDayUser] = useState([]); // 일일 사용자 로그

    //유저 권한 전체메뉴
    const [allMenu, setAllMenu] = useState([]);
    const [checkItem, setCheckItem] = useState([]);

    //사용자별 아이디값 받아오기
    const [userId, setUserId] = useState('');
    //수정아이디
    const [editUserId, setEditUserId] = useState('');
    //유저별 메뉴리스트
    const [userMenu, setUserMenu] = useState([]);


    //유저수정정보
    const [editId, setEditId] = useState('');
    const [userName, setUserName] = useState(''); //유저 이름
    const [userIds, setUserIds] = useState(''); //유저 아이디
    const [userPwd, setUserPwd] = useState(''); //유저 비밀번호
    const [classId, setClassId] = useState(0); //사용자구분
    const [userEmail, setUserEmail] = useState(''); //유저 이메일
    const [userPhone, setUserPhone] = useState(''); //유저 번화번호
    const [userStatus, setUserStatus] = useState(1); //1. 사용 2. 미사용


    //사용자 목록 리스트 GET API
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        userOnDayLog();
    }, []);


    const getUser = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/user/userList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setUser(res.data);
            })
    }


    const GetUserUpdateId = async (id) => {
        for (let list of user) {
            if (list.dt_op_user_id === id) {
                setUserName(list.user_name);
                setUserIds(list.user_id);
                setClassId(list.sys_op_user_class_id);
                setUserEmail(list.user_email);
                setUserPhone(list.user_phone);
                setUserStatus(list.user_status);
            }
        }
        setEditId(id);
    }


    //관리자 -> 사용자 승인여부 정보수정
    const UserUpdate = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/user/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                user_name: userName,
                user_pwd: userPwd,
                sys_op_user_class_id: classId,
                user_phone: userPhone,
                user_email: userEmail,
                user_status: userStatus,
                user_id: userIds,
            })
        }).then(res => res.json()).then(res => {
            setUserName('');
            setUserIds('');
            setUserPwd('');
            setClassId(0);
            setUserEmail('');
            setUserPhone('');
            setUserStatus(1);
        })
        getUser();
    }


    //금일 사용자 로그 확인 페이지
    const userOnDayLog = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        fetch(`/api/log/list/page`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => setOneDayUser(res.data))
    }


    // 권한부여 전체 메뉴 API
    const userAllMenu = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/menu-all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setAllMenu(res.data);
        })
    }


    //유저별 보여지고 있는 메뉴 리스트 데이터
    const AuthUserMenu = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/user/menu-list?user_id=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setUserMenu(res.data);
        })
    }

    //유저별 권한입력 insert
    const UserAuthCheckPost = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/user/insertPageAuth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify(postData)
        }).then(res => res.json()).then(res => {

        })
        AuthUserMenu();
    }


    //유저 아이디 받아오기
    const GetEditUserId = async (id) => {
        for (let list of user) {
            if (list.user_id === id) {
                setUserId(list.user_id);
            }
        }
        setEditUserId(id);
    }


    let station = false;
    let cw = false;
    let shade = false;
    let Light = false;
    let sun = false;
    let kpi = false;
    let users = false;



    //1 ~ 8 정류장
    //9 ~ 13 횡단보도
    // 14 ~ 16 그늘막
    // 17 ~ 19 보안등
    // 20 ~ 22 태양광
    // 23 kpi
    // 24 user

    checkItem.forEach((el, id) => {
        if (checkItem[id] === '1') {
            station = true;
        }
        if (checkItem[id] === '9') {
            cw = true;
        }
        if (checkItem[id] === '14') {
            shade = true;
        }
        if (checkItem[id] === '17') {
            Light = true;
        }
        if (checkItem[id] === '20') {
            sun = true;
        }
        if (checkItem[id] === '23') {
            users = true;
        }
        if (checkItem[id] === '24') {
            kpi = true;
        }
    });


    //1 ~ 8 정류장
    //9 ~ 13 횡단보도
    // 14 ~ 16 그늘막
    // 17 ~ 19 보안등
    // 20 ~ 22 태양광
    // 23 user
    // 24 kpi

    const postData = [
        //1-8 스마트정류장
        {
            menu_id: 1,
            menu_display: station,
            auth: role,
            user_id: userId
        },
        //정류장 현황판
        {
            menu_id: 2,
            menu_display: station,
            auth: role,
            user_id: userId
        },
        //정류장 모니터링
        {
            menu_id: 3,
            menu_display: station,
            auth: role,
            user_id: userId
        },
        // 정류장 제어관리
        {
            menu_id: 4,
            menu_display: station,
            auth: role,
            user_id: userId
        },
        // 정류장시설물관리
        {
            menu_id: 5,
            menu_display: station,
            auth: role,
            user_id: userId
        },
        // 정류장 시설물이력
        {
            menu_id: 6,
            menu_display: station,
            auth: role,
            user_id: userId
        },
        //DID관리
        {
            menu_id: 7,
            menu_display: station,
            auth: role,
            user_id: userId
        },

        //설문조사관리
        {
            menu_id: 8,
            menu_display: station,
            auth: role,
            user_id: userId
        },


        //9. 스마트횡단보도
        {
            menu_id: 9,
            menu_display: cw,
            auth: role,
            user_id: userId
        },
        //횡단보도 현황판
        {
            menu_id: 10,
            menu_display: cw,
            auth: role,
            user_id: userId
        },
        //횡단보도 모니터링
        {
            menu_id: 11,
            menu_display: cw,
            auth: role,
            user_id: userId
        },
        // 횡단보도 통계
        {
            menu_id: 12,
            menu_display: cw,
            auth: role,
            user_id: userId
        },


        // 횡단보도 시설물관리
        {
            menu_id: 13,
            menu_display: cw,
            auth: role,
            user_id: userId
        },



        // 스마트그늘막 모니터링
        {
            menu_id: 14,
            menu_display: shade,
            auth: role,
            user_id: userId
        },
        //스마트그늘막 시설물관리
        {
            menu_id: 15,
            menu_display: shade,
            auth: role,
            user_id: userId
        },

        // 16-18. 스마트 보안등
        {
            menu_id: 16,
            menu_display: shade,
            auth: role,
            user_id: userId
        },


        // 보안등 모니터링
        {
            menu_id: 17,
            menu_display: Light,
            auth: role,
            user_id: userId
        },
        //보안등 시설물관리
        {
            menu_id: 18,
            menu_display: Light,
            auth: role,
            user_id: userId
        },


        // 19-21. 태양광
        {
            menu_id: 19,
            menu_display: Light,
            auth: role,
            user_id: userId
        },


        // 태양광 모니터링
        {
            menu_id: 20,
            menu_display: sun,
            auth: role,
            user_id: userId
        },
        //태양광 시설물관리
        {
            menu_id: 21,
            menu_display: sun,
            auth: role,
            user_id: userId
        },
        // 22 태양광 시설물관리
        {
            menu_id: 22,
            menu_display: sun,
            auth: role,
            user_id: userId
        },
        // 23 유저관리
        {
            menu_id: 23,
            menu_display: users,
            auth: role,
            user_id: userId
        },
        // 24 kpi
        {
            menu_id: 24,
            menu_display: kpi,
            auth: role,
            user_id: userId
        },
    ]


    ////타일


    const UsTile = [
        {widgetId: "1", col: 1, colSpan: 8, rowSpan: 3,},
        {widgetId: "2", col: 1, colSpan: 4, rowSpan: 3,},
        {widgetId: "3", col: 5, colSpan: 4, rowSpan: 3,},
    ];

    const getPositions06 = UsTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard06")) || UsTile
        );
    };

    const UsNavigate = useNavigate();
    const GoUsDetail01 = () => {
        UsNavigate('/users/sub/1');
    }
    const GoUsDetail02 = () => {
        UsNavigate('/users/sub/2');
    }
    const GoUsDetail03 = () => {
        UsNavigate('/users/sub/3');
    }

    const UsConfig = [
        {
            id: "1",
            header: "사용자목록",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoUsDetail01} className="tile-icon"/>
                    </div>
                    <Users01/>
                </div>
            </div>,
            active: true,
        },

        {
            id: "2",
            header: "사용자 편집",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoUsDetail02} className="tile-icon"/>
                    </div>
                    <Users02/>
                </div>,
            active: true,
        },
        {
            id: "3",
            header: "사용자 로그",
            body:
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoUsDetail03} className="tile-icon"/>
                    </div>
                    <Users03/>

                </div>,
            active: true,
        },
    ];
    const [positions06, setPositions06] = useState(getPositions06(UsTile));
    const [widgets06, setWidgets06] = useState(UsConfig);


    const activeWidgets06 = useMemo(() => {
        return widgets06.reduce((acc, widget06) => {
            if (!widget06.active) return acc;
            acc.push(widget06);
            return acc;
        }, []);
    }, [widgets06]);

    const filteredPositions06 = useMemo(() => {
        return positions06.filter(positions06 => {
            return activeWidgets06.find(widget06 => widget06.id === positions06.widgetId)
                ?.active;
        });
    }, [activeWidgets06, positions06]);

    const handleReposition06 = e => {
        setPositions06(e.value);
        localStorage.setItem("dashboard06", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout06 = () => {
        setPositions06(UsTile);
        localStorage.setItem(
            "dashboard06",
            JSON.stringify(UsTile)
        );
    };

    const onToggleWidget06 = e => {
        setPositions06(UsTile);
        localStorage.setItem(
            "dashboard06",
            JSON.stringify(UsTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets06 = widgets06.map(widget06 => {
            if (widget06.id === id) {
                return {
                    ...widget06,
                    active: value,
                };
            }
            return widget06;
        });
        setWidgets06(updatedWidgets06);
    }


    return (
        <UserContext.Provider value={{
            user, setUser,
            oneDayUser, setOneDayUser,
            userBtn, setUserBtn,
            getUser,
            GetEditUserId,

            userAllMenu,
            allMenu, setAllMenu,
            checkItem, setCheckItem,
            UserAuthCheckPost,
            AuthUserMenu,
            userMenu, setUserMenu,
            userId, setUserId,


            GetUserUpdateId,
            editId, setEditId,
            userName, setUserName,
            userIds, setUserIds,
            userPwd, setUserPwd,
            classId, setClassId,
            userEmail, setUserEmail,
            userPhone, setUserPhone,
            userStatus, setUserStatus,
            UserUpdate,


            onResetLayout06,
            widgets06,
            onToggleWidget06,
            filteredPositions06,
            activeWidgets06,
            handleReposition06,
            userOnDayLog,
        }}>
            {children}
        </UserContext.Provider>
    )
}