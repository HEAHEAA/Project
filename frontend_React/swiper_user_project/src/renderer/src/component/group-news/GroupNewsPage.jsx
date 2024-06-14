import {useContext, useEffect, useState} from "react";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {BidNewsContext} from "../../context/bid/BidNewsContext";
import {BidYetContext} from "../../context/bid/BidYetContext";
import {BidStateContext} from "../../context/bid/bidStateContext";
import {NewsContext} from "../../context/news/NewsContext";
import {BookContext} from "../../context/book/BookContext";
import {Foot} from "../_config/foot-logo";

const GroupNewsPage = () => {
  //스와이퍼 페이징
  const {noticeAlarmList} = useContext(NoticeContext);
  const {exList} = useContext(StaffContext);
  const {bidNews} = useContext(BidNewsContext);
  const {bidYet} = useContext(BidYetContext);
  const {bidState} = useContext(BidStateContext);
  const {newsWeek} = useContext(NewsContext);
  const {bookImgUrl} = useContext(BookContext);

  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let staffLen = Math.ceil(exList?.length / 3);
  let bidNewsLen = Math.ceil(bidNews.length / 10);
  let bidYetLen = Math.ceil(bidYet.length / 10);
  let bidStateLen = Math.ceil(bidState.length / 10);
  let NewsLen = Math.ceil(newsWeek.length / 2);
  let bookLen = Math.ceil(bookImgUrl.length / 1);
  let total = noticeLen + staffLen + bidNewsLen + bidYetLen + bidStateLen + NewsLen + bookLen + 1;

  return(
    <div  className="main-container">

      <div>
        <div className="main-title">
          동해 그룹 소식
        </div>

        <div className="book-section01">
        </div>

        <div className="book-section02">
        </div>

        <div className="book-section03">
        </div>


      </div>

      <Foot/>
    </div>
  )
}
export default GroupNewsPage;
