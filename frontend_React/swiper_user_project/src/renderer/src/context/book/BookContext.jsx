import {createContext, useEffect, useState} from "react";
import ip from '../../../../../dist/path.json';
import axios from "axios";

export const BookContext = createContext({});
export const BookProvider = ({children}) => {
  // 현재 추천도서 목록
  const [bookWeek, setBookWeek] = useState([]);
  const BookWeekData = async () => {
    await fetch(`${ip.ip}/api/re/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setBookWeek(res.data);
    })
  }

  let [bookImgUrl,setBookImgUrl] = useState([]);
  let bookUrlArr = [];
  const BookBoardImgLoad = async () => {
    for(let i = 0; i <bookWeek.length; i++){

      await axios.get(`${ip.ip}/api/re/urlImg?filename=${bookWeek[i]?.re_pic || '337d261d-a2ae-4479-91e8-15b101af6153_aman.jpg'}`,{
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
    <BookContext.Provider value={{
      BookWeekData,
      bookWeek, setBookWeek,
      bookImgUrl,setBookImgUrl
    }}>
      {children}
    </BookContext.Provider>
  )
}
