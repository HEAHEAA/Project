import {FootLogo} from "../display-config.jsx";
import {useContext, useEffect, useState} from "react";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";

function NoticeDisplay(){
    const {alarmPage,setAlarmPage} = useContext(DisplayContext);
    const {noticeAlarmList,noticeDateList} = useContext(NoticeContext);

    //알람 페이징
    const [alarm,setAlarm] = useState(noticeAlarmList);
    const lastPage = noticeAlarmList.length % 4 === 0 ? noticeAlarmList.length / 4 :noticeAlarmList.length / 4 + 1;

    useEffect(() => {
        if (alarmPage+1 === lastPage) {
            setAlarm(noticeAlarmList.slice(4 * (alarmPage - 1)));
        } else {
            setAlarm(noticeAlarmList.slice(4 * (alarmPage - 1), 4 * (alarmPage - 1) + 4));
        }
    }, [alarmPage]);

    //주요일정 페이지
    const [notice,setNotice] = useState(noticeDateList);
    const lastNoticePage = noticeDateList.length % 4 === 0 ? noticeDateList.length /4 : noticeDateList / 4 +1;

    useEffect(() => {
        if(alarmPage+1 === lastNoticePage){
            setNotice(noticeDateList.slice(4 * (alarmPage -1)));
        }else {
            setNotice(noticeDateList.slice(4 * (alarmPage - 1), 4 * (alarmPage - 1) + 4));
        }
    }, [alarmPage]);

    return(
        <div className="main-display-container">
            <div className="main-display-title">
                공지사항
            </div>

            <div className="notice-display-section">
                <section>알림 사항</section>
                <ul>
                    {
                        alarm.map((alarm) => (
                            <li key={alarm.notice_idx}>{alarm.notice_content}</li>
                        ))
                    }
                </ul>
            </div>

            <div className="notice-display-section">
                <section>금주 주요일정</section>
                <ul>
                    {
                        notice.map((alarm) => (
                            <li key={alarm.notice_idx}> {alarm.notice_content}</li>
                        ))
                    }
                </ul>
            </div>

            <FootLogo/>
        </div>
    )
}
export default NoticeDisplay;
