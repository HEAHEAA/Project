import * as React from "react";
import {Table, TableCell, TableContainer, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AlarmContext} from "../../../api/system/AlarmContext.jsx";

function AlarmSystem() {
    const {alarmSingleData, setAlarmSingleData,AddAlarmOnSubmit} = useContext(AlarmContext);
    const navigate = useNavigate();
    return (
        <div>
            <div className="scrip-content">
                <div className="scrip-head">
                    <h2>알람 설정 관리</h2>
                </div>

                <section className="scrip-section">
                    <h3>■ 알람설정</h3>
                    <TableContainer>
                        <Table>
                            <TableRow>
                                <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>발송시간</h4>
                                </TableCell>
                                <TableCell style={{width: "90%"}} size={"small"}>
                                    <TextField
                                        type={"datetime-local"}
                                        variant="outlined"
                                        name="sms_transfer_time"
                                        onChange={(e) => {
                                            setAlarmSingleData({...alarmSingleData, sms_transfer_time: e.target.value})
                                        }}
                                        fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>SMS 제목</h4>
                                </TableCell>
                                <TableCell style={{width: "90%"}} size={"small"}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        name="sms_title"
                                        onChange={(e) => {
                                            setAlarmSingleData({...alarmSingleData, sms_title: e.target.value})
                                        }}
                                        fullWidth/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>SMS 내용</h4>
                                </TableCell>
                                <TableCell style={{width: "90%"}} size={"small"}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        name="sms_content"
                                        onChange={(e) => {
                                            setAlarmSingleData({...alarmSingleData, sms_content: e.target.value})
                                        }}
                                        fullWidth
                                        multiline
                                        rows={4}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>SMS 링크</h4>
                                </TableCell>
                                <TableCell style={{width: "90%"}} size={"small"}>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        name="sms_link"
                                        onChange={(e) => {
                                            setAlarmSingleData({...alarmSingleData, sms_link: e.target.value})
                                        }}
                                        fullWidth/>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </section>


                <section className="alarm-section">
                    <Button variant="contained" onClick={()=>{
                        if(window.confirm('알람을 추가 하시겠습니까?')) {
                            AddAlarmOnSubmit();
                            alert('완료 되었습니다.');
                        }
                    }}>저장</Button>
                    <Button variant="contained" color={"warning"}>취소</Button>

                    <Button variant="contained" color={"inherit"} sx={{float: "right"}} onClick={()=>{
                        navigate('/system/alarm/list');
                    }}>
                        목록
                    </Button>
                </section>


            </div>

        </div>
    )
}

export default AlarmSystem;