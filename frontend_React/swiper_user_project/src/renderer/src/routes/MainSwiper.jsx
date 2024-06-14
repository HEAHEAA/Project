import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import {useContext, useEffect, useRef, useState} from "react";
import MainTitlePage from "../component/main-title/MainTitlePage";
import NoticePage from "../component/notice/NoticePage";
import ExcellentEmPage from "../component/excellent/ExcellentEmPage";
import {Button, createTheme, ThemeProvider} from "@mui/material";
import ExcellentAwardPage from "../component/excellent/ExcellentAwardPage";
import BidNews from "../component/bid/BidNews";
import BidYet from "../component/bid/BidYet";
import BidState from "../component/bid/BidState";
import News from "../component/news/News";
import Books from "../component/book/Books";
import {PageContext} from "../context/config/PageContext";
import {NoticeContext} from "../context/notice/NoticeContext";
import {StaffContext} from "../context/excellent/StaffContext";
import {AwardContext} from "../context/excellent/AwardContext";
import {BidNewsContext} from "../context/bid/BidNewsContext";
import {BidStateContext} from "../context/bid/bidStateContext";
import {BidYetContext} from "../context/bid/BidYetContext";
import {NewsContext} from "../context/news/NewsContext";
import {BookContext} from "../context/book/BookContext";
import {UserPartContext} from "../context/config/UserPartContext";
import {EventSourcePolyfill} from "event-source-polyfill";
import ip from '../../../../dist/path.json';
import {UiEditContext} from "../context/all/UiEditContext";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import GroupNewsPage from "../component/group-news/GroupNewsPage";


export const MainPlay = [
  {id: 0, name: "타이틀", components:  <MainTitlePage/>}
]

//공지사항
export const noticePlay = [
  {id: 1, name: "공지사항", components: <NoticePage/>}
]

//우수사원
export const elStaffPlay = [
  {id: 2, name: "우수사원", components: <ExcellentEmPage/>}
]

//시상식
export const elAwardsPlay = [
  {id: 3, name: "시상식", components: <ExcellentAwardPage/>}
]

//입찰 소식
export const BidNewsPlay = [
  {id: 4, name: "입찰소식", components:  <BidNews/>}
]

//입찰 예정
export const BidYetPlay = [
  {id: 5, name: "입찰예정", components: <BidYet/>}
]

//낙찰 예정
export const BidStatePlay = [
  {id: 6, name: "낙찰예정", components:<BidState/>}
]

//업계소식
export const NewsPlay = [
  {id: 7, name: "업계소식", components: <News/>}
]


//문화소식
export const BookPlay = [
  {id: 8, name: "문화소식", components: <Books/>}
]

export const GroupNewsPlay = [
  {id: 9, name: "동해 그룹 소식", components: <GroupNewsPage/>}
]

export const Theme = createTheme({
  typography: {
    fontFamily: 'SUITE-Regular',
    fontWeight: 300
  }
});

function MainSwiper() {
  const {UiEditDataOnSubmit} = useContext(UiEditContext);
  const {NoticeWeekData,noticeAlarmList} = useContext(NoticeContext);
  const {ExcellentWeekList,exList} = useContext(StaffContext);
  const {AwardWeekList,award} = useContext(AwardContext);
  const {BidWeekNews,bidNews} = useContext(BidNewsContext);
  const {BidTodayYet,bidYet,setBidYet} = useContext(BidYetContext);
  const {BidWeekState,bidState,setBidState} = useContext(BidStateContext);
  const {NewsWeeksData,newsWeek,setNewsWeek,} = useContext(NewsContext);
  const {BookWeekData,bookWeek, setBookWeek,} = useContext(BookContext);
  const {ClientGradeOnSubmit,ClientPartOnSubmit}  = useContext(UserPartContext);

  const {
    alarmPage,setAlarmPage, //공지사항 알림사항
    setStaffPage, // 우수사원
    setAwardPage, //시상식
    setBidNewsPage, //입찰소식
    setBidYetPage, //입찰예정
    setBidStatePage, //낙찰예정
    setNewsPage, //업계소식
    setBookPage, //추천도서
    groupNewsPage,setGroupNewsPage
  } = useContext(PageContext);


  useEffect(() => {
    UiEditDataOnSubmit();
    NoticeWeekData(); //공지
    ExcellentWeekList(); //우수사원
    AwardWeekList(); // 시상식
    BidWeekNews(); //낙찰
    BidWeekState(); // 입찰
    BidTodayYet(); //입찰 예정
    NewsWeeksData(); //업계소식
    BookWeekData(); //추천도서
    ClientGradeOnSubmit(); //직급
    ClientPartOnSubmit() //부서
  }, []);


  useEffect(() => {
    let sse = new EventSourcePolyfill(`${ip.ip}/api/sse/connect`, {
      heartbeatTimeout: 60000 * 60
    })
    sse.addEventListener('refreshData', function (e){
      let sseData = e.data;
      if(sseData === 'do refresh data'){
        NoticeWeekData(); //공지
        ExcellentWeekList(); //우수사원
        AwardWeekList(); // 시상식
        BidWeekNews(); //낙찰
        BidWeekState(); // 입찰
        BidTodayYet(); //입찰 예정
        NewsWeeksData(); //업계소식
        BookWeekData(); //추천도서
        ClientGradeOnSubmit(); //직급
        ClientPartOnSubmit() //부서
      }
    })
  }, []);



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
    setAwardPage(activeIndex);
    setBidNewsPage(activeIndex);
    setBidYetPage(activeIndex);
    setBidStatePage(activeIndex);
    setNewsPage(activeIndex);
    setBookPage(activeIndex);
    setGroupNewsPage(activeIndex);
  }





  //공지사항 - 알람
  let notice = [];
  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  for (let i = 0; i < noticeLen; i++) {
    notice.splice(0, 0, {...noticePlay[0]})
  }


  //우수사원
  let staff = [];
  let staffLen = Math.ceil(exList?.length / 3);
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
  let NewsLen = Math.ceil(newsWeek.length / 2);
  for (let i = 0; i < NewsLen; i++) {
    News.splice(0, 0, {...NewsPlay[0]});
  }

  //추천도서
  let book = [];
  for (let i = 0; i < bookWeek.length; i++) {
    book.splice(0, 0, {...BookPlay[0]})
  }


  //그룹뉴스
  let groupNews = [];
  for (let i = 0; i < bookWeek.length; i++) {
    groupNews.splice(0, 0, {...GroupNewsPlay[0]})
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
    ...groupNews
  ];



  return (
    <div className="swiper">
      <ThemeProvider theme={Theme}>
        <Swiper key={total[0]?.id}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{delay: timeIs, disableOnInteraction: false}}
          navigation={false}
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
      </ThemeProvider>

    </div>
  )
}

export default MainSwiper;
