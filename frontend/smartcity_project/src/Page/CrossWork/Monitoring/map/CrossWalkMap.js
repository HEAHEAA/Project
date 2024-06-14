import React, {useContext, useEffect, useMemo, useState} from "react";
import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import {Icon, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import CrossIcon from '../../../../img-bg/crossIcon.png';
import {Point} from "ol/geom";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import {FacilityContext} from "../../../../ContextServer/FacilityContext";

import arrow from '../../../../img-bg/arrow.png';


function CrossWalkMap() {
    const [mapObject02, setMapObject02] = useState(null);
    const {sysNum, setSysNum, list,} = useContext(CrossWalkContext);
    const {mapSize, AddLng, setAddLan, AddLat, setAddLat, lng, setLng, lat, setLat,} = useContext(FacilityContext);


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


    const poiLayer = useMemo(() => { // poi drawing 하기 위한 레이어 생성  usememo 로 생성해야, 자꾸 생성하지 않음..
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.8,
                src: CrossIcon,
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

    const arrowPointLayer = useMemo(()=>{
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
    },[]);


    useEffect(() => {
        if (mapObject02 === null) {
            // 지도 중복 생성 막음
            const map = new OlMap({
                // controls: defaultControls({ zoom: false, rotate: false }).extend([]),
                target: "mapd",
                view: new View({
                    projection: getProjection("EPSG:3857"),
                    zoom: 14,
                    center: fromLonLat([126.8467102, 36.6928093]),
                }),
            });
            map.addLayer(aerialMap);
            map.addLayer(poiLayer);
            map.addLayer(arrowPointLayer);
            setMapObject02({map});


            //지도 onCLick 이벤트 하는곳
            map.on("singleclick", (evt) => {
                // 마우스가 올려진 좌표값
                // console.log( fromLonLat(evt.coordinate))
                //마우스 클릭시 커서가 pointer로 변경 이벤트



                map.getViewport().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
                setAddLan(evt.coordinate[0]);
                setAddLat(evt.coordinate[1]);
                setLng(evt.coordinate[0]);
                setLat(evt.coordinate[1]);

                //마커위치 확인
                const feature = map.forEachFeatureAtPixel(
                    evt.pixel,
                    function (feature) {
                        return feature;
                    }
                );

                setSysNum(feature.get("node_seq"));

                // true == 마커위치 false == 마커위치 x
                // console.log(map.hasFeatureAtPixel(evt.pixel))
                if (feature) {
                    let element = document.createElement("div");
                    element.classList.add("ol-popup");


                    //클릭시 줌인해줌
                    map.getView().setCenter((feature.getGeometry().getExtent()));
                    map.getView().setZoom(14);


                    let close = `<div id="popup-closer" class="ol-popup-closer">닫기</div><div>`;
                    let content = '<div class="ol-popups-css3">';
                    let title = '<h6>' + '관리명 : ' + feature.values_.node_name + '</h6>'
                    let subTitle = '<p><small>' + '주소  : ' + feature.values_.node_address + '</small></p> <hr>'
                    let table = '<table class="map-table"><thead><tr><td>' + '바닥신호등 상태' + '</td></tr></thead><tbody><tr><td>'
                        + feature.values_.trafficLight_status + '</td></tr></tbody></table>'


                    content += "</div></div>";
                    element.innerHTML = close;
                    element.innerHTML += content;
                    element.innerHTML += title;
                    element.innerHTML += subTitle;
                    element.innerHTML += table;
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


    useEffect(() => {
        GetCrossWalkDetail();

        list.map(function (a, i) {
            let position = fromLonLat([Number(a.lng), Number(a.lat)]);
            const pointFeature = new Feature({
                geometry: new Point(position),
                node_seq: a.node_seq,
                node_name: a.node_name,
                node_address: a.node_address,
                trafficLight_status: a.trafficLight_status, //바닥신호등 상태
                led_status: a.led_status, //LED상태
                system_name: a.system_name,
                lon: a.lon,
                lat: a.lat,
            });

            if (a.node_seq === sysNum) {
                mapObject02 && mapObject02.map?.getView()?.setCenter(position);
                mapObject02 && mapObject02.map?.getView()?.setZoom(13.3);

                arrowPointLayer.getSource().clear()
                arrowPointLayer.getSource().addFeature(pointFeature);
            }

            return list[i]
        });
    }, [sysNum]);


    const GetCrossWalkDetail = async () => {
        await fetch(`/nodeApi/smartCross`).then(res => res.json()).then((res) => {
            res.result.forEach((element) => {
                let x = Number(element.lng);
                let y = Number(element.lat);
                if (x > 0) {
                    let pos = fromLonLat([Number(element.lng), Number(element.lat)]);

                    const pointFeature = new Feature({
                        geometry: new Point(pos),
                    });

                    pointFeature.set("node_seq", element.node_seq); //관리번호
                    pointFeature.set("node_name", element.node_name); //관리명
                    pointFeature.set("node_address", element.node_address); //주소
                    pointFeature.set("trafficLight_status", element.trafficLight_status); //바닥신호등 상태
                    pointFeature.set("led_status", element.led_status); //LED상태

                    pointFeature.set("system_name", element.system_name);
                    pointFeature.set("lng", element.lng);
                    pointFeature.set("lat", element.lat);


                    poiLayer.getSource().addFeature(pointFeature);
                }
            });
        });
    };


    return (
        <div>
            {
                mapSize === true ? <div id="mapd" value={mapObject02}
                                        style={{
                                            height: '50rem',
                                            width: "100%",
                                            marginLeft: "0%",
                                            marginTop: "-4.5vh"
                                        }}></div>
                    : <div id="mapd" value={mapObject02}
                           style={{height: '26.8rem', width: "100%", marginLeft: "0%", marginTop: "-4.5vh"}}></div>
            }

        </div>
    )
}

export default CrossWalkMap;