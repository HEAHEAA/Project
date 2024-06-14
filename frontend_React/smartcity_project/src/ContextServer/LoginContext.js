import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const LoginContext = createContext({});

export const LoginProvider = ({children}) => {
    const [value, setValue] = useState({user_id: "", user_pwd: ""});
    const [access, setAccess] = useState(""); // access hook
    const [refresh, setRefresh] = useState(""); // refresh hook
    const [userAdmin, setUserAdmin] = useState([]);
    const [role, setRole] = useState([]);
    const [success, setSuccess] = useState(false);




    const navigate = useNavigate();
    // 유저 로그인 시도 && 아이디 비번 입력 -> server 넘기는 훅
    //인가인증 POST
    const LoginSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', value)
            .then((res) => {
                setAccess(res.data.data.auth_token.access_token);
                setRefresh(res.data.data.auth_token.refresh_token)
                setUserAdmin(res.data);

                if (res.data.success === false) {
                    return (
                        <div>
                            <p>아이디가 동일하지않습니다.</p>
                        </div>
                    )
                }
            });
    };


    useEffect(() => {
        if(userAdmin?.success === true){
            navigate('/main');
            localStorage.setItem("login", userAdmin.data.auth_token.access_token);
            localStorage.setItem("refresh", userAdmin.data.auth_token.refresh_token);
            localStorage.setItem('id', userAdmin.data.user_id);
        }
    }, [userAdmin]);




    //유저 리프레시 인증 토큰 발급
    const RefreshToken = async () => {
        let ref = null;
        if (refresh === '') {
            ref = localStorage.getItem('refresh')?.replaceAll('"', '')
        } else {
            ref = refresh;
        }
        await fetch(`/api/refresh`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "refresh_token": ref
            },
        }).then(res => res.json())
            .then((res) => {
                setAccess(res.data.access_token);
                setRole(res.data.roles);

                try {
                    if (res.success === true) {
                        localStorage.setItem('login', JSON.stringify(res.data.access_token));
                    } else {
                        alert('로그인을 다시 시도해주세요.')
                    }
                } catch (err) {
                    alert('로그인 기간이 만료 되었습니다.')
                    navigate("/");
                }
            })
    }

    // 30초마다 리프레시 인증받아옴
    useEffect(() => {
        const timer = setInterval(() => {
            RefreshToken();
        }, 300000);
        return () => clearInterval(timer);
    })


    //로그아웃 API
    const LogOut = () => {
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '');
        } else {
            ac = access
        }
        fetch(`/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                navigate('/')
            })
    }

    return (
        <LoginContext.Provider value={{
            value, setValue,
            access, setAccess,
            refresh, setRefresh,
            LoginSubmit, LogOut,
            RefreshToken,
            userAdmin, setUserAdmin,
            role, setRole,
            success, setSuccess,
        }}>
            {children}
        </LoginContext.Provider>
    )
}