import Box from "@mui/material/Box";
import {Modal, TablePagination} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import * as React from "react";

function TotalVote({Open, handleClose,vote,voteResult}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    //페이징 함수
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div>
            <Modal
                open={Open}
                onClose={() => {
                    handleClose();
                    setPage(0);
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {vote.sv_title} 「투표결과」
                    </Typography>

                    <div className="totalVote">

                        {
                            voteResult&&voteResult
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a,i){
                                return(
                                    <div className="vote" key={i}>
                                        <div className="voteHeader">
                                            <p>{i+1}. {a.sv_question_content}</p>
                                        </div>
                                        <div className="voteBody">
                                            {
                                                a.answer?.map(function (arr,inx){
                                                    return(
                                                        <ul>
                                                            <li>{arr.sv_ans_content} : {arr.vote} 표</li>
                                                        </ul>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }

                        <TablePagination
                            sx={{minWidth: "100%"}}
                            variant="outlined"
                            rowsPerPageOptions={[1, 3, 5, 100]}
                            component="div"
                            count={voteResult?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            style={{width: "100%", backgroundColor: "#2c2c2c"}}
                            size={"small"}
                        />

                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default TotalVote;