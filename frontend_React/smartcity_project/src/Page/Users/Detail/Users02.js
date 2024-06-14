import {useContext} from "react";
import {UserContext} from "../../../ContextServer/UserContext";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Grid from "@mui/material/Grid";
import {MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

function Users02() {
    const {
        user, userBtn, GetUserUpdateId,
        editId, setEditId,
        userName, setUserName,
        userIds, setUserIds,
        userPwd, setUserPwd,
        classId, setClassId,
        userEmail, setUserEmail,
        userPhone, setUserPhone,
        userStatus, setUserStatus,
        UserUpdate
    } = useContext(UserContext);


    return (
        <div className="user-insert-form">
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <FormControl variant="filled" sx={{m: 0, minWidth: "100%", marginBottom: 3, marginTop: 2}}
                                 className="users-selects">
                        <InputLabel id="demo-simple-select-label">사용자 선택</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(e) => setUserIds(e.target.value)}
                            value={userIds}
                        >
                            {
                                user.map(function (a, i) {
                                    return (
                                        <MenuItem
                                            onClick={() =>{GetUserUpdateId(a.dt_op_user_id)}}
                                            value={a.user_id}
                                        >
                                            {a.user_id}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl variant="filled" sx={{m: 0, minWidth: "100%"}} style={{marginTop: "-0vh"}}
                                 className="users-selects">
                        <p style={{textAlign: "left", fontSize: "16px"}}>사용자구분</p>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={classId}
                            onChange={(e) => setClassId(e.target.value)}
                        >
                            <MenuItem value="1">관리자</MenuItem>
                            <MenuItem value="2">총괄담당자</MenuItem>
                            <MenuItem value="3">담당자</MenuItem>
                            <MenuItem value="4">일반사용자</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl variant="filled" sx={{m: 0, minWidth: "100%"}} style={{marginTop: "-0vh"}}
                                 className="users-selects">
                        <p style={{textAlign: "left", fontSize: "16px"}}>승인여부</p>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={userStatus}
                            onChange={(e) => setUserStatus(e.target.value)}
                        >
                            <MenuItem value="1">승인</MenuItem>
                            <MenuItem value="2">미승인</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{textAlign: "left", fontSize: "16px"}}>이메일</p>
                    <TextField
                        required
                        fullWidth
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        autoComplete="given-name"
                        variant="filled"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <p style={{textAlign: "left", fontSize: "16px"}}>연락처</p>
                    <TextField
                        required
                        fullWidth
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        autoComplete="given-name"
                        variant="filled"
                    />
                </Grid>
            </Grid>

            <Button variant="contained"
                    className="save" size={"large"}
                    style={{marginTop: "2vh"}} onClick={()=>{
                        if(window.confirm('내용을 수정하시겠습니까?')){
                            UserUpdate();
                        }
                    }}>저장</Button>
            <Button variant="outlined"
                    className="close" size={"large"}
                    style={{marginTop: "2vh", marginLeft: "0.5vh"}}>취소</Button>
        </div>
    )
}

export default Users02
;