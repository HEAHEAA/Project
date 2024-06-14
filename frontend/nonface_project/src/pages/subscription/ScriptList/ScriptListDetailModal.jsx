import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useContext} from "react";
import {CustomerGroupContext} from "../../../api/customer/CustomerGroupContext.jsx";

function ScriptListDetailModal({open, handleClose}) {
    const {groupEditValue, setGroupEditValue, GroupEditDataOnSubmit,} = useContext(CustomerGroupContext);
    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="script-list-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <strong>청약 상세 및 수정 하기</strong>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 0}}>
                        작성 된 청약관리를 수정/확인 할 수 있습니다.
                    </Typography>
                    <hr/>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <span>조직 아이디</span>
                            <TextField
                                disabled
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_name"
                                value={groupEditValue.clnt_org_id}
                                helperText="아이디는 변경 할 수 없습니다."
                                fullWidth

                            />
                        </Grid>


                        <Grid item xs={6} sm={6}>
                            <span>조직명</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_name"
                                value={groupEditValue.clnt_org_name}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_name: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <span>조직 위치</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_loc"
                                value={groupEditValue.clnt_org_loc}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_loc: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <span>조직 상세주소</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                value={groupEditValue.clnt_org_loc_detail}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_loc_detail: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <span>지번 주소</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_addr"
                                value={groupEditValue.clnt_org_addr}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_addr: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <span>도로명 주소</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_addr"
                                value={groupEditValue.clnt_org_road_addr}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_road_addr: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <span>조직 담당자</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_addr"
                                value={groupEditValue.clnt_org_manager}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_manager: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <span>사업장번호</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_addr"
                                value={groupEditValue.clnt_org_brno || ''}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_brno: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <span>조직 연락처</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                name="clnt_org_contact"
                                value={groupEditValue.clnt_org_contact}
                                onChange={(e) => setGroupEditValue({
                                    ...groupEditValue,
                                    clnt_org_contact: e.target.value
                                })}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <span>비고</span>
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                multiline
                                rows={4}
                                fullWidth
                                name="clnt_org_remarks"
                                value={groupEditValue.clnt_org_remarks}
                                onChange={(e) => {
                                    setGroupEditValue({
                                        ...groupEditValue,
                                        clnt_org_remarks: e.target.value
                                    })
                                }}
                            />
                        </Grid>

                    </Grid>

                    <br/>
                    <Button variant="contained" fullWidth onClick={() => {
                        if ('정말 수정하시겠습니까?') {
                            GroupEditDataOnSubmit();
                        }
                    }}>
                        저장
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth sx={{marginTop: 1}}
                        color={"inherit"}
                        onClick={() => {
                            handleClose();
                        }}
                    >취소</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default ScriptListDetailModal;