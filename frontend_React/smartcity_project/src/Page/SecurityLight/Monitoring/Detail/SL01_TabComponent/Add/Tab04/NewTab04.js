import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {BsFillDeviceHddFill} from "react-icons/bs";
import {MenuItem, Modal, Select} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

function NewTab04({
                      handleAddClose,
                      AddOpen,
                      AddDMData,
                      sldm_apply_bgn_date,
                      sldm_apply_category,
                      sldm_dynamic_diming,
                      sldm_gateway,
                      sldm_light_cnt,
                      sldm_report_cycle,
                      sldm_profile_name,
                      sldm_user,
                      sldm_mode,
                      sldm_profile,
                      onValueOnChange
                  }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <div>
            <Modal
                open={AddOpen}
                onClose={handleAddClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 600}}>
                    <Grid container spacing={3}>
                        <Typography variant="h6" gutterBottom style={{marginTop: "2vh"}}>
                            <BsFillDeviceHddFill style={{marginLeft: "3vh", marginRight: "1vh"}}/>
                            디밍관리 입력
                        </Typography>

                        <Grid item xs={12} sm={12}>
                            <label>프로파일ID</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_profile}
                                name="sldm_profile"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>프로파일 명</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_profile_name}
                                name="sldm_profile_name"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>게이트웨이</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_gateway}
                                name="sldm_gateway"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <label>적용유형</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_apply_category}
                                name="sldm_apply_category"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>적용시작일</label>
                            <TextField
                                type={"datetime-local"}
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_apply_bgn_date}
                                name="sldm_apply_bgn_date"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>디밍갯수</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_dynamic_diming}
                                name="sldm_dynamic_diming"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>등록자</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_user}
                                name="sldm_user"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>가로등 갯수</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_light_cnt}
                                name="sldm_light_cnt"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label>디밍모드</label>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    value={sldm_mode}
                                    name="sldm_mode"
                                    onChange={(e) => onValueOnChange(e)}
                                >
                                    <MenuItem value={0}>자동(스케줄)</MenuItem>
                                    <MenuItem value={1}>자동(센서)</MenuItem>
                                    <MenuItem value={2}>수동(관제)</MenuItem>
                                    <MenuItem value={4}>교통량(Gw 레이더센서)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <label>상태 보고주기</label>
                            <TextField
                                type={"number"}
                                id="outlined-basic"
                                variant="outlined"
                                value={sldm_report_cycle}
                                name="sldm_report_cycle"
                                placeholder="1~10분 상태감시 보고주기 간격"
                                onChange={(e) => onValueOnChange(e)}
                                fullWidth
                            />
                        </Grid>

                    </Grid>
                    <br/>
                    <Button fullWidth variant="outlined" onClick={() => {
                        if (window.confirm('저장하시겠습니까?')) {
                            AddDMData();
                            alert('저장이 완료 되었습니다.');
                            handleAddClose();
                        }
                    }}>입력완료</Button>
                    <Button fullWidth variant="outlined" color={"error"} sx={{
                        marginTop: 1
                    }} onClick={() => {
                        if (window.confirm('입력이 저장되지 않습니다.')) {
                            handleAddClose();
                        }
                    }}>
                        취소
                    </Button>

                </Box>
            </Modal>
        </div>
    )
}


export default NewTab04;