import {AiOutlineNotification} from "react-icons/ai";
import {Table, TableCell, TableContainer, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useContext} from "react";
import {NoticeContext} from "../../../../api/system/NoticeContext.jsx";
import {useNavigate} from "react-router-dom";

function NoticeEdit(){
    const {noticeEditValue,setNoticeEditValue,EditNoticeOnSubmit,write} = useContext(NoticeContext);
    const navigate = useNavigate();
    return(
        <div>
            <div className="dashboard">
                <div className="customer-head">
                    <div className="customer-head-icon">
                        <AiOutlineNotification
                            style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                    </div>
                    <div className="customer-head-p">
                        <span>공지사항 수정하기</span>
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
                                               value={noticeEditValue.notice_title}
                                               name="notice_title"
                                               onChange={(e) => {setNoticeEditValue({...noticeEditValue, notice_title: e.target.value})}}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>작성자</h4>
                                </TableCell>
                                <TableCell style={{width: "50%"}} size={"small"}>
                                    {write}
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>




                    <div className="notice-content-board">
                        <TextField
                            id="filled-multiline-static"

                            multiline
                            rows={27.12}
                            fullWidth
                            variant="filled"
                            value={noticeEditValue.notice_content}
                            name="notice_content"
                            onChange={(e) => {setNoticeEditValue({...noticeEditValue, notice_content: e.target.value})}}
                        />
                    </div>

                    <div className="notice-content">
                        <div>
                            <span>
                            <label>게시시작일</label>
                            <TextField
                                type={"date"}
                                sx={{width: "70%"}}
                                value={noticeEditValue.notice_start_date?.substring(0,10)}
                                name="notice_start_date"
                                onChange={(e) => {setNoticeEditValue({...noticeEditValue, notice_start_date: e.target.value})}}
                            />
                        </span>


                            <span>
                            <label>게시종료일</label>
                            <TextField
                                type={"date"}
                                sx={{width: "70%"}}
                                value={noticeEditValue.notice_end_date?.substring(0,10)}
                                name="notice_end_date"
                                onChange={(e) => {setNoticeEditValue({...noticeEditValue, notice_end_date: e.target.value})}}
                            />
                        </span>
                        </div>

                    </div>



                    <div className="notice-content-foot">
                        <Button variant="outlined" onClick={()=>{
                            EditNoticeOnSubmit();
                            navigate('/system/notice');
                        }}>
                            수정완료
                        </Button>


                        <Button variant="outlined" color={"warning"} onClick={()=>{
                            navigate('/system/notice');
                        }}>목록으로</Button>
                    </div>





                </div>
            </div>

        </div>
    )
}
export default NoticeEdit;