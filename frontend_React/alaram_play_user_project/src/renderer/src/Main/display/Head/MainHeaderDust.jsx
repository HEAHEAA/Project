import { useContext, useRef } from 'react'
import { WeatherContext } from '../../../context/WeatherContext.jsx'
import { NodeContext } from '../../../context/NodeContext'
//3. state 상태 - mini
import { VeryGood, Good, Better, Bad, VeryBad } from './State/Mini-State'
import { ResizeContext } from '../../../context/ResizeContext'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
//상태값
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

//3. state 상태 - Big

function MainHeaderDust() {
  const { sensorFic } = useContext(NodeContext)
  const { resize ,ds} = useContext(ResizeContext)

  let sensorSplit = sensorFic?.grade?.split('#')
  let sensorGrade = sensorFic?.sensor_data?.split('#')
  let gradeData = [] //복합악취 수치
  for (let i = 0; i < sensorSplit?.length; i++) {
    gradeData.push({
      id: i + 1,
      name: sensorSplit[i]?.split('|')[0],
      grade: sensorSplit[i]?.split('|')[1],
      data: sensorGrade[i]?.split('|')[1]
    })
  }

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  }

  // //swiper 이벤트
  let times = 10000;
  const handleSwiperChange = (swiperCore) => {
    const { activeIndex } = swiperCore
  }

  return (
    <div>
      <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: times, disableOnInteraction: false }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSlideChange={handleSwiperChange}
          className="mySwiper"
      >

        <div className="dust-header">
          {gradeData.map((arr, inx) => (
            <>
              {inx % 2 === 0 ? (
                <SwiperSlide key={inx}>
                  <div
                    style={{ width: parseInt(ds[0]?.width), height: parseInt(ds[0]?.height / 1.2) }}
                  >
                    <div className="main-dust01">
                      <section>
                        <div className="dust-icon">
                          {arr?.grade === 'good' ? (
                            <VeryGood />
                          ) : arr?.grade === 'notice' ? (
                            <Good />
                          ) : arr?.grade === 'attention' ? (
                            <Better />
                          ) : arr?.grade === 'warning' ? (
                            <Bad />
                          ) : arr?.grade === 'over' ? (
                            <VeryBad />
                          ) : null}
                        </div>
                        <div className="dust-text">
                          <h2>{arr.name}</h2>
                          {arr?.grade === 'good' ? (
                            <h1 style={{ color: 'rgb(50, 161, 255)' }}>좋음</h1>
                          ) : arr?.grade === 'notice' ? (
                            <h1 style={{ color: 'rgb(0, 199, 60)' }}>주의</h1>
                          ) : arr?.grade === 'attention' ? (
                            <h1 style={{ color: 'rgb(255, 185, 0)' }}>주시</h1>
                          ) : arr?.grade === 'warning' ? (
                            <h1 style={{ color: 'rgb(255, 115, 17)' }}>경고</h1>
                          ) : arr?.grade === 'over' ? (
                            <h1 style={{ color: 'rgb(239, 73, 73)' }}>초과</h1>
                          ) : null}
                          <h3>{arr?.data}</h3>
                        </div>
                      </section>
                    </div>

                    <div className="main-dust01">
                      <section>
                        <div className="dust-icon">
                          {gradeData[inx+1]?.grade === 'good' ? (
                            <VeryGood />
                          ) : gradeData[inx+1]?.grade === 'notice' ? (
                            <Good />
                          ) : gradeData[inx+1]?.grade === 'attention' ? (
                            <Better />
                          ) : gradeData[inx+1]?.grade === 'warning' ? (
                            <Bad />
                          ) : gradeData[inx+1]?.grade === 'over' ? (
                            <VeryBad />
                          ) : null}
                        </div>
                        <div className="dust-text">
                          <h2>{gradeData[inx+1]?.name}</h2>
                          {gradeData[inx+1]?.grade === 'good' ? (
                            <h1 style={{ color: 'rgb(50, 161, 255)' }}>좋음</h1>
                          ) : gradeData[inx+1]?.grade === 'notice' ? (
                            <h1 style={{ color: 'rgb(0, 199, 60)' }}>주의</h1>
                          ) : gradeData[inx+1]?.grade === 'attention' ? (
                            <h1 style={{ color: 'rgb(255, 185, 0)' }}>주시</h1>
                          ) : gradeData[inx+1]?.grade === 'warning' ? (
                            <h1 style={{ color: 'rgb(255, 115, 17)' }}>경고</h1>
                          ) : gradeData[inx+1]?.grade === 'over' ? (
                            <h1 style={{ color: 'rgb(239, 73, 73)' }}>초과</h1>
                          ) : null}
                          <h3>{gradeData[inx+1]?.data}</h3>
                        </div>
                      </section>
                    </div>
                  </div>
                </SwiperSlide>
              ) : null}
            </>
          ))}
        </div>


        <div className="autoplay-progress" slot="container-end" style={{display: "none"}}>
          <p ref={progressCircle}></p>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  )
}

export default MainHeaderDust;
