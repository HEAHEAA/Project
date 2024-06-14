import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {FootLogo} from "../display-config.jsx";
import {useContext, useEffect, useState} from "react";
import {BidContext} from "../../../../../context/bid/BidContext.jsx";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {ExcellentContext} from "../../../../../context/excellent/ExcellentContext.jsx";
import {Money} from "../../../../../utils/money.jsx";

function BidNewsDisplay(){
    const {bidNewsPage,setBidNewsPage} = useContext(DisplayContext);
    const {bidNews} = useContext(BidContext);

    //스와이퍼 갯수 만큼 빼주기
    const {noticeAlarmList,noticeDateList} = useContext(NoticeContext);
    const {exList,setExList} = useContext(ExcellentContext);

    let noticeLen = Math.ceil(noticeAlarmList?.length / 4);
    let staffLen = Math.ceil(exList?.length / 3);
    let total = noticeLen+staffLen+1;

    const [data, setData] = useState(bidNews);
    const lastPage = bidNews.length % 10 === 0 ? bidNews.length / 10 : bidNews.length / 10 + 1;

    useEffect(() => {
        if (bidNewsPage+1 === lastPage) {
            setData(bidNews.slice(10 * (bidNewsPage - total)));
        } else {
            setData(bidNews.slice(10 * (bidNewsPage - total), 10 * (bidNewsPage - total) + 10));
        }
    }, [bidNewsPage]);

    return(
        <div className="bid-display-container">
            <div className="bid-display-section">

                <div className="bid-display-title">
                    <h1>금주 &nbsp;
                        <span>낙찰소식</span>
                    </h1>
                </div>

                <div className="bid-display-board">
                    <TableContainer>
                        <Table>
                            <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                <TableRow >
                                    <TableCell>낙찰일</TableCell>
                                    <TableCell>구분</TableCell>
                                    <TableCell>용역명</TableCell>
                                    <TableCell>발주처</TableCell>
                                    <TableCell>낙찰가</TableCell>
                                    <TableCell>공동도급비율</TableCell>
                                    <TableCell>비고</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: "#ffffff"}}>
                                {
                                    data?.map((sbid) => (
                                        <TableRow key={sbid.sbid_idx}>
                                            <TableCell>{sbid.sbid_date?.substring(0, 10)}</TableCell>
                                            <TableCell>{sbid.sbid_order}</TableCell>
                                            <TableCell>{sbid.sbid_name}</TableCell>
                                            <TableCell>{sbid.sbid_devi}</TableCell>
                                            <TableCell>{Money(sbid.sbid_cost)}</TableCell>
                                            <TableCell>{sbid.sbid_rate}%</TableCell>
                                            <TableCell>{sbid.sbid_note}</TableCell>
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
export default BidNewsDisplay;
