import '../../style/news/News.css';
import {useContext, useEffect, useState} from "react";
import {PageContext} from "../../context/config/PageContext";
import {NewsContext} from "../../context/news/NewsContext";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {AwardContext} from "../../context/excellent/AwardContext";
import {BidNewsContext} from "../../context/bid/BidNewsContext";
import {BidYetContext} from "../../context/bid/BidYetContext";
import {BidStateContext} from "../../context/bid/bidStateContext";
import {UiEditContext} from "../../context/all/UiEditContext";

function News() {
  const {newsPage, setNewsPage} = useContext(PageContext);
  const {newsWeek} = useContext(NewsContext);
  const { newsEdit} = useContext(UiEditContext);

  const {noticeAlarmList} = useContext(NoticeContext);
  const {exList} = useContext(StaffContext);
  const {award} = useContext(AwardContext);
  const {bidNews} = useContext(BidNewsContext);
  const {bidYet} = useContext(BidYetContext);
  const {bidState} = useContext(BidStateContext);

  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let staffLen = Math.ceil(exList?.length / 3);
  let bidNewsLen = Math.ceil(bidNews.length / 10);
  let bidYetLen = Math.ceil(bidYet.length / 10);
  let bidStateLen = Math.ceil(bidState.length / 10);
  let total = noticeLen + staffLen + bidNewsLen + bidYetLen + bidStateLen + 1;

  const [data, setData] = useState(newsWeek);
  const lastPage = newsWeek.length % 2 === 0 ? newsWeek.length / 2 : newsWeek.length / 2 + 1;

  useEffect(() => {
    if (newsPage + 1 === lastPage) {
      setData(newsWeek.slice(2 * (newsPage - total)));
    } else {
      setData(newsWeek.slice(2 * (newsPage - total), 2 * (newsPage - total) + 2));
    }
  }, [newsPage]);


  return (
    <div className="main-container">
      <div className="main-title">
        엔지니어링 업계 소식 (HyperLink)
      </div>

      {data.map((news) => (
          <>
            <div className="news-section" key={news.in_idx}>
                {news.in_content}
            </div>
          </>
        ))
      }

    </div>
  )
}

export default News;
