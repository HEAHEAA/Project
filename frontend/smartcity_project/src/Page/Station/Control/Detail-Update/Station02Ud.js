import {useContext} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import * as React from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import ARCO from "./Station02UpdateFrom/ARCO";
import ARSS from "./Station02UpdateFrom/ARSS";
import UVCD from "./Station02UpdateFrom/UVCD";
import CHGR from "./Station02UpdateFrom/CHGR";
import PPCT from "./Station02UpdateFrom/PPCT";
import HTBC from "./Station02UpdateFrom/HTBC";
import ATDR from "./Station02UpdateFrom/ATOR";
import LDLT from "./Station02UpdateFrom/LDLT";

function Station02Ud({open, handleClose}) {
    const {dvcTypeCd} = useContext(StationContext);

    //모달스타일
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 600,
        overflow: "auto",
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };


    if (dvcTypeCd === 'ARCO') { //냉난방기
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
                            버스정류장 냉난방기[ARCO]제어
                        </Typography>
                        <br/>
                        <Box width="95%" style={{marginLeft: "2.5%"}}>
                            <ARCO handleClose={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    if (dvcTypeCd === 'ARSS') { //환경센서
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
                            버스정류장 환경센서 상세보기
                        </Typography>
                        <br/>

                        <Typography id="modal-modal-title" variant="p" component="p">
                            환경센서 데이터는 수정 할 수 없습니다.
                        </Typography>

                        <Box width="95%" style={{marginLeft: "2.5%", marginTop: "2vh"}}>
                            <ARSS handleClose={handleClose}/>

                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    if (dvcTypeCd === 'UVLD') {
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
                            버스정류장 UVC LED[UVLD] 제어
                        </Typography>
                        <br/>
                        <Box width="95%" style={{marginLeft: "2.5%"}}>
                            <UVCD handleClose={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    if (dvcTypeCd === 'CHGR') {
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
                            버스정류장 충전기[CHGR] 제어
                        </Typography>
                        <br/>
                        <Box width="95%" style={{marginLeft: "2.5%"}}>
                            <CHGR handleClose={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    if (dvcTypeCd === 'LDLT') {
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
                            버스정류장 LED조명[LDLT] 제어
                        </Typography>
                        <br/>
                        <Box width="95%" style={{marginLeft: "2.5%"}}>
                            <LDLT handleClose={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    if (dvcTypeCd === 'ATDR') {
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
                            버스정류장 자동문[ATDR] 제어
                        </Typography>
                        <br/>
                        <Box width="95%" style={{marginLeft: "2.5%"}}>
                            <ATDR handleClose={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    if (dvcTypeCd === 'HTBC') {
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
                            버스정류장 온열벤치[HTBC] 제어
                        </Typography>
                        <br/>
                        <Box width="95%" style={{marginLeft: "2.5%"}}>
                            <HTBC handleClose={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }
    if (dvcTypeCd === 'PPCT') {
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
                            버스정류장 피플카운터[PPCT] 상세보기
                        </Typography>
                        <br/>
                        <Typography id="modal-modal-title" variant="p" component="p">
                            피플카운터 데이터는 수정 할 수 없습니다.
                        </Typography>

                        <Box width="95%" style={{marginLeft: "2.5%", marginTop: "2vh"}}>
                            <PPCT handleClose={handleClose}/>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }


}

export default Station02Ud;