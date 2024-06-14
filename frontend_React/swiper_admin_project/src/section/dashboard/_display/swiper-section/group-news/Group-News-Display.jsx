import {useContext, useEffect, useState} from "react";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {ExcellentContext} from "../../../../../context/excellent/ExcellentContext.jsx";
import {BidContext} from "../../../../../context/bid/BidContext.jsx";
import {NewsContext} from "../../../../../context/news/NewsContext.jsx";
import {BookContext} from "../../../../../context/book/BookContext.jsx";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";
import {BooksFileContext} from "../../../../../context/book/BooksFileContext.jsx";

const GroupNewsDisplay = () => {
    const {groupNewsPage,setGroupNewsPage} = useContext(DisplayContext);
    const {bookImgUrl} = useContext(BooksFileContext);

    const {noticeAlarmList,noticeDateList} = useContext(NoticeContext);
    const {exList,setExList} = useContext(ExcellentContext);
    const {bidState,setBidState, bidYet,setBidYet, bidNews,setBidNews,} = useContext(BidContext);
    const {newsWeek,setNewsWeek} = useContext(NewsContext);
    const {bookWeek} = useContext(BookContext);

    let noticeLen = Math.ceil(noticeAlarmList?.length / 4);
    let staffLen = Math.ceil(exList?.length / 3);
    let bidNewsLen = Math.ceil(bidNews?.length / 10);
    let bidYetLen = Math.ceil(bidYet?.length / 10);
    let bidStateLen = Math.ceil(bidState?.length / 10);
    let NewsLen = Math.ceil(newsWeek?.length / 5);
    let bookLen = Math.ceil(bookWeek?.length/1);
    let total = noticeLen+staffLen+bidNewsLen+bidYetLen+bidStateLen+NewsLen+bookLen+1;

    const [data,setData] = useState(bookImgUrl);
    const lastPage = bookImgUrl.length % 1 === 0 ? bookImgUrl.length / 1 : bookImgUrl.length / 1 + 1;

    useEffect(() => {
        if (groupNewsPage+1 === lastPage) {
            setData(bookImgUrl.slice(1 * (groupNewsPage - total)));
        } else {
            setData(bookImgUrl.slice(1 * (groupNewsPage - total), 1 * (groupNewsPage - total) + 1));
        }
    }, [groupNewsPage]);

    return(
        <div className="main-display-container">
            {
                data.map((arr) => (
                    <div>
                        <div className="main-display-title" style={{textAlign: 'center'}}>
                            동해그룹 소식
                        </div>

                        <div className="book-display-section01">
                            <div className="book-display-content-img">
                                <div className="book-display-content-img-div">
                                    <img alt="image" className="book-display-content-img-img"/>
                                </div>
                            </div>
                        </div>

                        <div className="book-display-section02">

                        </div>

                        <div className="book-display-section03">

                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default GroupNewsDisplay;
