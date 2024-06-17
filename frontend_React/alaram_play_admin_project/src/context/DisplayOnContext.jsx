import {createContext, useContext, useEffect, useState} from "react";
import {NodeContext} from "./NodeContext.jsx";

export const DisplayOnContext = createContext({});
export const DisplayOnProvider = ({children}) => {
    const [intime,setIntime] = useState([]);

    const [inTimeValue,setInTimeValue] = useState({
        ontime:'',
        offtime: ''
    });

    const onOffTimeDataOnSubmit = async () => {
        await fetch(`/api/layout/foTime/${localStorage.getItem('node')}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
        }).then(res => res.json()).then(res => {
            setIntime(res.data);
            setInTimeValue({
                ontime:res.data.ontime,
                offtime: res.data.offtime
            })
        })
    }




    const UpdateInTime = async () => {
        await fetch(`/api/layout/updateFoTime/${localStorage.getItem('node')}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify(inTimeValue)
        }).then(res => res.json())
        onOffTimeDataOnSubmit();
    }



    return(
        <DisplayOnContext.Provider value={{
            onOffTimeDataOnSubmit,
            intime,setIntime,

            inTimeValue,setInTimeValue,
            UpdateInTime
        }}>
            {children}
        </DisplayOnContext.Provider>
    )
}
