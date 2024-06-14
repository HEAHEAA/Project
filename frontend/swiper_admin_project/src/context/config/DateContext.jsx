import {createContext, useEffect} from "react";
import dayjs from "dayjs";
import 'dayjs/locale/ko';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import {useState} from "react";
import {Nows} from "../../utils/date-time.jsx";

dayjs.extend(isBetweenPlugin);
dayjs.locale('ko');

export const DateContext = createContext({});
export const DateProvider = ({children}) => {
    const [hoveredDay, setHoveredDay] = useState(null);
    const [value, setValue] = useState(dayjs('2024-02-26'));

    let now = value.$d; //value 날짜
    const monthDay = now.toLocaleDateString(); //선택 날짜 yyyy-mm-dd
    let year = Nows.substring(0, 4); // yyyy
    let month = parseInt(monthDay.substring(6, 7)); // mm

    const days = value.$D; //주차 계산
    const firstDay = new Date(now.setDate(1)).getDay();
    const mathWeek = Math.ceil((days + firstDay) / 7);


    // 주 - 5주차로 나오면 1주차로 변경
    let math = mathWeek === 5 ? 1 : mathWeek

    //월 -> 주5주차가 되면 월 +1
    let fcMonth = mathWeek === 5 ? month+1 : month

    let [date, setDate] = useState(year + fcMonth + math);
    let [dateMonth, setDateMonth] = useState(year + fcMonth);

    useEffect(() => {
        setDate(year + fcMonth + math);
        setDateMonth(year + fcMonth);
        let weeks = localStorage.setItem('week', math);
        let yearWeeks = localStorage.setItem('year-week', year + fcMonth + math);
    }, [value]);


return (
    <DateContext.Provider value={{
        value, setValue,
        hoveredDay, setHoveredDay,
        date, setDate,
        dateMonth, setDateMonth,
    }}>
        {children}
    </DateContext.Provider>
)
}
