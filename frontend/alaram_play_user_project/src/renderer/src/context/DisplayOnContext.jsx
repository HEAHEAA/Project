import { createContext, useState } from "react";
import { path } from "./path/myPath";
export const DisplayOnContext = createContext({});
export const DisplayOnProvider = ({children}) => {
  const [intimeList,setIntimeList] = useState([]);
  const intimeDataOnsubmit  = async () => {
    await fetch(`${path}/api/layout/foTime/${localStorage.getItem('node')}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json()).then(res => {
      setIntimeList(res.data);
    })
  }


  return(
    <DisplayOnContext.Provider value={{
      intimeList,setIntimeList,
      intimeDataOnsubmit
    }}>
      {children}
    </DisplayOnContext.Provider>
  )
}
