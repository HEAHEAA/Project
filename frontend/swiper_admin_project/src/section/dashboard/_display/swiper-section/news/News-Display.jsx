import {FootLogo} from "../display-config.jsx";
import {useContext, useEffect, useState} from "react";
import {NewsContext} from "../../../../../context/news/NewsContext.jsx";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {ExcellentContext} from "../../../../../context/excellent/ExcellentContext.jsx";
import {BidContext} from "../../../../../context/bid/BidContext.jsx";

function NewsDisplay(){
    const {newsPage,setNewsPage} = useContext(DisplayContext);
    const {newsWeek} = useContext(NewsContext);

    const {noticeAlarmList,noticeDateList} = useContext(NoticeContext);
    const {exList,setExList} = useContext(ExcellentContext);
    const {bidState,setBidState, bidYet,setBidYet, bidNews,setBidNews,} = useContext(BidContext);

    let noticeLen = Math.ceil(noticeAlarmList?.length / 4);
    let staffLen = Math.ceil(exList?.length / 3);
    let bidNewsLen = Math.ceil(bidNews?.length / 10);
    let bidYetLen = Math.ceil(bidYet?.length / 10);
    let bidStateLen = Math.ceil(bidState?.length / 10);
    let total = noticeLen+staffLen+bidNewsLen+bidYetLen+bidStateLen+1;

    const [data,setData] = useState(newsWeek);
    const lastPage = newsWeek.length % 5 === 0 ? newsWeek.length / 5 : newsWeek.length / 5 + 1;

    useEffect(() => {
        if (newsPage+1 === lastPage) {
            setData(newsWeek.slice(5 * (newsPage - total)));
        } else {
            setData(newsWeek.slice(5 * (newsPage - total), 5 * (newsPage - total) + 5));
        }
    }, [newsPage]);

    return(
        <div className="main-display-container">
            <div className="main-display-title">
                엔지니어링 업계 소식 (HyperLink)
            </div>
            {
                data.map((news) => (
                    <div className="news-display-section" key={news.in_idx}>
                        <section>
                            {news.in_content}
                        </section>
                    </div>
                ))
            }
            <FootLogo/>
        </div>
    )
}
export default NewsDisplay;
