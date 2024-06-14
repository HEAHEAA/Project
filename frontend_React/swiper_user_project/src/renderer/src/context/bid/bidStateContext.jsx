import {createContext, useState} from "react";
import ip from '../../../../../dist/path.json';

export const BidStateContext = createContext({});
export const BidStateProvider = ({children}) => {
  const [bidState,setBidState] = useState([]);
  const BidWeekState = async () => {
    await fetch(`${ip.ip}/api/bid/list`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setBidState(res.data);
    })
  }

  return(
    <BidStateContext.Provider value={{
      BidWeekState,
      bidState,setBidState
    }}>
      {children}
    </BidStateContext.Provider>
  )
}
