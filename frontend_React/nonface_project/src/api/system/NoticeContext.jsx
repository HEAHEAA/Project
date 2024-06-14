import {createContext, useContext, useEffect, useState} from "react";
import {LoginContext} from "../login/LoginContext.jsx";

export const NoticeContext = createContext({});
export const NoticeProvider = ({children}) => {
    const {RefreshToken} = useContext(LoginContext);


    const d = new Date();
    const day = d.getDate();
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(day - 1)).toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));


    //1. 공지사항 전체 리스트
    const [noticeList,setNoticeList] = useState([]);
    const NoticeGetOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/board/notice/listSearch?start=${startDate} 00:00&end=${endDate} 00:00`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setNoticeList(res.data)
        })
    }


    //1-2. 페이지 네이션 이벤트 10개씩
    const [page, setPage] = useState(1); //첫페이지
    const [data, setData] = useState([]);
    const lastPage = noticeList.length % 15 === 0 ? noticeList.length / 15 : noticeList.length / 15 + 1;  //마지막 페이지
    let allPage = Math.ceil(noticeList.length / 15);
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(noticeList.slice(15 * (page - 1)));
        } else {
            setData(noticeList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, noticeList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    //2. 공지사항 등록
    const [noticeValue,setNoticeValue] = useState({
        notice_title : "" ,
        notice_content : "" ,
        notice_start_date : "" ,
        notice_end_date : ""
    })

    const NoticeAddOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/board/notice/insert`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify(noticeValue)
        }).then(res => res.json())
        //초기값으로 변경
        setNoticeValue({
            notice_title : "" , //제목
            notice_content : "" ,  //내용
            notice_start_date : "" , //시작일
            notice_end_date : "" //종료일
        });
        NoticeGetOnSubmit();
    }


    const [noticeEditValue,setNoticeEditValue] = useState({
        notice_idx: "",
        notice_title : "" ,
        notice_content : "" ,
        notice_start_date : "" ,
        notice_end_date : ""
    })

    //3. 공지사항 수정할 Id값 불러오기
    const [editId,setEditId] = useState(0);
    const [write,setWrite] = useState('');
    const GetNoticeEditId = async (id) => {
        for(let list of data) {
            if(list.notice_idx === id) {
                setNoticeEditValue({
                    notice_idx: list.notice_idx, //번호
                    notice_title : list.notice_title, //제목
                    notice_content : list.notice_content ,  //내용
                    notice_start_date : list.notice_start_date , //시작일
                    notice_end_date : list.notice_end_date //종료일
                });
                setWrite(list.notice_writer);
            }
        }
        setEditId(id);
    }



    console.log(noticeEditValue);

    //4.공지사항 수정
    const EditNoticeOnSubmit = async () => {
        RefreshToken();
        await fetch(`/api/board/notice/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify(noticeEditValue)
        }).then(res => res.json())
        //초기값으로 변경
        setNoticeEditValue({
            notice_idx: "", //번호
            notice_title : "" , //제목
            notice_content : "" ,  //내용
            notice_start_date : "" , //시작일
            notice_end_date : "" //종료일
        });
        NoticeGetOnSubmit();

    }



    //5. 공지사항 삭제

    //5-1. 삭제값 전체 선택
    //2. 체크값
    const [checkItem,setCheckItem] = useState([]);

    //2-1. 전체선택
    const handleAllCheck = (checked) => {
        if(checked) {
            const idArray = [];
            data.forEach((el) => idArray.push(el.notice_idx));
            setCheckItem(idArray);
        }else {
            setCheckItem([]);
        }
    }
    //2-2. 단일 선택
    const handleCheck = (checked, id) => {
        if(checked) {
            setCheckItem(prev => [...prev, id]);
        }else {
            setCheckItem(checkItem.filter((el) => el !== id))
        }
    };



    const DeleteNoticeOnSubmit = async () => {
        RefreshToken();
        for(let i=0; i< checkItem.length; i++){
            await fetch(`/api/board/notice/delete/${checkItem[i]}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login"),
                },
            }).then(res => res.json())
        }
        setCheckItem([]);
        setNoticeEditValue({
            notice_idx: "", //번호
            notice_title : "" , //제목
            notice_content : "" ,  //내용
            notice_start_date : "" , //시작일
            notice_end_date : "" //종료일
        });
        NoticeGetOnSubmit();
    }

    return(
        <NoticeContext.Provider value={{
            NoticeGetOnSubmit,
            startDate, setStartDate,
            endDate, setEndDate,

            noticeList,data,handlePage,
            allPage,


            NoticeAddOnSubmit,
            noticeValue,setNoticeValue,

            GetNoticeEditId,
            noticeEditValue,setNoticeEditValue,
            write,
            EditNoticeOnSubmit,


            checkItem,setCheckItem,
            handleAllCheck,
            handleCheck,
            DeleteNoticeOnSubmit,

        }}>
            {children}
        </NoticeContext.Provider>
    )
}