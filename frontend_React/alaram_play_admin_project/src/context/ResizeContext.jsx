import {createContext, useState} from "react";

export const ResizeContext = createContext({});

export const ResizeProvider = ({children}) => {
    const [resizeList, setResizeList] = useState([]);
    const ResizingDataOnSubmit = async () => {
        await fetch(`/api/layout/list/${localStorage.getItem('node')}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
        }).then(res => res.json()).then(res => {
            setResizeList(res.data);
        })
    }


    const updateResize = [...resizeList];
    const ResizingNumberUpdate = async () => {
        await fetch(`/api/layout/update/${localStorage.getItem('node')}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify(resizeList)
        }).then(res => res.json())
        ResizingDataOnSubmit();
    }


    const [reSizeBoolean,setReSizeBoolean] = useState(false);


    //모달이벤트 -미리보기
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return(
        <ResizeContext.Provider value={{
            resizeList, setResizeList,
            ResizingDataOnSubmit,
            ResizingNumberUpdate,
            updateResize,

            reSizeBoolean,setReSizeBoolean,
            open, setOpen,
            handleOpen,
            handleClose
        }}>
            {children}
        </ResizeContext.Provider>
    )
}