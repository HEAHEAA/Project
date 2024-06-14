import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {createTheme, FormControl, InputLabel, Select, TextField, ThemeProvider} from "@mui/material";
import { GiTimeBomb } from "react-icons/gi";
import {useContext, useState} from "react";
import {PlaybackContext} from "../../../../../../api/PlayBack/PlaybackContext.jsx";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SelectPlayFileAdd({open,handleClose}){
    const {
        PlayFileInsertOnsubmit,
        checkResult,
        checkTime,
    } = useContext(PlaybackContext);

    //1. 판넬이벤트
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    //1. 테마
    const darkTheme = createTheme({
        palette: {
            mode: 'light',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });



    return(
        <div>
            <ThemeProvider theme={darkTheme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="filePlayAddModal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <GiTimeBomb /> 재생시간 입력
                    </Typography>
                    <hr/>
                    <p>※ 이미지 및 영상 재생시간을 입력해주세요.</p>
                    <hr/>

                    {
                        checkResult.map((arr,inx) => (
                            <Accordion expanded={expanded === `panel${inx+1}`} onChange={handleChange(`panel${inx+1}`)}>

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ width: '60%', flexShrink: 0,fontWeight: 'bold' }}>{inx+1}. {arr.origin_fileName}</Typography>
                                    {/*<Typography sx={{ color: 'text.secondary' }}>*/}
                                    {/*    {checkTime}초*/}
                                    {/*</Typography>*/}
                                </AccordionSummary>


                                <AccordionDetails>
                                    <Typography>
                                        <FormControl variant="filled" fullWidth>
                                            <InputLabel id="demo-simple-select-filled-label">시간선택</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-filled-label"
                                                id="demo-simple-select-filled"
                                                onChange={(e) => {
                                                    checkTime[inx] = e.target.value
                                                    return console.log(checkTime);
                                                }}
                                            >
                                                <MenuItem value={10000}>10초</MenuItem>
                                                <MenuItem value={30000}>30초</MenuItem>
                                                <MenuItem value={60000}>1분</MenuItem>
                                                <MenuItem value={300000}>5분</MenuItem>
                                                <MenuItem value={600000}>10분</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <br/>
                                        {/*<br/>*/}

                                        {/*<Button variant="contained" color={"info"}>+ 1초</Button>*/}
                                        {/*<Button variant="contained" color={"info"} sx={{marginLeft:0.5}}>+ 5초</Button>*/}
                                        {/*<Button variant="contained" color={"info"} sx={{marginLeft:0.5}}>+ 10초</Button>*/}

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                    <br/>
                    <Button variant="contained" fullWidth onClick={()=>{
                        if(window.confirm('재생목록을 생성하시겠습니까?')) {
                            PlayFileInsertOnsubmit();
                            handleClose();
                        }
                    }}>
                        저장하기
                    </Button>

                    <Button variant="contained" color={"inherit"} fullWidth sx={{marginTop: 1}}
                            onClick={()=>{handleClose();}}>
                        취소
                    </Button>

                </Box>
            </Modal>
            </ThemeProvider>
        </div>
    )
}
export default SelectPlayFileAdd;