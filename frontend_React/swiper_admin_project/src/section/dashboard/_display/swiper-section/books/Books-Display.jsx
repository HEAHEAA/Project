import {FootLogo} from "../display-config.jsx";
import {useContext, useEffect, useState} from "react";
import {BookContext} from "../../../../../context/book/BookContext.jsx";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {ExcellentContext} from "../../../../../context/excellent/ExcellentContext.jsx";
import {BidContext} from "../../../../../context/bid/BidContext.jsx";
import {NewsContext} from "../../../../../context/news/NewsContext.jsx";
import {BooksFileContext} from "../../../../../context/book/BooksFileContext.jsx";

function BooksDisplay(){
    const {bookPage,setBookPage} = useContext(DisplayContext);
    const {bookWeek} = useContext(BookContext);
    const {bookImgUrl} = useContext(BooksFileContext);

    const {noticeAlarmList,noticeDateList} = useContext(NoticeContext);
    const {exList,setExList} = useContext(ExcellentContext);
    const {bidState,setBidState, bidYet,setBidYet, bidNews,setBidNews,} = useContext(BidContext);
    const {newsWeek,setNewsWeek} = useContext(NewsContext);

    let noticeLen = Math.ceil(noticeAlarmList?.length / 4);
    let staffLen = Math.ceil(exList?.length / 3);
    let bidNewsLen = Math.ceil(bidNews?.length / 10);
    let bidYetLen = Math.ceil(bidYet?.length / 10);
    let bidStateLen = Math.ceil(bidState?.length / 10);
    let NewsLen = Math.ceil(newsWeek?.length / 5);
    let total = noticeLen+staffLen+bidNewsLen+bidYetLen+bidStateLen+NewsLen+1;

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
        <div className="main-display-container">
            {
                data.map((arr) => (
                    <div key={arr.re_idx}>
                        <div className="main-display-title" style={{textAlign: 'center'}}>
                            문화 소식
                        </div>

                        <div className="book-display-section01">
                            <div className="book-display-content-img">
                                <div className="book-display-content-img-div">
                                    <img src={arr.re_pic} alt="image" className="book-display-content-img-img"/>
                                </div>
                            </div>
                        </div>

                        <div className="book-display-section02">
                            <section>책 소 개</section>
                            <section style={{fontSize: 18}}>{arr.re_content}</section>
                        </div>

                        <div className="book-display-section03">
                            <section>요약 추천</section>
                            <section style={{fontSize: 18}}>{arr.re_summary}</section>
                        </div>
                    </div>
                ))
            }
            <FootLogo/>

        </div>
    )
}
export default BooksDisplay;
