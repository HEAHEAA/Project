import photo from '../../../../assets/img/all-people.svg';
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

//전체 사용자 수
function AllUserUseCount() {
    const {checkClientList, clientCheck,clientUse} = useContext(DashboardContext);

    return (
        <div>
            <div className="dashboard-allUse">
                <img src={photo}/>
            </div>
            <div className="dashboard-allUse2">
                <h1>당일 :
                        {
                            clientCheck === '' ? <strong> {clientUse[0]?.allUserCnt} </strong> : <strong>  {checkClientList[0]?.allUserCnt} </strong>
                        }
                    명</h1>

            </div>
        </div>
    )
}

export default AllUserUseCount;