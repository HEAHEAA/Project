import {createContext, useContext, useEffect, useState} from "react";
import {FileListContext} from "../FileList/FileListContext.jsx";
import axios from "axios";

export const PreviewContext = createContext({});

export const PreviewProvider = ({children}) => {
    const {fileList} = useContext(FileListContext);

    //파일 분류
    let fileImg = [];
    let fileVdo = [];
    for(let  i = 0; i<fileList.length; i++){
        if(fileList[i].upload_fileName.includes('mp4')){
            fileVdo.push(fileList[i]);
        }
        if(fileList[i].upload_fileName.includes('png') ||fileList[i].upload_fileName.includes('jpg')||fileList[i].upload_fileName.includes('jpeg')){
            fileImg.push(fileList[i])
        }
    }


    let [imgUrl,setImgUrl] = useState([]);
    let imgUrlArr = []

    const ImgLoad = async () => {
        for(let i = 0; i<fileImg.length; i++){
            await axios.get('/api/did/files',{
                params: {filename: fileImg[i].upload_fileName || 'd56492e6-80bc-46ec-a7a2-fa4e905578bc_양산시-배출가스.jpg'},
                responseType: 'arraybuffer'
            }).then((res) => {
                if(res.status === 200){
                    const contentType = res.headers['content-type'];
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        imgUrlArr.push({
                            id: fileImg[i].idx,
                            url: imageURL,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        return setImgUrl(imgUrlArr);
    }


    let [vdoUrl,setVdoUrl] = useState([]);
    let vdoUrlArr = []

    const VdoLoad = async () => {
        for(let i = 0; i<fileVdo.length; i++){
            await axios.get('/api/did/thumb',{
                params: {filename: fileVdo[i].upload_fileName},
                headers: {Authorization: 'Bearer ' + localStorage.getItem("login"),},
                responseType: 'arraybuffer'
            }).then((res) => {
                if(res.status === 200){
                    const contentType = res.headers['content-type'];
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        vdoUrlArr.push({
                            id: fileVdo[i].idx,
                            url: imageURL,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        return setVdoUrl(vdoUrlArr);
    }


    let vdoEdit = [...vdoUrl];
    let imgEdit = [...imgUrl];

    //아이디 중복 생성 제거
    const VdoResult = vdoEdit.filter((item,id) => {
        return vdoEdit.findIndex((item1,id1) => {
            return item.id === item1.id
        }) ===id
    })

    const ImgResult = imgEdit.filter((item,id) => {
        return imgEdit.findIndex((item1,id1) => {
            return item.id === item1.id
        }) === id
    })




    // ///이미지 페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const lastPage = ImgResult.length % 15 === 0 ? ImgResult.length / 15 : ImgResult.length / 15 + 1;
    let allPage = Math.ceil(ImgResult.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(ImgResult.slice(15 * (page - 1)));
        } else {
            setData(ImgResult.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page,fileList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }



    ///비디오 페이징
    const [page01, setPage01] = useState(1);
    const [data01, setData01] = useState([]);
    const lastPage01 = VdoResult.length % 15 === 0 ? VdoResult.length / 15 : VdoResult.length / 15 + 1;
    let allPage01 = Math.ceil(VdoResult.length / 15);

    useEffect(() => {
        if (page01 === lastPage01) {
            setData01(VdoResult.slice(15 * (page - 1)));
        } else {
            setData01(VdoResult.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page01,fileList]);

    const handlePage01 = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage01(nowPageInt);
    }


    return(
        <PreviewContext.Provider value={{
            //1. 이미지 분류-파일이름/업로드일자
            fileImg ,
            fileVdo,

            //2. 파일 로드 + 이미지 비디오 파일 url
            ImgLoad,
            VdoLoad,
            VdoResult,
            ImgResult,

            //2. 파일페이징
            data,allPage,handlePage,
            data01,allPage01,handlePage01,
        }}>
            {children}
        </PreviewContext.Provider>
    )
}
