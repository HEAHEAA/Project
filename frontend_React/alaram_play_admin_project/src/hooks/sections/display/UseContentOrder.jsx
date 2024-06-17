import axios from "axios";
import {useQuery} from "react-query";

const fetchLayoutData = () => {
    return axios.get(`/api/layout/list/${localStorage.getItem('node')}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        }
    })
}

export const LayoutEditData = () => {
    return useQuery('layout-data', fetchLayoutData)
}