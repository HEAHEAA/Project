import {FiSearch} from "react-icons/fi";
import Button from "@mui/material/Button";
import {BorderColor, DeleteSweep, MapsUgc} from "@mui/icons-material";
import {
    FormControl,
    InputLabel, MenuItem,
    Pagination, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {AlignCenter} from "../../../theme/same-style.jsx";
import {useContext, useEffect, useState} from "react";
import AddAlarmModal from "./AddAlarm-Modal.jsx";
import UpdateAlarmModal from "./UpdateAlarm-Modal.jsx";
import {ModalContext} from "../../../context/config/ModalContext.jsx";
import {DeleteModal} from "../../../components/modal/delete-modal.jsx";
import {TableContainerStyles, TableStyles} from "../../../theme/mui-style-query.jsx";
import {NoticeContext} from "../../../context/notice/NoticeContext.jsx";

function NoticePageAlarm() {
    const {
        noticeAlarmList,
        getEditNoticeData,
        DeleteNoticeData
    } = useContext(NoticeContext);

    // 검색용
    const [filter, setFilter] = useState('');


    //알람 추가 이벤트
    const [addModal, setAddModal] = useState(false);
    const handleOpen = () => setAddModal(true);
    const handleClose = () => setAddModal(false);

    //알람 수정 이벤트
    const [updateModal, setUpdateModal] = useState(false);
    const handleUpdateOpen = () => setUpdateModal(true);
    const handleUpdateClose = () => setUpdateModal(false);


    //페이징 처리

    const [page, setPage] = useState(1);
    const [data, setData] = useState([noticeAlarmList]);
    const lastPage = noticeAlarmList.length % 10 === 0 ? noticeAlarmList.length / 10 : noticeAlarmList.length / 10 + 1;
    let allPage = Math.ceil(noticeAlarmList.length / 10);

    useEffect(() => {
        if (page === lastPage) {
            setData(noticeAlarmList.slice(10 * (page - 1)));
        } else {
            setData(noticeAlarmList.slice(10 * (page - 1), 10 * (page - 1) + 10));
        }
    }, [page, noticeAlarmList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    return (
        <div>

            {/*모달*/}
            <AddAlarmModal
                addModal={addModal}
                handleClose={handleClose}
            />

            <UpdateAlarmModal
                updateModal={updateModal}
                handleClose={handleUpdateClose}
            />

            <DeleteModal deleteThis={console}/>
            {/*모달*/}


            <div className="notice-search-header">
                <div className="list-search">
                    <div className="box">
                        <div className="container-1">
                            <span className="icon"><FiSearch/></span>
                            <input
                                type="search"
                                id="search"
                                placeholder="Search.."
                                value={filter}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setFilter(inputValue);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Button
                    variant="contained"
                    sx={{float: 'right'}} onClick={() => {
                    handleOpen();
                }}>
                    알림사항 추가 &nbsp; <MapsUgc/>
                </Button>
            </div>
            <hr color="#f1f1f1"/>


            <TableContainer sx={TableContainerStyles}>
                <Table sx={TableStyles}>
                    <TableHead sx={{backgroundColor: "#ececec"}}>
                        <TableRow>
                            <TableCell align={"center"}>#</TableCell>
                            <TableCell align={"center"}>내용</TableCell>
                            <TableCell align={"center"}>날짜</TableCell>
                            <TableCell align={"center"}>수정</TableCell>
                            <TableCell align={"center"}>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            data
                                .filter((datas) => {
                                    const title = datas?.notice_content?.toLowerCase();
                                    const input = filter?.toLowerCase();
                                    return title?.includes(input);
                                })
                                .map((alarm, idx) => (
                                    <TableRow key={alarm.notice_idx}>
                                        <TableCell align={"center"}>
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {alarm.notice_content}
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            {alarm.start_week?.substring(0, 4)}년
                                            {alarm.start_week?.substring(4, 5)}월
                                            {alarm.start_week?.substring(5, 6)}주차
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <Button onClick={() => {
                                                getEditNoticeData(alarm.notice_idx);
                                                handleUpdateOpen();
                                            }}>
                                                <BorderColor/>
                                            </Button>
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <Button color={"error"} onClick={() => {
                                                if (window.confirm('정말 삭제 하시겠습니까?')) {
                                                    DeleteNoticeData(alarm.notice_idx);
                                                }

                                            }}>
                                                <DeleteSweep/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Pagination
                count={allPage}
                variant="outlined"
                sx={AlignCenter}
                onChange={(e) => handlePage(e)}
            />
            <br/>
        </div>
    )
}

export default NoticePageAlarm;