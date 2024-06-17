import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";


//뉴스 리스트 받아오기
const fetchNewsList = () => {
    return axios.get(`/api/newsList/${localStorage.getItem('node')}`,{
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const NewsListOnSubmit = () => {
    return useQuery('news-list', fetchNewsList)
}

//뉴스 insert
const fetchAddNews = (content) => {
    return axios.post('/api/news/insert', content, {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        }
    });
}

export const NewsInsert = () => {
    const queryClient = useQueryClient()
    return useMutation(fetchAddNews, {
        onSuccess: () => {
            queryClient.invalidateQueries('news-list')
        }
    })
}

//뉴스 update
const fetchUpdateNews = (content) => {
    return axios.post('/api/news/update',content,{
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        }
    })
}

export const NewsUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateNews, {
        onSuccess: () => {
            queryClient.invalidateQueries('news-list')
        }
    })
}


//뉴스 delete
const fetchDeleteNews = (contentId) => {
    return axios.post('/api/news/delete', contentId, {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        }
    })
}

export const NewsDelete = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteNews, {
        onSuccess: () => {
            queryClient.invalidateQueries('news-list')
        }
    })
}




