import {createContext, useState} from "react";

export const SurveyContext = createContext({});

export const SurveyProvider = ({children}) => {
    const [AllList, setAllList] = useState([]); //전체 설문조사 리스트 목록
    const [surveyNum,setSurveyNum] = useState(0);

    //설문조사 메인-전체 조회
    const AllListGetAPI = () => {
            fetch(`/nodeApi/survey?pageno=1&rowcount=1000`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((res) => {
                setAllList(res.result)
            })
    }

    const DeleteSurvey = async () => {
       await fetch(`/nodeApi/surveyDel`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sv_main_no: surveyNum
            })
        })
        AllListGetAPI();
    }



    return (
        <SurveyContext.Provider value={{
            AllList, setAllList,
            surveyNum,setSurveyNum,
            AllListGetAPI,
            DeleteSurvey,
        }}>
            {children}
        </SurveyContext.Provider>
    )
}