import Button from "@mui/material/Button";
import { BsFillSaveFill,BsXLg } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import PreviewPlay from "./modal/PreviewPlay.jsx";
import {useContext} from "react";
import {ResizeContext} from "../../../context/ResizeContext.jsx";

function UIEditRightPage(){
    const {
       setReSizeBoolean,
        handleOpen,
        ResizingNumberUpdate
    } = useContext(ResizeContext);


    return(
        <div>
            <div className="edit-modal">
                <PreviewPlay />
                <Button variant="contained" fullWidth onClick={()=>{
                    ResizingNumberUpdate();
                }}>
                    전체 적용 &nbsp; <BsFillSaveFill/>
                </Button>

                <Button variant="contained" fullWidth onClick={()=>{
                    setReSizeBoolean(false);
                    handleOpen();
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