import {createContext, useState} from "react";

export const WeatherContext = createContext({});

// 날씨환경 데이터 받아오는 API
export const WeatherProvider = ({children}) => {

    const [weather,setWeather] = useState([]);
    const WeatherOnSubmitData = async () => {
        await fetch(`/api/witem`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setWeather(res.data);
        })
    }








    return(
        <WeatherContext.Provider value={{
            weather,setWeather,
            WeatherOnSubmitData,
        }}>
            {children}
        </WeatherContext.Provider>
    )
}