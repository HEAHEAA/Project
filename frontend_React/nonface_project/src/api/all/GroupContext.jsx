import {createContext, useContext, useEffect, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";

export const GroupContext = createContext({});
export const GroupProvider = ({children}) => {
    const {RefreshToken} = useContext(LoginContext);

    const [loading,setLoading] = useState(false);
    //1. 조직그룹 리스트
    const [groupList,setGroupList] = useState([]);

    const groupListGetOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/client/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setGroupList(res.data);
        })
        setLoading(true);
    }

    console.log(groupList);

    //2. 조직명 select 이벤트
    const [groupSelect,setGroupSelect] = useState('전체');
    const handleGroupSelect = (e) => {
        setGroupSelect(e.target.value);
    }

    useEffect(()=>{
        groupListGetOnSubmit();
    },[]);






    return(
        <GroupContext.Provider value={{
            //1. 조직그룹리스트
            groupListGetOnSubmit,
            groupList,setGroupList,

            //2. 조직명 select 이벤트
            groupSelect,setGroupSelect,
            handleGroupSelect,
        }}>
            {children}
        </GroupContext.Provider>
    )
}