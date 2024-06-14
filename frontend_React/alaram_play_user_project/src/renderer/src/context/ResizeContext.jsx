import { createContext, useState } from "react";
import { NodeId, path } from "./path/myPath";

export const ResizeContext = createContext({})

export const ResizeProvider = ({children}) => {
  const [resize,setResize] = useState([]);

  const ResizingDataOnSubmit = async () => {
    await fetch(`${path}/api/layout/list/${localStorage.getItem('node')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json()).then(res => {
      setResize(res.data);
    })
  }

  let ws = [];
  let ds = [];
  let cs = [];
  let fs = [];
  for (let i = 0; i < resize.length; i++) {
    if (resize[i].name === '날씨 정보') {
      ws.push(resize[i]);
    }
    if (resize[i].name === '대기 정보') {
      ds.push(resize[i]);
    }
    if (resize[i].name === '홍보물 정보') {
      cs.push(resize[i])
    }
    if (resize[i].name === '뉴스 정보') {
      fs.push(resize[i])
    }
  }

  return(
    <ResizeContext.Provider value={{
      ResizingDataOnSubmit,
      resize,setResize,

      ws,
      ds,
      cs,
      fs
    }}>
      {children}
    </ResizeContext.Provider>
  )
}
