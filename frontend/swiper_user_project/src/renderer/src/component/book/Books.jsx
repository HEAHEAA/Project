import '../../style/book/Book.css';
import {Foot} from "../_config/foot-logo";
import {useContext, useEffect, useState} from "react";
import {PageContext} from "../../context/config/PageContext";
import {BookContext} from "../../context/book/BookContext";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {AwardContext} from "../../context/excellent/AwardContext";
import {BidNewsContext} from "../../context/bid/BidNewsContext";
import {BidYetContext} from "../../context/bid/BidYetContext";
import {BidStateContext} from "../../context/bid/bidStateContext";
import {NewsContext} from "../../context/news/NewsContext";
import {UiEditContext} from "../../context/all/UiEditContext";

function Books(){
  const {bookPage, setBookPage} = useContext(PageContext);
  const {bookImgUrl} = useContext(BookContext);
  const {bookEdit} = useContext(UiEditContext);


  const {noticeAlarmList} = useContext(NoticeContext);
  const {exList} = useContext(StaffContext);
  const {bidNews} = useContext(BidNewsContext);
  const {bidYet} = useContext(BidYetContext);
  const {bidState} = useContext(BidStateContext);
  const {newsWeek} = useContext(NewsContext);

  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let staffLen = Math.ceil(exList?.length / 3);
  let bidNewsLen = Math.ceil(bidNews.length / 10);
  let bidYetLen = Math.ceil(bidYet.length / 10);
  let bidStateLen = Math.ceil(bidState.length / 10);
  let NewsLen = Math.ceil(newsWeek.length / 2);
  let total = noticeLen + staffLen + bidNewsLen + bidYetLen + bidStateLen + NewsLen +1;


  const [data,setData] = useState(bookImgUrl);
  const lastPage = bookImgUrl.length % 1 === 0 ? bookImgUrl.length / 1 : bookImgUrl.length / 1 + 1;

  useEffect(() => {
    if (bookPage+1 === lastPage) {
      setData(bookImgUrl.slice(1 * (bookPage - total)));
    } else {
      setData(bookImgUrl.slice(1 * (bookPage - total), 1 * (bookPage - total) + 1));
    }
  }, [bookPage]);


  return(
    <div  className="main-container">
      {
        data.map((arr) => (
          <div key={arr.re_idx}>
            <div className="main-title">
              문화 소식
            </div>

            <div className="book-section01">

              <div className="content-img">
                <div className="content-img-div">
                  <img src={arr.re_pic} alt="image" className="content-img-img"/>
                </div>
              </div>
            </div>

            <div className="book-section02">
              <section>책 소 개</section>
              <section>
                {arr.re_content}
              </section>
            </div>
            <div className="book-section03">
              <section>요약 추천</section>
              <section>
                {arr.re_summary}
              </section>
            </div>


          </div>
        ))
      }


      <Foot/>
    </div>
  )
}
export default Books;
