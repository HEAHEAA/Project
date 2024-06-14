import NoticePageLayout from "../../section/notice/NoticePage-Layout.jsx";
import '../../_style/notice/notice.css';
import {useContext, useEffect} from "react";
import {NoticeContext} from "../../context/notice/NoticeContext.jsx";
function NoticeAlarm() {
    const {
        NoticeAllData,
        NoticeWeekData,
        noticeDataCheck
    } = useContext(NoticeContext);

    useEffect(() => {
        if(noticeDataCheck === false){
            NoticeWeekData(); //주차 공지사항
        }else if( noticeDataCheck === true){
            NoticeAllData(); //전체 공지사항
        }
    }, [noticeDataCheck]);

    return (
        <div className="container">
            <h1>공지사항 (알림사항)</h1><br/><br/>

            <NoticePageLayout/>
        </div>
    )
}

export default NoticeAlarm;
