import axios from "axios";
import {useQueries, useQueryClient} from "react-query";
import {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import {RiDraggable} from "react-icons/ri";
import Button from "@mui/material/Button";
import {PiCheckFatDuotone} from "react-icons/pi";


//이미지 썸네일
const fetchPlayImgPreview = Image => {
    return axios.get(`/api/did/files`, {
        params: {filename: Image || 'bf42f7c5-d3e6-4cc6-81f7-96480b067140_부산tp-공고01.jpg'},
        responseType: 'arraybuffer'
    })
}

//비디오 썸네일
const fetchPlayVdoPreview = Video => {
    return axios.get('/api/did/thumb', {
        params: {filename: Video || 'ef5c99df-5be5-4912-89f1-c2fd1ece676d_꽃.mp4'},
        headers: {Authorization: 'Bearer ' + localStorage.getItem("login"),},
        responseType: 'arraybuffer'
    })
}

export const PlayListPreview = ({resultVdo, resultImg, ResultIdDedupe}) => {

    const imgResult = useQueries(
        resultImg.map(list => {

            return {
                queryKey: ['play-preview-img', list.upload_fileName],
                queryFn: () => fetchPlayImgPreview(list.upload_fileName)
            }
        }),
    )

    const vdoResult = useQueries(
        resultVdo.map(list => {
            return {
                queryKey: ['play-preview-video', list.upload_fileName],
                queryFn: () => fetchPlayVdoPreview(list.upload_fileName)
            }
        }),
    )


    /**
     * 이미지 -미리보기
     * **/
    let imgPreview = [];
    for (let i = 0; i < imgResult.length; i++) {
        if (imgResult[i]?.status === 'success') {

            const contentType = imgResult[i]?.data.headers['content-type']
            if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg') || contentType.startsWith('image/jpg'))) {
                const ImgBlob = new Blob([imgResult[i].data.data], {type: contentType});
                const imageURL = URL.createObjectURL(ImgBlob);
                imgPreview.push({
                    id: resultImg[i].idx,
                    url: imageURL,
                    time: parseInt(resultImg[i].time),
                    type: 'image',
                    origin_fileName: resultImg[i].origin_fileName,
                    reg_date: resultImg[i].reg_date,
                    upload_fileName: resultImg[i].upload_fileName
                })
            }
        }
    }


    /**
     * 비디오 -미리보기
     * **/
    let vdoPreview = []; //비디오 미리보기
    for (let i = 0; i < vdoResult.length; i++) {
        if (vdoResult[i]?.status === 'success') {
            const contentType = vdoResult[i]?.data.headers['content-type']
            if (contentType && contentType.startsWith('application/octet-stream')) {
                const VdoBlob = new Blob([vdoResult[i].data.data], {type: 'video/mp4'});
                const VdoURL = URL.createObjectURL(VdoBlob);
                vdoPreview.push({
                    id: resultImg[i].idx,
                    url: VdoURL,
                    time: parseInt(resultImg[i].time),
                    type: 'image',
                    origin_fileName: resultImg[i].origin_fileName,
                    reg_date: resultImg[i].reg_date,
                    upload_fileName: resultImg[i].upload_fileName
                })
            }
        }
    }

    //순서 재맞춤
    let EditIdDedupe = [...imgPreview, ...vdoPreview]

    /**
     * 현재 재생목록 최종 데이터
     */
    let PreviewResult = [];
    for (let i = 0; i < ResultIdDedupe.length; i++) {
        for (let j = 0; j < EditIdDedupe.length; j++) {
            if (ResultIdDedupe[i].idx === EditIdDedupe[j].id) {
                PreviewResult.push({
                    id: EditIdDedupe[j].id,
                    url: EditIdDedupe[j].url,
                    time: EditIdDedupe[j].time,
                    type: EditIdDedupe[j].type,
                    origin_fileName: EditIdDedupe[j].origin_fileName,
                    reg_date: EditIdDedupe[j].reg_date,
                    upload_fileName: EditIdDedupe[j].upload_fileName
                })
            }
        }
    }



    //드래그앤 드롭 넣을 데이터
    let [results, setResults] = useState([]);
    useEffect(() => {
        setResults(PreviewResult);
    }, [PreviewResult.length]);


    /**
     * 드래그 앤 드롭 이벤트 로직
     */
        //1. 파일 테스트용
    const dragItem = useRef(); // 드래그할 아이템의 인덱스
    const dragOverItem = useRef(); // 드랍할 위치의 아이템의 인덱스

    // 드래그 시작될 때 실행
    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    // 드래그중인 대상이 위로 포개졌을 때
    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    // 드랍 (커서 뗐을 때)
    const drop = (e) => {
        const newList = [...results];
        const dragItemValue = newList[dragItem.current];
        newList.splice(dragItem.current, 1);
        newList.splice(dragOverItem.current, 0, dragItemValue);
        dragItem.current = null;
        dragOverItem.current = null;
        setResults(newList);
    };




    /**
     * 드래그앤 드롭 순서 바꾼 데이터 - DB 적용
     * */

    let editIdOrder = [];
    let editTimeOrder = [];
    for(let i =0; i<results.length; i++){
        editTimeOrder.push(results[i].time);
        editIdOrder.push(parseInt(results[i].id));
    }

    //순서 변경
    const queryClient = useQueryClient();
    const DragAndDropEditChange = async () => {
        await fetch('/api/did/insert',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                file_idx: editIdOrder,
                time: editTimeOrder,
                node_id: parseInt(localStorage.getItem('node'))
            })
        }).then(res => res.json())
        queryClient.invalidateQueries('play-list');
    }

    return (

        <div>

            {
                results.length === 0 ?
                    <div>
                        <Box sx={{display: 'flex'}}>
                            <CircularProgress size={'50%'} sx={{marginLeft: '25%'}}/>
                        </Box>
                        <h1 style={{textAlign: "center"}}>잠시만 기다려주세요</h1>
                    </div> :
                    <div>
                        {
                            results &&
                            results.map((arr, inx) => (
                                <div
                                    key={inx}
                                    draggable
                                    onDragStart={(e) => dragStart(e, inx)}
                                    onDragEnter={(e) => dragEnter(e, inx)}
                                    onDragEnd={drop}
                                    onDragOver={(e) => e.preventDefault()}>
                                    <div>
                                        <section>
                                            <div className="preview-num-box">
                                                <h1><RiDraggable className="preview-drag-icon"/></h1>
                                            </div>

                                            <div className="preview-play-mini-box">
                                                <div className="dis-content-img04">
                                                    <div className="dis-content-img-div04">
                                                        <img src={arr?.url} alt="Media"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="preview-play-text-box">
                                                <p>파일명 : {arr?.origin_fileName}</p>
                                                <p>확장자
                                                    : {arr?.upload_fileName?.substring(arr?.upload_fileName.indexOf('.'))}</p>
                                                <p>업로드일 :{arr?.reg_date}</p>
                                            </div>
                                            <div className="preview-num-box">
                                                <Button>Play {inx + 1}</Button>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
            <div className="file-play-btn">
                <Button variant="contained" fullWidth onClick={()=>{
                    if(window.confirm('정말 변경 하시겠습니까?')){
                        DragAndDropEditChange();
                        alert('변경 완료 되었습니다.');
                }}}>
                    저장 하기&nbsp; <PiCheckFatDuotone/>
                </Button>
            </div>

        </div>
    )

}



