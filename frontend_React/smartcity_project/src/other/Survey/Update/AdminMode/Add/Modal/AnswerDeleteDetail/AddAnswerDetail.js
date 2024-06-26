import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function AddAnswerDetail({open,handleClose,svAnswerEditSubmit}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: "white",
        bgcolor: 'background.paper',
        border: '2px solid #000',
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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        답변을 삭제하시겠습니까?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button variant="contained" fullWidth onClick={()=>{
                            svAnswerEditSubmit();
                            handleClose();
                        }}>예</Button>
                        <Button variant="contained" fullWidth color={"error"} sx={{marginTop: 1}} onClick={()=>{
                            handleClose();
                        }}>아니오</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
export default AddAnswerDetail;