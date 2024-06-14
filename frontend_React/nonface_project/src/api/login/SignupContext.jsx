import {createContext, useEffect, useState} from "react";

//회원가입 사용자 등록 하기
export const SignupContext = createContext({});
export const SignupProvider = ({children}) => {

    //3. 고객사 목록
    const [clientList, setClientList] = useState([]);
    const groupListGetOnSubmit = async () => {
        await fetch(`/api/client/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setClientList(res.data);
        })
    }


    // 현재 시간 계산하기
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 120 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
    const update = koreaNow.replaceAll('T', ' ');
    const nows = update.replaceAll('Z', ' ').substring(0, 19);

    const [clntUserId, setClntUserid] = useState(''); //아이디 중복 체크
    const [clntPwd, setClntPwd] = useState(''); //비밀번호
    const [clntPwdCheck, setClntPwdCheck] = useState(''); //비밀번호 확인 체크

    const [signUpValue, setSignupValue] = useState({
        clnt_user_id: '', //사용자 id
        clnt_org_id: '', //조직 id
        clnt_user_pwd: '', //사용자 pw
        clnt_user_name: '',  //사용자 이름
        clnt_user_type: '', //사용자 구분 (관리자/일반 관리자/일반 사용자)
        user_class_id: "1", //권한
        user_phone: '', // 전화번호
        user_email: '', //이메일
        user_info_cnst_date: nows, //이용약관
        user_active_enable: false, //회원가입 고정
        user_sleep_status: false, //회원가입 고정
        user_alarm_enable: false, //회원가입 고정
    })



    let clntName = [];
    for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].clnt_org_id === signUpValue.clnt_org_id) {
            clntName.push(clientList[i].clnt_org_name);
        }
    }


    //1. 회원가입하는 api
    const SignupUserSubmit = async () => {
        await fetch(`/api/user/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clnt_user_id: signUpValue.clnt_user_id, //사용자 id
                clnt_org_id: signUpValue.clnt_org_id, //조직 id
                clnt_user_pwd: signUpValue.clnt_user_pwd, //사용자 pw
                clnt_user_name: clntName[0],  //조직 이름
                clnt_user_type: signUpValue.clnt_user_type, //사용자 구분 (관리자/일반 관리자/일반 사용자)
                user_class_id: signUpValue.user_class_id, //권한
                user_phone: signUpValue.user_phone, // 전화번호
                user_email: signUpValue.user_email, //이메일
                user_info_cnst_date: nows, //이용약관
                user_active_enable: false, //회원가입 고정
                user_sleep_status: false, //회원가입 고정
                user_alarm_enable: false, //회원가입 고정
            })
        }).then(res => res.json())
        setSignupValue({
            clnt_user_id: "", //사용자 id
            clnt_org_id: "", //조직 id
            clnt_user_pwd: "", //사용자 pw
            clnt_user_name: clntName[0],  //조직 이름
            clnt_user_type: "", //사용자 구분 (관리자/일반 관리자/일반 사용자)
            user_class_id: "1", //권한
            user_phone: "", // 전화번호
            user_email: "", //이메일
            user_info_cnst_date: nows, //이용약관
            user_active_enable: false, //회원가입 고정
            user_sleep_status: false, //회원가입 고정
            user_alarm_enable: false, //회원가입 고정
        });
    }


    //2. 아이디 중복확인 api
    const [idCheck, setIdCheck] = useState(null);
    const MatchIdCheck = async () => {
        fetch(`/api/user/duplicate/${clntUserId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setIdCheck(res);
        })
    }


    return (
        <SignupContext.Provider value={{
            clntUserId, setClntUserid,
            signUpValue, setSignupValue,
            SignupUserSubmit,


            //아이디 중복체크
            idCheck, setIdCheck,
            MatchIdCheck,
            clntName,
            clntPwd, setClntPwd,
            clntPwdCheck, setClntPwdCheck,

            groupListGetOnSubmit,
            clientList,


        }}>
            {children}
        </SignupContext.Provider>
    )
}