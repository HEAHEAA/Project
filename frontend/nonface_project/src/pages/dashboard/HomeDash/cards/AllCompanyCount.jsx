
//전체 가입사 수
import photo from "../../../../assets/img/plus.svg";
import {useContext} from "react";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";

function AllCompanyCount(){
    const {AllClientCount} = useContext(DashboardContext);

    return(
        <div>
            <div className="dashboard-allUse">
                <img src={photo}/>
            </div>
            <div className="dashboard-allUse2">
                <h1>당일 : <strong>{AllClientCount.totalOrgs}</strong> 개 기관</h1>
            </div>
        </div>
    )
}
export default AllCompanyCount;