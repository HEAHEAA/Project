import {useContext} from "react";
import {NoticeContext} from "../../../context/notice/NoticeContext.jsx";

function NoticeAlarm() {
    const {noticeAlarmList} = useContext(NoticeContext);

    return (
        <div>
            {
                noticeAlarmList.map((alarm) => (
                    <div className="notice-section" key={alarm.notice_idx}>
                        <small>{
                            alarm.start_week?.substring(0,4) + "년" +
                            alarm.start_week?.substring(4,5) + "월" +
                            alarm.start_week?.substring(5,6) + "주차"
                        }</small>
                        <br/>
                        <br/>
                        <strong>
                            {alarm.notice_content}
                        </strong>
                    </div>
                ))
            }
        </div>
    )
}

export default NoticeAlarm;
