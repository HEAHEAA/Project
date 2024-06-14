import {FiSearch} from "react-icons/fi";
import {Pagination} from "@mui/lab";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../../../api/all/GroupContext.jsx";
import ScriptListDetailModal from "./ScriptListDetailModal.jsx";
import {CustomerGroupContext} from "../../../api/customer/CustomerGroupContext.jsx";

function ScriptListPage() {
    const {groupListGetOnSubmit,groupList} = useContext(GroupContext);
    const {GetGroupListEditId} = useContext(CustomerGroupContext);

    useEffect(() => {
        groupListGetOnSubmit();
    }, []);


    //검색
    const [filter,setFilter] = useState('');

    //페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([groupList]);
    const lastPage = groupList.length % 15 === 0 ? groupList.length / 15 : groupList.length / 15 + 1;
    let allPage = Math.ceil(groupList.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(groupList.slice(15 * (page - 1)));
        } else {
            setData(groupList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, groupList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    //상세보기
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className="script-list-view">
            <ScriptListDetailModal open={open} handleClose={handleClose}/>


            <div className="script-list-head">
                <h1>청약 관리 목록</h1>
                <p>회원사 청약관리 리스트를 확인 할 수 있습니다.</p>
            </div>

            <div className="script-list-search">
                <div className="list-search">
                    <div className="box">
                        <div className="container-1">
                            <span className="icon"><FiSearch/></span>
                            <input
                                type="search"
                                id="search"
                                placeholder="고객사 명을 입력해주세요."
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
                                <TableCell>고객사명</TableCell>
                                <TableCell>고객사 유형</TableCell>
                                <TableCell>관리자</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: "#ffffff"}}>
                            {
                                data?.filter((dataIs) => {
                                    const title = dataIs.clnt_org_name?.toLowerCase();
                                    const input = filter?.toLowerCase();
                                    return title?.includes(input);
                                }).map((arr,inx) => (
                                    <TableRow key={data.length * (page - 1) + inx + 1} onClick={()=>{
                                        handleOpen();
                                        GetGroupListEditId(arr.clnt_org_id);
                                    }}>
                                        <TableCell>{data.length * (page - 1) + inx + 1}</TableCell>
                                        <TableCell>{arr.clnt_org_name}</TableCell>
                                        <TableCell>{arr.clnt_org_type}</TableCell>
                                        <TableCell>{arr.clnt_org_manager}</TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <br/>
            <Pagination
                sx={{marginLeft: 1.5}}
                count={allPage}
                onChange={(e) => handlePage(e)}
                variant="outlined"
            />


        </div>
    )
}

export default ScriptListPage;