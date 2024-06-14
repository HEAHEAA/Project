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
import Button from "@mui/material/Button";
import {AssignmentReturned, PostAdd} from "@mui/icons-material";
import BidAddModal from "../modal/Bid-Add-Modal.jsx";
import {BidExcelContext} from "../../../context/bid/BidExcelContext.jsx";
import {Money} from "../../../utils/money.jsx";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

function BidPageNews() {
    const {
        bidNews,
        handleOpen,
    } = useContext(BidContext);
    const {
        ExcelDownload
    } = useContext(BidExcelContext);

    // 검색용
    const [filter, setFilter] = useState('');

    const list = [
        {
            sbid_date: "24.1.14", // 낙찰일
            sbid_devi: "예시", //발주처
            sbid_name: "예시", //용역명
            sbid_order: "예시", // 구분
            sbid_rate: 100, // 비율
            sbid_cost: 1000, // 낙찰가
            sbid_note: "예시" // 비고
        }
    ]

    //페이징 처리
    const [page, setPage] = useState(1);
    const [data, setData] = useState([bidNews]);
    const lastPage = bidNews.length % 15 === 0 ? bidNews.length / 15 : bidNews.length / 15 + 1;
    let allPage = Math.ceil(bidNews.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(bidNews.slice(15 * (page - 1)));
        } else {
            setData(bidNews.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, bidNews]);

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
                                placeholder="용역명 검색"
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

                <Button className="excel-download-btn"
                        color={"success"} onClick={() => {
                    ExcelDownload(list);
                }}>
                    엑셀 양식 다운로드 &nbsp; <AssignmentReturned/>
                </Button>
            </div>

            <hr color="#f1f1f1"/>
            <h2>금주 낙찰 소식
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
                            <TableCell align={"center"}>낙찰일</TableCell>
                            <TableCell align={"center"}>구분</TableCell>
                            <TableCell align={"center"}>용역명</TableCell>
                            <TableCell align={"center"}>발주처</TableCell>
                            <TableCell align={"center"}>낙찰가(원)</TableCell>
                            <TableCell align={"center"}>공동도급비율(%)</TableCell>
                            <TableCell align={"center"}>비고</TableCell>
                            <TableCell align={"center"}>수정/삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            data
                                .filter((datas) => {
                                    const title = datas?.sbid_name?.toLowerCase();
                                    const input = filter.toLowerCase();
                                    return title?.includes(input);
                                }).map((sbid) => (
                                <TableRow key={sbid.sbid_idx}>
                                    <TableCell align={"center"}>{sbid.sbid_date?.substring(0, 10)}</TableCell>
                                    <TableCell align={"center"}>{sbid.sbid_order}</TableCell>
                                    <TableCell align={"center"}>{sbid.sbid_name}</TableCell>
                                    <TableCell align={"center"}>{sbid.sbid_devi}</TableCell>
                                    <TableCell align={"center"}>

                                        {
                                            moneySelect === 0 ? <>
                                                {(sbid.sbid_cost)?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                            </> : <>
                                                {Money(sbid.sbid_cost)}
                                            </>
                                        }
                                    </TableCell>
                                    <TableCell align={"center"}>{sbid.sbid_rate}%</TableCell>
                                    <TableCell align={"center"}>{sbid.sbid_note}</TableCell>
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

export default BidPageNews;
