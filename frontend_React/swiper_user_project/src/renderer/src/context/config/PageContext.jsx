import {createContext, useState} from "react";

export const PageContext = createContext({});
export const PageProvider = ({children}) => {

  //공지사항 페이지
  const [alarmPage, setAlarmPage] = useState(0);
  //우수사원 페이지
  const [staffPage, setStaffPage] = useState(0);
  //시상식 페이지
  const [awardPage, setAwardPage] = useState(0);
  //입찰소식 페이지
  const [bidNewsPage, setBidNewsPage] = useState(0);
  //입찰예정 페이지
  const [bidYetPage, setBidYetPage] = useState(0);
  //낙찰예정
  const [bidStatePage, setBidStatePage] = useState(0);

  //업계소식
  const [newsPage, setNewsPage] = useState(0);
  //추천도서
  const [bookPage, setBookPage] = useState(0);

  const [groupNewsPage,setGroupNewsPage] = useState(0);

  return (
    <PageContext.Provider value={{
      alarmPage,setAlarmPage, //공지사항 알림사항
      staffPage,setStaffPage, // 우수사원
      awardPage,setAwardPage, //시상식
      bidNewsPage,setBidNewsPage, //입찰소식
      bidYetPage,setBidYetPage, //입찰예정
      bidStatePage,setBidStatePage, //낙찰예정
      newsPage,setNewsPage, //업계소식
      bookPage,setBookPage, //추천도서
      groupNewsPage,setGroupNewsPage //동해그룹뉴스 페이지
    }}>
      {children}
    </PageContext.Provider>
  )
}
