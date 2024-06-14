import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";
import { AiOutlineCheck,AiOutlineClose } from "react-icons/ai";

function Station01Ud({NodeUpdate,open,handleClose,useYn}) {
    //모달스타일
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {
                        useYn === 0 ? <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                            수동모드로 변경하시겠습니까?
                        </Typography> : <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"}>
                            자동모드로 변경하시겠습니까?
                        </Typography>
                    }

                    <Button variant="outlined" fullWidth sx={{marginTop: 2, width: "48%"}} color={"success"} onClick={()=>{
                        NodeUpdate();
                        handleClose();
                    }}>
                        예 <AiOutlineCheck/>
                    </Button>
                    <Button variant="outlined" fullWidth sx={{marginTop: 2,width: "48%", marginLeft: "2%"}} color={"error"} onClick={()=>{
                        handleClose();
                    }}>
                        아니오<AiOutlineClose/>
                    </Button>


                </Box>
            </Modal>
        </div>
    )
}

export default Station01Ud;