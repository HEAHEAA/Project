import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";


//현재 재생중인 파일
const fetchPlayData = () => {
    return axios.get(`/api/did/list/${(localStorage.getItem('node'))}`,{
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login"),
        },
    });
}
export const PlayDataList = () => {
    return useQuery('play-list', fetchPlayData)
}

//파일 insert
const addPlayList = (files) => {
    return axios.post('/api/did/insert',files,{
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login"),
        },
    });
}

export const AddPlayInsert = () => {
    const queryClient = useQueryClient();
    return useMutation(addPlayList,{
        onSuccess: () => {
            queryClient.invalidateQueries('play-list');
            queryClient.invalidateQueries('play-preview-img');
            queryClient.invalidateQueries('play-preview-video');
            queryClient.invalidateQueries('swiper-list');
        },
    })
}


const AllAddPlayList = (files) => {
    return axios.post('/api/did/insert/all', files, {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login"),
        },
    })
}

export const AddAllPlayInsert = () => {
    const queryClient = useQueryClient();
    return useMutation(AllAddPlayList,{
        onSuccess: () => {
            queryClient.invalidateQueries('play-list');
            queryClient.invalidateQueries('play-preview-img');
            queryClient.invalidateQueries('play-preview-video');
            queryClient.invalidateQueries('swiper-list');
        },
    })
}




