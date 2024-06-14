import {createContext, useState} from "react";
import axios from "axios";

export const FileListContext = createContext({});

export const FileListProvider = ({children}) => {
    //1.파일 목록 리스트
    const [fileList, setFileList] = useState([]);

    const GetFileList = async () => {
        await fetch(`/api/playlist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setFileList(res.data);
        })
    }


    //2. 선택 한 파일값 가져오기
    const [singleFile, setSingleFile] = useState({
        idx: 0,
        origin_fileName: "",
        upload_fileName: "",
        reg_date: ""
    });

    const GetSingleFile = async (id) => {
        for (let list of fileList) {
            if (list.idx === id) {
                setSingleFile({
                    id: list.idx,
                    origin_fileName: list.origin_fileName,
                    upload_fileName: list.upload_fileName,
                    reg_date: list.reg_date
                })
            }
        }
    }



    //3. 파일업로드
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(true);
    const FileUpload = async (e) => {
        e.preventDefault();
        e.persist();

        let files = e.target.profile_files.files;
        let formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[0]);
        }


        const post = await axios({
            method: "POST",
            url: '/api/playlist/upload',
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            data: formData
        });
        GetFileList();
        setUploadLoading(false);
        setUploadedInfo(null);
        setSingleFile({
            id:0,
            origin_fileName: '',
            upload_fileName: '',
            reg_date: ''
        })
    }


    //4. 파일삭제
    const FileDataDelete = async () => {
        await fetch(`/api/playlist/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify({
                idx: singleFile.id
            })
        })
        GetFileList();
    }


    //5. 파일 이미지 미리보기
    const [mediaURL, setMediaURL] = useState('');  //미디어 다운로드
    const [mediaType, setMediaType] = useState('');  //미디어 다운로드
    const FilePlayLoad = async (filename) => {
        await axios.get('/api/did/files', {
            params: {
                filename: filename
            },
            responseType: 'arraybuffer'
        }).then((res) => {
            if (res.status === 200) {
                const contentType = res.headers['content-type'];

                //동영상인 경우
                if (contentType && contentType.startsWith('application/octet-stream')) {
                    const videoBlob = new Blob([res.data], {type: 'video/mp4'});
                    const videoURL = URL.createObjectURL(videoBlob);
                    setMediaURL(videoURL);
                    setMediaType('video');
                }

                //이미지인 경우
                else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                    const imageBlob = new Blob([res.data], {type: contentType});
                    const imageURL = URL.createObjectURL(imageBlob);
                    setMediaURL(imageURL);
                    setMediaType('image');
                }
            }
        }).catch((e) => {
            console.log(e);
        });

    }


    return (
        <FileListContext.Provider value={{
            //파일리스트
            GetFileList, fileList, setFileList,


            //파일 싱글값 가져오기
            GetSingleFile, singleFile, setSingleFile,

            //파일 업로드
            uploadLoading, setUploadLoading, FileUpload,
           uploadedInfo, setUploadedInfo,

            //파일 삭제
            FileDataDelete,



            //파일 재생하기
            FilePlayLoad,mediaURL,mediaType
            ,setMediaURL, setMediaType,

        }}>
            {children}
        </FileListContext.Provider>
    )
}