export function WeekNumberByMonth(dateFormat) {
    //입력값
    const inputDate = new Date(dateFormat);

    // 년, 월
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;

    // 목요일 기준 주차 구하기
    const weekNumberByThurFnc = (paramDate) => {

        const year = paramDate.getFullYear();
        const month = paramDate.getMonth();
        const date = paramDate.getDate();

        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month+1, 0);
        const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
        const lastDayOfweek = lastDate.getDay();

        const lastDay = lastDate.getDate();

        const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;

        const lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

        const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

        let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);

        if(weekNo === 1 && firstWeekCheck) weekNo = 'prev';
        else if(weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
        else if(firstWeekCheck) weekNo = weekNo -1;

        return weekNo;
    };

    // 목요일 기준의 주차
    let weekNo = weekNumberByThurFnc(inputDate);

    // 이전달의 마지막 주차일 떄
    if(weekNo === 'prev') {
        // 이전 달의 마지막날
        const afterDate = new Date(year, month-1, 0);
        year = month === 1 ? year - 1 : year;
        month = month === 1 ? 12 : month - 1;
        weekNo = weekNumberByThurFnc(afterDate);
    }
    // 다음달의 첫 주차일 때
    if(weekNo === 'next') {
        year = month === 12 ? year + 1 : year;
        month = month === 12 ? 1 : month + 1;
        weekNo = 1;
    }

    return {year, month, weekNo};
}


export const WeekUtil = (dateFormat) => {


    return (
        <div>

        </div>
    )
}
