import logo from "../../../assets/img/busan-logo.png";
import wtCloudGood from "../../../assets/img/cloud-good.png";
import wtCloudMany from "../../../assets/img/cloud-many.png";
import wtCloudBad from "../../../assets/img/cloud-bad.png";
import weathers from "../../../assets/img/cloud-Little.png";
import { useContext, useEffect } from "react";
import { WeatherContext } from "../../../context/WeatherContext";
import { NodeContext } from "../../../context/NodeContext";
import { ResizeContext } from "../../../context/ResizeContext";
import { FadeContext } from "../../../context/FadeContext";


function MainHeaderWeather() {
  const { resize, ws } = useContext(ResizeContext);
  const { temp, pty, sky, pop } = useContext(WeatherContext);
  const { sensorFic } = useContext(NodeContext);
  const { fade, setFade,} = useContext(FadeContext);


  let size = [];
  for (let i = 0; i < resize.length; i++) {
    if (resize[i].name === "날씨 정보") {
      size.push(resize[i]);
    }
  }


// 현재 시간 계산하기
  const now = new Date();
  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 120 * 60 * 1000;
  const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
  const update = koreaNow.replaceAll("T", " ");
  const nows = update.replaceAll("Z", " ").substring(0, 16);
  const dateTime = update.replaceAll("Z", " ").substring(10, 16);


  const dateIs = nows?.substring(0, 10);
  const dateReplace = dateIs?.replaceAll("-", "");


  const timeIs = nows?.substring(11, 13);
  const timeResut = timeIs + "00";


  const timeIS01 = nows?.substring(14,16);


  let skyValue = [];
  for (let i = 0; i < sky.length; i++) {
    if (sky[i]?.fcstDate === dateReplace && sky[i]?.fcstTime === timeResut) {
      skyValue.push(sky[i]);
    }
  }

  let ptyValue = [];
  for (let i = 0; i < pty.length; i++) {
    if (pty[i]?.fcstDate === dateReplace && pty[i].fcstTime === timeResut) {
      ptyValue.push(pty[i]);
    }
  }

  let tempValue = [];
  for (let i = 0; i < pty.length; i++) {
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







  const time = {
    nowTime: '1100'
  }




  return (
    <div>

      <div>
        <div className="main-header"
             style={{
               width: parseInt(ws[0]?.width),
               height: parseInt(ws[0]?.height / 1.05)
             }}
        >
          <section>
            <img src={logo} alt="logo-pic" />
            <br />
            <p>{sensorFic?.sys_net_node_name === "명보기업" ? "맘모스 프라자" : (
              sensorFic?.sys_net_node_name === "신평장림산업단지 혁신지원센터" ? "장림 2동 행정복지센터" : (
                sensorFic?.sys_net_node_name === "부산 제1공장" ? "장림 1동 행정복지센터" : (
                  sensorFic?.sys_net_node_name === "동남공업" ? "감천 1동 행정복지센터" : (
                    sensorFic?.sys_net_node_name === "대동WF공업" ? "부산산단환경개선센터" : (
                      sensorFic?.sys_net_node_name === "다대2펌프장" ? "다대2동행정복지센터" : (
                        sensorFic?.sys_net_node_name === "성신사" ? "다대1동행정복지센터" : (
                          sensorFic?.sys_net_node_name === "사하구민 장례식장" ? "장림유수지 인근" : (
                            sensorFic?.sys_net_node_name === "청산에식품" ? "신평1동행정복지센터" : (
                              sensorFic?.sys_net_node_name === "신한은행 신평금융센터" ? "구평동행정복지센터" : sensorFic?.sys_net_node_name
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )}</p>
          </section>

          <section>
            <div className="main-head-sec01">
              {skyValue[0]?.fcstValue === "1" ? (
                <img src={wtCloudGood} alt="weather-pic" />
              ) : skyValue[0]?.fcstValue === "3" ? (
                <img src={wtCloudMany} alt="weather-pic" />
              ) : skyValue[0]?.fcstValue === "4" ? (
                <img src={wtCloudBad} alt="weather-pic" />
              ) : (
                <img src={weathers} alt="weather-pic" />
              )}

              <div className="header-text">
                <p>{nows}</p>
                <p>
                  오늘날씨 |{" "}
                  {skyValue[0]?.fcstValue === "1"
                    ? "맑음"
                    : skyValue[0]?.fcstValue === "3"
                      ? "구름많음"
                      : skyValue[0]?.fcstValue === "4"
                        ? "흐림"
                        : "-"}
                </p>

                <p>
                  기온 &nbsp;
                  <span>{tempValue[0]?.fcstValue}</span>&nbsp; 강수확률 &nbsp;
                  <strong>
                    {popValue[0]?.fcstValue}%
                  </strong>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

    </div>

  );
}

export default MainHeaderWeather;
