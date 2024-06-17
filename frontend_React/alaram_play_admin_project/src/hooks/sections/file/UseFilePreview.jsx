import axios from "axios";
import {useQueries, useQuery} from "react-query";
import {BsPlayCircle} from "react-icons/bs";
import playNull from "../../../assets/img/playNull.png";
import {Checkbox} from "@mui/material";

/**
 * 파일 리스트 - (이미지)미리보기
 */
const fetchImgPreview = data => {
    return axios.get(`/api/did/files`, {
        params: {filename: data || 'bf42f7c5-d3e6-4cc6-81f7-96480b067140_부산tp-공고01.jpg'},
        responseType: 'arraybuffer'
    })
}
export const ImgPreview = ({data, setSingleFile, checkItem, handleSingleCheck}) => {
    const result = useQueries(
        data?.map(list => {
            return {
                queryKey: ['get-preview-img', list.upload_fileName],
                queryFn: () => fetchImgPreview(list.upload_fileName),
            }
        }),
    )
    let Preview = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i]?.status === 'success') {
            const contentType = result[i]?.data.headers['content-type']
            const imageBlob = new Blob([result[i].data.data], {type: contentType});
            const imageURL = URL.createObjectURL(imageBlob);
            Preview.push({
                    id: data[i].idx,
                    ImgUrl: imageURL,
                    origin_fileName: data[i].origin_fileName,
                    upload_fileName: data[i].upload_fileName,
                    reg_date: data[i].reg_date
                }
            );

        }
    }

    const GetSingleFileData = async (id) => {
        for (let list of Preview) {
            if (list.id === id) {
                setSingleFile({
                    id: list.id,
                    ImgUrl: list.ImgUrl,
                    origin_fileName: list.origin_fileName,
                    upload_fileName: list.upload_fileName,
                    type: "image",
                    reg_date: list.reg_date
                })
            }
        }
    }

    return (
        <div>
            {
                Preview.map((arr, inx) => (
                    <section key={inx} onClick={() => {
                        GetSingleFileData(arr.id);

                        if (window.innerWidth < 680) {
                            window.scrollTo({top: 0, behavior: "smooth"})
                        }
                    }}>
                        <div className="preview-mini-box">
                            <div className="dis-content-img03">
                                <div className="dis-content-img-div03">
                                    <img src={arr.ImgUrl} alt="img"/>
                                </div>
                            </div>
                        </div>
                        <div className="preview-file-text-box">
                            <p>파일번호 : {arr.id}번</p>
                            <p>파일명 : {arr.origin_fileName}</p>
                            <p>확장자 : {arr.upload_fileName?.substring(arr.upload_fileName.indexOf('.'))}</p>
                            <p>업로드일 :{arr.reg_date}</p>
                        </div>
                        <div className="preview-play-box">
                            <p>
                                {
                                    window.location.pathname === '/home' ? <BsPlayCircle/> :
                                        <Checkbox name={`select-${arr.id}`}
                                                  onChange={(e) => handleSingleCheck(e.target.checked, arr.id)}
                                                  checked={checkItem.includes(arr.id)}
                                        />
                                }
                            </p>
                        </div>
                    </section>
                ))
            }
        </div>
    )
}


/**
 * 파일 리스트 - (동영상)미리보기
 */
