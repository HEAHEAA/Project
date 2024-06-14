import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import {ControlContext} from "../../../../../../../ContextServer/ControlContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FcHighPriority } from "react-icons/fc";
import { AiOutlineCheck,AiOutlineExclamationCircle } from "react-icons/ai";

function DiDFileDelete({modal, handleClose}) {
    const {
        DeleteDID, deleteFileName
    } = useContext(ControlContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const [openModal, setOpenModal] = React.useState(false);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);


    return (
        <div>
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 600}}>
                    <Grid container spacing={3}>
                        <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                            <BsFillTrash3Fill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                            파일삭제
                        </Typography>
                        <Grid item xs={12} sm={12}>
                            <label>파일명</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={deleteFileName}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Button variant="contained" color="error" style={{float: "right"}} onClick={() => {
                            handleModalOpen();
                    }} fullWidth>
                        삭제
                    </Button>

                    <DeleteModal
                        handleClose={handleClose}
                        DeleteDID={DeleteDID}
                        handleModalOpen={handleModalOpen}
                        handleModalClose={handleModalClose}
                        openModal={openModal}
                    />
                </Box>
            </Modal>
        </div>
    )
}


function DeleteModal({handleModalClose,openModal,DeleteDID,handleClose}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
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
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       <FcHighPriority fontSize={25}/> 정말 삭제하시겠습니까?
                    </Typography>

                    <Typography sx={{marginTop: 2, width: "100%"}}>

                        <Button variant="outlined" fullWidth onClick={()=>{
                            DeleteDID();
                            handleModalClose();
                            handleClose();
                        }}>
                            예 <AiOutlineCheck style={{marginLeft: "1vh"}}/>
                        </Button>

                        <Button variant="outlined" color={"error"} sx={{marginTop: 1}} fullWidth onClick={()=>{
                            handleModalClose();
                        }}>
                            아니오<AiOutlineExclamationCircle style={{marginLeft: "1vh"}}/>
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default DiDFileDelete;