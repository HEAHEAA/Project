import '../../style/notice/notice.css'
import {Foot} from "../_config/foot-logo";
import {useContext, useEffect, useState} from "react";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {PageContext} from "../../context/config/PageContext";
import {UiEditContext} from "../../context/all/UiEditContext";

function NoticePage() {
  const {alarmPage,setAlarmPage} = useContext(PageContext);
  const {noticeAlarmList, noticeDateList,} = useContext(NoticeContext);
  const {noticeEdit} = useContext(UiEditContext);



  //알람
  const [alarm,setAlarm] = useState([]);
  const lastPage = noticeAlarmList.length % 6 === 0 ? noticeAlarmList.length / 6 :noticeAlarmList.length / 6 + 1;
  useEffect(() => {
    if (alarmPage+1 === lastPage) {
      setAlarm(noticeAlarmList.slice(6 * (alarmPage - 1)));
    } else {
      setAlarm(noticeAlarmList.slice(6 * (alarmPage - 1), 6 * (alarmPage - 1) + 6));
    }
  }, [alarmPage]);


  //주요일정
  const [notice,setNotice] = useState(noticeDateList);
  const lastNoticePage = noticeDateList.length % 6 === 0 ? noticeDateList.length /6 : noticeDateList / 6 +1;

  useEffect(() => {
    if(alarmPage+1 === lastNoticePage){
      setNotice(noticeDateList.slice(6 * (alarmPage -1)));
    }else {
      setNotice(noticeDateList.slice(6 * (alarmPage - 1), 6 * (alarmPage - 1) + 6));
    }
  }, [alarmPage]);



  return (
        <div className="main-container">
            <div className="main-title">
                공지사항
            </div>

            <div className="notice-section">
                <section>알림 사항</section>

                <ul>
                  {
                    alarm.map((alarm) => (
                      <li key={alarm.notice_idx}>{alarm.notice_content}</li>
                    ))
                  }
                </ul>

            </div>

            <div className="notice-section">
                <section>금주 주요일정</section>

                <ul>
                  {
                    notice.map((alarm) => (
                      <li key={alarm.notice_idx}> {alarm.notice_content}</li>
                    ))
                  }
                </ul>

            </div>

          <Foot/>

        </div>
    )
}

export default NoticePage;
