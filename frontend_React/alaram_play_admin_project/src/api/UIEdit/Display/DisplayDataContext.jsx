import {createContext, useEffect, useState} from "react";

export const DisplayDataContext = createContext({});

//대기 데이터 받아오는 API
export const DisplayDataProvider = ({children}) => {
    //1. 대기 환경지수
    const [gradeData,setGradeData] = useState([]);
    const GradeDataOnSubmit = async () => {
        await fetch(`/api/wdata`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setGradeData(res.data);
        })
    }


    let gradeList = [
        {
            id: 1,
            name: '미세먼지',
            data:gradeData[0]?.pm10Grade
        }, {
            id: 2,
            name: '초미세먼지',
            data:gradeData[0]?.pm25Grade
        }, {
            id: 1,
            name: '오존',
            data:gradeData[0]?.o3Grade
        },{
            id: 2,
            name: '통합대기환경지수',
            data:gradeData[0]?.khaiGrade
        }
    ]






    //2. 뉴스 데이터
    const [newsData,setNewsData] = useState([]);
    const NewsDataOnSubmit = async () => {
       await fetch(`/api/newsList`,{
            method: "GET",
           headers: {
               "Content-Type": "application/json",
               Authorization: 'Bearer ' + localStorage.getItem("login"),
           },
        }).then(res => res.json()).then(res => {
            setNewsData(res.data);
        })
    }

    //2-1 시정뉴스 추가하기
    const [newsContent,setNewsContent] = useState('');
    const AddNewOnSubmit = async () => {
        await fetch(`/api/news/insert`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify({
                news_content: newsContent
            })
        }).then(res => res.json());
        setNewsContent('');
        NewsDataOnSubmit();
        setUpdateBtn(false);
    }


    //2-2 뉴스내용 수정하기
    const [newsEditId,setNewsEditId] = useState(0);
    const [updateBtn,setUpdateBtn] = useState(false);
    const GetEditNewsId = async (id) => {
        for(let list of newsData){
            if(list.news_idx === id){
                setNewsContent(list.news_content);
            }
        }
        setNewsEditId(id);
    }

    const UpdateNewsOnSubmit = async () => {
        await fetch(`/api/news/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify({
                news_idx: newsEditId,
                news_content: newsContent
            })
        }).then(res => res.json());
        NewsDataOnSubmit();
        setNewsContent('');
        setUpdateBtn(false);
    }



    //2-4 뉴스내용 삭제하기
    const DeleteNewsOnSubmit = async (id) => {
        for(let list of newsData){
            if(list.news_idx === id){
                await fetch(`/api/news/delete`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + localStorage.getItem("login"),
                    },
                    body: JSON.stringify({
                        idx: list.news_idx
                    })
                }).then(res => res.json());

            }
        }
        NewsDataOnSubmit();
        setNewsContent('');
        setUpdateBtn(false);
    }





    return (
        <DisplayDataContext.Provider value={{
            //1. 물질데이터
            GradeDataOnSubmit,
            gradeData,setGradeData,


            //2. 뉴스데이터
            NewsDataOnSubmit,
            newsData,
            newsContent,setNewsContent,
            AddNewOnSubmit,
            GetEditNewsId,
            updateBtn,setUpdateBtn,
            UpdateNewsOnSubmit,
            DeleteNewsOnSubmit,

            gradeList,

        }}>
            {children}
        </DisplayDataContext.Provider>
    )
}