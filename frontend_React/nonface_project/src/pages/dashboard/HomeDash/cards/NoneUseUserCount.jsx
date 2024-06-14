
//미활성 사용자 수
import photo from "../../../../assets/img/nonUser.svg";
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

function NoneUseUserCount(){
    const {checkClientList, clientCheck,clientUse} = useContext(DashboardContext);
    return(
        <div>
            <div className="dashboard-allUse">
                <img src={photo}/>
            </div>
            <div className="dashboard-allUse2">
                <h1>당일 :

                    {
                        clientCheck === '' ? <strong> {clientUse[0]?.inactiveUserCnt} </strong> : <strong>  {checkClientList[0]?.inactiveUserCnt} </strong>
                    }

                    명</h1>
            </div>
        </div>
    )
}
export default NoneUseUserCount;