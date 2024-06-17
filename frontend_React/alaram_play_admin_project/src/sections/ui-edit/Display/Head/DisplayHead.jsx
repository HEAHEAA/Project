import {useRef} from "react";
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay, Pagination, Navigation} from 'swiper/modules'
//상태값
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

//상태값
import {VeryGood, Good, Better, Bad, VeryBad} from "./Mini-State.jsx";
import {NodeIdData} from "../../../../hooks/sections/node/UseNodeStatus.jsx";

function DisplayHead() {
    const {isLoading: nodeLoading, data: nodeData, isError: nodeError} = NodeIdData();

    /**
     * nodeData받아오기
     *  -데이터 전처리
     * **/
    let nodeSplit = nodeData?.data.data.grade?.split('#');
    let nodeGrade = nodeData?.data.data.sensor_data?.split('#');
    let gradeLevel = [];
    for (let i = 0; i < nodeSplit?.length; i++) {
        gradeLevel.push(
            {
                id: i + 1,
                name: nodeSplit[i].split('|')[0],
                grade: nodeSplit[i].split('|')[1],
                data: nodeGrade[i].split('|')[1]
            }
        )
    }


    /**
     * swiper
     * **/
    const progressCircle = useRef(null)
    const progressContent = useRef(null)
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress)
        progressContent.current.textContent = `${Math.ceil(timeIs / 1000)}s`
    }

    // //swiper 이벤트
    let timeIs = 10000
    const handleSwiperChange = (swiperCore) => {
        const {activeIndex} = swiperCore
    }


    if (nodeLoading) return <>Loading..</>
    if (nodeError) return <>Error!</>


    return (
        <div>
            <Swiper
                key={gradeLevel[0]?.id}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{delay: timeIs, disableOnInteraction: false}}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                onSlideChange={handleSwiperChange}
                className="mySwiper"
            >

                {gradeLevel.map((arr, inx) => (
                    <div key={arr.id}>
                        {inx % 2 === 0 ? (
                            <SwiperSlide>
                                <div className="dis-select-content">

                                    <div className="dis-dust04">
                                        <section className="dis-select">
                                            {
                                                arr.grade === 'good' ? <VeryGood/> : (
                                                    arr.grade === 'notice' ? <Good/> : (
                                                        arr.grade === 'attention' ? <Better/> : (
                                                            arr.grade === 'warning' ? <Bad/> : (
                                                                arr.grade === 'over' ? <VeryBad/> : null
                                                            )
                                                        )
                                                    )
                                                )
                                            }
                                            <div className="dis-select-title">
                                                <h2 style={{color: "rgb(38,38,38)"}}>
                                                    {arr.name}
                                                </h2>
                                                {
                                                    arr.grade === 'good' ?
                                                        <h1 style={{color: "rgb(50, 161, 255)"}}>좋음</h1> : (
                                                            arr.grade === 'notice' ?
                                                                <h1 style={{color: "rgb(0, 199, 60)"}}>주의</h1> : (
                                                                    arr.grade === 'attention' ?
                                                                        <h1 style={{color: "rgb(255, 185, 0)"}}>주시</h1> : (
                                                                            arr.grade === 'warning' ?
                                                                                <h1 style={{color: "rgb(255, 115, 17)"}}>경고</h1> : (
                                                                                    arr.grade === 'over' ?
                                                                                        <h1 style={{color: "rgb(239, 73, 73)"}}>초과</h1> : null
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                }
                                                <h3>{arr.data}</h3>
                                            </div>
                                        </section>
                                    </div>

                                    <div className="dis-dust04">
                                        <section className="dis-select">
                                            <section className="dis-select">
                                                {
                                                    gradeLevel[inx + 1]?.grade === 'good' ? <VeryGood/> : (
                                                        gradeLevel[inx + 1]?.grade === 'notice' ? <Good/> : (
                                                            gradeLevel[inx + 1]?.grade === 'attention' ?
                                                                <Better/> : (
                                                                    gradeLevel[inx + 1]?.grade === 'warning' ? <Bad/> : (
                                                                        gradeLevel[inx + 1]?.grade === 'over' ?
                                                                            <VeryBad/> : null
                                                                    )
                                                                )
                                                        )
                                                    )
                                                }
                                                <div className="dis-select-title">
                                                    <h2 style={{color: "rgb(38,38,38)"}}>
                                                        {gradeLevel[inx + 1]?.name}
                                                    </h2>
                                                    {
                                                        gradeLevel[inx + 1]?.grade === 'good' ?
                                                            <h1 style={{color: "rgb(50, 161, 255)"}}>좋음</h1> : (
                                                                gradeLevel[inx + 1]?.grade === 'notice' ?
                                                                    <h1 style={{color: "rgb(0, 199, 60)"}}>주의</h1> : (
                                                                        gradeLevel[inx + 1]?.grade === 'attention' ?
                                                                            <h1 style={{color: "rgb(255, 185, 0)"}}>주시</h1> : (
                                                                                gradeLevel[inx + 1]?.grade === 'warning' ?
                                                                                    <h1 style={{color: "rgb(255, 115, 17)"}}>경고</h1> : (
                                                                                        gradeLevel[inx + 1]?.grade === 'over' ?
                                                                                            <h1 style={{color: "rgb(239, 73, 73)"}}>초과</h1> : null
                                                                                    )
                                                                            )
                                                                    )
                                                            )
                                                    }
                                                    <h3>{gradeLevel[inx + 1]?.data}</h3>
                                                </div>
                                            </section>
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
