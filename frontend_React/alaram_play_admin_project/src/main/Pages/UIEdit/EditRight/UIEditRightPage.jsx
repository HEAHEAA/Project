import Button from "@mui/material/Button";
import { BsFillSaveFill,BsXLg } from "react-icons/bs";
import {useContext, useState} from "react";
import {DisplayResize} from "../../../../api/UIEdit/Display/DisplayResize.jsx";
import { MdPreview } from "react-icons/md";
import PreviewPlay from "./modal/PreviewPlay.jsx";

function UIEditRightPage(){
    const {
        //1. 사이징/ui순서
        ResizingNumberUpdate,
        //1. 대기
        UpdateSensorOnsubmit,

        previewOpen, setPreviewOpen,
        handlePreviewOpen,
        handlePreviewClose,
    } = useContext(DisplayResize);


    return(
        <div>
            <div className="edit-modal">
                <PreviewPlay open={previewOpen} handleClose={handlePreviewClose}/>

                <Button variant="contained" fullWidth onClick={()=>{
                    if(window.confirm('전체 적용 하시겠습니까?')) {
                        ResizingNumberUpdate();
                        UpdateSensorOnsubmit();
                        alert('적용 완료 되었습니다.');
                    }
                }}>
                    전체 적용 &nbsp; <BsFillSaveFill/>
                </Button>

                <Button variant="contained" fullWidth onClick={()=>{
                    handlePreviewOpen();
                }}>
                    미리보기 &nbsp; <MdPreview />
                </Button>

                <Button variant="contained" fullWidth color={"inherit"}>
                    취소 &nbsp; <BsXLg/>
                </Button>
            </div>


        </div>
    )
}
export default UIEditRightPage;