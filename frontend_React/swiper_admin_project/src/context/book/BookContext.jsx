import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {DateContext} from "../config/DateContext.jsx";
import dayjs from "dayjs";
import {Nows} from "../../utils/date-time.jsx";

export const BookContext = createContext({});
export const BookProvider = ({children}) => {
    const {value, setValue} = useContext(DateContext);

    const [bookCheck,setBookCheck] = useState(false);
    // 현재 추천도서 목록
    const [bookWeek, setBookWeek] = useState([]);
    const BookWeekData = async () => {
        await fetch(`/api/re/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setBookWeek(res.data);
            setBookCheck(false);
        })
    }

    //전체 추천도서 목록
    const BookAllData = async () => {
        await fetch(`/api/re/list/all`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setBookWeek(res.data);
            setBookCheck(true);
        })
    }

    //이미지 업로드
    const [bookFileName, setBookFileName] = useState([]);

    const BooksImgUploadOnSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        let files = e.target.files[0];
        let formData = new FormData();
        formData.append("files", files)

        const post = await axios({
            method: "POST",
            url: "/api/re/file/upload",
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            data: formData
        });
        setBookFileName(post.data.data);
    }

    //도서 JSON 등록
    const [bookValue, setBookValue] = useState({
        re_idx: 0,
        re_content: "",
        re_pic: "",
        re_summary: "",
        start_week: localStorage.getItem('year-week')
    });

    useEffect(() => {
        setBookValue({
            ...bookValue,
            re_pic: bookFileName[0],
        })
    }, [bookFileName])

    const BookInsertData = async () => {
        await fetch(`/api/re/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                re_idx: bookValue.re_idx,
                re_content: bookValue.re_content,
                re_pic: bookValue.re_pic,
                re_summary: bookValue.re_summary,
                start_week:localStorage.getItem('year-week')
            })
        }).then(res => res.json())
        BookWeekData();
        setBookValue({
            re_content: "",
            re_pic: "",
            re_summary: "",
            start_week: ""
        })
        setValue(dayjs(Nows));
        setBookFileName([]);
    }

    //도서 수정하기
    const getEditBookData = (id) => {
        for (let list of bookWeek) {
            if (list.re_idx === id) {
                setBookValue({
                    re_idx: list.re_idx,
                    re_content: list.re_content,
                    re_pic: list.re_pic,
                    re_summary: list.re_summary,
                    start_week: list.start_week
                })
            }
        }
    }

    let [bookTargetFile, setBookTargetFile] = useState('');
    const BookImgLoad = async () => {
        await axios.get(`/api/re/urlImg?filename=${bookTargetFile || ''}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            responseType: 'arraybuffer'
        }).then(res => {
            if (res.status === 200) {
                const contentType = res.headers['content-type'];
                if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                    const imageBlob = new Blob([res.data], {type: contentType});
                    const imageURL = URL.createObjectURL(imageBlob);

                    setBookValue({
                        ...bookValue,
                        re_idx: bookValue.re_idx,
                        book_name: imageURL,
                        re_pic: bookValue.re_pic
                    })
                }
            }
        })
    }

    //수정
    const BookUpdateData = async () => {
        await fetch(`/api/re/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                re_idx: bookValue.re_idx,
                re_content: bookValue.re_content,
                re_pic: bookValue.re_pic,
                re_summary: bookValue.re_summary,
                start_week: localStorage.getItem('year-week')
            })
        }).then(res => res.json())
        BookWeekData();
        setBookValue({
            re_idx: 0,
            re_content: "",
            re_pic: "",
            re_summary: "",
            start_week: ""
        })
        setValue(dayjs(Nows));
        setBookFileName([]);
    }

    //책 삭제
    const DeleteBookData = async (target) => {
        await fetch(`api/re/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                re_idx: target
            })
        }).then(res => res.json())
        BookWeekData();
        setBookValue({
            re_content: "",
            re_pic: "",
            re_summary: "",
            start_week: ""
        })
        setValue(dayjs(Nows));
        setBookFileName([]);
    }

    return (
        <BookContext.Provider value={{
            bookCheck,setBookCheck,

            //현재 추천도서 목록
            BookWeekData,
            BookAllData,
            bookWeek,

            //도서 이미지 업로드
            BooksImgUploadOnSubmit,
            BookInsertData,
            bookValue, setBookValue,

            //이미지 로드
            getEditBookData,
            BookImgLoad,

            //도서 데이터 수정
            BookUpdateData,
            bookTargetFile, setBookTargetFile,

            //도서데이터 삭제
            DeleteBookData,


        }}>
            {children}
        </BookContext.Provider>
    )
}
