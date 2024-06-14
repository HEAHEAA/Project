import '../../style/bid/BidNews.css'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import headerLogo from "../../assets/section/header-logo.png";
import {Foot} from "../_config/foot-logo";
import {useContext, useEffect, useState} from "react";
import {PageContext} from "../../context/config/PageContext";
import {BidNewsContext} from "../../context/bid/BidNewsContext";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {AwardContext} from "../../context/excellent/AwardContext";
import {UiEditContext} from "../../context/all/UiEditContext";
import {Money} from "../../util/money";

function BidNews() {
  const {bidNewsPage, setBidNewsPage} = useContext(PageContext);
  const {bidNews} = useContext(BidNewsContext);
  const {bidEdit} = useContext(UiEditContext);

  const {noticeAlarmList} = useContext(NoticeContext);
  const {exList} = useContext(StaffContext);

  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let staffLen = Math.ceil(exList?.length / 3);
  let total = noticeLen + staffLen + 1;


  const [data, setData] = useState(bidNews);
  const lastPage = bidNews.length % 10 === 0 ? bidNews.length / 10 : bidNews.length / 10 + 1;

  useEffect(() => {
    if (bidNewsPage + 1 === lastPage) {
      setData(bidNews.slice(10 * (bidNewsPage - total)));
    } else {
      setData(bidNews.slice(10 * (bidNewsPage - total), 10 * (bidNewsPage - total) + 10));
    }
  }, [bidNewsPage]);


  return (
    <div className="bid-container">
      <div className="bid-section">

        <div className="bid-title">
          <h1>금주 &nbsp;
            <span>낙찰소식</span>
          </h1>
        </div>

        <div className="bid-board">
          <TableContainer>
            <Table>
              <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                <TableRow>
                  <TableCell>낙찰일</TableCell>
                  <TableCell>구분</TableCell>
                  <TableCell>용역명</TableCell>
                  <TableCell>발주처</TableCell>
                  <TableCell>낙찰가(원)</TableCell>
                  <TableCell>공동도급비율(%)</TableCell>
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


      <Foot/>

    </div>
  )
}

export default BidNews;
