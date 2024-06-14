import {useContext, useRef} from "react";
import {DisplayDataContext} from "../../../../../api/UIEdit/Display/DisplayDataContext.jsx";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, Pagination, Navigation} from 'swiper/modules'
//상태값
import {VeryGood, Better, Bad, VeryBad} from "./Mini-State.jsx";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


function DisplayHead() {
    const {gradeList} = useContext(DisplayDataContext);

    const progressCircle = useRef(null)
    const progressContent = useRef(null)
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress)
        progressContent.current.textContent = `${Math.ceil(timeIs / 1000)}s`
    }

    // //swiper 이벤트
    // //1-1. array len값에 맞춰서 time값을 받아오고 해당 받아온 값을 스와이퍼 시간에 넣어준다
    let timeIs = 10000
    const handleSwiperChange = (swiperCore) => {
        const {activeIndex} = swiperCore
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
                className="mySwiper"
            >
                {
                    gradeList.map((arr, inx) => (
                        <div>
                            {inx % 2 === 0 ? (
                                <SwiperSlide>
                                    <div className="dis-select-content">
                                        <div className="dis-dust04">
                                            <section className="dis-select">
                                                {
                                                    gradeList[inx].data === 1 ? <VeryGood/> : (
                                                        gradeList[inx].data === 2 ? <Better/> : (
                                                            gradeList[inx].data === 3 ? <Bad/> : (
                                                                gradeList[inx].data === 4 ? <VeryBad/> : null
                                                            )
                                                        )
                                                    )
                                                }
                                                <div className="dis-select-title">
                                                    {
                                                        gradeList[inx].data === 1 ?
                                                            <h1 style={{color: "rgb(50, 161, 255)"}}>좋음</h1> : (
                                                                gradeList[inx].data === 2 ?
                                                                    <h1 style={{color: "rgb(255, 185, 0)"}}>보통</h1> : (
                                                                        gradeList[inx].data === 3 ?
                                                                            <h1 style={{color: "rgb(255, 115, 17)"}}>나쁨</h1> : (
                                                                                gradeList[inx].data === 4 ?
                                                                                    <h1 style={{color: "rgb(239, 73, 73)"}}>매우나쁨</h1> : null
                                                                            )
                                                                    )
                                                            )
                                                    }
                                                    <h2 style={{color: "rgb(38,38,38)"}}>
                                                        {gradeList[inx].name}
                                                    </h2>
                                                </div>
                                            </section>
                                        </div>

                                        <div className="dis-dust04">
                                            <section className="dis-select">
                                                {
                                                    gradeList[inx + 1]?.data === 1 ? <VeryGood/> : (
                                                        gradeList[inx + 1]?.data === 2 ? <Better/> : (
                                                            gradeList[inx + 1]?.data === 3 ? <Bad/> : (
                                                                gradeList[inx + 1]?.data === 4 ? <VeryBad/> : null
                                                            )
                                                        )
                                                    )
                                                }

                                                <div className="dis-select-title">
                                                    {
                                                        gradeList[inx + 1]?.data === 1 ?
                                                            <h1 style={{color: "rgb(50, 161, 255)"}}>좋음</h1> : (
                                                                gradeList[inx + 1]?.data === 2 ?
                                                                    <h1 style={{color: "rgb(255, 185, 0)"}}>보통</h1> : (
                                                                        gradeList[inx + 1]?.data === 3 ?
                                                                            <h1 style={{color: "rgb(255, 115, 17)"}}>나쁨</h1> : (
                                                                                gradeList[inx + 1]?.data === 4 ?
                                                                                    <h1 style={{color: "rgb(239, 73, 73)"}}>매우나쁨</h1> : null
                                                                            )
                                                                    )
                                                            )
                                                    }
                                                    <h2 style={{color: "rgb(38,38,38)"}}>
                                                        {gradeList[inx + 1]?.name}
                                                    </h2>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ) : null}
                        </div>
                    ))
                }

                <div className="autoplay-progress" slot="container-end" style={{display: 'none'}}>
                    <p ref={progressCircle}></p>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    )
}

export default DisplayHead;