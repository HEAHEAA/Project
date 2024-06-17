import DisplayHead from "./Head/DisplayHead.jsx";
import DisplayContent from "./Content/DisplayContent.jsx";
import DisplayFoot from "./Foot/DisplayFoot.jsx";
import logo from '../../../assets/img/busan-logo.png';

//1.날씨 이미지
import cloudGood from '../../../assets/img/cloud-good.png'; //맑음
import weathers from '../../../assets/img/cloud-Little.png'; //보통
import cloudMany from '../../../assets/img/cloud-many.png'; //구름 많음
import cloudBad from '../../../assets/img/cloud-bad.png'; //흐림

import rain from '../../../assets/img/rain.png'; //비
import rainSnow from '../../../assets/img/RainOrSnow.png'; //비 눈
import snow from '../../../assets/img/snow.png'; // 눈

import {WeatherData} from "../../../hooks/sections/display/UseWeather.jsx";
import {useContext} from "react";
import {ResizeContext} from "../../../context/ResizeContext.jsx";


function UIDisplay() {
    const {updateResize, resizeList} = useContext(ResizeContext);
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


    ///사이즈

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


    if (weatherLoading) return <>Loading...</>
    if (weatherError) return <>Error!</>


    const Header = () => {
        return (
            <div className="ui-display-weather-size"
                 style={{width: parseInt(ws[0]?.width), height: parseInt(ws[0]?.height)}}
            >
                <div className="dis-head">
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
                                                                localStorage.getItem('nodeName') === '사하구민 장례식장' ?  "장림유수지 인근" :localStorage.getItem('nodeName')
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
        return (
            <div className="ui-display-head-size"
                 style={{width: parseInt(ds[0]?.width), height: parseInt(ds[0]?.height)}}>
                <DisplayHead/>
            </div>
        )
    }
    const Content = () => {
        return (
            <div className="ui-display-content-size">
                <DisplayContent cs={cs}/>
            </div>
        )
    }
    const Foot = () => {
        return (
            <div className="ui-display-foot-size"
                 style={{width: parseInt(fs[0]?.width), height: parseInt(fs[0]?.height)}}>
                <DisplayFoot/>
            </div>
        )
    }
    return (
        <div>
            <div className="ui-display-size">
                {
                    updateResize[0]?.name === '날씨 정보' ? <Header/> : (
                        updateResize[0]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[0]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[0]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }


                {
                    updateResize[1]?.name === '날씨 정보' ? <Header/> : (
                        updateResize[1]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[1]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[1]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }

                {
                    updateResize[2]?.name === '날씨 정보' ? <Header/> : (
                        updateResize[2]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[2]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[2]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }
                {
                    updateResize[3]?.name === '날씨 정보' ? <Header/> : (
                        updateResize[3]?.name === '대기 정보' ? <Dust/> : (
                            updateResize[3]?.name === '홍보물 정보' ? <Content/> : (
                                updateResize[3]?.name === '뉴스 정보' ? <Foot/> : null
                            )
                        )
                    )
                }
            </div>
        </div>
    )
}


export default UIDisplay;