import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

//로그인 context
export const LoginContext = createContext({});
export const LoginProvider = ({children}) => {
    const navigate = useNavigate();

    //1. 아이디 찾기 비동기 boolean
    const [findId, setFindId] = useState(false);
    //2. 로그인 정보
    const [loginValue, setLoginValue] = useState({clnt_user_id: "", clnt_user_pwd: ""});
    //3. 로그인 받아온 정보
    const [login, setLogin] = useState([]);
    const [refresh, setRefresh] = useState([]);
    const [suc, setSuc] = useState(false);


    //3-1. 회원이름 가져오기
    const [username, setUserName] = useState('');


    //4. 로그인 전송
    const LoginOnSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', loginValue).then((res) => {

            setLogin(res.data);
            setSuc(res.data.success);
            setUserName(res.data.data.clny_user_name);


            if (res.data.success === true) {

            } else {
                alert('로그인 실패')
            }
        });
    };


    //5. 로그인전송 시, 토큰 저장
    useEffect(() => {
        if (login?.success === true) {
            navigate('/home');
            localStorage.setItem("login", login.data.auth_token.access_token);
            localStorage.setItem("refresh", login.data.auth_token.refresh_token);
            setUserName(login.data.clny_user_name);
        }
    }, [login]);


    //6. 유저 리프레시 토큰 인증발급
    const RefreshToken = async () => {
        await fetch(`/api/refresh`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("refresh"),
            },
        }).then(res => res.json()).then(res => {
            setLogin(res.data);
        });
    };


    //7. 엑세스 토큰 만료시, 토큰 재생성
    useEffect(() => {
        if (localStorage.getItem("login") === null) {
            localStorage.setItem("login", refresh.access_token);
            setUserName(login.data.clnt_user_name);
        }
    }, [refresh]);

    //8. 기존만료시간 가로채고 주기적으로 리프레시 토큰 생성
    // 8-1. 엑세스토큰 만료시간 = 24시간 / 리프레시 반복시간 = 23시간
    useEffect(() => {
        RefreshToken();
        const timer = setInterval(() => {
            RefreshToken();
        }, 13800000);
        return () => clearInterval(timer);
    }, [suc]);


    return (
        <LoginContext.Provider value={{
            findId, setFindId,

            loginValue, setLoginValue,
            suc, setSuc,
            LoginOnSubmit,

            username,

            RefreshToken,
        }}>
            {children}
        </LoginContext.Provider>
    )
}