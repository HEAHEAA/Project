import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ModalStyles} from "../../../theme/mui-style-query.jsx";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import WeekPicker from "../../../components/date-picker/WeekPicker.jsx";
import {ElImgContext} from "../../../context/excellent/El-Img-Context.jsx";
import {ClientContext} from "../../../context/client/ClientContext.jsx";
import {ImgBaseSrcContext} from "../../../context/config/ImgBaseSrcContext.jsx";
import {ElAwardImgContext} from "../../../context/excellent/El-Award-Img-Context.jsx";

function AddStaffModal({addModal,handleClose}){
    const {
        imageSrc, setImageSrc, encodeFileToBase64,
        imageSrc01, setImageSrc01, encodeFileToBase6401
    } = useContext(ImgBaseSrcContext);

    const {
        elAwradImgUpdateOnSubmit,
        awardValue, setAwardValue,
        elAwardInsert,
    } = useContext(ElAwardImgContext);

    const {
        ClientPartOnSubmit, ClientPart,
        ClientGradeOnSubmit, ClientGrade,
    } = useContext(ClientContext);

    useEffect(() => {
        ClientPartOnSubmit();
        ClientGradeOnSubmit();
    }, []);


    const {
        staffValue,setStaffValue,
        elStaffImgUpdateOnSubmit,
        elStaffInsert
    } = useContext(ElImgContext);



    return(
        <Modal
            open={addModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles} className="modal-bar">
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <strong>우수사원 /시상식 추가</strong>
                </Typography>
                <hr color="#e7e7e7" style={{marginBottom: 30, marginTop: 10}}/>
                        <p style={{textAlign: "center"}}>우수사원 이미지</p>
                    <input
                        id="profileImg"
                        type={"file"}
                        name="profileImg"
                        style={{display: "none"}}
                        onChange={(e) => {
                            encodeFileToBase6401(e.target.files[0]);
                            elStaffImgUpdateOnSubmit(e)
                        }}
                    />
                    <label htmlFor="profileImg" >
                        {imageSrc01 ?
                            <div className="profile-img-use">
                                <img src={imageSrc01} alt="preview-img" className="upload-profile-img"/>
                                <Button sx={{textAlign: "center", color: "gray"}}
                                        onClick={() => {
                                    setImageSrc01('');
                                }}>취소</Button>

                            </div>
                            :
                            <div className="upload-profile-img">
                                <h3>Click !</h3>
                            </div>
                        }


                    </label>




                    <br/>
                    <Grid container spacing={4} className="modal-grid">
                        <Grid item xs={12} sm={12}>
                            <span>이름</span>
                            <TextField
                                id="outlined-multiline-static"
                                fullWidth
                                placeholder="이름 입력"
                                name="ex_em_name"
                                value={staffValue.ex_em_name}
                                onChange={(e) => setStaffValue({...staffValue, ex_em_name: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span>부서</span>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="ex_em_part"
                                    onChange={(e) => setStaffValue({...staffValue, ex_em_part: e.target.value})}
                                >
                                    {
                                        ClientPart.map((arr) => (
                                            <MenuItem value={arr.user_part_name}>{arr.user_part_name}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span>직급</span>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="ex_em_grade"
                                    onChange={(e) => setStaffValue({...staffValue, ex_em_grade: e.target.value})}
                                >
                                    {
                                        ClientGrade.map((arr) => (
                                            <MenuItem value={arr.user_grade_name}>{arr.user_grade_name}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                <strong>시상식 이미지 추가</strong>
                            </Typography>
                            <hr color="#e7e7e7" style={{marginBottom: 30, marginTop: 10}}/>


                            <input id="profile-img" type={"file"} style={{display: "none"}} onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                                elAwradImgUpdateOnSubmit(e);
                            }}/>
                            <label htmlFor="profile-img">
                                {imageSrc ?
                                    <div className="profile-img-use">
                                        <img src={imageSrc} alt="preview-img" className="upload-awards-img"/>
                                        <Button sx={{textAlign: "center"}} onClick={() => {
                                            setImageSrc('');
                                        }}>취소</Button>
                                    </div>
                                    :
                                    <div className="upload-awards-img">
                                        <h3>Click !</h3>
                                    </div>
                                }

                            </label>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <span>날짜지정</span>
                            <br/>
                            <TextField
                                fullWidth
                                variant="standard"
                                value={
                                    localStorage.getItem('year-week')?.substring(0, 4) + "년" +
                                    localStorage.getItem('year-week')?.substring(4, 5) + "월"
                                }
                                disabled
                            />
                            <br/>
                            <WeekPicker/>
                        </Grid>

                    </Grid>


                    <br/>

                    <Button type={"submit"} variant="contained" fullWidth onClick={()=>{
                        if(window.confirm('등록 하시겠습니까?')) {
                            elStaffInsert();
                            elAwardInsert();
                            handleClose();
                            setImageSrc('');
                            setImageSrc01('')
                        }
                    }}>
                        추가 <Add/>
                    </Button>




                <Button variant="contained"
                        color={"inherit"}
                        fullWidth
                        sx={{marginTop: 1}}
                        onClick={()=>{
                            handleClose();
                            setImageSrc('');
                            setImageSrc01('');
                        }}
                >
                    목록으로
                </Button>

            </Box>
        </Modal>
    )
}
export default AddStaffModal;
