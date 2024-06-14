import {createContext, useEffect, useState} from "react";

export const NodeContext = createContext({});

export const NodeProvider = ({children}) => {
    //1. 전체지점 선택 리스트
    const [nodeList,setNodeList] = useState([]);
    const NodeGetOnSubmit = async () => {
        await fetch(`/api/node/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setNodeList(res.data);
        })
    }


    //2. 선택지점 리스트
    const [nodeSelectList, setNodeSelectList] = useState([]);
    const ResizingDataOnSubmitIs = async () => {
        await fetch(`/api/layout/sensorList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setNodeSelectList(res.data);
        })
    }

    let sensorUpdate = [...nodeSelectList];

    //2. 선택하기
    const OnSelectPlaceEdit = async () => {
        await fetch(`/api/layout/updateList`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify(sensorUpdate)
        }).then(res => res.json());
        ResizingDataOnSubmitIs();
    }



    useEffect(() => {
        SensorFicOncSubmit();
    }, [nodeSelectList]);

    //선택한 센서수치 데이터 리스트
    const [sensorFic,setSensorFic] = useState([]);
    const SensorFicOncSubmit = async () => {
        await fetch(`/api/node/data?idx=${nodeSelectList[0]?.id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then((res) => res.json()).then(res => {
            setSensorFic(res.data);
        })
    }

    return(
        <NodeContext.Provider value={{
            //지점선택
            NodeGetOnSubmit,
            nodeList,setNodeList,

            //2. 선택지점 리스트
            ResizingDataOnSubmitIs,

            //3. 지점선택하기
            sensorUpdate,
            nodeSelectList, setNodeSelectList,
            OnSelectPlaceEdit,



            SensorFicOncSubmit,
            sensorFic,setSensorFic,

        }}>
            {children}
        </NodeContext.Provider>
    )
}