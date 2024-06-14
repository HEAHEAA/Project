import {FiSearch} from "react-icons/fi";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AlarmDetailModal from "./AlarmDetailModal.jsx";
import {useContext, useEffect, useState} from "react";
import {Pagination} from "@mui/lab";
import {AlarmContext} from "../../../../api/system/AlarmContext.jsx";

function AlarmListPage(){
    const {
        AlarmListGetOnSubmit,
        alarmList,
        GetEditIdAlarmData,
    } = useContext(AlarmContext);

    useEffect(() => {
        AlarmListGetOnSubmit();
    }, []);

    const [filter,setFilter] = useState('');


    //페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([alarmList]);
    const lastPage = alarmList.length % 15 === 0 ? alarmList.length / 15 : alarmList.length / 15 + 1;
    let allPage = Math.ceil(alarmList.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(alarmList.slice(15 * (page - 1)));
        } else {
            setData(alarmList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, alarmList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }



    //상세보기
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return(
        <div className="script-list-view">
            <AlarmDetailModal open={open} handleClose={handleClose}/>

            <div className="script-list-head">
                <h1>알람 설정 리스트</h1>
                <p>알람 설정 리스트를 확인 할 수 있습니다.</p>
            </div>

            <div className="script-list-search">
                <div className="list-search">
                    <div className="box">
                        <div className="container-1">
                            <span className="icon"><FiSearch/></span>
                            <input
                                type="search"
                                id="search"
                                placeholder="제목을 입력해주세요."
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setFilter(inputValue);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div className="script-list-board">
                <TableContainer>
                    <Table>
                        <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>발송시간</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell>작성자</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: "#ffffff"}}>

                            {
                                data?.filter((dataIs) => {
                                    const title = dataIs.sms_title?.toLowerCase();
                                    const input = filter.toLowerCase();
                                    return title?.includes(input);
                                }).map((arr,inx) => (
                                    <TableRow onClick={()=>{
                                        handleOpen();
                                        GetEditIdAlarmData(arr.sms_info_idx);
                                    }}>
                                        <TableCell>{arr.sms_info_idx}</TableCell>
                                        <TableCell>{arr.sms_transfer_time}</TableCell>
                                        <TableCell>{arr.sms_title}</TableCell>
                                        <TableCell>{arr.sms_content}</TableCell>
                                        <TableCell>{arr.clnt_user_id}</TableCell>
                                    </TableRow>
                                ))
                            }



                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


            <Pagination
                sx={{marginLeft: 1.5}}
                count={10}
                variant="outlined"
            />

        </div>
    )
}
export default AlarmListPage;