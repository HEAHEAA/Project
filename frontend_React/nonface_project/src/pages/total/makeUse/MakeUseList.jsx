import * as React from "react";
import {BiListPlus} from "react-icons/bi";
import CompanyList from "./section/CompanyList.jsx";
import UserDateUseList from "./section/UserDateUseList.jsx";
import DateUseList from "./section/DateUseList.jsx";
import {useContext, useEffect} from "react";
import {GroupContext} from "../../../api/all/GroupContext.jsx";

function MakeUseList() {
    const {groupListGetOnSubmit} = useContext(GroupContext);
    useEffect(() => {
        groupListGetOnSubmit();
    }, []);

    return (
        <div>
            <div className="dashboard">
                <div className="customer-head">
                    <div className="customer-head-icon">
                        <BiListPlus style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                    </div>
                    <div className="customer-head-p">
                        <span> 활용내역</span>
                    </div>
                </div>

                <div className="total-ml-content">
                    <section className="ml-section01">
                        {/*회사별 사용 현황*/}
                        <CompanyList/>
                    </section>

                    <section className="ml-section02">
                        {/*■ 사용자의 일별 사용 현황*/}
                        <UserDateUseList/>
                    </section>


                    <section className="ml-section03">
                        {/*■ 시간대 별 사용 현황*/}
                        <DateUseList/>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default MakeUseList;