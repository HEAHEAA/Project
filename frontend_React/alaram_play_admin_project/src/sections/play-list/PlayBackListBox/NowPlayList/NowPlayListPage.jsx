import {useContext, useRef} from "react";
import Button from "@mui/material/Button";
import {PiCheckFatDuotone} from "react-icons/pi";
import {RiDraggable} from "react-icons/ri";
import {PlayContext} from "../../../../context/PlayContext.jsx";
import {PlayListPreview} from "../../../../hooks/sections/play/UsePlayPreview.jsx";

function NowPlayListPage() {
    const { resultImg, resultVdo,ResultIdDedupe} = useContext(PlayContext);

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
        const newList = [];
        const dragItemValue = newList[dragItem.current];
        newList.splice(dragItem.current, 1);
        newList.splice(dragOverItem.current, 0, dragItemValue);
        dragItem.current = null;
        dragOverItem.current = null;
        // setResults(newList);
    };



    return (
        <div>
            <div className="file-list-select">
                <PlayListPreview resultImg={resultImg} resultVdo={resultVdo} ResultIdDedupe={ResultIdDedupe}/>

            </div>
        </div>
    )
}

export default NowPlayListPage;
