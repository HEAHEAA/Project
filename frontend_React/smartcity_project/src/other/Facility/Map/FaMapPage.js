import React, {useContext, useEffect, useState} from "react";
import {FacilityContext} from "../../../ContextServer/FacilityContext";
import Button from "@mui/material/Button";
import Fac02New from "../Detail/Fac02New/Fac02New";

function FaMapPage() {
    const {
        selectNum,
        setSelectNum,
        flIdx,
        setFlIdx,
        FacListSelet,
        setMapSize,
    } = useContext(FacilityContext)

    useEffect(() => {
        FacListSelet();
    }, [flIdx]);

    //입력 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Fac02New open={open} handleClose={handleClose}/>
            <Button
                variant="outlined"
                size={"large"}
                onClick={() => {
                    handleOpen();
                    setMapSize(true);
                }}
                sx={{marginTop: -3,position:"relative", zIndex: 9999999}}
                fullWidth>
                시설물 생성
            </Button>

            {/*{*/}
            {/*    selectNum === "1" ? <ModalMap flIdx={flIdx} setFlIdx={setFlIdx}/> : null*/}
            {/*}*/}
        </div>
    )
}

export default FaMapPage;