import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import {DeleteFileMutation} from "../../../../hooks/sections/file/UseFile.jsx";
import {useContext} from "react";
import {FileContext} from "../../../../context/FileContext.jsx";

function DeleteModal({open,handleClose}){
    const {singleFile,setSingleFile} = useContext(FileContext);
    const {mutate:deleteFileId} = DeleteFileMutation();
    const handleDeleteFile = () => {
        const data = {idx:singleFile.id}
        deleteFileId(data);
    }

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
                            handleDeleteFile();
                            handleClose();
                            setSingleFile({
                                id: 0,
                                ImgUrl: '',
                                origin_fileName: '',
                                upload_fileName: '',
                                reg_date: ''
                            })
                        }}>삭제</Button>
                        <Button variant="contained" onClick={handleClose}>취소</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
export default DeleteModal;