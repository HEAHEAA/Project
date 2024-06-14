import {createContext, useState} from "react";

//홈 대시보드 관제현황 context
export const HomeControlContext = createContext({});
export const HomeControlProvider = ({children}) => {
    //1. 멀티스크린 클릭 이벤트 요소를 위한 state
    //1.1. DashControl.jsx
    const [multiBtn,setMultiBtn] = useState(false);

    return(
        <HomeControlContext.Provider value={{
            multiBtn,setMultiBtn,

        }}>
            {children}
        </HomeControlContext.Provider>
    )
}