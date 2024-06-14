import {createContext, useState} from "react";

export const DisplayResize = createContext({});

//디스플레이 사이즈/순서 수정 받아오는 API
export const DisplayProvider = ({children}) => {

    //1. 대기 환경 리스트
    const [resizeList, setResizeList] = useState([]);
    const ResizingDataOnSubmit = async () => {
        await fetch(`/api/layout/list/control`, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setResizeList(res.data);
        })
    }



    //1. 대기환경 순서변경
    const updateResize = [...resizeList];
    const ResizingNumberUpdate = async () => {
        await fetch(`/api/layout/update/control`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify(resizeList)
        }).then(res => res.json())
        ResizingDataOnSubmit();
    }

    //2. 셀렉트 박스별 대기 순서
    const [sensorList, setSensorList] = useState([]);
    const SensorDataGetOnSubmit = async () => {
        await fetch(`/api/layout/sensorList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setSensorList(res.data);
        })
    }


    //2-1. 센서값이 true인것만 필터
    const sensorFilter = sensorList.filter((data) => data.state === 'true');


    //3.셀렉트 대기 순서 변경
    const updateSensor = [...sensorFilter];

    //3-1 대기환경 순서 업데이트
    const UpdateSensorOnsubmit = async () => {
        await fetch(`/api/layout/updateList`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify(updateSensor)
        }).then(res => res.json())
        SensorDataGetOnSubmit();
    }



    //미리보기 모달 이벤트
    const [previewOpen, setPreviewOpen] = useState(false);
    const handlePreviewOpen = () => setPreviewOpen(true);
    const handlePreviewClose = () => setPreviewOpen(false);

    const [resizeModal,setResizeModal]  = useState(false);



    return (
        <DisplayResize.Provider value={{
            ResizingDataOnSubmit, resizeList, setResizeList,
            updateResize,ResizingNumberUpdate,
            SensorDataGetOnSubmit, sensorList, sensorFilter,

            updateSensor,UpdateSensorOnsubmit,

            //미리보기 모달이벤트
            resizeModal,setResizeModal,
            previewOpen, setPreviewOpen,
            handlePreviewOpen,
            handlePreviewClose,

        }}>
            {children}
        </DisplayResize.Provider>
    )
}