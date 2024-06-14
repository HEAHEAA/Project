import {ModalStyles} from "../../../theme/mui-style-query.jsx";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {BlockSharp} from "@mui/icons-material";
import Button from "@mui/material/Button";
const RoleModal = ({handleClose,role}) => {
    return(
        <Modal
            open={role}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles}>
               <div className="role-stop">
                   <BlockSharp className="role-stop-icon" sx={{fontSize: 120, color: "tomato"}}/>
               </div>
                <div className="role-stop-title">
                    <h2>접근 권한이 없습니다 !</h2>
                </div>
                <Button variant="contained" fullWidth onClick={handleClose} color={"inherit"}>
                    닫기
                </Button>
            </Box>
        </Modal>
    )
}
export default RoleModal;
