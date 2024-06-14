import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {useContext, useEffect, useRef} from "react";
import {PlaybackContext} from "../../../../api/PlayBack/PlaybackContext.jsx";
import {FileListContext} from "../../../../api/FileList/FileListContext.jsx";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";


function PlaySwiperPage() {
    const {fileList} = useContext(FileListContext);
    const {playbackList} = useContext(PlaybackContext);
    const {
        //스와이퍼 아이디
        swiperIdx,
        setSwiperIdx,
        //스와이퍼 돌리는 로드
        SwiperOnDownload,
        swiperUrl,
    } = useContext(PlaybackContext);

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
        <div className="play-file">
            {
                swiperUrl.length === 0 ?
                    <div>
                        <Box sx={{display: 'flex', marginTop: 5}}>
                            <CircularProgress size={'50%'} sx={{marginLeft: '25%'}}/>
                        </Box>
                        <h1 style={{textAlign: 'center'}}>잠시만 기다려 주세요</h1>
                    </div> :
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        effect={'fade'}
                        autoplay={{delay: timeIs, disableOnInteraction: false}}
                        navigation={true}
                        modules={[Pagination, Navigation,Autoplay]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        onSlideChange={handleSwiperChange}
                        className="mySwiper"
                    >
                        {
                            swiperUrl.map((arr) => (
                                <div key={arr.id || arr.id}>
                                    {
                                        arr.type === 'image' ?
                                            <SwiperSlide>
                                                <div className="dis-content-img01">
                                                    <div className="dis-content-img-div01">
                                                        <img src={arr.url} alt="test-img"/>
                                                    </div>
                                                </div>
                                            </SwiperSlide> : (
                                                arr.type === 'video' ?
                                                    <SwiperSlide>
                                                        <div className="dis-content-img01">
                                                            <div className="dis-content-img-div01">
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
                            // style={{display: "none"}}
                        >
                            <p ref={progressCircle}></p>
                            <span ref={progressContent}></span>
                        </div>

                    </Swiper>
            }


        </div>
    )
}

export default PlaySwiperPage;