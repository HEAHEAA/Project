import {createContext, useContext, useEffect, useState} from "react";
import {BookContext} from "./BookContext.jsx";
import axios from "axios";

export const BooksFileContext = createContext({});
export const BookFileProvider = ({children}) => {
    const {bookWeek, setBookWeek} = useContext(BookContext);

    let [bookImgUrl,setBookImgUrl] = useState([]);
    let bookUrlArr = [];
    const BookBoardImgLoad = async () => {
        for(let i = 0; i <bookWeek.length; i++){

            await axios.get(`/api/re/urlImg?filename=${bookWeek[i]?.re_pic || "6c9253ef-7d01-404c-8740-47deb7dae0ce_book.jpg"}`,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("login")
                },
                responseType: 'arraybuffer'
            }).then(res => {
                if(res.status === 200){
                    const contentType = res.headers['content-type'];
                    if(contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))){
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);

                        bookUrlArr.push({
                            re_idx: bookWeek[i].re_idx,
                            re_content: bookWeek[i].re_content,
                            re_pic: imageURL,
                            re_summary: bookWeek[i].re_summary,
                            start_week: localStorage.getItem('year-week')
                        })
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        return setBookImgUrl(bookUrlArr);
    }

    useEffect(() => {
        BookBoardImgLoad();
    }, [bookWeek]);

    return(
        <BooksFileContext.Provider value={{
            bookImgUrl
        }}>
            {children}
        </BooksFileContext.Provider>
    )
}
