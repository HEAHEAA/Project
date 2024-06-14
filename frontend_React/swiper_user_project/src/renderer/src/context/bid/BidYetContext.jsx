import {createContext, useState} from "react";
import ip from '../../../../../dist/path.json';

export const BidYetContext = createContext({});
export const BidYetProvider = ({children}) => {

  const [bidYet,setBidYet] = useState([]);
  const BidTodayYet = async () => {
    await fetch(`${ip.ip}/api/bid/today`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setBidYet(res.data);
    })
  }
  return(
    <BidYetContext.Provider value={{
      BidTodayYet,
      bidYet,setBidYet
    }}>
      {children}
    </BidYetContext.Provider>
  )
}
