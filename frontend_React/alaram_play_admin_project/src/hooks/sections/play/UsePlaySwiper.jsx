//swiper
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from "axios";
import {useQueries} from "react-query";
import {useContext, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import {ResizeContext} from "../../../context/ResizeContext.jsx";


const fetchSwiperLoadApi = data => {
    return axios.get(`/api/did/files`, {
        params: {filename: data || 'bf42f7c5-d3e6-4cc6-81f7-96480b067140_부산tp-공고01.jpg'},
        responseType: 'arraybuffer'
    })
}


export const SwiperLoad = ({ResultIdDedupe,cs}) => {
    const result = useQueries(
        ResultIdDedupe?.map(list => {
            return {
                queryKey: ['swiper-list', list.upload_fileName],
                queryFn: () => fetchSwiperLoadApi(list.upload_fileName),

            }
        }),
    )

    let View = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i]?.status === 'success') {
            const contentType = result[i]?.data.headers['content-type']
            if (contentType && contentType.startsWith('application/octet-stream')) {
                const VdoBlob = new Blob([result[i].data.data], {type: 'video/mp4'});
                const VdoURL = URL.createObjectURL(VdoBlob);
                View.push({
                    id: ResultIdDedupe[i].idx,
                    url: VdoURL,
                    time: ResultIdDedupe[i].time,
                    type: "video"
                })
            } else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                const ImgBlob = new Blob([result[i].data.data], {type: contentType});
                const imageURL = URL.createObjectURL(ImgBlob);
                View.push({
                    id: ResultIdDedupe[i].idx,
                    url: imageURL,
                    time: ResultIdDedupe[i].time,
                    type: "image"
                })
            }
        }
    }


    const [indexTime, setIndexTime] = useState(0);
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    //swiper 이벤트
    //1-1. array len값에 맞춰서 time값을 받아오고 해당 받아온 값을 스와이퍼 시간에 넣어준다
    let timeIs = parseInt(View[indexTime]?.time) || 10000;
    const handleSwiperChange = (swiperCore) => {
        const {activeIndex} = swiperCore;
        setIndexTime(activeIndex);
    }

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{delay: timeIs, disableOnInteraction: false,}}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={handleSwiperChange}
                className="mySwiper"
            >

                {
                    ResultIdDedupe.length !== View.length ?
                        <div>
                            <Box sx={{display: 'flex', marginTop: 5}}>
                                <CircularProgress size={'50%'} sx={{marginLeft: '25%'}}/>
                            </Box>
                            <h1 style={{textAlign: 'center'}}>잠시만 기다려 주세요</h1>
                        </div> : <div key={View[0]?.id}>
                            {
                                View.map((arr, inx) => (
                                    <div key={arr.id}>

                                        {
                                            window.location.pathname === '/home/play' ? <div>
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
                                                                            <img src={arr.url} alt="test-img"/>
                                                                        </div>
                                                                    </div>
                                                                </SwiperSlide> : null
                                                        )
                                                }
                                            </div> : (
                                                window.location.pathname === '/home/ui' ? <div>
                                                    {
                                                        arr.type === 'image' ?
                                                            <SwiperSlide>
                                                                <div className="dis-content-img">
                                                                    <div className="dis-content-img-div">
                                                                        <img src={arr.url} alt="test-img"/>
                                                                    </div>
                                                                </div>

                                                            </SwiperSlide> : (
                                                                arr.type === 'video' ?
                                                                    <SwiperSlide>
                                                                        <div className="dis-content-img">
                                                                            <div className="dis-content-img-div" >
                                                                                <video controls className="media-video" muted autoPlay loop>
                                                                                    <source src={arr.url} type="video/mp4"/>
                                                                                </video>
                                                                            </div>
                                                                        </div>

                                                                    </SwiperSlide> : null
                                                            )
                                                    }


                                                </div> : null
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                }


                {window.location.pathname === '/home/play' ?
                    <div className="autoplay-progress" slot="container-end">
                        <p ref={progressCircle}></p>
                        <span ref={progressContent}></span>
                    </div> :
                    <div className="autoplay-progress" slot="container-end" style={{display: 'none'}}>
                        <p ref={progressCircle}></p>
                        <span ref={progressContent}></span>
                    </div>
                }

            </Swiper>

        </div>
    )
}

export const SwiperModalLoad = ({ResultIdDedupe,cs}) => {
    const result = useQueries(
        ResultIdDedupe?.map(list => {
            return {
                queryKey: ['swiper-list', list.upload_fileName],
                queryFn: () => fetchSwiperLoadApi(list.upload_fileName),

            }
        }),
    )

    let View = [];
    for (let i = 0; i < result.length; i++) {
        if (result[i]?.status === 'success') {
            const contentType = result[i]?.data.headers['content-type']
            if (contentType && contentType.startsWith('application/octet-stream')) {
                const VdoBlob = new Blob([result[i].data.data], {type: 'video/mp4'});
                const VdoURL = URL.createObjectURL(VdoBlob);
                View.push({
                    id: ResultIdDedupe[i].idx,
                    url: VdoURL,
                    time: ResultIdDedupe[i].time,
                    type: "video"
                })
            } else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                const ImgBlob = new Blob([result[i].data.data], {type: contentType});
                const imageURL = URL.createObjectURL(ImgBlob);
                View.push({
                    id: ResultIdDedupe[i].idx,
                    url: imageURL,
                    time: ResultIdDedupe[i].time,
                    type: "image"
                })
            }
        }
    }


    const [indexTime, setIndexTime] = useState(0);
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    //swiper 이벤트
    //1-1. array len값에 맞춰서 time값을 받아오고 해당 받아온 값을 스와이퍼 시간에 넣어준다
    let timeIs = parseInt(View[indexTime]?.time) || 10000;
    const handleSwiperChange = (swiperCore) => {
        const {activeIndex} = swiperCore;
        setIndexTime(activeIndex);
    }



    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{delay: timeIs, disableOnInteraction: false,}}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={handleSwiperChange}
                className="mySwiper"
            >

                {
                    ResultIdDedupe.length !== View.length ?
                        <div>
                            <Box sx={{display: 'flex', marginTop: 5}}>
                                <CircularProgress size={'50%'} sx={{marginLeft: '25%'}}/>
                            </Box>
                            <h1 style={{textAlign: 'center'}}>잠시만 기다려 주세요</h1>
                        </div> : <div key={ResultIdDedupe[0]?.idx}>
                            {
                                View.map((arr, inx) => (
                                    <>
                                        {
                                            arr.type === 'image' ?
                                                <SwiperSlide key={arr.id}>
                                                    <div className="dis-content-img" style={{
                                                        width: parseInt(cs[0]?.width / 2.25),
                                                        height: parseInt(cs[0]?.height / 2.5)
                                                    }}>
                                                        <div className="dis-content-img-div" >
                                                            <img src={arr.url} alt="test-img"/>
                                                        </div>
                                                    </div>
                                                </SwiperSlide> : (
                                                    arr.type === 'video' ?
                                                        <SwiperSlide key={arr.id}>
                                                            <div className="dis-content-img">
                                                                <div className="dis-content-img-div" >
                                                                    <video controls className="media-video" muted autoPlay loop>
                                                                        <source src={arr.url} type="video/mp4"/>
                                                                    </video>
                                                                </div>
                                                            </div>

                                                        </SwiperSlide> : null
                                                )
                                        }
                                    </>
                                ))
                            }
                        </div>
                }
                <div className="autoplay-progress" slot="container-end" style={{display: 'none'}}>
                    <p ref={progressCircle}></p>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>

        </div>
    )
}


