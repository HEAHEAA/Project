import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import {useContext, useRef, useState} from "react";

//style
import '../../../_style/dashboard/display-bid.css';
import '../../../_style/dashboard/display-book.css';
import '../../../_style/dashboard/display-excellent.css';
import '../../../_style/dashboard/display-main-title.css';
import '../../../_style/dashboard/display-news.css';
import '../../../_style/dashboard/display-notice.css';
import ExcellentAwardsDisplay from "./swiper-section/excellent/Excellent-Awards-Display.jsx";
import {DisplayContext} from "../../../context/dashboard/DisplayContext.jsx";
import MainTitleDisplay from "./swiper-section/_main-title/MainTitle-Display.jsx";
import NoticeDisplay from "./swiper-section/notice/Notice-Display.jsx";
import ExcellentStaffDisplay from "./swiper-section/excellent/Excellent-Staff-Display.jsx";
import BidNewsDisplay from "./swiper-section/bid/BidNews-Display.jsx";
import BidYetDisplay from "./swiper-section/bid/BidYet-Display.jsx";
import BidStateDisplay from "./swiper-section/bid/BidState-Display.jsx";
import NewsDisplay from "./swiper-section/news/News-Display.jsx";
import BooksDisplay from "./swiper-section/books/Books-Display.jsx";
import {NoticeContext} from "../../../context/notice/NoticeContext.jsx";
import noticeDisplay from "./swiper-section/notice/Notice-Display.jsx";
import {ExcellentContext} from "../../../context/excellent/ExcellentContext.jsx";
import {BidContext} from "../../../context/bid/BidContext.jsx";
import {NewsContext} from "../../../context/news/NewsContext.jsx";
import {BookContext} from "../../../context/book/BookContext.jsx";
import GroupNewsDisplay from "./swiper-section/group-news/Group-News-Display.jsx";


//메인
export const MainPlay = [
    {id: 0, name: "타이틀", components: <MainTitleDisplay/>}
]

//공지사항
export const noticePlay = [
    {id: 1, name: "공지사항", components: <NoticeDisplay/>}
]

//우수사원
export const elStaffPlay = [
    {id: 2, name: "우수사원", components: <ExcellentStaffDisplay/>}
]

//입찰 소식
export const BidNewsPlay = [
    {id: 4, name: "입찰소식", components: <BidNewsDisplay/>}
]

//입찰 예정
export const BidYetPlay = [
    {id: 5, name: "입찰예정", components: <BidYetDisplay/>}
]

//낙찰 예정
export const BidStatePlay = [
    {id: 6, name: "낙찰예정", components: <BidStateDisplay/>}
]

//업계소식
export const NewsPlay = [
    {id: 7, name: "업계소식", components: <NewsDisplay/>}
]

//추천도서
export const BookPlay = [
    {id: 8, name: "문화소식", components: <BooksDisplay/>}
]

export const GroupNewsPlays = [
    {id: 9, name: "동해그룹 소식", components: <GroupNewsDisplay/>}
]

function DisplayLayout() {
    const {
        setPage,
        setAlarmPage,
        setStaffPage,
        setBidNewsPage,
        setBidYetPage,
        setBidStatePage,
        setNewsPage,
        setBookPage,
        setGroupNewsPage
    } = useContext(DisplayContext);

    const {noticeAlarmList, noticeDateList} = useContext(NoticeContext);
    const {exList, setExList} = useContext(ExcellentContext);
    const {bidState, setBidState, bidYet, setBidYet, bidNews, setBidNews,} = useContext(BidContext);
    const {newsWeek, setNewsWeek} = useContext(NewsContext);
    const {bookWeek, setBookWeek} = useContext(BookContext);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    //swiper 이벤트
    let timeIs = 5000;
    const handleSwiperChange = (swiperCore) => {
        const {activeIndex} = swiperCore;
        setAlarmPage(activeIndex);
        setStaffPage(activeIndex);
        setBidNewsPage(activeIndex);
        setBidYetPage(activeIndex);
        setBidStatePage(activeIndex);
        setNewsPage(activeIndex);
        setBookPage(activeIndex);
        setPage(activeIndex);
        setGroupNewsPage(activeIndex);
    }

    //공지사항 - 알람
    let notice = [];
    let noticeLen = Math.ceil(noticeAlarmList.length / 4);
    for (let i = 0; i < noticeLen; i++) {
        notice.splice(0, 0, {...noticePlay[0]})
    }

    //우수사원,시상식
    let staff = [];
    let staffLen = Math.ceil(exList.length / 3);
    for (let i = 0; i < staffLen; i++) {
        staff.splice(0, 0, {...elStaffPlay[0]});
    }

    //낙찰소식
    let nBid = [];
    let bidNewsLen = Math.ceil(bidNews.length / 10);
    for (let i = 0; i < bidNewsLen; i++) {
        nBid.splice(0, 0, {...BidNewsPlay[0]});
    }

    //입찰 예정
    let yBid = [];
    let bidYetLen = Math.ceil(bidYet.length / 10);
    for (let i = 0; i < bidYetLen; i++) {
        yBid.splice(0, 0, {...BidYetPlay[0]})
    }

    //입찰현황
    let sBid = [];
    let bidStateLen = Math.ceil(bidState.length / 10);
    for (let i = 0; i < bidStateLen; i++) {
        sBid.splice(0, 0, {...BidStatePlay[0]})
    }

    //업계소시기
    let News = [];
    let NewsLen = Math.ceil(newsWeek.length / 5);
    for (let i = 0; i < NewsLen; i++) {
        News.splice(0, 0, {...NewsPlay[0]});
    }

    //추천도서
    let book = [];
    for (let i = 0; i < bookWeek.length; i++) {
        book.splice(0, 0, {...BookPlay[0]});
    }

    let groupNews=[];
    for (let i = 0; i < bookWeek.length; i++) {
        groupNews.splice(0, 0, {...GroupNewsPlays[0]});
    }

    const total = [
        ...MainPlay,
        ...notice,
        ...staff,
        ...nBid,
        ...yBid,
        ...sBid,
        ...News,
        ...book,
        ...groupNews,
    ];

    return (
        <div className="display-section">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{delay: timeIs, disableOnInteraction: false}}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={handleSwiperChange}
                className="mySwiper"
            >
                {
                    total.map((arr) => (
                        <SwiperSlide>
                            {arr?.components}
                        </SwiperSlide>
                    ))
                }
                <div className="autoplay-progress" slot="container-end" style={{display: "none"}}>
                    <p ref={progressCircle}></p>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    )
}

export default DisplayLayout;
