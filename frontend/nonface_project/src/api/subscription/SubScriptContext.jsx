import {createContext, useContext, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";


export const SubScriptContext = createContext({});
export const SubScriptProvider = ({children}) => {
    const {RefreshToken} = useContext(LoginContext);

    //1. 고객사 유형 리스트
    const [clntList,setClntList] = useState([]);
    const ClientListOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/category/orgType`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setClntList(res.data);
        })
    }

    //2. 관제 구분 리스트
    const [controlList,setControlList] = useState([]);
    const ControlListOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/category/orgControl`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setControlList(res.data);
        })
    }





    // 현재 시간 계산하기
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 120 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
    const update = koreaNow.replaceAll('T', ' ');
    const nows = update.replaceAll('Z', ' ').substring(0,19);


    //1. 고객사등록 양식
    const [alarm,setAlarm] = useState(true);
    const [groupValue,setGroupValue] = useState({
        clnt_org_id : "", // 고객사 아이디
        clnt_org_name : "", //고객사 이름
        clnt_org_type : "", //고객사 유형
        clnt_org_reg_date : '', //등록일
        app_install_cnt : "", // 앱 설치 가능 수
        clnt_org_brno: "", //사업장 번호
        notify_enabled : alarm, //시작종료 알림여부
        clnt_org_manager : "", // 조직담당자
        clnt_org_contact : "", //조직 연락처
        clnt_org_loc : "", //조직위치
        clnt_org_loc_detail : " ", //조직 상세주소
        clnt_org_addr : "", //지번 주소
        clnt_org_road_addr : "", //도로명주소
        clnt_org_remarks: "", //비고
        clnt_org_geom : "", //
        clnt_org_x_pos : "14146375.120561259",
        clnt_org_y_pos : "4503754.464954751",
        clnt_org_control : ""
    })



    //2. 고객사 등록하기
    const GroupInsertSubmit = async () => {
        RefreshToken();
        await fetch(`/api/client/insert` ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify(groupValue)
        }).then(res => res.json())

        setGroupValue({
            clnt_org_id : "", // 고객사 아이디
            clnt_org_name : "", //고객사 이름
            clnt_org_type : "", //고객사 유형
            clnt_org_reg_date : '', //등록일
            app_install_cnt : "", // 앱 설치 가능 수
            clnt_org_brno: "", //사업장 번호
            notify_enabled : false, //시작종료 알림여부
            clnt_org_manager : "", // 조직담당자
            clnt_org_contact : "", //조직 연락처
            clnt_org_loc : "", //조직위치
            clnt_org_loc_detail : " ", //조직 상세주소
            clnt_org_addr : "", //지번 주소
            clnt_org_road_addr : "", //도로명주소
            clnt_org_remarks: "", //비고
            clnt_org_geom : "", //
            clnt_org_x_pos : "14146375.120561259",
            clnt_org_y_pos : "4503754.464954751",
            clnt_org_control : ""
        })


    }

    //3. 아이디 중복 확인하기
    const [groupCheck,setGroupCheck] = useState(null);
    const [groupId,setGroupId] = useState(null);
    const GroupIdSameCheck = async () => {
        RefreshToken();
        await fetch(`/api/client/duplicate/${groupId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setGroupCheck(res);
        })
    }



    return(
        <SubScriptContext.Provider value={{
            //고객사 유형 조회
            ClientListOnSubmit,
            clntList,setClntList,

            //관제 유형 조회
            ControlListOnSubmit,
            controlList,setControlList,


            groupValue,setGroupValue,


            GroupIdSameCheck, //그룹아이디 체크
            groupId,setGroupId,
            groupCheck,
            alarm,setAlarm,

            //그룹생성
            GroupInsertSubmit
        }}>
            {children}
        </SubScriptContext.Provider>
    )
}