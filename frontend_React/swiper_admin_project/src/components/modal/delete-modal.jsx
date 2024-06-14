import Box from "@mui/material/Box";
import {ModalStyles} from "../../theme/mui-style-query.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {useContext} from "react";
import {ModalContext} from "../../context/config/ModalContext.jsx";

export const DeleteModal = () => {
    const {deleteModal, handleDeleteClose} = useContext(ModalContext);
    return (
        <Modal
            open={deleteModal}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <strong>삭제</strong>
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 1}}>
                    정말 삭제 하시겠습니까?
                </Typography>

                <div style={{width: "100%", height: "50px", textAlign: "right", marginTop: "30px"}}>
                    <Button color={"inherit"} variant="contained">
                        삭제
                    </Button>

                    <Button variant="contained"
                            sx={{marginLeft: 1}}
                            onClick={handleDeleteClose}
                    >
                        취소
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}
