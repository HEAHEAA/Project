import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {ExcellentContext} from "./ExcellentContext.jsx";
import {DateContext} from "../config/DateContext.jsx";

export const ElImgContext = createContext({})
export const ElImgProvider = ({children}) => {
    const {dateMonth,setDateMonth} = useContext(DateContext);

    const {
        ExcellentWeekList,
        exList,setExList,
    }=  useContext(ExcellentContext);
    //우수사원 등록

    //1. 이미지업로드
    const [ImgData,setImgData] = useState([]);
    const elStaffImgUpdateOnSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        let files = e.target.files[0];
        let formData = new FormData();
        formData.append("files", files);

        const post = await axios({
            method: "POST",
            url: "/api/exmem/file/upload",
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            data: formData
        });
        setImgData(post.data.data)
    }

    //우수사원 JSON 등록
    const [staffValue,setStaffValue] = useState({
        ex_em_name:"",
        ex_em_part:0,
        ex_em_grade:0,
        ex_em_picture:"",
        start_month:localStorage.getItem('year-week')?.substring(0,5)
    });

    useEffect(() => {
        setStaffValue({
            ...staffValue,
            ex_em_picture:ImgData[0],
        })
    }, [ImgData]);

    const elStaffInsert = async () => {
        if(
            staffValue.ex_em_name !== "" &&
            staffValue.ex_em_part !== 0 &&
            staffValue.ex_em_grade !== 0 &&
            staffValue.ex_em_picture !== "" &&
            staffValue.start_month !== null
        ){
            await fetch(`/api/exmem/insert`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login")
                },
                body: JSON.stringify({
                    ex_em_name:staffValue.ex_em_name,
                    ex_em_part:staffValue.ex_em_part,
                    ex_em_grade:staffValue.ex_em_grade,
                    ex_em_picture:staffValue.ex_em_picture,
                    start_month:dateMonth
                })
            }).then(res => res.json());
            ExcellentWeekList();
            setStaffValue({
                ex_em_name:"",
                ex_em_part:0,
                ex_em_grade:0,
                ex_em_picture:"",
                start_month:localStorage.getItem('year-week')?.substring(0,5)
            })
            setImgData([]);
        }else {
            alert('빈칸을 채워주세요 !')
        }
    }

    //우수사원 삭제
    const elStaffDelete = async (target) => {
        await fetch(`/api/exmem/delete`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                ex_em_idx : target
            })
        }).then(res => res.json());
        ExcellentWeekList();
    }

    //우수사원 이미지 가져오기
    let [imgURL,setImgURL] = useState([]);
    let imgURLArr = [];
    const StaffImgLoad = async () => {
        for(let i = 0; i<exList.length; i++){
            await axios.get(`/api/exmem/urlImg?filename=${exList[i]?.ex_em_picture || 'c7f7aeff-99c9-4a33-8465-ef132f9ba7bb_d664b27cca7eaf4d64c41622b5bb9b6c.jpg'}`,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("login")
                },
                responseType: 'arraybuffer'
            }).then(res => {
                if(res.status === 200){
                    const contentType = res.headers['content-type'];
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        imgURLArr.push({
                            ex_em_grade: exList[i].ex_em_grade,
                            ex_em_idx: exList[i].ex_em_idx,
                            ex_em_name: exList[i].ex_em_name,
                            ex_em_part: exList[i].ex_em_part,
                            ex_em_picture: imageURL,
                            reg_date: exList[i].reg_date,
                            start_month: exList[i].reg_date,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                if(e.response.status){
                    console.log(e);
                }

            })
        }
        return setImgURL(imgURLArr);
    }

    useEffect(() => {
        StaffImgLoad();
    }, [exList]);

    return(
        <ElImgContext.Provider value={{
            elStaffImgUpdateOnSubmit,
            staffValue,setStaffValue,
            elStaffInsert,
            elStaffDelete,

            //이미지 가져오기
            StaffImgLoad,
            imgURL,setImgURL,
        }}>
            {children}
        </ElImgContext.Provider>
    )
}
