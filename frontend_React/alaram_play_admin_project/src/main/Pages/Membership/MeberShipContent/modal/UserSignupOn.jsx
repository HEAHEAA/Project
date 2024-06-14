import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useContext} from "react";
import {MemberContext} from "../../../../../api/MemberShip/MemberContext.jsx";
import { GiCheckMark } from "react-icons/gi";
import { FiX } from "react-icons/fi";

function UserSignupOn({open,handleClose}){
    const {checkItem,UserSignOnOnSubmit} = useContext(MemberContext);
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
                <Box sx={style} className="mbs-user-update-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <strong>승인 대기 목록</strong>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        승인 할 회원 아이디와 동일시, 승인버튼을 눌러주세요.
                    </Typography>

                    <hr/>
                    <ul>
                        {
                            checkItem.map((arr) => (
                                <li key={arr}>{arr}</li>
                            ))
                        }
                    </ul>

                    <br/>



                    <Button variant="contained" fullWidth onClick={()=>{
                        UserSignOnOnSubmit();
                        handleClose();
                    }}>
                        승인 &nbsp;<GiCheckMark />
                    </Button>

                    <Button
                        variant="contained"
                        fullWidth
                        color={"inherit"}
                        sx={{marginTop: 1}}
                        onClick={()=>{
                            handleClose();
                        }}
                    >
                        취소  &nbsp;<FiX />
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
export default UserSignupOn;