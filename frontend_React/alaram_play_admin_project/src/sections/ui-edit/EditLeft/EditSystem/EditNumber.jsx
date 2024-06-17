import {Chip, Stack,} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {ResizeContext} from "../../../../context/ResizeContext.jsx";

function EditNumber() {
   const {
       resizeList, setResizeList,
       ResizingDataOnSubmit,
       ResizingNumberUpdate,
   } = useContext(ResizeContext);

    useEffect(() => {
        ResizingDataOnSubmit();
    }, []);

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
        const newList = [...resizeList];
        const dragItemValue = newList[dragItem.current];
        newList.splice(dragItem.current, 1);
        newList.splice(dragOverItem.current, 0, dragItemValue);
        dragItem.current = null;
        dragOverItem.current = null;
        setResizeList(newList);
    };


    return (
        <div>
            {
                resizeList&&
                resizeList.map((item,idx) => (
                    <div
                        key={idx}
                        draggable
                        onDragStart={(e) => dragStart(e, idx)}
                        onDragEnter={(e) => dragEnter(e, idx)}
                        onDragEnd={drop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Stack direction="column-reverse" sx={{marginTop: 2}} spacing={1}>
                            <Chip
                                avatar={<Avatar>{idx+1}</Avatar>}
                                label={item.name}
                            />
                        </Stack>
                    </div>
                ))
            }

            <Button variant="contained" fullWidth sx={{marginTop: 2}} onClick={()=>{
                ResizingNumberUpdate();
            }}>
                화면 저장
            </Button>
            <br/>
        </div>
    )
}

export default EditNumber;