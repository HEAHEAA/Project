import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {FcNext} from "react-icons/fc";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useContext} from "react";
import {AppContext} from "../../../../api/customer/AppContext.jsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #726bea',
    boxShadow: 24,
    p: 4,
};

function EmailPOP({open, handleClose}) {
    const { usrEmail,setUsrEmail, EmailInsertOnsubmit,} = useContext(AppContext);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <FcNext/> 사용자 ID 등록
                    </Typography>

                    <Typography id="modal-modal-description" sx={{mt: 3}}>
                        <hr/>
                    </Typography>

                    <Typography id="modal-modal-description" sx={{mt: 4, marginBottom: 4}}>
                        <label>사용자 ID</label>
                        <TextField id="filled-basic"
                                   label="abc@gamil.com"
                                   variant="filled"
                                   helperText="사용자 아이디 형식을 지켜서 작성 바랍니다."
                                   fullWidth
                                   sx={{marginTop: 1}}
                                   value={usrEmail}
                                   onChange={(e) => setUsrEmail(e.target.value)}
                        />

                        <Button variant="outlined" fullWidth sx={{marginTop: 1}}>중복확인</Button>
                    </Typography>

                    <hr/>
                    <Typography id="modal-modal-description" sx={{mt: 2, marginBottom: 2,}}>
                        <Button variant="contained" sx={{marginLeft: 13}}
                                onClick={() => {
                                    if(usrEmail !== null) {
                                        EmailInsertOnsubmit();
                                        handleClose();
                                    }
                                }}
                        >
                            확인
                        </Button>
                        <Button variant="contained" color={"warning"} sx={{marginLeft: 0.5}}
                                onClick={() => {
                                    handleClose();
                                }}
                        >
                            취소
                        </Button>
                    </Typography>

                </Box>
            </Modal>
        </div>
    )
}

export default EmailPOP;