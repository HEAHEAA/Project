import {createContext, useState} from "react";
import ip from '../../../../../dist/path.json';

export const UiEditContext = createContext({});

export const UiEditProvider = ({children}) => {
  const [uiEdit, setUiEdit] = useState([]);
  const UiEditDataOnSubmit = async () => {
    await fetch(`${ip.ip}/api/set/font/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setUiEdit(res.data);
    })
  }

  let mainEdit = [uiEdit[6],uiEdit[7],uiEdit[8]];
  let noticeEdit = [uiEdit[9],uiEdit[10],uiEdit[11]];
  let excellentEdit = [uiEdit[12],uiEdit[13],uiEdit[14],uiEdit[15]];
  let bidEdit = [uiEdit[16],uiEdit[17],uiEdit[18]];
  let newsEdit = [uiEdit[19],uiEdit[20],uiEdit[21]];
  let bookEdit = [uiEdit[22],uiEdit[23],uiEdit[24]];



  return (
    <UiEditContext.Provider value={{
      UiEditDataOnSubmit,
      uiEdit, setUiEdit,

      mainEdit,
      noticeEdit,
      excellentEdit,
      bidEdit,
      newsEdit,
      bookEdit
    }}>
      {children}
    </UiEditContext.Provider>
  )
}
