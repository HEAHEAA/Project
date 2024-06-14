import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import React, {useContext, useEffect, useMemo, useState} from "react";
import {SecurityLightContext} from "../../../../ContextServer/SecurityContext";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {Icon, Stroke, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Point} from "ol/geom";
import lightBlue from "../../../../img-bg/light_blue.png";
import {AppBar} from "@progress/kendo-react-layout";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import arrow from "../../../../img-bg/arrow.png";


const aerialMap = new Tile({
    //배경지도 레이어
    title: "항공사진",
    visible: true,
    source: new XYZ({
        url: "/map_folder/aerial/{z}/{y}/{x}.jpeg",
    }),
});

const popupElement = document.createElement("div"); // 마커 클릭했을때, 클라우드 팝업 생성하기위해 div 생성
popupElement.style.display = "none";
popupElement.id = "popup";
document.body.appendChild(popupElement);


function ModalDetailMap() {
    const [mapObject, setMapObject] = useState(null);
    const [list, setList] = useState([]);
    const {mapIdx, region} = useContext(SecurityLightContext);
    const {access, RefreshToken} = useContext(LoginContext);


    //현재시간 날짜
    const offset = 1000 * 60 * 60 * 9
    const koreaNow = new Date((new Date()).getTime() + offset)
    const korea = koreaNow.toISOString().replace("T", " ").split('.')[0] //한국현재시간

    const poiLayer = useMemo(() => { // poi drawing 하기 위한 레이어 생성  usememo 로 생성해야, 자꾸 생성하지 않음..
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.7,
                src: lightBlue,
                anchor: [0.5, 1]
            }),
            zIndex: 10
        })

        let vectorLayer = new VectorLayer({
            source: new Vector({wrapX: false}),
            style: markerStyle,
        });
        return vectorLayer;
    }, []);

    const arrowPointLayer = useMemo(() => {
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.8,
                src: arrow,
                anchor: [0.5, 1]
            }),
            zIndex: 10
        })
        return new VectorLayer({
            source: new Vector({wrapX: false}),
            style: markerStyle,
        });
    }, []);


    useEffect(() => {
        if (mapObject === null) {
            // 지도 중복 생성 막음
            const map = new OlMap({
                // controls: defaultControls({ zoom: false, rotate: false }).extend([]),
                target: "mapc",
                view: new View({
                    projection: getProjection("EPSG:3857"),
                    zoom: 15,
                    center: fromLonLat([126.8467102, 36.6828093]),
                }),
            });
            map.addLayer(aerialMap);
            map.addLayer(poiLayer);
            // map.addLayer(PointerLayer);
            setMapObject({map});


            //지도 onCLick 이벤트 하는곳
            map.on("singleclick", (evt) => {
                // 마우스가 올려진 좌표값
                // console.log( fromLonLat(evt.coordinate))
                //마우스 클릭시 커서가 pointer로 변경 이벤트
                map.getViewport().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';


                //마커위치 확인
                const feature = map.forEachFeatureAtPixel(
                    evt.pixel,
                    function (feature) {
                        return feature;
                    }
                );


                //true == 마커위치 false == 마커위치 x
                // console.log(map.hasFeatureAtPixel(evt.pixel))
                if (feature) {
                    let element = document.createElement("div");
                    element.classList.add("ol-popup");


                    //클릭시 줌인해줌
                    map.getView().setCenter((feature.getGeometry().getExtent()));
                    map.getView().setZoom(17);


                    let close = `<div id="popup-closer" class="ol-popup-closer">닫기</div><div>`;
                    let content = '<div class="ol-popups-css" >' + feature.values_.lamp_addr + "(" + feature.values_.lamp_code + ")";


                    content += "</div></div>";
                    element.innerHTML = close;
                    element.innerHTML += content;
                    element.style.display = "block";


                    let overlay = new Overlay({
                        element: element,
                        autoPan: true,
                        className: "multiPopup",
                        autoPanMargin: 100,
                        autoPanAnimation: {
                            duration: 400,
                        },
                    })
                    overlay.setPosition(evt.coordinate);

                    let ovlay = map.getOverlays().getArray();
                    if (ovlay.length > 0) {
                        map.removeOverlay(ovlay[0]);
                    }
                    map.addOverlay(overlay);


                    let oElem = overlay.getElement();
                    oElem.addEventListener("click", function (e) {
                        var target = e.target;
                        if (target.className === "ol-popup-closer") {
                            map.removeOverlay(overlay);
                        }
                    });
                }
            });
        }
        return () => null
    }, []);

    // }


    useEffect(() => {
        getData();
        if (region === 0) {
            list.map(function (a, i) {
                let position = fromLonLat([Number(a.lamp_xpos), Number(a.lamp_ypos)]);
                const pointFeature = new Feature({
                    geometry: new Point(position),
                    lamp_addr: a.lamp_addr,
                    lamp_xpos: a.lamp_xpos,
                    lamp_ypos: a.lamp_ypos,
                    lamp_region: a.lamp_region,
                    lamp_code: a.lamp_code,
                    lamp_frequenc: a.lamp_frequenc,
                    lamp_gateway: a.lamp_gateway,
                    lamp_id: a.lamp_id,
                    lamp_timestamp: a.lamp_timestamp
                });

                if (a.lamp_id === mapIdx) {
                    mapObject.map?.getView()?.setCenter(fromLonLat([Number(a.lamp_xpos), Number(a.lamp_ypos)]))
                    mapObject.map?.getView()?.setZoom(17);

                    arrowPointLayer.getSource().clear()
                    arrowPointLayer.getSource().addFeature(pointFeature);
                }
            })
        } else {
            poiLayer.getSource().clear()

            list.map(function (a, i) {
                let position = fromLonLat([Number(a.lamp_xpos), Number(a.lamp_ypos)]);
                const pointFeature = new Feature({
                    geometry: new Point(position),
                    lamp_addr: a.lamp_addr,
                    lamp_xpos: a.lamp_xpos,
                    lamp_ypos: a.lamp_ypos,
                    lamp_region: a.lamp_region,
                    lamp_code: a.lamp_code,
                    lamp_frequenc: a.lamp_frequenc,
                    lamp_gateway: a.lamp_gateway,
                    lamp_id: a.lamp_id,
                    lamp_timestamp: a.lamp_timestamp
                });

                if (a.lamp_id === mapIdx) {
                    mapObject.map?.getView()?.setCenter(fromLonLat([Number(a.lamp_xpos), Number(a.lamp_ypos)]))
                    mapObject.map?.getView()?.setZoom(17);

                    arrowPointLayer.getSource().clear()
                    arrowPointLayer.getSource().addFeature(pointFeature);
                }
            })

        }

    }, [mapIdx]);

    useEffect(() => {
        getData();
    }, [region])


    let getData = async () => {
        if (region === 0) {
            RefreshToken();
            let ac = null;
            if (access === "") {
                ac = localStorage.getItem("login").replaceAll('"', "");
            } else {
                ac = access;
            }
            await fetch(`/api/strLamp/list`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + ac,
                    Accept: "application/json",

                },
            })
                .then(res => res.json())
                .then((res) => {
                    setList(res.data);
                    res.data.forEach((element) => {
                        let x = Number(element.lamp_xpos);
                        let y = Number(element.lamp_ypos);
                        if (x > 0) {
                            let pos = fromLonLat([Number(element.lamp_xpos), Number(element.lamp_ypos)]);

                            const pointFeature = new Feature({
                                geometry: new Point(pos),
                            });

                            pointFeature.set("lamp_addr", element.lamp_addr);
                            pointFeature.set("lamp_xpos", element.lamp_xpos);
                            pointFeature.set("lamp_ypos", element.lamp_ypos);
                            pointFeature.set("lamp_region", element.lamp_region);
                            pointFeature.set("lamp_code", element.lamp_code);
                            pointFeature.set("lamp_frequenc", element.lamp_frequenc);
                            pointFeature.set("lamp_gateway", element.lamp_gateway);
                            pointFeature.set("lamp_timestamp", element.lamp_timestamp);
                            pointFeature.set("lamp_id", element.lamp_id);
                            poiLayer.getSource().addFeature(pointFeature);

                        }
                    });

                });

        } else {
            poiLayer.getSource().clear();

            RefreshToken();
            let ac = null;
            if (access === "") {
                ac = localStorage.getItem("login").replaceAll('"', "");
            } else {
                ac = access;
            }
            await fetch(`/api/strLamp/group?gateway=${region}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + ac,
                    Accept: "application/json",

                },
            })
                .then(res => res.json())
                .then((res) => {
                    setList(res.data);
                    res.data.forEach((element) => {
                        let x = Number(element.lamp_xpos);
                        let y = Number(element.lamp_ypos);
                        if (x > 0) {
                            let pos = fromLonLat([Number(element.lamp_xpos), Number(element.lamp_ypos)]);

                            const pointFeature = new Feature({
                                geometry: new Point(pos),
                            });

                            pointFeature.set("lamp_addr", element.lamp_addr);
                            pointFeature.set("lamp_xpos", element.lamp_xpos);
                            pointFeature.set("lamp_ypos", element.lamp_ypos);
                            pointFeature.set("lamp_region", element.lamp_region);
                            pointFeature.set("lamp_code", element.lamp_code);
                            pointFeature.set("lamp_frequenc", element.lamp_frequenc);
                            pointFeature.set("lamp_gateway", element.lamp_gateway);
                            pointFeature.set("lamp_timestamp", element.lamp_timestamp);
                            pointFeature.set("lamp_id", element.lamp_id);
                            poiLayer.getSource().addFeature(pointFeature);

                        }
                    });

                });
        }
    };
    const navigate = useNavigate();


    return (
        <div>
            <AppBar themeColor={"light"}>
                <Button variant="contained"
                        sx={{width: "20%"}}
                        onClick={() => {
                            navigate('/securityLight')
                        }}>닫기</Button>
                <div id="mapc" value={mapObject}
                     style={{
                         height: '94vh',
                         width: "100%",
                         marginLeft: "0%",
                         marginTop: "-0vh"
                     }}></div>
            </AppBar>
        </div>
    )
}

export default ModalDetailMap;