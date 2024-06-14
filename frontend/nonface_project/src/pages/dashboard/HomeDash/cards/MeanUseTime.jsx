
//평균 황용시간
import photo from "../../../../assets/img/time.svg";
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

function MeanUseTime(){
    const {avgTimeList} = useContext(DashboardContext);

    //전일 날짜 구하기
    let date = [];
    for(let i = 0; i<avgTimeList.all_time_avg?.length; i++){
        date.push(avgTimeList.all_time_avg)
    }


    return(
        <div>
            <div className="dashboard-allUse">
                <img src={photo}/>
            </div>
            <div className="dashboard-allUse2">
                <h1>당일 : <strong>{avgTimeList.all_time_avg}</strong> 시간</h1>
                <p>전일  {date[0]}시간</p>
            </div>
        </div>
    )
}
export default MeanUseTime