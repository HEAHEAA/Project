import {FiSearch} from "react-icons/fi";
import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlignCenter} from "../../../theme/same-style.jsx";
import {TableContainerStyles, TableStyles} from "../../../theme/mui-style-query.jsx";
import {useContext, useEffect, useState} from "react";
import {BidContext} from "../../../context/bid/BidContext.jsx";
import {Money} from "../../../utils/money.jsx";
import Button from "@mui/material/Button";

function BidPageYet() {
    const {bidYet} = useContext(BidContext);

    // 검색용
    const [filter, setFilter] = useState('');
    //페이징 처리

    const [page, setPage] = useState(1);
    const [data, setData] = useState([bidYet]);
    const lastPage = bidYet.length % 15 === 0 ? bidYet.length / 15 : bidYet.length / 15 + 1;
    let allPage = Math.ceil(bidYet.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(bidYet.slice(15 * (page - 1)));
        } else {
            setData(bidYet.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, bidYet]);

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
            <div className="notice-search-header">
                <div className="list-search">
                    <div className="box">
                        <div className="container-1">
                            <span className="icon"><FiSearch/></span>
                            <input
                                type="search"
                                id="search"
                                placeholder="Search.."/>
                        </div>
                    </div>
                </div>
            </div>

            <hr color="#f1f1f1"/>
            <h2>금주 입찰 현황</h2>
            <TableContainer sx={TableContainerStyles}>
                <Table sx={TableStyles}>
                    <TableHead sx={{backgroundColor: "#ececec"}}>
                        <TableRow>
                            <TableCell align={"center"}>구분</TableCell>
                            <TableCell align={"center"}>용역명</TableCell>
                            <TableCell align={"center"}>발주처</TableCell>
                            <TableCell align={"center"}>기초금액</TableCell>
                            <TableCell align={"center"}>입찰일</TableCell>
                            <TableCell align={"center"}>비고</TableCell>
                            <TableCell align={"center"}>수정/삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            bidYet
                                .filter((datas) => {
                                    const title = datas?.bid_name?.toLowerCase();
                                    const input = filter.toLowerCase();
                                    return title?.includes(input);
                                })
                                .map((sbid) => (
                                    <TableRow key={sbid.bid_idx}>
                                        <TableCell align={"center"}>{sbid.bid_order}</TableCell>
                                        <TableCell align={"center"}>{sbid.bid_name}</TableCell>
                                        <TableCell align={"center"}>{sbid.bid_devi}</TableCell>
                                        <TableCell align={"center"}>입찰일</TableCell>
                                        <TableCell align={"center"}>
                                            {
                                                moneySelect === 0 ? <>
                                                    {(sbid.bid_cost)?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                                </> : <>
                                                    {Money(sbid.bid_cost)}
                                                </>
                                            }
                                        </TableCell>
                                        <TableCell align={"center"}>{sbid.bid_date?.substring(0, 10)}</TableCell>
                                        <TableCell align={"center"}>{sbid.bid_note}</TableCell>
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

export default BidPageYet;
