import {createContext, useContext, useEffect, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";

//앱 설치 현황
export const AppContext = createContext({});
export const AppProvider = ({children}) => {
    const {RefreshToken} = useContext(LoginContext);
    //1. 앱 설치 현황 데이터 리스트
    const [appList,setAppList] = useState([]);

    const AppListGetOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/app/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setAppList(res.data)
        })
    }


    //1.페이지 네이션 이벤트 10개씩
    const [page, setPage] = useState(1); //첫페이지
    const [data, setData] = useState([]);
    const allPage = Math.ceil(appList.length / 15);
    const lastPage = appList.length % 15 === 0 ? appList.length / 15 : appList.length / 15 + 1;  //마지막 페이지
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(appList.slice(15 * (page - 1)));
        } else {
            setData(appList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, appList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    //2. 체크값
    const [checkItem,setCheckItem] = useState([]);

    //2-1. 전체선택
    const handleAllCheck = (checked) => {
        if(checked) {
            const idArray = [];
            data.forEach((el) => idArray.push(el.clnt_user_id));
            setCheckItem(idArray);
        }else {
            setCheckItem([]);
        }
    }
    //2-2. 단일 선택
    const handleCheck = (checked, id) => {
        if(checked) {
            setCheckItem(prev => [...prev, id]);
        }else {
            setCheckItem(checkItem.filter((el) => el !== id))
        }
    };



    //3. 유저 삭제하기
        //3-1. 유저 체크된 여러개 값을 받아서 반복문으로 돌려서 삭제
    const DeleteUserAppSubmit = async () => {
        RefreshToken();
        for(let i=0; i< checkItem.length; i++){
            await fetch(`/api/app/delete/${checkItem[i]}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login"),
                },
            }).then(res => res.json())
        }
        AppListGetOnSubmit();
        setCheckItem([]);
    }




    //2. 앱 이메일주소 등록
    const [usrEmail,setUsrEmail] = useState('');
    const EmailInsertOnsubmit = async () => {
        RefreshToken();
            await fetch(`/api/app/insert/${usrEmail}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login"),
                },
            }).then(res => res.json())
        setUsrEmail('');
        AppListGetOnSubmit();
    }



    return(
        <AppContext.Provider value={{
            //1. 데이터 리스트
            AppListGetOnSubmit,
            appList,

            //2. 데이터 선택
            handlePage, handleAllCheck, handleCheck,
            data, checkItem,setCheckItem,
            allPage,


            //3. 데이터 이메일
            usrEmail,setUsrEmail,
            EmailInsertOnsubmit,



            //4. 앱설치 유저 삭제
            DeleteUserAppSubmit,
        }}>
            {children}
        </AppContext.Provider>
    )
}