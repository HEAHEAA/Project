import {useContext} from "react";
import {Switch} from "@mui/material";
import NoticePageAlarm from "./alarm/NoticePage-Alarm.jsx";
import NoticePageSchedule from "./schedule/NoticePage-Schedule.jsx";
import {NoticeContext} from "../../context/notice/NoticeContext.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";

function NoticePageLayout() {
    const {noticeDataCheck, setNoticeDataCheck} = useContext(NoticeContext);

    const handleSwitchChange = (e) => {
        setNoticeDataCheck(!noticeDataCheck);
    }

    return (
        <div>
            <FormControlLabel
                className="all-label-btn"
                control={<Switch
                    checked={noticeDataCheck}
                    onChange={(e) => {
                        handleSwitchChange(e)
                    }}
                />}
                label="전체 목록 보기"
            />

            <div className="noticePage-layout">
                {
                    window.location.pathname === '/notice/alarm' ?
                        <NoticePageAlarm/> : (
                            window.location.pathname === '/notice/schedule' ?
                                <NoticePageSchedule/> : null
                        )
                }
            </div>
        </div>
    )
}

export default NoticePageLayout;
