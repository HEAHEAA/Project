import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AlarmContext = createContext({});

export const AlarmProvider = ({children}) => {
    const [alarmList, setAlarmList] = useState([]);

    const AlarmListGetOnSubmit = async () => {
        await fetch(`/api/sms/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setAlarmList(res.data);
        })
    }

    const [alarmSingleData, setAlarmSingleData] = useState({
        sms_info_idx: 0,
        sms_title: "",
        sms_content: "",
        sms_link: "",
        clnt_user_id: "",
        sms_transfer_time: "",
        sms_reg_date: ""
    });


    const GetEditIdAlarmData = async (id) => {
        for (let list of alarmList) {
            if (list.sms_info_idx === id) {
                setAlarmSingleData({
                    sms_info_idx: list.sms_info_idx,
                    sms_title: list.sms_title,
                    sms_content: list.sms_content,
                    sms_link: list.sms_link,
                    clnt_user_id: list.clnt_user_id,
                    sms_transfer_time: list.sms_transfer_time,
                })
            }
        }
    }


    const navigate = useNavigate();
    //Add
    const AddAlarmOnSubmit  =async () => {
        await fetch(`/api/sms/insert`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify({
                sms_title: alarmSingleData.sms_title,
                sms_content: alarmSingleData.sms_content,
                sms_link: alarmSingleData.sms_link,
                sms_transfer_time: alarmSingleData.sms_transfer_time?.replaceAll('T', ' ')
            })
        }).then(res => res.json());
        AlarmListGetOnSubmit();
        navigate('/system/alarm/list');
    }



    //update
    const EditAlarmOnSubmit = async () => {
        await fetch(`/api/sms/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify({
                sms_info_idx: alarmSingleData.sms_info_idx,
                sms_title:alarmSingleData.sms_title,
                sms_content : alarmSingleData.sms_content,
                sms_link:alarmSingleData.sms_link,
                sms_transfer_time:alarmSingleData.sms_transfer_time?.replaceAll('T', ' '),
                clnt_user_id:alarmSingleData.clnt_user_id,
            })
        }).then((res) => res.json());
        AlarmListGetOnSubmit();
    }


    return (
        <AlarmContext.Provider value={{
            AlarmListGetOnSubmit,
            alarmList, setAlarmList,

            GetEditIdAlarmData,
            alarmSingleData, setAlarmSingleData,


            //알람추가
            AddAlarmOnSubmit,
            //알람수정
            EditAlarmOnSubmit,
        }}>
            {children}
        </AlarmContext.Provider>
    )
}