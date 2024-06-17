import '../../style/MemberShip/MemberShip.css';
import '../../style/MemberShip/MemberShipMedia.css';
import MemberGroupMenu from "./msMenu/MemberGroupMenu.jsx";
import MBSHeader from "./MeberShipContent/MBSHeader.jsx";
import {AllMemBer, MemberSignOff, MemberSignOn} from "./MeberShipContent/MBSTable.jsx";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {MemberContext} from "../../context/MemberContext.jsx";
function MemberShipPage() {
    const {group, menuId, MemberListOnSubmit,signupOn} = useContext(MemberContext);


    useEffect(() => {
        MemberListOnSubmit();
    }, []);
    useEffect(() => {
        MemberListOnSubmit();
    }, [signupOn]);


    return (
        <div className="membership-contanier">
            <div className="ms-menu">
                <MemberGroupMenu/>
            </div>
            <div className="ms-contanier">
                <MBSHeader/>
                <div className="mbs-Table">

                    {
                        group[menuId] === '전체회원' ? <AllMemBer/> : (
                            group[menuId] === '승인대기' ? <MemberSignOff/> : (
                                group[menuId] === '승인완료' ? <MemberSignOn/> : (
                                    group[menuId] === undefined ? <AllMemBer/> : null
                                )
                            )
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default MemberShipPage;