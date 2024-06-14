import * as React from "react";
import {FiUsers} from "react-icons/fi";
import {FcFolder, FcNext} from "react-icons/fc";
import {useContext, useEffect, useState} from "react";
import GroupUseBoardList from "./section/GroupUseBoardList.jsx";
import GroupUseChart from "./section/GroupUseChart.jsx";
import {GroupContext} from "../../../api/all/GroupContext.jsx";

function GroupMakeUseList() {
    const [hover, setHover] = useState(true);
    const {groupListGetOnSubmit, groupList, groupSelect, setGroupSelect,} = useContext(GroupContext);
    useEffect(() => {
        groupListGetOnSubmit();
    }, []);

    return (
        <div>
            <div className="dashboard">
                <div className="customer-head">
                    <div className="customer-head-icon">
                        <FiUsers style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                    </div>
                    <div className="customer-head-p">
                        <span>조직별 활용 내역</span>
                    </div>
                </div>

                <div className="customer-group-content">
                    <div className="total-group-folder">
                        <h2><FcNext/> 조직도</h2>
                    </div>
                    <div className="make-group-folder">
                        <p onClick={() => setHover(!hover)}><FcFolder className="folder-icon"/>전국 </p>
                        {
                            hover === true ? <div>
                                {groupList.map((data) => (
                                    <>
                                        <span key={data} onClick={()=>{
                                            setGroupSelect(data.clnt_org_id);
                                        }}><FcFolder className="folder-icon"/> {data.clnt_org_id}</span>
                                        <br/>
                                    </>
                                ))}
                            </div> : null
                        }

                    </div>
                </div>
                <div className="customer-group-content2">
                    <div className="customer-group-board1">
                        <GroupUseBoardList/>
                    </div>
                    <div className="customer-group-board2">
                        <GroupUseChart/>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default GroupMakeUseList;