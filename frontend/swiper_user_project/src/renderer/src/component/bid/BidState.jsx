import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import headerLogo from "../../assets/section/header-logo.png";
import {Foot} from "../_config/foot-logo";
import {useContext, useEffect, useState} from "react";
import {PageContext} from "../../context/config/PageContext";
import {BidStateContext} from "../../context/bid/bidStateContext";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {AwardContext} from "../../context/excellent/AwardContext";
import {BidNewsContext} from "../../context/bid/BidNewsContext";
import {BidYetContext} from "../../context/bid/BidYetContext";
import {UiEditContext} from "../../context/all/UiEditContext";
import {Money} from "../../util/money";

function BidState(){
  const {bidStatePage, setBidStatePage} = useContext(PageContext);
  const {bidState} = useContext(BidStateContext);
  const {bidEdit} = useContext(UiEditContext);

  const {noticeAlarmList} = useContext(NoticeContext);
  const {exList} = useContext(StaffContext);
  const {bidNews} = useContext(BidNewsContext);
  const {bidYet} = useContext(BidYetContext);

  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let staffLen = Math.ceil(exList?.length / 3);
  let bidNewsLen = Math.ceil(bidNews.length / 10);
  let bidYetLen = Math.ceil(bidYet.length / 10);
  let total = noticeLen+staffLen+ bidNewsLen+ bidYetLen+ 1;


  const [data,setData] = useState(bidState);
  const lastPage = bidState.length % 10 === 0 ? bidState.length / 10 : bidState.length / 10 + 1;

  useEffect(() => {
    if (bidStatePage === lastPage) {
      setData(bidState.slice(10 * (bidStatePage - total)));
    } else {
      setData(bidState.slice(10 * (bidStatePage - total), 10 * (bidStatePage - total) + 10));
    }
  }, [bidStatePage]);


    return(
        <div className="bid03-container">
            <div className="bid-section">

                <div className="bid-title03">
                    <h1>금주 &nbsp;
                      <span>입찰 예정</span>
                    </h1>
                </div>

                <div className="bid-board">
                    <TableContainer>
                        <Table>
                            <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                              <TableRow>
                                <TableCell>구분</TableCell>
                                <TableCell>용역명</TableCell>
                                <TableCell>발주처 </TableCell>
                                <TableCell>기초금액(원)</TableCell>
                                <TableCell>입찰일</TableCell>
                                <TableCell>비고</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: "#ffffff"}}>
                              {
                                data?.map((bid) => (
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
          <Foot/>
        </div>
    )
}
export default BidState;
