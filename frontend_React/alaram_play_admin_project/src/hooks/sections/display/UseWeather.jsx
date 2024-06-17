import axios from "axios";
import {useQuery} from "react-query";

const fetchWeatherData = () => {
    return axios.get('/api/witem',{
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        }
    })
}

export const WeatherData = () => {
    return useQuery('weather-list', fetchWeatherData)
}

