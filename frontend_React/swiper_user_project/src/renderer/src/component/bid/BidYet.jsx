import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import headerLogo from "../../assets/section/header-logo.png";
import {Foot} from "../_config/foot-logo";
import {useContext, useEffect, useState} from "react";
import {PageContext} from "../../context/config/PageContext";
import {BidYetContext} from "../../context/bid/BidYetContext";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {AwardContext} from "../../context/excellent/AwardContext";
import {BidNewsContext} from "../../context/bid/BidNewsContext";
import {UiEditContext} from "../../context/all/UiEditContext";
import {Money} from "../../util/money";

function BidYet(){
  const {bidYetPage, setBidYetPage} = useContext(PageContext);
  const {bidYet} = useContext(BidYetContext);
  const {bidEdit} = useContext(UiEditContext);


  const {noticeAlarmList} = useContext(NoticeContext);
  const {exList} = useContext(StaffContext);

  const {bidNews} = useContext(BidNewsContext);

  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let staffLen = Math.ceil(exList?.length / 3);
  let bidNewsLen = Math.ceil(bidNews.length / 10);
  let total = noticeLen+staffLen+ bidNewsLen+ 1;

  const [data,setData] = useState(bidYet);
  const lastPage = bidYet.length % 10 === 0 ? bidYet.length / 10 : bidYet.length / 10 + 1;

  useEffect(() => {
    if (bidYetPage+1 === lastPage) {
      setData(bidYet.slice(10 * (bidYetPage - total)));
    } else {
      setData(bidYet.slice(10 * (bidYetPage - total), 10 * (bidYetPage - total) + 10));
    }
  }, [bidYetPage]);


  return(
        <div className="bid02-container">
            <div className="bid-section">
                <div className="bid-title02">
                    <h1>금일 &nbsp;
                      <span>입찰 현황</span>
                    </h1>
                </div>

                <div className="bid-board">
                    <TableContainer>
                        <Table>
                            <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                              <TableRow >
                                <TableCell>구분</TableCell>
                                <TableCell>용역명</TableCell>
                                <TableCell>발주처</TableCell>
                                <TableCell>기초금액(원)</TableCell>
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
                                    <TableCell>{bid.bid_date?.substring(0,10)}</TableCell>
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
export default BidYet;
