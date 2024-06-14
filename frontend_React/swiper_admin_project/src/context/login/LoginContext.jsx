import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const LoginContext = createContext({});
export const LoginProvider = ({children}) => {
    const navigate = useNavigate();

    //로그인 정보
    const [loginValue, setLoginValue] = useState({user_id: "", user_pwd: ""});
    //로그인 받아온 정보
    const [login, setLogin] = useState([]);
    const [remember, setRemember] = useState(false);

    //로그인 전송
    const LoginOnSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', loginValue).then(res => {
            setLogin(res.data);
            if (res.data.success === false) {
                alert('로그인 실패')
            }
        });
    };

    useEffect(() => {
        if(localStorage.getItem('check') === 'true'){
            setLoginValue({
                user_id: localStorage.getItem('++'),
                user_pwd: localStorage.getItem('--')
            })
        }else {
            setLoginValue({
                user_id: '',
                user_pwd: ''
            })
        }
    }, []);

    //로그인 성공 -> 토큰 저장
    useEffect(() => {
        if (login?.success === true) {
            navigate('/dashboard');
            localStorage.setItem("login", login.data.auth_token.access_token);
            localStorage.setItem("refresh", login.data.auth_token.refresh_token);
            localStorage.setItem('user-role', login.data.user_role);
            if (remember === true) {
                localStorage.setItem('++', loginValue.user_id);
                localStorage.setItem('--', loginValue.user_pwd);
            }
        }
    }, [login]);

    //2. 로그아웃
    const LogoutOnSubmit = async () => {
        await fetch(`/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        })
        navigate('/');
        localStorage.removeItem('login');
        localStorage.removeItem('refresh');
        localStorage.removeItem('check');
        localStorage.removeItem('week');
        localStorage.removeItem('year-week');
        localStorage.removeItem('user-role')
    }

    return(
        <LoginContext.Provider value={{
            remember, setRemember,
            loginValue, setLoginValue,
            LoginOnSubmit,
            LogoutOnSubmit,
            login,
        }}>
            {children}
        </LoginContext.Provider>
    )
}
