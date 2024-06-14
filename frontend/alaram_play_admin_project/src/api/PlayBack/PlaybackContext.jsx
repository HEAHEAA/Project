import {createContext, useContext, useEffect, useState} from "react";
import {FileListContext} from "../FileList/FileListContext.jsx";
import axios from "axios";
import {PBPreviewContext} from "./PBPreviewContext.jsx";

export const PlaybackContext = createContext({});

export const PlayBackProvider = ({children}) => {
    const {fileList} = useContext(FileListContext);
    //1. 현재 재생목록 리스트
    const [playbackList, setPlayBackList] = useState([]);

    const PlayBackListOnsubmit = async () => {
        await fetch(`/api/did/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            }
        }).then(res => res.json()).then(res => {
            setPlayBackList(res.data);
        })
    }

    ////////////////////////A -미리보기 데이터표출 API Start////////////////
    //1. 현재 재생 항목 데이터 치환
    let playData = [];
    for (let i = 0; i < playbackList.length; i++) {
        playData.push({
            pm_idx: playbackList[i].pm_idx,
            file_idx: playbackList[i].file_idx,
            file_list: playbackList[i].file_list.replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')?.split(','),
            pm_reg_date: playbackList[i].pm_reg_date,
            pm_user_id: playbackList[i].pm_user_id,
            running_time: playbackList[i].running_time.replace(/[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')?.split(','),
        });
    }


    //2. 아이디, 시간값 분리
    let playId = []; //치환값 아이디만 분리
    let playTime = []; //치환값 시간값만 분리
    for (let i = 0; i < playData.length; i++) {
        playId.push(...playData[i].file_list);
        playTime.push(...playData[i].running_time);
    }

    //4. 최종 현재 재생리스트 필요 데이터
    let Result = [];
    for (let i = 0; i < playId.length; i++) {
        for (let j = 0; j < fileList.length; j++) {
            if (playId[i] === JSON.stringify(fileList[j].idx)) {
                Result.push({
                    idx: fileList[j].idx,
                    origin_fileName: fileList[j].origin_fileName,
                    reg_date: fileList[j].reg_date,
                    upload_fileName: fileList[j].upload_fileName,
                    time: playTime[i]
                })
            }
        }
    }


    //1. 파일분류
    let resultImg = [];
    let resultVdo = [];
    for (let i = 0; i < Result.length; i++) {
        if (Result[i].upload_fileName.includes('png') || Result[i].upload_fileName.includes('jpg')) {
            resultImg.push(Result[i]);
        }
        if (Result[i].upload_fileName.includes('mp4')) {
            resultVdo.push(Result[i])
        }
    }

    let [reImgUrl, setReImgUrl] = useState([]);
    let reImgUrlArr = [];

    const ResultImgLoad = async () => {
        for (let i = 0; i < resultImg.length; i++) {
            await axios.get('/api/did/files', {
                params: {filename: resultImg[i].upload_fileName || 'd56492e6-80bc-46ec-a7a2-fa4e905578bc_양산시-배출가스.jpg'},
                responseType: 'arraybuffer'
            }).then((res) => {
                if (res.status === 200) {
                    const contentType = res.headers['content-type'];
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        reImgUrlArr.push({
                            id: resultImg[i].idx,
                            url: imageURL,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        return setReImgUrl(reImgUrlArr);
    }

    let [reVdoUrl, setReVdoUrl] = useState([]);
    let reVdoUrlArr = [];

    const ResultVdoLoad = async () => {
        for (let i = 0; i < resultVdo.length; i++) {
            await axios.get('/api/did/thumb', {
                params: {filename: resultVdo[i].upload_fileName},
                headers: {Authorization: 'Bearer ' + localStorage.getItem("login"),},
                responseType: 'arraybuffer'
            }).then((res) => {
                if (res.status === 200) {
                    const contentType = res.headers['content-type'];
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        reVdoUrlArr.push({
                            id: resultVdo[i].idx,
                            url: imageURL,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                console.log(e);
            })
        }
        return setReVdoUrl(reVdoUrlArr);
    }

    let rePreviewEdit = [...reImgUrl, ...reVdoUrl];
    let arrIs = [...rePreviewEdit];
    //Img/Vdo 로딩중 아이디값 추가 되는 오류로 인한 아이디 중복제거
    const IdDedupe = arrIs.filter((item, id) => {
        return rePreviewEdit.findIndex((item1, id1) => {
            return item.id === item1.id
        }) === id
    });


    let PlayPreviewData = []; //순서값 재저장
    //drag&drud - 미리보기 최종데이터
    const [results, setResults] = useState([]);
    useEffect(() => {
        const copy = [...PlayPreviewData];
        setResults(copy);
    }, [reImgUrl, reVdoUrl]);


    for(let i = 0; i<Result.length; i++){
        for(let j = 0; j<IdDedupe.length; j++){
            if(Result[i].idx === IdDedupe[j].id){
                PlayPreviewData.push({
                        id: IdDedupe[j].id,
                        url: IdDedupe[j].url,
                        type: IdDedupe[j].type,
                        origin_fileName: Result[i]?.origin_fileName,
                        reg_date: Result[i]?.reg_date,
                        upload_fileName: Result[i]?.upload_fileName,
                        time: Result[i]?.time
                    }
                );
            }

        }
    }

    let editIdOrder = [];
    let editTimeOrder = [];
    for (let i = 0; i < results.length; i++) {
        editTimeOrder.push(results[i].time);
        editIdOrder.push(parseInt(results[i].id) === null ? 10000 : parseInt(results[i].id));
    }

    ///순서 변경
    const playOrderEditOnSubmit = async () => {
        await fetch('/api/did/insert', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify({
                file_idx: editIdOrder,
                time: editTimeOrder,
            })
        }).then(res => res.json());
        PlayBackListOnsubmit();
        alert('변경 완료 되었습니다.');
    }
    ////////////////////////미리보기 데이터표출 API END ////////////////

    ////////////////////////B - 현 재생 항목 스와이퍼 데이터표출 API Start////////////////
    //3. 스와이퍼 돌아가는 hook
    const [swiperIdx, setSwiperIdx] = useState(0);
    let resultImgVdo = [...Result];
    const [swiperUrl, setSwiperUrl] = useState([]);
    let playSwiperData = [];
    const SwiperOnDownload = async () => {
        for (let i = 0; i < resultImgVdo.length; i++) {
            await axios.get('/api/did/files', {
                params: {
                    filename: resultImgVdo[i].upload_fileName || "151dff4a-8bdb-4db2-a3a4-abb4b45a21b5_양산시정-페스티벌.jpg"
                },
                responseType: 'arraybuffer'
            }).then((res) => {
                if (res.status === 200) {
                    const contentType = res.headers['content-type'];
                    //동영상인 경우
                    if (contentType && contentType.startsWith('application/octet-stream')) {
                        const videoBlob = new Blob([res.data], {type: 'video/mp4'});
                        const videoURL = URL.createObjectURL(videoBlob);
                        playSwiperData.push({
                            id: resultImgVdo[i].idx,
                            url: videoURL,
                            time: parseInt(resultImgVdo[i].time),
                            type: 'video'
                        })
                    }
                    //이미지인 경우
                    else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        playSwiperData.push({
                            id: resultImgVdo[i].idx,
                            url: imageURL,
                            time: parseInt(resultImgVdo[i].time),
                            type: 'image'
                        })
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        }
        return setSwiperUrl(playSwiperData);
    }
    ////////////////////////B - 현 재생 항목 스와이퍼 데이터표출 API End////////////////


    ////////////////////////C - 체크값으로 재생 파일 선택하기////////////////
    const [checkItem, setCheckItem] = useState([]);

    //1. 단일 체크
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItem(prev => [...prev, id]);
        } else {
            setCheckItem(checkItem.filter((el) => el !== id))
        }
    };

    //2. 체크값 id 확인 후 삭제
    const onDelete = (targetId) => {
        const newResult = checkItem.filter((it) => it !== targetId);
        setCheckItem(newResult);
    }

    //3.체크된 값 배열 순서
    let checkResult = [];
    for (let i = 0; i < checkItem.length; i++) {
        for (let j = 0; j < fileList.length; j++) {
            if (checkItem[i] === fileList[j].idx) {
                checkResult.push({
                    checkId: fileList[j].idx,
                    origin_fileName: fileList[j].origin_fileName,
                    reg_date: fileList[j].reg_date,
                    upload_fileName: fileList[j].upload_fileName,
                    time: 0,
                })
            }

        }
    }


    //체크값 시간 값 받아오기
    const checkTime = [];


    //5. 재생 파일 생성
    const PlayFileInsertOnsubmit = async () => {
        await fetch(`/api/did/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify({
                file_idx: checkItem,
                time: checkTime,
            })
        }).then(res => res.json());
        setCheckItem([]);
        PlayBackListOnsubmit();
        ResultImgLoad();
        ResultVdoLoad();
    }

    return (
        <PlaybackContext.Provider value={{
            //현재 재생중인 목록
            playbackList,
            setPlayBackList,
            PlayBackListOnsubmit,

            //현재 재생리스트 미리보기
            ResultImgLoad,
            ResultVdoLoad,
            rePreviewEdit,
            IdDedupe,

            //미리보기 최종 데이터
            PlayPreviewData,
            results, setResults,

            // 순서 변경
            playOrderEditOnSubmit,

            //스와이퍼 돌리기
            SwiperOnDownload,
            swiperUrl,


            //스와이퍼 번호
            swiperIdx, setSwiperIdx,

            //파일 체크값
            checkItem, setCheckItem,
            handleSingleCheck,
            onDelete,

            //파일 add
            checkResult,
            checkTime,


            //재생목록생성
            PlayFileInsertOnsubmit,

            // checkResult,
            // uploadTime,
            // PlayFileInsertOnsubmit,
            // playList, playResult, playTimeResult,
            // result, id, idx,
            // playURL, setPlayURL,
            // playType, setPlayType,
            // NowPlayLoad,
            // resVdoArr
        }}>
            {children}
        </PlaybackContext.Provider>
    )
}