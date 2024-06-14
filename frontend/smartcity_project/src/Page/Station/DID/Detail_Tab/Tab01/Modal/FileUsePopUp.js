import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FcHighPriority } from "react-icons/fc";

function FileUsePopUp({fileUse,handleFileClose}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        color: "black",
        border: '2px solid orange',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return(
        <div>
            <Modal
                open={fileUse}
                onClose={handleFileClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <FcHighPriority fontSize={30} style={{marginRight: "1vh"}}/>  파일을 선택해주세요.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button variant="contained" fullWidth onClick={handleFileClose}>닫기</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
export default FileUsePopUp;