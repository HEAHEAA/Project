import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {FootLogo} from "../display-config.jsx";
import {useContext, useEffect, useState} from "react";
import {BidContext} from "../../../../../context/bid/BidContext.jsx";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {ExcellentContext} from "../../../../../context/excellent/ExcellentContext.jsx";
import {Money} from "../../../../../utils/money.jsx";

function BidYetDisplay() {
    const {bidYetPage, setBidYetPage} = useContext(DisplayContext);
    const {bidYet} = useContext(BidContext);

    //스와이퍼 갯수 만큼 빼주기
    const {noticeAlarmList, noticeDateList} = useContext(NoticeContext);
    const {exList, setExList} = useContext(ExcellentContext);
    const {bidNews, setBidNews} = useContext(BidContext);

    let noticeLen = Math.ceil(noticeAlarmList?.length / 4);
    let staffLen = Math.ceil(exList?.length / 3);
    let bidNewsLen = Math.ceil(bidNews?.length / 10);
    let total = noticeLen + staffLen + bidNewsLen + 1;

    const [data, setData] = useState(bidYet);
    const lastPage = bidYet.length % 10 === 0 ? bidYet.length / 10 : bidYet.length / 10 + 1;

    useEffect(() => {
        if (bidYetPage + 1 === lastPage) {
            setData(bidYet.slice(10 * (bidYetPage - total)));
        } else {
            setData(bidYet.slice(10 * (bidYetPage - total), 10 * (bidYetPage - total) + 10));
        }
    }, [bidYetPage]);

    return (
        <div className="bid-display02-container">
            <div className="bid-display-section">
                <div className="bid-display-title02">
                    <h1>금일 &nbsp;
                        <span>입찰현황</span>
                    </h1>
                </div>

                <div className="bid-display-board">
                    <TableContainer>
                        <Table>
                            <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                <TableRow>
                                    <TableCell>구분</TableCell>
                                    <TableCell>용역명</TableCell>
                                    <TableCell>발주처</TableCell>
                                    <TableCell>기초금액</TableCell>
                                    <TableCell>입찰일</TableCell>
                                    <TableCell>비고</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: "#ffffff"}}>
                                {
                                    data.map((bid) => (
                                        <TableRow key={bid.bid_idx}>
                                            <TableCell>{bid.bid_order}</TableCell>
                                            <TableCell>{bid.bid_name}</TableCell>
                                            <TableCell>{bid.bid_devi}</TableCell>
                                            <TableCell>{Money(bid.bid_cost)}</TableCell>
                                            <TableCell>{bid.bid_date?.substring(0, 10)}</TableCell>
                                            <TableCell>{bid.bid_note}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <FootLogo/>
        </div>
    )
}

export default BidYetDisplay;
