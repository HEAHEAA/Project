import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";

function MethodModal({open,handleClose}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    useEffect(()=>{
        setNext(false);
    },[]);
    //다음장 이벤트
    const [next,setNext] = useState(false);


    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        next === false ?
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    A. 등록
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ① 사용자 등록 할 수 있는 페이지로 이동 합니다.
                                </Typography>


                                <hr/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    B. PW 초기화
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ① 초기화를 원하는 사용자 목록을 체크 후, 'pw 초기화' 버튼을 누르면 초기화가 됩니다.
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ② 초기화된 비밀번호는 <br/> '사용자ID + 전화번호 뒤 4자리 + !!' 입니다.
                                </Typography>

                                <hr/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    C. 잠김해제
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ① 잠김 된 사용자를 체크 후 '잠김해제' 버튼을 누르면 해제가 됩니다.
                                </Typography>
                            </> : <>

                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    D. 휴먼해제
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ① 사용자 등록 할 수 있는 페이지로 이동 합니다.
                                </Typography>
                                <hr/>

                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    E. 모바일 앱 다운로드
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    ① 비대면사이트 앱으로 다운로드 받을 수 있습니다.
                                </Typography>


                            </>
                    }



                    <br/>
                    <Button variant="outlined" fullWidth onClick={()=>{setNext(!next);}}>
                        {next === false ? '다음' : '이전'}
                    </Button>
                    <Button variant="outlined" fullWidth sx={{marginTop: 1}} color={"warning"} onClick={handleClose}>닫기</Button>

                </Box>
            </Modal>
        </div>
    )
}
export default MethodModal;