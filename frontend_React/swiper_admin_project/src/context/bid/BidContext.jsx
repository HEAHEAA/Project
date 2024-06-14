import {createContext, useCallback, useState} from "react";
import axios from "axios";

export const BidContext = createContext({});
export const BidProvider = ({children}) => {
    const [bidAllCheck,setBidAllCheck] = useState(false);

    //주차 입찰 현황
    const [bidState,setBidState] = useState([]);
    const BidWeekState = async () => {
        await fetch(`/api/bid/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setBidState(res.data);
            setBidAllCheck(false);
        })
    }

    const AllState = async () => {
        await fetch(`/api/bid/list/all`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setBidState(res.data);
            setBidAllCheck(true);
        })
    }

    //주차 입찰 예정
    const [bidYet,setBidYet] = useState([]);
    const BidTodayYet = async () => {
        await fetch(`/api/bid/today`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setBidYet(res.data);
        })
    }

    //주차 낙찰 현활
    const [bidNews,setBidNews] = useState([]);
    const BidWeekNews = async () => {
        await fetch(`/api/sbid/list`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setBidNews(res.data);
            setBidAllCheck(false);
        })
    }

    //전체 낙찰 현황
    const AllNews = async () => {
        await fetch(`/api/sbid/list/all`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setBidNews(res.data);
            setBidAllCheck(true);
        })
    }

    //낙찰 엑셀등록
    const BidStateExcelOnSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        let files = e.target.bidStateExcel.files;
        let formData = new FormData();
        for(let i = 0; i<files.length; i++){
            formData.append("file", files[0]);
        }
        const post = await axios({
            method: "POST",
            url:"/api/sbid/upload",
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            data: formData,
        });
        BidWeekNews();
        BidWeekState();
        BidTodayYet();
    }

    //입찰 엑셀 등록
    const BidNewsExcelOnSubmit = async (e) => {
        e.preventDefault();
       e.persist();

       let files = e.target.bidNewsExcel.files;
       let formData = new FormData();
       for(let i = 0; i<files.length; i++){
           formData.append("file", files[0]);
       }

       const post = await axios({
           method: "POST",
           url:"/api/bid/upload",
           mode: "cors",
           headers: {
               "Content-Type": "multipart/form-data",
               Authorization: 'Bearer ' + localStorage.getItem("login")
           },
           data: formData,
       });
        BidWeekNews();
        BidWeekState();
        BidTodayYet();

    }

    //입찰&낙찰 페이지 버튼 이벤트
    const [bidBtn, setBidBtn] = useState(0);
    useCallback(() => {
        setBidBtn(0);
    }, []);

    //입낙찰 엑셀 등록 모달 이벤트
    const [excelOpen, setExcelOpen] = useState(false);
    const handleOpen = () => setExcelOpen(true);
    const handleClose = () => setExcelOpen(false);

    return(
        <BidContext.Provider value={{
            bidAllCheck,setBidAllCheck,
            //입찰 현황
            bidState,setBidState,
            BidWeekState,
            AllState,
            //입찰 예정
            bidYet,setBidYet,
            BidTodayYet,

            //낙찰 현황
            bidNews,setBidNews,
            BidWeekNews,
            AllNews,

            //낙찰 엑셀등록
            BidStateExcelOnSubmit,

            //입찰 엑셀등록
            BidNewsExcelOnSubmit,


            //버튼 이벤트
            bidBtn, setBidBtn,

            //add-엑셀 이벤트
            excelOpen, setExcelOpen,
            handleOpen,
            handleClose
        }}>
            {children}
        </BidContext.Provider>
    )
}
