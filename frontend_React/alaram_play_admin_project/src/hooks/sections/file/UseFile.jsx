import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "react-query";

/**
 * 파일 리스트
 */
const fetchFileData = () => {
    return axios.get('/api/playlist', {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        }
    });
}
export const FileList = () => {
    return useQuery('file-list', fetchFileData)
}

/**
 * 파일 add
 */

const fetchFileInsert = (formData) => {
    return axios.postForm('/api/playlist/upload',formData,{
        mode: "cors",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        }

    })
}

export const InsertFileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchFileInsert,{
        onSuccess: () => {
            queryClient.invalidateQueries('file-list');
            queryClient.invalidateQueries('get-preview-img');
            queryClient.invalidateQueries('get-preview-vdo');
            alert('파일이 업로드 되었습니다.')
        }
    })
}

/**
 * 파일 delete
 */

const fetchFileDelete = (id) => {
    return axios.post('/api/playlist/delete', id,{
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        },
    })
}

export const DeleteFileMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchFileDelete, {
        onSuccess: () => {
            queryClient.invalidateQueries('file-list');
            queryClient.invalidateQueries('get-preview-img');
            queryClient.invalidateQueries('get-preview-vdo');
        }
    })
}












