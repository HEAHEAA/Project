import {FormGroup, Select, Table, TableCell, TableContainer, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {CustomerGroupContext} from "../../../api/customer/CustomerGroupContext.jsx";
import {SubScriptContext} from "../../../api/subscription/SubScriptContext.jsx";


let len = window.innerWidth;
const th = {
    pc: {
        width: "10%", backgroundColor: "#ececec"
    },
    tablet: {
        width: "10%", backgroundColor: "#ececec"
    },
    phone: {
        width: "30%", backgroundColor: "#ececec"
    }
}

const select = {
    pc: {
        width: "50%"
    },
    tablet: {
        width: "50%"
    },
    phone: {
        width: "95%"
    }
}

function Default() {
    const {
        groupValue,setGroupValue,
        groupCheck,
        GroupIdSameCheck, //그룹아이디 체크
        groupId,setGroupId,
        alarm,setAlarm,

        clntList, controlList
    } = useContext(SubScriptContext);

    useEffect(()=>{
        GroupIdSameCheck();
    },[groupId]);




    return (
        <div>
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell style={len > 1200 ? th.pc :
                            (len > 750 ? th.tablet :
                                (len > 0 ? th.phone :
                                    null))}
                                   size={"small"}>
                            <h4 style={{textAlign: "center"}}>고객사 ID</h4>
                        </TableCell>
                        <TableCell style={{width: "90%"}} size={"small"}>
                            <TextField
                                id="outlined-basic"
                                label="고객사 정보를 입력해주세요."
                                variant="outlined"
                                fullWidth
                                name="clnt_org_id"
                                value={groupId}
                                onChange={(e)=>{
                                    setGroupValue({...groupValue, clnt_org_id: e.target.value});
                                    setGroupId(e.target.value);
                                }}
                            />
                            <br/>
                            {
                                groupCheck === null ?
                                    <span style={{color: "#1b72bf"}}> </span> : (
                                        groupCheck === true ?
                                            <span style={{color: "#1b72bf"}}> 사용할 수있는 아이디입니다.</span> :
                                            <span style={{color: "#ff0000"}}> 중복되는 아이디 입니다.</span>
                                    )
                            }

                        </TableCell>

                    </TableRow>

                    <TableRow>
                        <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                            <h4 style={{textAlign: "center"}}>고객사 명</h4>
                        </TableCell>
                        <TableCell style={{width: "90%"}} size={"small"}>
                            <TextField
                                id="outlined-basic"
                                label="고객사 정보를 입력해주세요."
                                variant="outlined"
                                fullWidth
                                value={groupValue.clnt_org_name}
                                name="clnt_org_name"
                                onChange={(e)=>{setGroupValue({...groupValue, clnt_org_name: e.target.value});}}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                            <h4 style={{textAlign: "center"}}>고객사 유형</h4>
                        </TableCell>
                        <TableCell style={{width: "90%"}} size={"small"}>
                            <FormControl
                                style={len > 1200 ? select.pc :
                                    (len > 750 ? select.tablet :
                                        (len > 0 ? select.phone :
                                            null))}>
                                <InputLabel id="demo-simple-select-label">선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="clnt_org_type"
                                    onChange={(e) => {setGroupValue({...groupValue, clnt_org_type: e.target.value});} }
                                >
                                    {
                                        clntList.map((arr,inx) => (
                                            <MenuItem value={arr.category_name}>
                                                {arr.category_name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>


                    <TableRow>
                        <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                            <h4 style={{textAlign: "center"}}>고객사 사업장번호</h4>
                        </TableCell>
                        <TableCell style={{width: "90%"}} size={"small"}>
                            <TextField
                                id="outlined-basic"
                                label="고객사 사업장번호를 입력해주세요."
                                variant="outlined"
                                fullWidth
                                name="clnt_org_brno"
                                value={groupValue.clnt_org_brno}
                                onChange={(e)=>{setGroupValue({...groupValue, clnt_org_brno: e.target.value});}}
                            />
                        </TableCell>
                    </TableRow>



                    <TableRow>
                        <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                            <h4 style={{textAlign: "center"}}>관제 구분</h4>
                        </TableCell>

                        <TableCell style={{width: "90%"}} size={"small"}>
                            <div className="scrip-app-p">

                                <FormControl
                                    style={len > 1200 ? select.pc :
                                        (len > 750 ? select.tablet :
                                            (len > 0 ? select.phone :
                                                null))}>
                                    <InputLabel id="demo-simple-select-label">선택</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="clnt_org_control"
                                        onChange={(e) => {setGroupValue({...groupValue, clnt_org_control: e.target.value});} }
                                    >
                                        {
                                            controlList.map((arr,inx) => (
                                                <MenuItem value={arr.category_name}>
                                                    {arr.category_name}
                                                </MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                                <br/>


                                <p>APP 설치 제한 수 </p>
                                <TextField variant="outlined"
                                           fullWidth
                                           style={len > 1200 ? select.pc :
                                               (len > 750 ? select.tablet :
                                                   (len > 0 ? select.phone :
                                                       null))}
                                           size={"small"}
                                           helperText="1~99999까지 입력 가능합니다."
                                           name="app_install_cnt"
                                           onChange={(e) => {setGroupValue({...groupValue, app_install_cnt: e.target.value});} }
                                />
                            </div>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox value={alarm} onChange={(e)=>{
                                    setGroupValue({...groupValue, notify_enabled: e.target.value});
                                    setAlarm(!alarm)
                                }}/>} label="시작/종료 알림 사용 여부"/>
                            </FormGroup>

                        </TableCell>


                    </TableRow>


                </Table>
            </TableContainer>
        </div>
    )
}

export default Default;