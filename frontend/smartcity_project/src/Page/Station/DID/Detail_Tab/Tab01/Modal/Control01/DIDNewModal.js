import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Backdrop, CircularProgress, Modal} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useContext, useState} from "react";
import {ControlContext} from "../../../../../../../ContextServer/ControlContext";
import axios from "axios";
import {LoginContext} from "../../../../../../../ContextServer/LoginContext";
import {BiLinkAlt} from "react-icons/bi";
import {BsFillPlusCircleFill} from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

function DIDNewModal({open, handleNewClose}) {
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetDIDList,fileUpdateLoading,setFileUpdateLoading, fileUpdate,setFileUpdate,} = useContext(ControlContext);

    const [ok, setOk] = useState(false);
    const handleOkOpen = () => setOk(true);
    const handleOkClose = () => setOk(false);


    //신규생성
    const onSubmit = async (e) => {
        e.preventDefault();
        e.persist();

        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }

        let files = e.target.profile_files.files;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        const post = await axios({
            method: "POST",
            url: '/api/board/playlist/upload',
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: 'Bearer ' + ac,
            },
            data: formData,
        });
        GetDIDList();
        handleOkOpen();
        setFileUpdateLoading(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    return (
        <div>
            <styles>
                <Modal
                    open={open}
                    onClose={handleNewClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{...style, width: 600, overflow: "auto"}}>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <Grid container spacing={3}>
                                <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                                    <BsFillPlusCircleFill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                                    파일 신규생성
                                </Typography>

                                <Grid item xs={12} sm={12}>
                                    <label htmlFor="file" className="file-set2"><p>File Upload<BiLinkAlt/></p></label>
                                    <TextField
                                        type="file"
                                        name="profile_files"
                                        id="file"
                                        accept="image/*"
                                        fullWidth
                                        style={{display: "none"}}
                                    />
                                </Grid>
                            </Grid>
                            <br/>
                            <Button variant="contained" fullWidth type={"submit"} onClick={()=>{
                                setFileUpdate(true);
                            }}>완료</Button>
                        </form>

                        {
                            fileUpdateLoading === true ? (
                                fileUpdate === true ? <div>
                                    <CircularProgress color="secondary" />
                                    <p>파일 업데이트 중입니다....</p>
                                </div> : null
                            ) : null
                        }

                        <OkModal ok={ok} handleOkClose={handleOkClose} handleNewClose={handleNewClose}/>
                    </Box>
                </Modal>
            </styles>
        </div>
    )
}


function OkModal({handleOkClose, ok,handleNewClose}){

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    return(
        <div>
            <Modal
                open={ok}
                onClose={handleOkClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 600 }}>
                    <h5 id="child-modal-title"> <AiOutlineCheck fontSize={30}/> 파일이 정상적으로 업데이트 되었습니다. </h5>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button variant="outlined" fullWidth onClick={()=>{
                            handleOkClose();
                            handleNewClose();
                        }}>확인</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default DIDNewModal;