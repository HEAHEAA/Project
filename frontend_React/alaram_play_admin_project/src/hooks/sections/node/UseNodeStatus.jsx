import axios from "axios";
import {useQuery} from "react-query";

const fetchNodePlaceData = () => {
    return axios.get(`/api/node/data?idx=${localStorage.getItem('node')}`,{
        headers:{
            "Content-Type": "application/json"
        }
    })
}

export const NodeIdData = () => {
    return useQuery('node-data', fetchNodePlaceData)
}