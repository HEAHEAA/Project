import { createContext, useState } from "react";
import {path } from "./path/myPath";

export const PlaceContext = createContext({});

export const PlaceProvider = ({ children }) => {
  const [nodeList,setNodeList] = useState([]);
  const [nodeId, setNodeId] = useState(114);

  const NodeIdDataOnSubmit = async () => {
    await fetch(`${path}/api/node/list`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setNodeList(res.data)
    })
  }


  return (
    <PlaceContext.Provider value={{
      nodeList, setNodeList,
      NodeIdDataOnSubmit,
      nodeId, setNodeId,

    }}>
      {children}
    </PlaceContext.Provider>
  );
};
