import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {ModalStyles} from "../../../theme/mui-style-query.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useContext} from "react";
import {ClientContext} from "../../../context/client/ClientContext.jsx";

function UpdateGradeModal({open,handleClose}){
    const {
        gradeValue, setGradeValue,
        ClientGradeUpdate,
        ClientGradeReUpdate,
    } = useContext(ClientContext);
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <strong>직급 수정</strong>
                </Typography>
                저장된 직급을 수정 할 수 있습니다.
                <hr/>


                <Grid container spacing={5} className="modal-grid">
                    <Grid item xs={12} sm={12}>
                        <span>직급 명</span>
                        <TextField
                            id="outlined-multiline-static"
                            fullWidth
                            placeholder="지급 입력"
                            name="user_class_name"
                            value={gradeValue.user_grade_name}
                            onChange={(e) => setGradeValue({...gradeValue, user_grade_name: e.target.value})}
                        />
                    </Grid>
                </Grid>
                <br/>

                <Button type={"submit"} variant="contained" fullWidth onClick={()=>{
                    if(window.confirm('정말 수정 하시겠습니까?')){
                        ClientGradeReUpdate();
                        handleClose();
                    }
                }}>
                    수정완료
                </Button>
                <Button
                    variant="contained"
                    color={"inherit"}
                    fullWidth sx={{marginTop: 1}}
                    onClick={() => {
                        handleClose();
                    }}
                >
                    목록으로
                </Button>

            </Box>
        </Modal>
    )
}
export default UpdateGradeModal;