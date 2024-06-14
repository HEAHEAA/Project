import {createContext, useContext, useState} from "react";
import {DateContext} from "../config/DateContext.jsx";
import dayjs from "dayjs";
import {Nows} from "../../utils/date-time.jsx";
export const NewsContext = createContext({});
export const NewsProvider = ({children}) => {
    const {
        value, setValue,
        date,setDate
    } = useContext(DateContext);

    const [newsCheck,setNewsCheck] = useState(false);
    const [newsWeek,setNewsWeek] = useState([]);
    //업계소식 주차 리스트
    const NewsWeeksData = async () => {
        await fetch(`/api/in/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setNewsWeek(res.data);
            setNewsCheck(false);
        })
    }

    //업계소식 전체리스트
    const NewsAllData = async () =>{
        await fetch(`/api/in/list/all`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setNewsWeek(res.data);
            setNewsCheck(true);
        })
    }

    //소식 등록
    const [newsValue,setNewsValue] = useState({
        in_content:"",
        in_link:"",
        start_week: localStorage.getItem('year-week')
    });

    const NewsWeekInsert = async () => {
        await fetch(`/api/in/insert`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                in_content:newsValue.in_content,
                in_link:newsValue.in_link,
                start_week: date
            })
        }).then(res =>res.json());
        NewsWeeksData();
        setNewsValue({
            in_content:"",
            in_link:"",
            start_week:""
        });
        setValue(dayjs(Nows));
    }

    //소식 수정
    const getEditNewsData = (id) => {
        for(let list of newsWeek){
            if(list.in_idx === id){
                setNewsValue({
                    in_idx: list.in_idx,
                    in_content:list.in_content,
                    in_link:list.in_link,
                    start_week: list.start_week
                })
            }
        }
    }

    const UpdateNewsData = async () => {
        await fetch(`/api/in/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                in_idx: newsValue.in_idx,
                in_content:newsValue.in_content,
                in_link:newsValue.in_link,
                start_week: date
            })
        }).then(res => res.json())
        NewsWeeksData();
        setNewsValue({
            in_content:"",
            in_link:"",
            start_week: ""
        });
        setValue(dayjs(Nows));
    }

    //업계소식 삭제
    const DeleteNewsData = async (target) => {
        await fetch(`/api/in/delete`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                in_idx : target
            })
        }).then(res => res.json())
        NewsWeeksData();
        setNewsValue({
            in_content:"",
            in_link:"",
            start_week: ""
        });
        setValue(dayjs(Nows));
    }
    return(
        <NewsContext.Provider value={{
            newsCheck,setNewsCheck,

            NewsWeeksData,
            newsWeek,setNewsWeek,
            NewsAllData,

            //업계소식 추가
            NewsWeekInsert,
            newsValue,setNewsValue,

            //업계소식 수정
            getEditNewsData,
            UpdateNewsData,

            //업계소식 삭제
            DeleteNewsData,


        }}>
            {children}
        </NewsContext.Provider>
    )
}
