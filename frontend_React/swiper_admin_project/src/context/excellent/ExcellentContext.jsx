import {createContext, useCallback, useState} from "react";

export const ExcellentContext = createContext({});
export const ExcellentProvider = ({children}) => {
    const [exCheck,setExCheck] = useState(false);

    //금주 이번주 리스트
    const [exList,setExList] = useState([]);

    const ExcellentWeekList = async () => {
        await fetch(`/api/exmem/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setExList(res.data);
            setExCheck(false);
        })
    }

    //전체 우수사원 리스트
    const ExcellentAllList = async () => {
        await fetch(`/api/exmem/list/all`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setExList(res.data);
            setExCheck(true);
        })
    }

    //우수사원 시상식 버튼 탭 state
    const [elBtn, setElBtn] = useState(true);
    useCallback(() => {
        setElBtn(true);
    }, []);

    //시상식 리스트
    const [award,setAward] = useState([]);

    const AwardWeekList = async () => {
        await fetch(`/api/ea/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setAward(res.data);
            setExCheck(false);
        })
    }

    //시상식 전체 리스트
    const AwardAllList = async () => {
        await fetch(`/api/ea/list/all `,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setAward(res.data);
            setExCheck(true);
        })
    }

    return(
        <ExcellentContext.Provider value={{
            exCheck,setExCheck,
            //이번주 (?)이번달 우수사원
            exList,setExList,
            ExcellentWeekList,
            ExcellentAllList,

            elBtn, setElBtn,

            //이번달 시상식 이미지
            award,setAward,
            AwardWeekList,
            AwardAllList,
        }}>
            {children}
        </ExcellentContext.Provider>
    )
}
