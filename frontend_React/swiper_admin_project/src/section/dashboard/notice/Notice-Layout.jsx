import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useContext} from "react";
import NoticeSchedule from "./Notice-Schedule.jsx";
import NoticeAlarm from "./Notice-Alarm.jsx";
import {NoticeContext} from "../../../context/notice/NoticeContext.jsx";

function NoticeLayout() {
    const {noticeBtn, setNoticeBtn} = useContext(NoticeContext);

    return (
        <div className="dashboard-layout">
            <ButtonGroup size="large" aria-label="large button group">
                <Button
                    key="one"
                    variant={noticeBtn === true ? "contained" : "outlined"}
                    onClick={() => {
                        setNoticeBtn(true);
                    }}>알림사항</Button>
                <Button
                    key="two"
                    variant={noticeBtn === false ? "contained" : "outlined"}
                    onClick={() => {
                        setNoticeBtn(false);
                    }}>금주 주요일정</Button>
            </ButtonGroup>
            {
                noticeBtn === true ? <NoticeAlarm/> : <NoticeSchedule/>
            }
        </div>
    )
}

export default NoticeLayout;
