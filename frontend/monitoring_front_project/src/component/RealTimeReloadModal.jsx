import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {darkMode, themes} from "../theme/darkThme.jsx";
import {useContext, useEffect, useState} from "react";
import {CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {DashboardContext} from "../context/dashboardContext.jsx";
import {RealtimeContext} from "../context/realtimeContext.jsx";
import {ErrInfoContext} from "../context/errInfoContext.jsx";

export const RealTimeReloadModal = ({open,handleClose}) => {
    const {StateData} = useContext(DashboardContext);
    const {realTimeModal} = useContext(RealtimeContext);
    const stroage = JSON.parse(localStorage.getItem('theme'))  === null ? darkMode : JSON.parse(localStorage.getItem('theme'));

    let [getCwl,setGetCwl] = useState(true);
    useEffect(() => {
        if(realTimeModal === true){
            let timer = setTimeout(()=> setGetCwl(false), 3000);
            return () => clearTimeout(timer);
        }else {
            setGetCwl(true);
        }
    }, [realTimeModal]);


    const {
        ErrInfoByDateOnSubmit
    }= useContext(ErrInfoContext);


    return(
        <div>
            <Modal
                open={open}
                onClose={()=>{
                    handleClose();
                    ErrInfoByDateOnSubmit();
                    setGetCwl(true);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={stroage.err_modal} className="modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        실시간 데이터 확인
                    </Typography>

                    {
                        getCwl === true ?
                            <div>
                                <p style={{textAlign: "center"}}><small>실시간으로 데이터를 불러는 중 입니다.</small></p>
                                <p style={{textAlign: "center"}}>잠시만 기다려주세요.</p>
                                <Stack spacing={15} direction="row" className="real-time-loading">
                                    <CircularProgress size={150} sx={{textAlign:"center"}}/>
                                </Stack>
                            </div>
                            :
                            <div>

                                <p style={{color: localStorage.getItem('mode') === 'dark' ? 'orange' : '#1c63c2'}}>
                                    점검시각 : {StateData[0]?.time}
                                </p>
                                <div className="real-time-table">
                                    <TableContainer>
                                        <Table>
                                            <TableHead sx={themes.dash_table_head}>
                                                <TableRow>
                                                    <TableCell size={"small"} sx={{color: themes.color}}>
                                                        <h4 style={{textAlign: "left"}}>#</h4>
                                                    </TableCell>
                                                    <TableCell size={"small"} sx={{color: themes.color}}>
                                                        <h4 style={{textAlign: "left"}}>지역</h4>
                                                    </TableCell>
                                                    <TableCell size={"small"} sx={{color: themes.color}}>
                                                        <h4 style={{textAlign: "left"}}>성공 유/무</h4>
                                                    </TableCell>
                                                </TableRow>

                                            </TableHead>

                                            <TableBody sx={themes.dash_table_body}>
                                                {
                                                    StateData.length === 0 ? <div className="not-error-text"
                                                                                  style={{color: localStorage.getItem('mode') === 'dark' ? 'white' : 'black'}}>
                                                        실시간 데이터가 없습니다.
                                                    </div> : <>
                                                        {
                                                            StateData.map((arr,i) => (
                                                                <TableRow key={arr.id}>
                                                                    <TableCell size={"small"} sx={{color: themes.color}} >
                                                                        <h4 style={{textAlign: "left"}}>{i+1}</h4>
                                                                    </TableCell>
                                                                    <TableCell size={"small"} sx={{color: themes.color}}>
                                                                        <h4 style={{textAlign: "left"}}>{arr.name} ({arr.site_info})</h4>
                                                                    </TableCell>



                                                                    <TableCell size={"small"} sx={{color: themes.color}}>
                                                                        <h4 style={{textAlign: "center"}}>
                                                                            {arr.login_success === true ?
                                                                                <span style={{color: "yellowgreen"}}>O</span> :
                                                                                <span style={{color: "red"}}>X</span>}
                                                                        </h4>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </>

                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>

                    }

                </Box>
            </Modal>
        </div>
    )
}
