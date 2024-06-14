import {FiSearch} from "react-icons/fi";
import Button from "@mui/material/Button";
import {BorderColor, DeleteSweep, MapsUgcTwoTone} from "@mui/icons-material";
import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TableContainerStyles, TableStyles} from "../../../theme/mui-style-query.jsx";
import {useContext, useEffect, useState} from "react";
import {ClientContext} from "../../../context/client/ClientContext.jsx";
import AddPartModal from "./AddPart-Modal.jsx";
import UpdatePartModal from "./UpdatePart-Modal.jsx";
import {AlignCenter} from "../../../theme/same-style.jsx";

function ClientPartLayout() {
    const {
        ClientPart, setClientPart,
        getEditPartId,
        ClientPartDelete,
    } = useContext(ClientContext);

    // 검색용
    const [filter, setFilter] = useState('');

    //등록 모달 이벤트
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //수정 모달 이벤트
    const [edit, setEdit] = useState(false);
    const handleEditOpen = () => setEdit(true);
    const handleEditClose = () => setEdit(false);

    //페이징 처리
    const [page, setPage] = useState(1);
    const [data, setData] = useState([ClientPart]);
    const lastPage = ClientPart.length % 5 === 0 ? ClientPart.length / 5 : ClientPart.length / 5 + 1;
    let allPage = Math.ceil(ClientPart.length / 5);

    useEffect(() => {
        if (page === lastPage) {
            setData(ClientPart.slice(5 * (page - 1)));
        } else {
            setData(ClientPart.slice(5 * (page - 1), 5 * (page - 1) + 5));
        }
    }, [page, ClientPart]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    return (
        <div>
            <AddPartModal open={open} handleClose={handleClose}/>
            <UpdatePartModal open={edit} handleClise={handleEditClose}/>

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

                <Button variant="contained"
                        className="excel-download-btn"
                        onClick={() => {
                            handleOpen();
                        }}
                >
                    부서 추가&nbsp; <MapsUgcTwoTone/>
                </Button>
            </div>

            <hr color="#f1f1f1"/>

            <h2>부서 관리</h2>

            <TableContainer sx={TableContainerStyles}>
                <Table sx={TableStyles}>
                    <TableHead sx={{backgroundColor: "#ececec"}}>
                        <TableRow>
                            <TableCell align={"center"}>#</TableCell>
                            <TableCell align={"center"}>부서명</TableCell>
                            <TableCell align={"center"}>수정</TableCell>
                            <TableCell align={"center"}>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            data
                                .filter((datas) => {
                                    const title = datas?.user_part_name?.toLowerCase();
                                    const input = filter.toLowerCase();
                                    return title?.includes(input);
                                })
                                .map((arr, idx) => (
                                    <TableRow>
                                        <TableCell align={"center"}>{idx + 1}</TableCell>
                                        <TableCell align={"center"}>{arr.user_part_name}</TableCell>
                                        <TableCell align={"center"}>
                                            <Button onClick={() => {
                                                handleEditOpen();
                                                getEditPartId(arr.user_part_idx);
                                            }}>
                                                <BorderColor/>
                                            </Button>
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <Button color={"error"} onClick={() => {
                                                if (window.confirm('정말 삭제 하시겠습니까?')) {
                                                    ClientPartDelete(arr.user_part_idx);
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

export default ClientPartLayout;
