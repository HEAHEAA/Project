import DisplayHead from "./Head/DisplayHead.jsx";
import DisplayContent from "./Content/DisplayContent.jsx";
import DisplayFoot from "./Foot/DisplayFoot.jsx";
import {useContext, useEffect} from "react";
import logo from '../../../../assets/img/youngjin-logo.png';

import {DisplayResize} from "../../../../api/UIEdit/Display/DisplayResize.jsx";
import {WeatherContext} from "../../../../api/UIEdit/Display/WeatherContext.jsx";

//1.날씨 이미지
import cloudGood from '../../../../assets/img/cloud-good.png'; //맑음
import weathers from '../../../../assets/img/cloud-Little.png'; //보통
import cloudMany from '../../../../assets/img/cloud-many.png'; //구름 많음
import cloudBad from '../../../../assets/img/cloud-bad.png';
import {NodeContext} from "../../../../api/UIEdit/Display/NodeContext.jsx";
import {PlaybackContext} from "../../../../api/PlayBack/PlaybackContext.jsx";
import {FileListContext} from "../../../../api/FileList/FileListContext.jsx"; //흐림


function UIDisplay() {
    const {weather} = useContext(WeatherContext);
    const {sensorFic} = useContext(NodeContext);
    const {resizeList,updateResize} = useContext(DisplayResize);



    // 현재 시간 계산하기
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 120 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
    const update = koreaNow.replaceAll('T', ' ');
    const nows = update.replaceAll('Z', ' ').substring(0,16);



    const dateIs =  nows.substring(0,10);
    const dateReplace =  dateIs.replaceAll('-','');

    const timeIs = nows.substring(11,13);
    const timeResut = timeIs + '00'


    //1.날씨
    let temp = []; //기온
    let pty = []; //강수량 코드 //0없음 ,1. 비 ,2. 비/눈, 3. 눈,  5.빗방울, 6. 빗방울 눈날림, 7.눈날림
    let sky = []; //하늘상태 코드값

    for (let i = 0; i < weather.length; i++) {
        if (weather[i].category === 'TMP') {
            temp.push(weather[i])
        }
        if (weather[i].category === 'PTY') {
            pty.push(weather[i]);
        }
        if (weather[i].category === "SKY") {
            sky.push(weather[i]);
        }
    }

    let skyValue = [];
    for(let i = 0; i<sky.length; i++){
        if(sky[i]?.fcstDate === dateReplace && sky[i]?.fcstTime === timeResut){
            skyValue.push(sky[i])
        }
    }

    let ptyValue = [];
    for(let i =0; i<pty.length; i++){
        if(pty[i]?.fcstDate === dateReplace && pty[i].fcstTime === timeResut){
            ptyValue.push(pty[i]);
        }
    }

    let TempValue = [];
    for(let i =0; i<temp.length; i++){
        if(temp[i]?.fcstDate === dateReplace && temp[i].fcstTime === timeResut){
            TempValue.push(temp[i]);
        }
    }



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


    const Header = () => {
        return (
            <div className="ui-display-weather-size"
                 style={{width: parseInt(ws[0]?.width), height: parseInt(ws[0]?.height)}}
            >
                <div className="dis-head">
                    <section>
                        <img src={logo} alt="logo-pic"/>
                        <p>{sensorFic.sys_net_node_name}</p>
                    </section>
                    <section>
                        {
                            skyValue[0]?.fcstValue === '1' ? <img src={cloudGood} alt="weather-pic"/> : (
                                skyValue[0]?.fcstValue === '3' ? <img src={cloudMany} alt="weather-pic"/> : (
                                    skyValue[0]?.fcstValue === '4' ? <img src={cloudBad} alt="weather-pic"/> :
                                        <img src={weathers} alt="weather-pic"/>
                                )
                            )
                        }
                        <div className="header-text">
                            <p>{nows}</p>
                            <p>
                                오늘날씨 |
                                {
                                    skyValue[0]?.fcstValue === '1' ? '맑음' : (
                                        skyValue[0]?.fcstValue === '3' ? '구름많음' : (
                                            skyValue[0]?.fcstValue === '4' ? '흐림' : '-'
                                        )
                                    )
                                }
                            </p>
                            <p>
                                기온 &nbsp;
                                <span>{TempValue[0]?.fcstValue}</span>&nbsp;
                                강수확률 &nbsp;
                                <span>{
                                    ptyValue[0]?.obsrValue === '0' ? '없음' : (
                                        ptyValue[0]?.obsrValue === '1' ? '비' : (
                                            ptyValue[0]?.obsrValue === '2' ? '비/눈' : (
                                                ptyValue[0]?.obsrValue === '3' ? '눈' : (
                                                    ptyValue[0]?.obsrValue === '5' ? '빗방울' : (
                                                        ptyValue[0]?.obsrValue === '6' ? '빗방울/눈' : (
                                                            ptyValue[0]?.obsrValue === '7' ? '눈날림' : '없음'
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                }</span>
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
                 style={{width: parseInt(ds[0]?.width), height: parseInt(ds[0]?.height)}}
            >
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
            <div
                style={{width: parseInt(fs[0]?.width), height: parseInt(fs[0]?.height)}}
                 className="ui-display-foot-size"
            >
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