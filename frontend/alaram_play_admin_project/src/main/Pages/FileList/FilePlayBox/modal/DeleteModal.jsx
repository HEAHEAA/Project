import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import {useContext} from "react";
import {FileListContext} from "../../../../../api/FileList/FileListContext.jsx";

function DeleteModal({open,handleClose}){
    const { FileDataDelete} = useContext(FileListContext);
    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="delete-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                       <strong>파일 삭제</strong>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                        정말 삭제 하시겠습니까?
                    </Typography>


                    <div className="dl-modal-btn">
                        <Button variant="contained" color={"inherit"} onClick={()=>{
                            FileDataDelete();
                            handleClose();

                        }}>삭제</Button>
                        <Button variant="contained" onClick={handleClose}>취소</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
export default DeleteModal;