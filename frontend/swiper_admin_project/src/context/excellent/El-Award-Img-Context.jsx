import {createContext, useContext, useEffect, useState} from "react";
import {ExcellentContext} from "./ExcellentContext.jsx";
import axios from "axios";
import {DateContext} from "../config/DateContext.jsx";

export const ElAwardImgContext = createContext({});
export const ElAwardImgProvider = ({children}) => {
    const {dateMonth, setDateMonth} = useContext(DateContext);
    const {
        award, setAward,
        AwardWeekList
    } = useContext(ExcellentContext);

    //시삭식 이미지 업로드
    //1. 이미지업로드
    const [ImgAData, setImgAData] = useState([]);
    const elAwradImgUpdateOnSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        let files = e.target.files[0];
        let formData = new FormData();
        formData.append("files", files);

        const post = await axios({
            method: "POST",
            url: "/api/ea/file/upload",
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            data: formData
        });
        setImgAData(post.data.data)
    }

    //시상식 JSON 등록
    const [awardValue, setAwardValue] = useState({
        ea_picture: "",
        start_month: localStorage.getItem('year-week')?.substring(0, 5)
    });

    useEffect(() => {
        setAwardValue({
            ea_picture: ImgAData[0],
            start_month: localStorage.getItem('year-week')?.substring(0, 5)
        })
    }, [ImgAData]);


    const elAwardInsert = async () => {
        if (
            awardValue.ea_picture !== "" &&
            awardValue.start_month !== null
        ) {
            await fetch(`/api/ea/insert`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login")
                },
                body: JSON.stringify({
                    ea_picture: awardValue.ea_picture,
                    start_month: dateMonth
                })
            }).then(res => res.json());
            AwardWeekList();
            setAwardValue({
                ea_picture: "",
                start_month: localStorage.getItem('year-week')?.substring(0, 5)
            })
            setImgAData([]);
        } else {
            alert('사진 또는 날짜를 지정해주세요 !')
        }
    }

    //시상식 삭제
    const elAwardDelete = async (target) => {
        await fetch(`/api/ea/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                ea_idx: target
            })
        }).then(res => res.json());
        AwardWeekList();
    }

    //시상식 이미지 가져오기
    let [imgAURL, setAURL] = useState([]);
    let imgURLArr = [];
    const AwardImgLoad = async () => {
        for (let i = 0; i < award.length; i++) {
            await axios.get(`/api/ea/urlImg?filename=${award[i]?.ea_picture || "8f42212e-430b-4688-8ef7-5f76bd308ab5_7a7bea65510cd62bacd6bfe0a4483abe.jpg"}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("login")
                },
                responseType: 'arraybuffer'
            }).then(res => {
                if (res.status === 200) {
                    const contentType = res.headers['content-type'];
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        imgURLArr.push({
                            ea_idx: award[i].ea_idx,
                            ea_picture: imageURL,
                            start_month: award[i].start_month,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        return setAURL(imgURLArr);
    }

    useEffect(() => {
        AwardImgLoad();
    }, [award]);


    return (
        <ElAwardImgContext.Provider value={{
            elAwradImgUpdateOnSubmit,
            awardValue, setAwardValue,
            elAwardInsert,
            elAwardDelete,

            //이미지 가져오기
            AwardImgLoad,
            imgAURL, setAward
        }}>
            {children}
        </ElAwardImgContext.Provider>
    )
}
