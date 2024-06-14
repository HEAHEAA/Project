import MainHeaderDust from "./Head/MainHeaderDust.jsx";
import MainContent from "./Content/MainContent.jsx";
import MainFooter from "./Foot/MainFooter.jsx";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { PlayContext } from "../../context/PlayContext";
import { NodeContext } from "../../context/NodeContext";
import { FootContext } from "../../context/FootContext";
import MainHeaderWeather from "./Head/MainHeaderWeather";
import { ResizeContext } from "../../context/ResizeContext";
import { FadeContext } from "../../context/FadeContext";
import { DisplayOnContext } from "../../context/DisplayOnContext";
import { TimeData } from "../../util/timeData";

function Main() {
  const { nodeId } = useContext(PlayContext);
  const { resize, ResizingDataOnSubmit } = useContext(ResizeContext);
  const { WeatherOnSubmitData } = useContext(WeatherContext);
  const { GetFileList, PlayListOnsubmit, MediaVideo } = useContext(PlayContext);
  const { SensorFicOncSubmit } = useContext(NodeContext);
  const { NewsDataOnSubmit } = useContext(FootContext);
  const { fade, setFade } = useContext(FadeContext);
  const { intimeDataOnsubmit, intimeList } = useContext(DisplayOnContext);

  useEffect(() => {
    WeatherOnSubmitData();
    ResizingDataOnSubmit();
    GetFileList();
    PlayListOnsubmit();
    MediaVideo();
    SensorFicOncSubmit();
    NewsDataOnSubmit();
    intimeDataOnsubmit();
  }, [nodeId]);


  useEffect(() => {
    const time = setInterval(() => {
      window.location.reload();
    }, 6000000);
    // }, 10000)
    return () => {
      clearInterval(time);
    };
  }, []);


  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 120 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
  const update = koreaNow.replaceAll("T", " ");
  const nows = update.replaceAll("Z", " ").substring(0, 16);
  const timeIs = nows?.substring(11, 13);


  let date = [];
  for (let i = 0; i < TimeData.length; i++) {
    if (parseInt(intimeList?.ontime) <= TimeData[i].time && parseInt(intimeList.offtime) >= TimeData[i].time) {
      date.push(TimeData[i]);
    }
  }
  let dataPOP = date.pop();






  let dataa = []
  for(let i = 0; i<date.length; i++){
    if(timeIs === date[i].time){
      dataa.push(date[i]);
    }
  }


  if(dataa.length === 1){
    return (
      <div className="all">
        {resize[0]?.name === "날씨 정보" ? (
          <MainHeaderWeather />
        ) : resize[0]?.name === "대기 정보" ? (
          <MainHeaderDust />
          // <MainHeaderState/>
        ) : resize[0]?.name === "홍보물 정보" ? (
          <MainContent />
        ) : resize[0]?.name === "뉴스 정보" ? (
          <MainFooter />
        ) : null}


        {resize[1]?.name === "날씨 정보" ? (
          <MainHeaderWeather />
        ) : resize[1]?.name === "대기 정보" ? (
          <MainHeaderDust />
          // <MainHeaderState/>
        ) : resize[1]?.name === "홍보물 정보" ? (
          <MainContent />
        ) : resize[1]?.name === "뉴스 정보" ? (
          <MainFooter />
        ) : null}


        {resize[2]?.name === "날씨 정보" ? (
          <MainHeaderWeather />
        ) : resize[2]?.name === "대기 정보" ? (
          <MainHeaderDust />
          // <MainHeaderState/>
        ) : resize[2]?.name === "홍보물 정보" ? (
          <MainContent />
        ) : resize[2]?.name === "뉴스 정보" ? (
          <MainFooter />
        ) : null}

        {resize[3]?.name === "날씨 정보" ? (
          <MainHeaderWeather />
        ) : resize[3]?.name === "대기 정보" ? (
          <MainHeaderDust />
          // <MainHeaderState/>
        ) : resize[3]?.name === "홍보물 정보" ? (
          <MainContent />
        ) : resize[3]?.name === "뉴스 정보" ? (
          <MainFooter />
        ) : null}
      </div>
    )
  }

  if(dataa.length === 0){
    return (
      <div className="app-fade"></div>
    )
  }

}

export default Main;
