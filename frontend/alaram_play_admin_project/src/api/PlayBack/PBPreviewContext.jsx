import {createContext, useContext, useEffect, useState} from "react";
import {PlaybackContext} from "./PlaybackContext.jsx";
import axios from "axios";

export const PBPreviewContext = createContext({});

export const PBPPreviewProvider = ({children}) => {
    const {result} = useContext(PlaybackContext);

    //재생파일 확장자별 나누기
    const VdoSplit = [];
    const ImgSplit = [];
    for (let i = 0; i < result?.length; i++) {
        if (result[i].upload_fileName.includes('png')|| result[i].upload_fileName.includes('jpg')|| result[i].upload_fileName.includes('jpeg')) {
            ImgSplit.push(result[i]);
        }
        if (result[i].upload_fileName.includes('mp4')) {
            VdoSplit.push(result[i]);
        }
    }


    const [imgUrl, setImgUrl] = useState('');
    const img = [];

    const ImgPlayLoad = async () => {
        for (let i = 0; i < ImgSplit.length; i++) {
            await axios.get('/api/did/files', {
                params: {filename: ImgSplit[i].upload_fileName},
                responseType: 'arraybuffer'
            }).then((res) => {
                if (res.status === 200) {
                    const contentType = res.headers['content-type'];
                    //동영상인 경우
                   if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        img.push({id: ImgSplit[i].idx, url: imageURL, type: 'image'});
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        }
        return setImgUrl(img);
    }


    const [vdoUrl, setVdoUrl] = useState('');
    const vdo = [];
    const VdoPlayLoad = async () => {
        for (let i = 0; i < VdoSplit.length; i++) {
            await axios.get('/api/did/thumb', {
                params: {filename: VdoSplit[i].upload_fileName},
                headers: {Authorization: 'Bearer ' + localStorage.getItem("login"),},
                responseType: 'arraybuffer'
            }).then((res) => {
                if (res.status === 200) {
                    const contentType = res.headers['content-type'];
                    //동영상인 경우
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        setVdoUrl(imageURL);
                        vdo.push({id: VdoSplit[i].idx, url: imageURL, type: 'image'});
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        }
        return setVdoUrl(vdo);
    }




    // 총 재생관리 함수
    let loadUrl = [...vdoUrl, ...imgUrl];

    return (
        <PBPreviewContext.Provider value={{
            ImgPlayLoad,
            VdoPlayLoad,
            loadUrl,
        }}>
            {children}
        </PBPreviewContext.Provider>
    )
}
