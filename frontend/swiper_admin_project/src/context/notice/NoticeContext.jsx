import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {DateContext} from "../config/DateContext.jsx";
import dayjs from "dayjs";
import {Nows} from "../../utils/date-time.jsx";

export const NoticeContext = createContext({});
export const NoticeProvider = ({children}) => {
    const {setValue, date} = useContext(DateContext);

    //공지사항 데이터
    const [noticeWeek, setNoticeWeek] = useState([]);
    const [noticeDataCheck, setNoticeDataCheck] = useState(false);

    const NoticeWeekData = async () => {
        await fetch(`/api/no/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setNoticeWeek(res.data);
            setNoticeDataCheck(false);
        })
    }

    //공지사항 전체 데이터 확인
    const NoticeAllData = async () => {
        await fetch(`/api/no/list/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setNoticeWeek(res.data);
            setNoticeDataCheck(true);
        })
    }

    //1. 알림사항 2. 공지사항
    const noticeAlarmList = noticeWeek.filter((data) => data.notice_type === '1');
    const noticeDateList = noticeWeek.filter((data) => data.notice_type === '2');

    //공지사항 입력
    const [noticeData, setNoticeData] = useState({
        notice_type: "1",//1=공지사항 2=알림
        notice_content: "",
        start_week: localStorage.getItem('year-week')
    });

    const NoticeInsertData = async () => {
        await fetch(`/api/no/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                notice_type: noticeData.notice_type,
                notice_content: noticeData.notice_content,
                start_week: date
            })
        }).then(res => res.json())
        NoticeWeekData();
        //데이터 초기화
        setNoticeData({
            notice_type: "1",
            notice_content: "",
            start_week: ""
        });
        setValue(dayjs(Nows));
    };

    //공지사항 수정
    const getEditNoticeData = (id) => {
        for (let list of noticeWeek) {
            if (list.notice_idx === id) {
                setNoticeData({
                    notice_idx: list.notice_idx,
                    notice_type: list.notice_type,
                    notice_content: list.notice_content,
                    start_week: list.start_week,
                })
            }
        }
    }

    const UpdateNoticeData = async () => {
        await fetch(`/api/no/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                notice_idx: noticeData.notice_idx,
                notice_type: noticeData.notice_type,
                notice_content: noticeData.notice_content,
                start_week: date
            })
        }).then(res => res.json())
        NoticeWeekData();
        //데이터 초기화
        setNoticeData({
            notice_type: "1",
            notice_content: "",
            start_week: ""
        });
        setValue(dayjs(Nows));
    }

    //공지사항 삭제
    const DeleteNoticeData = async (id) => {
        await fetch(`/api/no/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                notice_idx: id
            })
        }).then(res => res.json())
        NoticeWeekData();
        //데이터 초기화
        setNoticeData({
            notice_type: "1",
            notice_content: "",
            start_week: ""
        });
        setValue(dayjs(Nows));
    }

    //공지사항 버튼 탭 state
    const [noticeBtn, setNoticeBtn] = useState(true);
    useCallback(() => {
        setNoticeBtn(true);
    }, []);

    return (
        <NoticeContext.Provider value={{
            //이번주 공지사항
            NoticeWeekData,
            noticeWeek, setNoticeWeek,
            noticeDataCheck, setNoticeDataCheck,

            NoticeAllData,

            //알림사항
            noticeAlarmList,
            //주요일정
            noticeDateList,

            //공지사항 번호
            noticeBtn, setNoticeBtn,

            //공지사항입력
            noticeData, setNoticeData,
            NoticeInsertData,

            //공지사항 수정
            getEditNoticeData,
            UpdateNoticeData,

            //공지사항 삭제
            DeleteNoticeData,
        }}>
            {children}
        </NoticeContext.Provider>
    )
}