const fetchVdoPreview = data => {
    return axios.get('/api/did/thumb', {
        params: {filename: data},
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: 'Bearer ' + localStorage.getItem("login")
        },
        responseType: 'arraybuffer'
    })
}
export const VdoPreview = ({data, setSingleFile, checkItem, handleSingleCheck}) => {
    const result = useQueries(
        data?.map(list => {
            return {
                queryKey: ['get-preview-vdo', list.upload_fileName],
                queryFn: () => fetchVdoPreview(list.upload_fileName),
            }
        }),
    )

    let Preview = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i]?.status === 'success') {
            const contentType = result[i]?.data.headers['content-type']
            const imageBlob = new Blob([result[i].data.data], {type: contentType});
            const imageURL = URL.createObjectURL(imageBlob);
            Preview.push({
                    id: data[i].idx,
                    ImgUrl: imageURL,
                    origin_fileName: data[i].origin_fileName,
                    upload_fileName: data[i].upload_fileName,
                    type: "video",
                    reg_date: data[i].reg_date
                }
            );
        }
    }

    const GetSingleFileData = async (id) => {
        for (let list of Preview) {
            if (list.id === id) {
                setSingleFile({
                    id: list.id,
                    ImgUrl: list.ImgUrl,
                    origin_fileName: list.origin_fileName,
                    upload_fileName: list.upload_fileName,
                    type: list.type,
                    reg_date: list.reg_date
                })
            }
        }
    }

    return (
        <div>
            {
                Preview.map((arr) => (
                    <section key={arr.id} onClick={() => {
                        GetSingleFileData(arr.id);
                        if (window.innerWidth < 680) {
                            window.scrollTo({top: 0, behavior: "smooth"})
                        }
                    }}>
                        <div className="preview-mini-box">
                            <div className="dis-content-img03">
                                <div className="dis-content-img-div03">
                                    <img src={arr.ImgUrl} alt="img"/>
                                </div>
                            </div>
                        </div>
                        <div className="preview-file-text-box">
                            <p>파일명 : {arr.origin_fileName}</p>
                            <p>확장자 : {arr.upload_fileName?.substring(arr.upload_fileName.indexOf('.'))}</p>
                            <p>업로드일 :{arr.reg_date}</p>
                        </div>
                        <div className="preview-play-box">
                            <p>
                                {
                                    window.location.pathname === '/home' ? <BsPlayCircle/> :
                                        <Checkbox name={`select-${arr.id}`}
                                                  onChange={(e) => handleSingleCheck(e.target.checked, arr.id)}
                                                  checked={checkItem.includes(arr.id)}
                                        />
                                }
                            </p>
                        </div>
                    </section>
                ))
            }
        </div>
    )
}


/**
 * 파일 리스트 - 싱글 - 파일 미리 보기
 */
const fetchSinglePreview = fileName => {
    return axios.get(`/api/did/files`, {
        params: {filename: fileName},
        responseType: 'arraybuffer'
    });
}
export const SingleFileLoad = ({singleFile}) => {
    const result = useQuery({
            queryKey: ['preview-single-file', singleFile.upload_fileName],
            queryFn: () => fetchSinglePreview(singleFile.upload_fileName),
            enabled: singleFile.id !== 0,
        }
    )

    let SinglePreview = [];
    if (result.status === 'success') {
        const contentType = result.data.headers['content-type']
        if (contentType && contentType.startsWith('application/octet-stream')) {
            const videoBlob = new Blob([result.data.data], {type: 'video/mp4'});
            const videoURL = URL.createObjectURL(videoBlob);
            SinglePreview.push({
                type: 'video',
                url: videoURL
            })
        } else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
            const imageBlob = new Blob([result.data.data], {type: contentType});
            const imageURL = URL.createObjectURL(imageBlob);

            SinglePreview.push({
                type: 'image',
                url: imageURL
            })
        }
    }


    return (
        <div>

            {
                SinglePreview.length > 0 ? <div key={SinglePreview[0]?.url}>
                        {
                            SinglePreview.map((arr) => (
                                <div key={SinglePreview[0]?.url}>
                                    {
                                        arr.type === 'image' ?
                                            <div className="dis-content-img02">
                                                <div className="dis-content-img-div02">
                                                    <img src={arr.url} alt="Media"/>
                                                </div>
                                            </div> : (
                                                arr.type === 'video' ?
                                                    <div className="dis-content-img02">
                                                        <div className="dis-content-img-div02">
                                                            <video controls className="media-video" muted autoPlay loop>
                                                                <source src={arr.url} type="video/mp4"/>
                                                            </video>
                                                        </div>
                                                    </div> : null

                                            )
                                    }
                                </div>
                            ))
                        }

                    </div> :
                    <div className="file-play">
                        <p>
                            <img src={playNull} alt="img-null"/> <br/>
                            재생 할 파일을 선택해주세요 !
                        </p>
                    </div>
            }


        </div>
    )
}





