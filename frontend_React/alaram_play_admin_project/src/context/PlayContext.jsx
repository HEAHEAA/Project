import {createContext, useContext, useState} from "react";
import {FileList} from "../hooks/sections/file/UseFile.jsx";
import {PlayDataList} from "../hooks/sections/play/UsePlay.jsx";

export const PlayContext = createContext({});

export const PlayProvider = ({children}) => {
    //현재 재생중- 필요 리스트
    const {data: fileList} = FileList();
    const {isLoading: playLoading,data: playList,isError: playError} = PlayDataList();

    //현재 재생중인 리스트 데이터 치환하기
    let playData = [];
    for(let i =0; i<playList?.data.data.length; i++){
        playData.push({
            pm_idx: playList?.data.data[i].pm_idx,
            file_idx: playList?.data.data[i].file_idx,
            file_list: playList?.data.data[i].file_list.replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')?.split(','),
            pm_reg_date: playList?.data.data[i].pm_reg_date,
            pm_user_id: playList?.data.data[i].pm_user_id,
            running_time: playList?.data.data[i].running_time.replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')?.split(','),
        })
    }

    //A-1. 아이디, 시간값 분리
    let playId = []; //치환값 아이디만 분리
    let playTime = []; //치환값 시간값만 분리
    for (let i = 0; i < playData.length; i++) {
        playId.push(...playData[i].file_list);
        playTime.push(...playData[i].running_time);
    }

    // //A-2. 최종 현재 재생리스트 필요 데이터
    let Result = [];
    for (let i = 0; i < playId.length; i++) {
        for (let j = 0; j < fileList?.data.data.length; j++) {
            if (playId[i] === JSON.stringify(fileList?.data.data[j]?.idx)) {
                Result.push({
                    idx: fileList?.data.data[j]?.idx,
                    origin_fileName: fileList?.data.data[j].origin_fileName,
                    reg_date: fileList?.data.data[j].reg_date,
                    upload_fileName: fileList?.data.data[j].upload_fileName,
                    time: playTime[i]
                })
            }
        }
    }

    let EditResult = [...Result];
    const ResultIdDedupe = EditResult.filter((item,id) => {
        return EditResult.findIndex((item1,id1) => {
            return item.idx === item1.idx
        }) === id
    })




    //이미지, 비디오 타입 분리
    let resultImg = [];
    let resultVdo = [];
    for (let i = 0; i < ResultIdDedupe.length; i++) {
        if (ResultIdDedupe[i].upload_fileName.includes('png') || ResultIdDedupe[i].upload_fileName.includes('jpg') || ResultIdDedupe[i].upload_fileName.includes('jpeg')) {
            resultImg.push(Result[i]);
        }
        if (ResultIdDedupe[i].upload_fileName.includes('mp4')) {
            resultVdo.push(Result[i])
        }
    }






    return (
        <PlayContext.Provider value={{
            ResultIdDedupe,
            resultImg,
            resultVdo,
        }}>
            {children}
        </PlayContext.Provider>
    )
}
