import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function QuestDeleteAdd({DeleteOpen,handleDeleteClose,editTask}){

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        color: 'black',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return(
        <div>
            <Modal
                open={DeleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">질문을 삭제하시겠습니까?</h2>

                    <Button fullWidth onClick={()=>{editTask()}}>예</Button>
                    <Button fullWidth color={"error"}>아니오</Button>

                </Box>
            </Modal>
        </div>
    )
}
export default QuestDeleteAdd;