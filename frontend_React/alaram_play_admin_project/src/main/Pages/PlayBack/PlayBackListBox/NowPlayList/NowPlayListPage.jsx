import {useContext, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
import {RiDraggable} from "react-icons/ri";
import {PiCheckFatDuotone} from "react-icons/pi";
import {PlaybackContext} from "../../../../../api/PlayBack/PlaybackContext.jsx";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import { BiErrorCircle } from "react-icons/bi";

function NowPlayListPage() {
    const {
        ResultImgLoad,// 이미지미리보기 로드
        ResultVdoLoad, // 비디오 미리보기 로드
        results, setResults, //drag&drug
        playOrderEditOnSubmit,
    } = useContext(PlaybackContext);

    useEffect(() => {
        // 파일 로드
        ResultImgLoad();
        ResultVdoLoad();
    }, []);

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

    return (
        <div>
            <p className="drag-drop-tip"><strong>TIP !</strong> 마우스로 드래그 하여, 파일의 순서를 변경 할 수 있습니다.</p>

            <div className="file-list-select">
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
                                results.map((item, idx) => (
                                    <div
                                        key={idx}
                                        draggable
                                        onDragStart={(e) => dragStart(e, idx)}
                                        onDragEnter={(e) => dragEnter(e, idx)}
                                        onDragEnd={drop}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <div>
                                            <section>
                                                <div className="preview-num-box">
                                                    <h1><RiDraggable className="preview-drag-icon"/></h1>
                                                </div>
                                                <div className="preview-play-mini-box">
                                                    <div className="dis-content-img04">
                                                        <div className="dis-content-img-div04">
                                                            <img src={item.url} alt="Media"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="preview-play-text-box">
                                                    <p>파일명 : {item.origin_fileName}</p>
                                                    <p>확장자
                                                        : {item.upload_fileName?.substring(item.upload_fileName.indexOf('.'))} </p>
                                                    <p>업로드일 : {item.reg_date} </p>
                                                </div>
                                                <div className="preview-num-box">
                                                    <Button>Play {idx + 1}</Button>
                                                </div>
                                            </section>
                                        </div>

                                    </div>
                                ))}
                        </div>
                }
                <div className="file-play-btn">
                    <Button variant="contained" fullWidth onClick={() => {
                        if (window.confirm('저장하시겠습니까?')) {
                            playOrderEditOnSubmit();
                        }
                    }}>
                        저장 하기&nbsp; <PiCheckFatDuotone/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NowPlayListPage;