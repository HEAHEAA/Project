import {createContext, useState} from "react";
import ip from '../../../../../dist/path.json';

export const NoticeContext = createContext({});
export const NoticeProvider = ({children}) => {

  //공지사항 데이터
  const [noticeWeek,setNoticeWeek] = useState([]);

  const NoticeWeekData = async () => {
    await fetch(`${ip.ip}/api/no/list`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("login"),
      },
    }).then(res => res.json()).then(res => {
      setNoticeWeek(res.data);
    })
  }

  const noticeAlarmList = noticeWeek.filter((data) => data.notice_type === '1');
  const noticeDateList = noticeWeek.filter((data) => data.notice_type === '2');




  return(
    <NoticeContext.Provider value={{
      noticeWeek,setNoticeWeek,
      NoticeWeekData,

      noticeAlarmList,
      noticeDateList,

    }}>
      {children}
    </NoticeContext.Provider>
  )
}
