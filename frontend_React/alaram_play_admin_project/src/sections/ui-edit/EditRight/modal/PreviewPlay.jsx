//상태값
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {NodeIdData} from "../../../../hooks/sections/node/UseNodeStatus.jsx";
import {useContext, useRef, useState} from "react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {Bad, Better, Good, VeryBad, VeryGood} from "./Preview-state.jsx";
import {ResizeContext} from "../../../../context/ResizeContext.jsx";
import {WeatherData} from "../../../../hooks/sections/display/UseWeather.jsx";
import logo from "../../../../assets/img/busan-logo.png";
import cloudGood from "../../../../assets/img/cloud-good.png";
import cloudMany from "../../../../assets/img/cloud-many.png";
import cloudBad from "../../../../assets/img/cloud-bad.png";
import weathers from "../../../../assets/img/cloud-Little.png";
import rain from "../../../../assets/img/rain.png";
import rainSnow from "../../../../assets/img/RainOrSnow.png";
import snow from "../../../../assets/img/snow.png";
import {PlayContext} from "../../../../context/PlayContext.jsx";
import {SwiperModalLoad} from "../../../../hooks/sections/play/UsePlaySwiper.jsx";
import {useQuery} from "react-query";
import Button from "@mui/material/Button";

function PreviewPlay(props) {
    const {updateResize, resizeList, reSizeBoolean, setReSizeBoolean, ResizingNumberUpdate} = useContext(ResizeContext);
    let ws = [];
    let ds = [];
    let cs = [];
    let fs = [];
    for (let i = 0; i < resizeList.length; i++) {
        if (resizeList[i].name === '날씨 정보') {
            ws.push(resizeList[i]);
        }
        if (resizeList[i].name === '대기 정보') {
            ds.push(resizeList[i]);
        }
        if (resizeList[i].name === '홍보물 정보') {
            cs.push(resizeList[i])
        }
        if (resizeList[i].name === '뉴스 정보') {
            fs.push(resizeList[i])
        }
    }


    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    const Weather = () => {
        const {updateResize} = useContext(ResizeContext);
        const {isLoading: weatherLoading, data: weatherList, isError: weatherError} = WeatherData();


        // 현재 시간 계산하기
        const now = new Date();
        const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
        const koreaTimeDiff = 9 * 120 * 60 * 1000;
        const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
        const update = koreaNow.replaceAll('T', ' ');
        const nows = update.replaceAll('Z', ' ').substring(0, 16);

        const dateIs = nows.substring(0, 10);
        const dateReplace = dateIs.replaceAll('-', '');

        const timeIs = nows.substring(11, 13);
        const timeResut = timeIs + '00'


        //날씨
        let temp = []; //기온
        let pop = []; //강수량
        let pty = []; //강수코드값
        let sky = []; //하늘상태

        for (let i = 0; i < weatherList?.data.data.length; i++) {
            if (weatherList?.data.data[i]?.category === 'TMP') {
                temp.push(weatherList?.data.data[i])
            }
            if (weatherList?.data.data[i]?.category === 'POP') {
                pop.push(weatherList?.data.data[i]);
            }
            if (weatherList?.data.data[i]?.category === 'PTY') {
                pty.push(weatherList?.data.data[i])
            }

            if (weatherList?.data.data[i]?.category === "SKY") {
                sky.push(weatherList?.data.data[i]);
            }
        }

        //현재시간 + 날씨
        let tempValue = [];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i]?.fcstDate === dateReplace && temp[i].fcstTime === timeResut) {
                tempValue.push(temp[i]);
            }
        }

        let popValue = [];
        for (let i = 0; i < pop.length; i++) {
            if (pop[i]?.fcstDate === dateReplace && pop[i].fcstTime === timeResut) {
                popValue.push(pop[i]);
            }
        }

        let ptyValue = [];
        for (let i = 0; i < pty.length; i++) {
            if (pty[i]?.fcstDate === dateReplace && pty[i].fcstTime === timeResut) {
                ptyValue.push(pty[i]);
            }
        }

        let skyValue = [];
        for (let i = 0; i < sky.length; i++) {
            if (sky[i]?.fcstDate === dateReplace && sky[i]?.fcstTime === timeResut) {
                skyValue.push(sky[i])
            }
        }

        if (weatherLoading) return <>Loading...</>
        if (weatherError) return <>Error!</>

        return (
            <div className="ui-display-weather-size"
                 style={{width: parseInt(ws[0]?.width / 1.8), height: parseInt(ws[0]?.height / 1.7)}}
            >
                <div className="dis-head-mini">
                    <section>
                        <img src={logo} alt="logo-pic"/>
                        <p>
                            {localStorage.getItem('nodeName') === '명보기업' ? '맘모스 프라자' : (
                                localStorage.getItem('nodeName') === '신평장림산업단지 혁신지원센터' ? '장림 2동 행정복지센터 ' : (
                                    localStorage.getItem('nodeName') === '부산 제1공장' ? "장림 1동 행정복지센터" : (
                                        localStorage.getItem('nodeName') === '동남공업' ? "감천 1동 행정복지센터" : (
                                            localStorage.getItem('nodeName') === '대동WF공업' ? "부산산단환경개선센터" : (
                                                localStorage.getItem('nodeName') === '다대2펌프장' ? "다대2동행정복지센터" : (
                                                    localStorage.getItem('nodeName') === '성신사' ? "다대1동행정복지센터" : (
                                                        localStorage.getItem('nodeName') === '신한은행 신평금융센터' ? "구평동행정복지센터" : (
                                                            localStorage.getItem('nodeName') === '청산에식품' ? "신평1동행정복지센터" : (
                                                                localStorage.getItem('nodeName') === '사하구민 장례식장' ? "장림유수지 인근" : localStorage.getItem('nodeName')
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )}
                        </p>
                    </section>
                    <section>
                        {
                            ptyValue[0]?.fcstValue === "0" ? <div>
                                {
                                    skyValue[0]?.fcstValue === '1' ? <img src={cloudGood} alt="weather-pic"/> : (
                                        skyValue[0]?.fcstValue === '3' ? <img src={cloudMany} alt="weather-pic"/> : (
                                            skyValue[0]?.fcstValue === '4' ? <img src={cloudBad} alt="weather-pic"/> :
                                                <img src={weathers} alt="weather-pic"/>
                                        )
                                    )
                                }
                            </div> : <div>
                                {
                                    ptyValue[0]?.fcstValue === "1" ? <img src={rain} alt="weather-pic"/> : (
                                        skyValue[0]?.fcstValue === '2' ? <img src={rainSnow} alt="weather-pic"/> : (
                                            skyValue[0]?.fcstValue === '3' ? <img src={snow} alt="weather-pic"/> :
                                                <img src={weathers} alt="weather-pic"/>
                                        )
                                    )
                                }
                            </div>
                        }


                        <div className="header-text">
                            <p>{nows}</p>
                            <p>
                                오늘날씨 |
                                {
                                    ptyValue[0]?.fcstValue === "0" ? <>
                                        {
                                            skyValue[0]?.fcstValue === '1' ? '맑음' : (
                                                skyValue[0]?.fcstValue === '3' ? '구름많음' : (
                                                    skyValue[0]?.fcstValue === '4' ? '흐림' : '-'
                                                )
                                            )
                                        }
                                    </> : <>
                                        {
                                            ptyValue[0]?.fcstValue === "1" ? '비' : (
                                                skyValue[0]?.fcstValue === '2' ? '비/눈' : (
                                                    skyValue[0]?.fcstValue === '3' ? '눈' : null
                                                )
                                            )
                                        }
                                    </>
                                }


                            </p>
                            <p>
                                기온 &nbsp;
                                <span>{tempValue[0]?.fcstValue}</span>&nbsp;
                                강수확률 &nbsp;
                                <span>{popValue[0]?.fcstValue}%</span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
    const Dust = () => {
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
            <div style={{width: parseInt(ds[0]?.width / 1.8), height: parseInt(ds[0]?.height / 2)}}>
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

                    {gradeLevel.map((arr, inx) => (
                        <div>
                            {inx % 2 === 0 ? (
                                <SwiperSlide>
                                    <div className="dis-select-content-mini">

                                        <div className="dis-dust03-mini">
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
                                                <div className="dis-select-title-p">
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

                                        <div className="dis-dust03-mini">
                                            <section className="dis-select">
                                                <section className="dis-select">
                                                    {
                                                        gradeLevel[inx + 1]?.grade === 'good' ? <VeryGood/> : (
                                                            gradeLevel[inx + 1]?.grade === 'notice' ? <Good/> : (
                                                                gradeLevel[inx + 1]?.grade === 'attention' ?
                                                                    <Better/> : (
                                                                        gradeLevel[inx + 1]?.grade === 'warning' ?
                                                                            <Bad/> : (
                                                                                gradeLevel[inx + 1]?.grade === 'over' ?
                                                                                    <VeryBad/> : null
                                                                            )
                                                                    )
                                                            )
                                                        )
                                                    }
                                                    <div className="dis-select-title-p">
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
    const Content = () => {
        const {ResultIdDedupe} = useContext(PlayContext);
        return (
            <div>
                <SwiperModalLoad ResultIdDedupe={ResultIdDedupe} cs={cs}/>
            </div>
        )
    }
    const Foot = () => {
        //좌측 edit 상위로직에서 데이터를 부르고 있으므로, 캐시 저장된 상태 데이터만 불러온다.
        const {data} = useQuery('news-list');

        const [animate, setAnimate] = useState(true);
        const onStop = () => setAnimate(false);
        const onRun = () => setAnimate(true);
        return (
            <div className="wrapper" style={{width: parseInt(fs[0]?.width / 2.2), height: parseInt(fs[0]?.height)}}>
                <div className="slide_container">
                    <ul
                        className="slide_wrapper"
                        onMouseEnter={onStop}
                        onMouseLeave={onRun}
                    >
                        <div className={"slide original".concat(animate ? "" : " stop")}>
                            {
                                data?.data.data.map((s, i) => (
                                    <li key={i}>
                                        <div className="item">
                                            {s.news_content}
                                        </div>
                                    </li>
                                ))
                            }


                        </div>
                        <div className={"slide clone".concat(animate ? "" : " stop")}>

                            {
                                data?.data.data.map((s, i) => (
                                    <li key={i}>
                                        <div className="item">
                                            {s.news_content}
                                        </div>
                                    </li>
                                ))
                            }


                        </div>
                    </ul>
                </div>
            </div>
        )
    }


    //최종 모달
    return (
        <Modal
            open={props.open}
            onClose={() => {
                props.handleClose();
                setReSizeBoolean(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box sx={style} className="preview-modal">

                {
                    reSizeBoolean === true ?
                        <div style={{width: "100%", height: "4vh"}}>
                            <Button variant="contained" sx={{float: "right"}} fullWidth onClick={() => {
                                ResizingNumberUpdate();
                                alert('저장이 완료 되었습니다.');
                                setReSizeBoolean(false);
                                props.handleClose();
                            }}>
                                저장
                            </Button>
                        </div> : null
                }


                {
                    updateResize[0]?.name === '날씨 정보' ? <Weather/> : (
                        updateResize[0]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[0]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[0]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }


                {
                    updateResize[1]?.name === '날씨 정보' ? <Weather/> : (
                        updateResize[1]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[1]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[1]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }

                {
                    updateResize[2]?.name === '날씨 정보' ? <Weather/> : (
                        updateResize[2]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[2]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[2]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }
                {
                    updateResize[3]?.name === '날씨 정보' ? <Weather/> : (
                        updateResize[3]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[3]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[3]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }

            </Box>
        </Modal>
    )
}

export default PreviewPlay;