import {createContext, useContext, useEffect, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";
import {GroupContext} from "./GroupContext.jsx";

export const UserContext =  createContext({});
export const UserProvider = ({children}) => {
    const {RefreshToken} = useContext(LoginContext);
    const {groupList, groupSelect,} = useContext(GroupContext);

    //1. 조직도 - 사용자 목록 조회
    const [userLoading,setUserLoading] = useState(false);
    const [userList,setUserList] = useState([]);

    const userListGetOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/user/list`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setUserList(res.data);
        })
        setUserLoading(true);
    }



    //1.페이지 네이션 이벤트 10개씩
    const [page, setPage] = useState(1); //첫페이지
    const allPageCount = Math.ceil(userList.length / 20);
    const [data, setData] = useState([]);
    const lastPage = userList.length % 20 === 0 ? userList.length / 20 : userList.length / 20 + 1;  //마지막 페이지
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(userList.slice(20 * (page - 1)));
        } else {
            setData(userList.slice(20 * (page - 1), 20 * (page - 1) + 20));
        }
    }, [page,groupList,userList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    //2.페이지네이션 받은 데이터 select 검색
    let filterData = [];
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].clnt_org_id === groupSelect) {
            filterData.push(userList[i]);
        }
    }

    //1.페이지 네이션 이벤트 10개씩
    const [page01, setPage01] = useState(1); //첫페이지
    const allPageCount01 = Math.ceil(filterData.length / 20);
    const [data01, setData01] = useState([]);
    const lastPage01 =filterData.length % 20 === 0 ? filterData.length / 20 : filterData.length / 20 + 1;  //마지막 페이지
    useEffect(() => {
        if (page01 === lastPage01) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData01(filterData.slice(20 * (page01 - 1)));
        } else {
            setData01(filterData.slice(20 * (page01 - 1), 20 * (page01 - 1) + 20));
        }
    }, [page01,groupList,groupSelect]);

    const handlePage01 = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage01(nowPageInt);
    }




    //1-1. 체크값 불러오기


    //2. 체크값
    const [checkItem,setCheckItem] = useState([]);

    //2-1. 전체선택 (전체)
    const handleAllCheck = (checked) => {
        if(checked) {
            const idArray = [];
            data.forEach((el) => idArray.push(el.clnt_user_id));
            setCheckItem(idArray);
        }else {
            setCheckItem([]);
        }
    }

    //2-1. 전체선택 (셀렉트)
    const handleAllCheck01 = (checked) => {
        if(checked) {
            const idArray = [];
            data01.forEach((el) => idArray.push(el.clnt_user_id));
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



    //3. 사용자 pw 초기화
    //3-1. 체크값을 가져와서 반복문 돌린다.
    const PwResetDataOnSubmit = async () => {
        RefreshToken();
        for(let i = 0; i< checkItem.length; i++){
            await fetch(`/api/user/resetPw?user_id=${checkItem[i]}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login"),
                },
            }).then(res => res.json())
        }
        userListGetOnSubmit();
        setCheckItem([]);
        alert('※ pw 초기화 비밀번호 : 사용자ID + 전화번호 뒤 4자리 + !!')
    }



    //4. 휴먼해제 체크값 반복
    const SleepUserWakeUp = async () => {
        RefreshToken();
        for(let i =0; i<checkItem.length; i++){
            await fetch(`/api/user/sleep/${checkItem[i]}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login"),
                },
            }).then(res => res.json())
        }
        userListGetOnSubmit();
        setCheckItem([]);
        alert('해제가 완료 되었습니다.');
    }



    //5. 잠금해제 체크값 반복
    const CheckUserRock = async () => {
        RefreshToken();
        for(let i = 0; i<checkItem.length; i++){
            await fetch(`/api/user/delete/${checkItem[i]}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login"),
                },
            }).then(res => res.json())
        }
        userListGetOnSubmit();
        setCheckItem([]);
        alert('잠금이 완료 되었습니다.');
    }




    return(
        <UserContext.Provider value={{
            userListGetOnSubmit,
            userLoading,
            userList,setUserList,

            //리스트 페이지 네이션
            data,data01,allPageCount,allPageCount01,
            handlePage, handlePage01,


            //사용자 체크값
            checkItem,setCheckItem,
            handleAllCheck,
            handleAllCheck01,
            handleCheck,

            //pw 초기화하기
            PwResetDataOnSubmit,

            //휴먼해제
            SleepUserWakeUp,

            //잠금해제
            CheckUserRock,

        }}>
            {children}
        </UserContext.Provider>
    )
}