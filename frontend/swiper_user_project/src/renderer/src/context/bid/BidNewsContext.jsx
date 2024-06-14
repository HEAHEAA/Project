import {createContext, useState} from "react";
import ip from '../../../../../dist/path.json';

export const BidNewsContext = createContext({});
export const BidNewsProvider = ({children}) => {
  const [bidNews,setBidNews] = useState([]);

  const BidWeekNews = async () => {
    await fetch(`${ip.ip}/api/sbid/list`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setBidNews(res.data);
    })
  }

  return(
    <BidNewsContext.Provider value={{
      BidWeekNews,
      bidNews,setBidNews
    }}>
      {children}
    </BidNewsContext.Provider>
  )
}
