import {MenuItem, Modal, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {BsCameraReelsFill} from "react-icons/bs";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ControlContext} from "../../../../../../ContextServer/ControlContext";
import {LoginContext} from "../../../../../../ContextServer/LoginContext";
import PlayModalUpdateFirst from "./PlayModalUpdateFirst";
import PlayModalUpdateSecond from "./PlayModalUpdateSecond";

function PlayListUpdate({open, handleClose}) {
    const {access, RefreshToken} = useContext(LoginContext);
    const {
        upEdit, setUpEdit,
        UpStart, setUpStart,
        UpEnd, setUpEnd,
        UpTime, setUpTime,
        UpTitle, setUpTitle,
        UpContent, setUpContent,
        playList, PlayDIDList,
        UpUseYN, setUpUseYN, PlayDidDetail
    } = useContext(ControlContext);

    const [first,setFirst] = useState(false);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 800,
        "&::-webkit-scrollbar": {
            width: 10,
            height: 10,
            cursor: "default"
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#565656",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#3d3d3d",
            borderRadius: 0
        },
        overflow: "auto",
        color: "black",
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };


    useEffect(()=>{
        PlayDidDetail();
    },[upEdit]);


    const UseUN = async () => {
        for (let list of playList) {
            if (list.pm_idx === upEdit) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/board/updateUse`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        pm_use: UpUseYN,
                        pm_idx: list.pm_idx
                    })
                })
            }
        }
    }



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <BsCameraReelsFill/> 재생목록 수정
                    </Typography>
                    <hr/>


                    {
                        first === true ? <PlayModalUpdateSecond UseUN={UseUN} handleClose={handleClose} firs={first} setFirst={setFirst}/>
                            : <PlayModalUpdateFirst firs={first} setFirst={setFirst}/>
                    }





                </Box>
            </Modal>
        </div>
    )
}

export default PlayListUpdate;