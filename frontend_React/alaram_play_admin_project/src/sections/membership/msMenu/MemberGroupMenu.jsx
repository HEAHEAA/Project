import Button from "@mui/material/Button";
import {PiUserFocusDuotone, PiUserMinusDuotone, PiUserSquareDuotone, PiUsersThreeDuotone} from "react-icons/pi";
import {MemberContext} from "../../../context/MemberContext.jsx";
import {useContext, useEffect} from "react";
function MemberGroupMenu(){
    const {
        group,
        menuId,
        setMenuId,
        signupOn,
        MemberListOnSubmit,
    } = useContext(MemberContext);

    useEffect(() => {
        MemberListOnSubmit();
    }, [signupOn]);
    return(
        <div>
            {
                group.map((arr,inx) => (
                    <div className="ms-group-menu" key={inx}>
                        <Button variant="contained" onClick={()=>{
                            setMenuId(inx);
                        }} className={menuId === inx ? 'ms-menu-buttonOn' : 'ms-menu-buttonOff'}>
                            {
                                arr === '전체회원' ? <PiUsersThreeDuotone className="ms-menu-icon"/>: (
                                    arr === '승인대기' ? <PiUserFocusDuotone className="ms-menu-icon"/>: (
                                        arr === '승인완료' ? <PiUserSquareDuotone  className="ms-menu-icon" />:(
                                            arr === '탈퇴회원' ? <PiUserMinusDuotone className="ms-menu-icon" />: null
                                        )
                                    )
                                )
                            }
                            {arr}
                        </Button>
                    </div>
                ))
            }
        </div>
    )
}
export default MemberGroupMenu;