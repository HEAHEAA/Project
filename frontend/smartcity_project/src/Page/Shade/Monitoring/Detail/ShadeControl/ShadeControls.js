import Typography from "@mui/material/Typography";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {TbApiApp} from "react-icons/tb";
import {useContext} from "react";
import {ShadeContext} from "../../../../../ContextServer/ShadeContext";
import Button from "@mui/material/Button";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

function ShadeControls({open, handleClose}) {
    const {onOff, shadeOffOnControlSubmit} = useContext(ShadeContext);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: "black",
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: '10px',
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <TbApiApp/> 스마트그늘막 제어속성
                    </Typography>

                    <hr/>
                    <Typography id="modal-modal-title" variant="h6" component="p">
                        {
                            onOff === 1 ? '자동으로 변경하시겠습니까?' : (
                                onOff === 2 ? '접힘으로 변경하시겠습니까?' : (
                                    onOff === 3 ? '전체자동으로 변경하시겠습니까?' : (
                                        onOff === 4 ? '전체수동으로 변경하시겠습니까?' : null
                                    )
                                )
                            )
                        }
                    </Typography>

                    <br/>
                    <Button variant="outlined" onClick={()=>{
                        shadeOffOnControlSubmit();
                        handleClose();
                    }}>
                        예 <AiOutlineCheck/>
                    </Button>
                    <Button variant="outlined" color={"error"} onClick={()=>{handleClose()}} sx={{marginLeft: 1}}>
                        아니오 <AiOutlineClose/>
                    </Button>


                </Box>
            </Modal>
        </div>
    )
}

export default ShadeControls;