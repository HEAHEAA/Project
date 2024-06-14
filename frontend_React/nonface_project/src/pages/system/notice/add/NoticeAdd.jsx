import {AiOutlineNotification} from "react-icons/ai";
import TextField from "@mui/material/TextField";
import {Table, TableCell, TableContainer, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {NoticeContext} from "../../../../api/system/NoticeContext.jsx";

function NoticeAdd() {
    const {NoticeAddOnSubmit, noticeValue, setNoticeValue,} = useContext(NoticeContext);
    const navigate = useNavigate();

    return (
        <div>
            <div className="dashboard">
                <div className="customer-head">
                    <div className="customer-head-icon">
                        <AiOutlineNotification
                            style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                    </div>
                    <div className="customer-head-p">
                        <span>공지사항 등록</span>
                    </div>
                </div>
                <div className="total-ml-content">
                    <TableContainer>
                        <Table>
                            <TableRow>
                                <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>제목</h4>
                                </TableCell>
                                <TableCell style={{width: "90%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="notice_title"
                                               onChange={(e) => {
                                                   setNoticeValue({...noticeValue, notice_title: e.target.value})
                                               }}


                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>작성자</h4>
                                </TableCell>
                                <TableCell style={{width: "50%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>


                    <div className="notice-content-board">
                        <TextField
                            id="filled-multiline-static"
                            label="내용을 입력해주세요."
                            multiline
                            rows={27.12}
                            fullWidth
                            variant="filled"
                            name="notice_content"
                            onChange={(e) => {
                                setNoticeValue({...noticeValue, notice_content: e.target.value})
                            }}
                        />
                    </div>

                    <div className="notice-content">
                        <div>
                            <span>
                            <label>게시시작일</label>
                            <TextField
                                type={"date"}
                                sx={{width: "70%"}}
                                name="notice_start_date"
                                onChange={(e) => {
                                    setNoticeValue({...noticeValue, notice_start_date: e.target.value})
                                }}
                            />
                        </span>


                            <span>
                            <label>게시종료일</label>
                            <TextField
                                type={"date"}
                                sx={{width: "70%"}}
                                name="notice_end_date"
                                onChange={(e) => {
                                    setNoticeValue({...noticeValue, notice_end_date: e.target.value})
                                }}
                            />
                        </span>
                        </div>

                    </div>


                    <div className="notice-content-foot">
                        <Button variant="outlined" onClick={() => {
                            if (noticeValue.notice_title !== '' && noticeValue.notice_content !== '' && noticeValue.notice_start_date !== '' && noticeValue.notice_end_date !== '') {
                               if(window.confirm('저장하시겠습니까?')){
                                   NoticeAddOnSubmit();
                                   navigate('/system/notice');
                               }
                            }
                        }}>
                            저장
                        </Button>
                        <Button variant="outlined" color={"warning"} onClick={() => {
                            navigate('/system/notice')
                        }}>목록으로</Button>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default NoticeAdd;