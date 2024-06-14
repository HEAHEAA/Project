import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useContext, useEffect, useRef, useState} from "react";
import {PlayContext} from "../../../context/PlayContext.jsx";
import { ResizeContext } from "../../../context/ResizeContext";

function MainContent() {
  const {
    playTimeResult,
    swiperIdx,
    setSwiperIdx,
    url,setUrl,
  } = useContext(PlayContext);
  const { resize ,cs} = useContext(ResizeContext)


  let size = [];
  for(let i=0; i<resize.length; i++){
    if(resize[i].name === '대기 정보'){
      size.push(resize[i]);
    }
  }



  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };


  // //swiper 이벤트
  // //1-1. array len값에 맞춰서 time값을 받아오고 해당 받아온 값을 스와이퍼 시간에 넣어준다
  let timeIs = playTimeResult[swiperIdx]?.running_time || 3000;
  const handleSwiperChange = (swiperCore) => {
    const {activeIndex} = swiperCore;
    setSwiperIdx(activeIndex);
  }



  let DataArray = [...url];
  return (
    <div className="main-content"
         style={{width: parseInt(cs[0]?.width), height: parseInt(cs[0]?.height+30)}}
    >
      <Swiper
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
          DataArray?.map((arr,inx) => (
            <div key={inx}>
              {
                arr.type === 'image' ?
                  <SwiperSlide>
                    <div className="content-img">
                      <div className="content-img-div" style={{width: parseInt(cs[0]?.width-30), height: parseInt(cs[0]?.height+30)}}>
                        <img src={arr.mediaUrl} alt="image" />
                      </div>
                    </div>
                  </SwiperSlide> : (
                    arr.type === 'video' ?
                      <SwiperSlide>
                        <div className="content-img">
                          <div className="content-img-div">
                            <video muted autoPlay loop>
                              <source src={arr.mediaUrl}/>
                            </video>
                          </div>
                        </div>
                      </SwiperSlide> : null
                  )
              }
            </div>
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

export default MainContent;
