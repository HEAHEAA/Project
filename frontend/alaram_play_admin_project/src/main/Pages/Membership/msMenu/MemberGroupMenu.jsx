import Button from "@mui/material/Button";
import { PiUsersThreeDuotone,PiUserFocusDuotone,PiUserSquareDuotone,PiUserMinusDuotone } from "react-icons/pi";
import {MemberContext} from "../../../../api/MemberShip/MemberContext.jsx";
import {useContext} from "react";

function MemberGroupMenu(){
   const {group, menuId,setMenuId} = useContext(MemberContext);
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