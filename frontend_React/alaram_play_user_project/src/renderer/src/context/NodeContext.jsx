import { createContext, useEffect, useState } from "react";
import { path } from "./path/myPath";
export const NodeContext = createContext({});

export const NodeProvider = ({children}) => {
  useEffect(() => {
    SensorFicOncSubmit();
  }, []);

  const [sensorFic,setSensorFic] = useState([]);
  const SensorFicOncSubmit = async () => {
    await fetch(`${path}/api/node/data?idx=${localStorage.getItem('node')}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then((res) => res.json()).then(res => {
      setSensorFic(res.data);
    })
  }


  return(
    <NodeContext.Provider value={{
      sensorFic,
      SensorFicOncSubmit
    }}>
      {children}
    </NodeContext.Provider>
  )
}
