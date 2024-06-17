import axios from "axios";
import {useMutation} from "react-query";

const fetchSignup = (value) => {
    return axios.post('/api/signUp',value, {
        headers:{
            "Content-Type": "application/json"
        }
    })
}

export const AddSignUp = () => {
    return useMutation(fetchSignup)
}