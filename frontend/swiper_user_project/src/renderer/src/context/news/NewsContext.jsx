import {createContext, useState} from "react";
import ip from '../../../../../dist/path.json';

export const NewsContext = createContext({});
export const NewsProvider = ({children}) => {
  const [newsWeek,setNewsWeek] = useState([]);
  //업계소식 주차 리스트
  const NewsWeeksData = async () => {
    await fetch(`${ip.ip}/api/in/list`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setNewsWeek(res.data);
    })
  }

  return(
    <NewsContext.Provider value={{
      NewsWeeksData,
      newsWeek,setNewsWeek,
    }}>
      {children}
    </NewsContext.Provider>
  )
}
