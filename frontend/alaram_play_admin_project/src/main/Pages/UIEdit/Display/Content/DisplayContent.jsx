import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import test from '../../../../../assets/img/test02.png';
import test02 from '../../../../../assets/img/test.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useContext, useEffect, useRef, useState} from "react";
import {PlaybackContext} from "../../../../../api/PlayBack/PlaybackContext.jsx";
import {FileListContext} from "../../../../../api/FileList/FileListContext.jsx";

function DisplayContent({cs}) {
    const {
        //스와이퍼 아이디
        swiperIdx,
        setSwiperIdx,
        //스와이퍼 돌리는 로드
        SwiperOnDownload,
        swiperUrl,
    } = useContext(PlaybackContext);
    const {GetFileList, fileList} = useContext(FileListContext);
    const {PlayBackListOnsubmit, playbackList} = useContext(PlaybackContext);

    useEffect(() => {
        //1. 파일리스트
        GetFileList();
        //2. 현재 재생목록 리스트
        PlayBackListOnsubmit();
    }, []);

    //스와이퍼 돌리기
    useEffect(() => {
        SwiperOnDownload();
    }, [fileList, playbackList]);

    //swiper
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    //swiper 이벤트
    //1-1. array len값에 맞춰서 time값을 받아오고 해당 받아온 값을 스와이퍼 시간에 넣어준다
    let timeIs = swiperUrl[swiperIdx]?.time || 10000;
    const handleSwiperChange = (swiperCore) => {
        const {activeIndex} = swiperCore;
        setSwiperIdx(activeIndex);
    }

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{delay: timeIs, disableOnInteraction: false}}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={handleSwiperChange}
            >

                {
                    swiperUrl.map((arr, inx) => (
                        <div key={arr.idx || arr.idx}>
                            {
                                arr.type === 'image' ?
                                    <SwiperSlide
                                        style={{width: parseInt(cs[0]?.width), height: parseInt(cs[0]?.height)}}>
                                        <div className="dis-content-img" style={{height: parseInt(cs[0]?.height)}}>
                                            <div className="dis-content-img-div">
                                                <img src={arr.url} alt="test-img"/>
                                            </div>
                                        </div>

                                    </SwiperSlide> : (
                                        arr.type === 'video' ?
                                            <SwiperSlide>
                                                <div className="dis-content-img" style={{height: parseInt(cs[0]?.height)}}>
                                                    <div className="dis-content-img-div">
                                                        <video controls className="media-video" muted autoPlay loop>
                                                            <source src={arr.url} type="video/mp4"/>
                                                        </video>
                                                    </div>
                                                </div>

                                            </SwiperSlide> : null
                                    )
                            }
                        </div>
                    ))
                }

                <div
                    className="autoplay-progress"
                    slot="container-end"
                    style={{display: 'none'}}
                >
                    <p ref={progressCircle}></p>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    )
}

export default DisplayContent;