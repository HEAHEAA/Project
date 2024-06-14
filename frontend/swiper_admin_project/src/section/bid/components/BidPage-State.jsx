import {FiSearch} from "react-icons/fi";
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
import {TableContainerStyles, TableStyles} from "../../../theme/mui-style-query.jsx";
import {useContext, useEffect, useState} from "react";
import {BidContext} from "../../../context/bid/BidContext.jsx";
import {AssignmentReturned, PostAdd} from "@mui/icons-material";
import Button from "@mui/material/Button";
import BidAddModal from "../modal/Bid-Add-Modal.jsx";
import {BidExcelContext} from "../../../context/bid/BidExcelContext.jsx";
import {Money} from "../../../utils/money.jsx";
import BorderColorIcon from "@mui/icons-material/BorderColor.js";
import DeleteIcon from "@mui/icons-material/Delete.js";

function BidPageState() {
    const {bidState, handleOpen} = useContext(BidContext);
    const {ExcelStateDownload} = useContext(BidExcelContext);

    // 검색용
    const [filter, setFilter] = useState('');

    const list = [
        {
            bid_devi: "예시", // 발주처
            bid_name: "예시", //용역명
            bid_order: "예시", // 구분
            bid_cost: 1000, //금액
            bid_start_date: "24.1.14", //시작
            bid_end_date: "24.1.14", //종료
            bid_note: "예시"// 비고
        }
    ]

    //페이징 처리
    const [page, setPage] = useState(1);
    const [data, setData] = useState([bidState]);
    const lastPage = bidState.length % 15 === 0 ? bidState.length / 15 : bidState.length / 15 + 1;
    let allPage = Math.ceil(bidState.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(bidState.slice(15 * (page - 1)));
        } else {
            setData(bidState.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, bidState]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    const [moneySelect, setMoneySeletct] = useState(0);
    useEffect(() => {
        setMoneySeletct(0);
    }, []);
    return (
        <div>
            {/*모달*/}
            <BidAddModal/>
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
                <Button variant="contained"
                        className="excel-download-btn"
                        color={"success"}
                        onClick={handleOpen}
                >
                    엑셀등록&nbsp; <PostAdd/>
                </Button>
                <Button className="excel-download-btn" color={"success"}
                        onClick={() => {
                            ExcelStateDownload(list);
                        }}>
                    엑셀 양식 다운로드 &nbsp; <AssignmentReturned/>
                </Button>
            </div>
            <hr color="#f1f1f1"/>
            <h2>금일 입찰 예정
                <FormControl sx={{width: 150, marginRight: 2, float: "right"}}>
                    <InputLabel id="demo-simple-select-label">금액 단위</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={moneySelect}
                        onChange={(e) => setMoneySeletct(e.target.value)}
                    >
                        <MenuItem value={0}>원 단위</MenuItem>
                        <MenuItem value={1}>화폐 단위</MenuItem>
                    </Select>
                </FormControl>
            </h2>
            <br/>
            <TableContainer sx={TableContainerStyles}>
                <Table sx={TableStyles}>
                    <TableHead sx={{backgroundColor: "#ececec"}}>
                        <TableRow>
                            <TableCell align={"center"}>구분</TableCell>
                            <TableCell align={"center"}>용역명</TableCell>
                            <TableCell align={"center"}>발주처 </TableCell>
                            <TableCell align={"center"}>기초금액(원)</TableCell>
                            <TableCell align={"center"}>입찰일</TableCell>
                            <TableCell align={"center"}>비고</TableCell>
                            <TableCell align={"center"}>수정/삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            bidState
                                .filter((datas) => {
                                    const title = datas?.bid_name?.toLowerCase();
                                    const input = filter.toLowerCase();
                                    return title?.includes(input);
                                }).map((bid) => (
                                <TableRow key={bid.bid_idx}>
                                    <TableCell align={"center"}>{bid.bid_order}</TableCell>
                                    <TableCell align={"center"}>{bid.bid_name}</TableCell>
                                    <TableCell align={"center"}>{bid.bid_devi}</TableCell>
                                    <TableCell align={"center"}>
                                        {
                                            moneySelect === 0 ? <>
                                                {(bid.bid_cost)?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                            </> : <>
                                                {Money(bid.bid_cost)}
                                            </>
                                        }
                                    </TableCell>
                                    <TableCell align={"center"}>{bid.bid_date.substring(0, 10)}</TableCell>
                                    <TableCell align={"center"}>{bid.bid_note}</TableCell>
                                    <TableCell align={"center"}>
                                        <Button><BorderColorIcon/></Button>
                                        <Button color={"error"}><DeleteIcon/></Button>
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

export default BidPageState;
