import React, {useContext, useEffect, useMemo, useState} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import {Icon, Stroke, Style} from "ol/style";
import busIcon from "../../../../../img-bg/busIcon.png";
import busConnect from "../../../../../img-bg/busConnect.png";
import VectorLayer from "ol/layer/Vector";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Point} from "ol/geom";
import Button from "@mui/material/Button";
import {AppBar} from "@progress/kendo-react-layout";
import {useNavigate} from "react-router-dom";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import {MenuContext} from "../../../../../ContextServer/MenuContext";
import arrow from '../../../../../img-bg/arrow.png';
import {LoginContext} from "../../../../../ContextServer/LoginContext";

function StationStatusDetailMap() {
    const [mapObject, setMapObject] = useState({});
    const {GetMenuSubmit} = useContext(MenuContext);
    const {nodAll,nodId,} = useContext(StationContext);

    useEffect(() => {
        GetMenuSubmit();
    }, []);


    // useEffect(()=>{
    //     let timer = setTimeout(()=> {
    //         window.location.reload();
    //     },1000);
    //
    //     return ()=>{clearTimeout(timer)}
    // },[]);

    //배경지도 레이어
    const aerialMap = new Tile({
        //배경지도 레이어
        title: "항공사진",
        visible: true,
        source: new XYZ({
            url: "/map_folder/aerial/{z}/{y}/{x}.jpeg",
        }),
    });

    // 마커 클릭했을때, 클라우드 팝업 생성하기위해 div 생성
    const popupElement = document.createElement("div");
    popupElement.style.display = "none";
    popupElement.id = "popup";
    document.body.appendChild(popupElement);


    const poiLayer = useMemo(() => { // poi drawing 하기 위한 레이어 생성  usememo 로 생성해야, 자꾸 생성하지 않음..
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.8,
                src: busIcon,
                anchor: [0.5, 1]
            }),
            zIndex: 10,
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
        //지도 중복생성 막음
        const map = new OlMap({
            target: "map",
            view: new View({
                projection: getProjection("EPSG:3857"),
                zoom: 14,
                center: fromLonLat([126.8467102, 36.6928093]),
            }),
        });
        map.addLayer(aerialMap);
        map.addLayer(poiLayer);
        map.addLayer(arrowPointLayer);
        setMapObject({map})


        //지도 onCLick 이벤트 하는곳
        map.on("singleclick", (evt) => {

            // 마우스가 올려진 좌표값
            // console.log( fromLonLat(evt.coordinate))
            //마우스 클릭시 커서가 pointer로 변경 이벤트
            map.getViewport().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';

            //마커위치 확인
            const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                    return feature;
                }
            );

            // true == 마커위치 false == 마커위치 x
            // console.log(map.hasFeatureAtPixel(evt.pixel))
            if (feature) {
                let element = document.createElement("div");
                element.classList.add("ol-popup");

                //클릭시 줌인해줌
                map.getView().setCenter((feature.getGeometry().getExtent()));
                map.getView().setZoom(14);


                let tdStr = '';
                let close = `<div id="popup-closer" class="ol-popup-closer">닫기</div><div>`;
                let content = '<div class="ol-popups-css">';
                let title = '<h6>' + "시설명 : " + feature.values_.nodeNm + '</h6><hr>';
                let table = '<Table class="map-table"><thead style="background-color:#2f3542 "><tr><td style="text-align: center">' + "디바이스목록" + '</td></tr></thead>'

                feature.get("list").forEach((feat, idx) => {
                    tdStr += '<div><tbody class="map-table2" style="background-color: #0a2949"><tr>' + '<td>' + feature.values_.list[idx].dvcNm + '</td>' + '</tr></tbody></div>'
                })

                content += "</Table></div></div>";
                element.innerHTML = close;
                element.innerHTML += title;
                element.innerHTML += table;
                element.innerHTML += tdStr;
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
                arrowPointLayer.getSource().clear()
                arrowPointLayer.getSource().addFeature(evt.coordinate);

                let oElem = overlay.getElement();
                oElem.addEventListener("click", function (e) {
                    var target = e.target;
                    if (target.className === "ol-popup-closer") {
                        map.removeOverlay(overlay);
                    }
                });

            }
        });
        return () => null
    }, []);

    useEffect(() => {
        NodeAllGetData();
        nodAll.map(function (a, i) {
            let position = fromLonLat([Number(a.instlLngtd), Number(a.instlLattd)]);
            const pointFeature = new Feature({
                geometry: new Point(position),
                nodeId: a.nodeId,
                nodeNm: a.nodeNm,
                instlLattd: a.instlLattd,
                instlLngtd: a.instlLngtd,
                connected: a.connected,
                useYn: a.useYn,
            });

            if (a.nodeId === nodId) {
                mapObject && mapObject.map?.getView()?.setCenter(position);
                mapObject && mapObject.map?.getView()?.setZoom(13.3);

                // arrowPointLayer.getSource().clear()
                poiLayer.getSource().addFeature(pointFeature);
            }
            return nodAll[i]
        });
    }, [nodId]);


    //데이터 x y 데이터 가져오기
    const NodeAllGetData = async () => {
        await fetch(`/nodeApi/nodes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            res.result.data.forEach((element, idx) => {
                let x = Number(element.instlLngtd);
                let y = Number(element.instlLattd);

                if (x > 0) {
                    let pos = fromLonLat([x, y]);

                    const pointFeature = new Feature({
                        geometry: new Point(pos),
                    });
                    let icon = null;
                    let type = element.useYn;

                    switch (type) {
                        case 1:
                            icon = new Icon({
                                opacity: 1,
                                scale: 0.8,
                                src: busIcon,
                                anchor: [0.5, 1],
                            });
                            break;
                        default:
                            icon = new Icon({
                                opacity: 1,
                                scale: 0.8,
                                src: busConnect,
                                anchor: [0.5, 1],
                            });
                            break;
                    }

                    pointFeature.setStyle(
                        new Style({
                            image: icon,
                            zIndex: 10,

                            text: new Text({
                                text: element.nodeNm,
                                scale: 1.2,
                                textAlign: "center",
                                offsetY: 10,
                                fill: new Fill({
                                    color: "#ffffff",
                                }),
                                stroke: new Stroke({
                                    color: "#000000",
                                    width: 1,
                                }),
                            }),
                        })
                    );

                    pointFeature.set("nodeId", element.nodeId);
                    pointFeature.set("nodeNm", element.nodeNm);
                    pointFeature.set("instlLattd", element.instlLattd);
                    pointFeature.set("instlLngtd", element.instlLngtd);
                    pointFeature.set("connected", element.connected);

                    //사용중/미사용 임시용
                    pointFeature.set("useYn", element.useYn);
                    poiLayer.getSource().addFeature(pointFeature);
                }
            });
        })
    };

    const navigate = useNavigate();


    return(
        <div>
            <AppBar themeColor={"light"}>
                <div style={{width: "20%",height: "7vh"}}>
                    <Button variant="contained" fullWidth onClick={() => {
                        navigate('/station/status');
                    }}>
                        목록으로
                    </Button>
                </div>


                <div id="map" value={mapObject}
                     style={{height: "95vh", width: "100%"}}></div>
            </AppBar>
        </div>
    )
}


export default StationStatusDetailMap;