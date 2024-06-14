import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useContext} from "react";
import {BidContext} from "../../../context/bid/BidContext.jsx";
import {ModalStyles} from "../../../theme/mui-style-query.jsx";
import Button from "@mui/material/Button";

function BidAddModal() {
    const {
        excelOpen,
        handleClose,
        bidBtn,
        BidNewsExcelOnSubmit,
        BidStateExcelOnSubmit
    } = useContext(BidContext);
    return (
        <Modal
            open={excelOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ModalStyles}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {
                        bidBtn === 0 ? <strong>낙찰 엑셀등록</strong> :
                            <strong>입찰 엑셀등록</strong>
                    }
                </Typography>
                엑셀 양식에 맞춰 등록 할 수 있습니다.
                <hr/>
                <form onSubmit={(e) => {
                    if(bidBtn === 0) {
                        BidStateExcelOnSubmit(e);
                    }else {
                        BidNewsExcelOnSubmit(e);
                    }
                    handleClose();
                    alert('등록이 완료 되었습니다.')}
                }>
                    <div className="excel-upload">
                        파일 선택
                    </div>
                    {
                        bidBtn === 0 ?
                            <input type={"file"}
                                   id="excel"
                                   name="bidStateExcel"
                                   accept=".xls,.xlsx,.csv"
                            /> :
                            <input type={"file"}
                                   id="excel"
                                   name="bidNewsExcel"
                                   accept=".xls,.xlsx,.csv"
                            />
                    }
                    <br/>
                    <Button type={"submit"} variant="contained" fullWidth>
                        업로드
                    </Button>
                </form>
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

export default BidAddModal;
