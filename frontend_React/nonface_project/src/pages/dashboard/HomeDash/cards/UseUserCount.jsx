
//활성 사용자수
import photo from "../../../../assets/img/useUser.svg";
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

function UseUserCount(){
    const {checkClientList, clientCheck} = useContext(DashboardContext);
    return(
        <div>
            <div className="dashboard-allUse">
                <img src={photo}/>
            </div>
            <div className="dashboard-allUse2">
                <h1>당일 :

                    {
                        clientCheck === '' ? <strong> - </strong> : <strong>  {checkClientList[0]?.activeUserCnt} </strong>
                    }

                    명</h1>
            </div>
        </div>
    )
}
export default UseUserCount;