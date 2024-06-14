import {createContext, useState} from "react";
import ip from '../../../../../dist/path.json';

export const UserPartContext = createContext({});
export const UserPartProvider = ({children}) => {
  const [ClientPart, setClientPart] = useState([]);

  const ClientPartOnSubmit = async () => {
    await fetch(`${ip.ip}/api/user/part/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setClientPart(res.data);
    })
  }



  const [ClientGrade, setClientGrade] = useState([]);
  const ClientGradeOnSubmit = async () => {
    await fetch(`${ip.ip}/api/user/grade/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("login")
      }
    }).then(res => res.json()).then(res => {
      setClientGrade(res.data);
    })
  }

  return(
    <UserPartContext.Provider value={{
      ClientGradeOnSubmit,
      ClientGrade, setClientGrade,
      ClientPartOnSubmit,
      ClientPart, setClientPart,
    }}>
      {children}
    </UserPartContext.Provider>
  )
}
