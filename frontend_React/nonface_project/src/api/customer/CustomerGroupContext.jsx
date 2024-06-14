import {createContext, useContext, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";
import {GroupContext} from "../all/GroupContext.jsx";


//조직관리
export const CustomerGroupContext = createContext({});
export const CustomerGroupProvider = ({children}) => {
    const {groupList,groupListGetOnSubmit} = useContext(GroupContext);
    const {RefreshToken} = useContext(LoginContext);


    const [xpos,setXpos] = useState('');
    const [ypos,setYpos] = useState('');
    const [groupEditValue,setGroupEditValue] = useState({
        clnt_org_id: "",
        clnt_org_name: "",
        clnt_org_type: "",
        clnt_org_reg_date: "",
        app_install_cnt: 0,
        clnt_org_brno: "",
        notify_enabled: null,
        clnt_org_manager: "",
        clnt_org_contact: "",
        clnt_org_loc: "",
        clnt_org_loc_detail: " ",
        clnt_org_addr: "",
        clnt_org_road_addr: "",
        clnt_org_remarks: "",
        clnt_org_geom: "",
        clnt_org_control: null
    })
    //1. 수정값 가져오기
    const [editId,setEditId] = useState('');

    const GetGroupListEditId = async (id) => {
        for(let list of groupList){
            if(list.clnt_org_id === id) {
                setGroupEditValue({
                    clnt_org_id: list.clnt_org_id,
                    clnt_org_name: list.clnt_org_name,
                    clnt_org_type: list.clnt_org_type,
                    clnt_org_reg_date: list.clnt_org_reg_date,
                    app_install_cnt: list.app_install_cnt,
                    clnt_org_brno: list.clnt_org_brno,
                    notify_enabled: list.notify_enabled,
                    clnt_org_manager: list.clnt_org_manager,
                    clnt_org_contact: list.clnt_org_contact,
                    clnt_org_loc: list.clnt_org_loc,
                    clnt_org_loc_detail: list.clnt_org_loc_detail,
                    clnt_org_addr: list.clnt_org_addr,
                    clnt_org_road_addr: list.clnt_org_road_addr,
                    clnt_org_remarks: list.clnt_org_remarks,
                    clnt_org_geom: list.clnt_org_geom,
                    clnt_org_x_pos: list.clnt_org_x_pos,
                    clnt_org_y_pos: list.clnt_org_y_pos,
                    clnt_org_control: list.clnt_org_control
                })
                setXpos(list.clnt_org_x_pos);
                setYpos(list.clnt_org_y_pos);
            }
        }
        setEditId(id);
    }


    //2. 데이터 수정하기
    const [updateSuc,setUpdatesuc] = useState([]);
    const GroupEditDataOnSubmit = async () => {
        RefreshToken();
        await fetch(`api/client/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body : JSON.stringify({
                clnt_org_id: groupEditValue.clnt_org_id,
                clnt_org_name: groupEditValue.clnt_org_name,
                clnt_org_type: groupEditValue.clnt_org_type,
                clnt_org_reg_date: groupEditValue.clnt_org_reg_date,
                app_install_cnt: groupEditValue.app_install_cnt,
                clnt_org_brno: groupEditValue.clnt_org_brno,
                notify_enabled: groupEditValue.notify_enabled,
                clnt_org_manager: groupEditValue.clnt_org_manager,
                clnt_org_contact: groupEditValue.clnt_org_contact,
                clnt_org_loc: groupEditValue.clnt_org_loc,
                clnt_org_loc_detail: groupEditValue.clnt_org_loc_detail,
                clnt_org_addr: groupEditValue.clnt_org_addr,
                clnt_org_road_addr: groupEditValue.clnt_org_road_addr,
                clnt_org_remarks: groupEditValue.clnt_org_remarks,
                clnt_org_geom: groupEditValue.clnt_org_geom,
                clnt_org_x_pos: xpos,
                clnt_org_y_pos: ypos,
                clnt_org_control: groupEditValue.clnt_org_control
            })
        }).then(res => res.json()).then(res => {
            setUpdatesuc(res);
        })
        setYpos('');
        setXpos('');
        setGroupEditValue({
            clnt_org_id: "",
            clnt_org_name: "",
            clnt_org_type: "",
            clnt_org_reg_date: "",
            app_install_cnt: 0,
            clnt_org_brno: "",
            notify_enabled: null,
            clnt_org_manager: "",
            clnt_org_contact: "",
            clnt_org_loc: "",
            clnt_org_loc_detail: " ",
            clnt_org_addr: "",
            clnt_org_road_addr: "",
            clnt_org_remarks: "",
            clnt_org_geom: "",
            clnt_org_x_pos: "",
            clnt_org_y_pos: "",
            clnt_org_control: null
        });
        groupListGetOnSubmit();
    }


    //3. 그룹삭제
    const DeleteGroupOnsubmit = async () => {
        RefreshToken();
        await fetch(`/api/client/delete/${editId}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json())

    }

    console.log(editId);



    return(
        <CustomerGroupContext.Provider value={{
            GetGroupListEditId,
            groupEditValue,setGroupEditValue,
            GroupEditDataOnSubmit,

            //업데이트 suc
            updateSuc,

            xpos,setXpos,
            ypos,setYpos,


            //조직사 삭제
            DeleteGroupOnsubmit,
        }}>
            {children}
        </CustomerGroupContext.Provider>
    )
}