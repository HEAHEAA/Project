import {createContext, useEffect, useState} from "react";
import {FileList} from "../hooks/sections/file/UseFile.jsx";

export const FileContext = createContext({});
export const FileProvider = ({children}) => {
    const {data: fileList} = FileList();
    //1. 파일리스트-파일 single 선택 - 재생
    const [singleFile, setSingleFile] = useState({
        id: 0,
        ImgUrl: '',
        origin_fileName: '',
        upload_fileName: '',
        type: '',
        reg_date: ''
    });

    //2. 재생항목- 체크
    const [checkItem, setCheckItem] = useState([]);

    //3-1. 단일 체크
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItem(prev => [...prev, id]);
        } else {
            setCheckItem(checkItem.filter((el) => el !== id))
        }
    };

    //3-2. 체크값 id 확인 후 삭제
    const onDelete = (targetId) => {
        const newResult = checkItem.filter((it) => it !== targetId);
        setCheckItem(newResult);
    }


    //체크값 파일 리스트 정렬하기
    let checkResult = [];
    const [checkList,setCheckList] = useState([]);

    useEffect(() => {
        check();
    }, [checkItem]);

    const check = () => {
        for (let i = 0; i < checkItem.length; i++) {
            for (let j = 0; j < fileList?.data.data.length; j++) {
                if (checkItem[i] === fileList?.data.data[j].idx) {
                    checkResult.push({
                        checkId: fileList?.data.data[j].idx,
                        origin_fileName: fileList?.data.data[j].origin_fileName,
                        reg_date: fileList?.data.data[j].reg_date,
                        upload_fileName: fileList?.data.data[j].upload_fileName,
                        time: 0,
                    })
                }
            }
        }
        return setCheckList(checkResult);
    }




    return (
        <FileContext.Provider value={{
            singleFile, setSingleFile,
            checkItem, setCheckItem,
            handleSingleCheck,
            onDelete,

            checkList,setCheckList,
        }}>
            {children}
        </FileContext.Provider>
    )
}