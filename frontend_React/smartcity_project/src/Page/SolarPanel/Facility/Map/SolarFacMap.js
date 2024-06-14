import React, {useContext, useEffect, useMemo, useState} from "react";
import {SolarPanelContext} from "../../../../ContextServer/SolarPanelContext";
import {FacilityContext} from "../../../../ContextServer/FacilityContext";
import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import {Icon, Style} from "ol/style";
import solarIcon from "../../../../img-bg/solar.png";
import VectorLayer from "ol/layer/Vector";
import solarPointIcon from "../../../../img-bg/solar_change.png";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Point} from "ol/geom";
import Button from "@mui/material/Button";
import SolarFacNew from "../Detail/FacNew/SolarFacNew";

function SolarFacMap(){
    const [mapObject, setMapObject] = useState(null);
    const { solarMapId} = useContext(SolarPanelContext);
    const [list, setList] = useState([]);
    const {setAddLan, setAddLat, setLng, setLat,} = useContext(FacilityContext);

    //입력 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
                src: solarIcon,
                anchor: [0.5, 1]
            }),
            zIndex: 10
        })

        return new VectorLayer({
            source: new Vector({wrapX: false}),
            style: markerStyle,
        });
    }, []);

    const PoiLayerMarker = useMemo(() => {
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.8,
                src: solarPointIcon,
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
            const map = new OlMap({
                target: "mapg",
                view: new View({
                    projection: getProjection("EPSG:3857"),
                    zoom: 14,
                    center: fromLonLat([126.8467102, 36.6828093]),
                }),
            });
            map.addLayer(aerialMap);
            map.addLayer(poiLayer);
            map.addLayer(PoiLayerMarker);
            setMapObject({map});


            map.on("singleclick", (evt) => {
                map.getViewport().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
                setAddLan(evt.coordinate[0]);
                setAddLat(evt.coordinate[1]);
                setLng(evt.coordinate[0]);
                setLat(evt.coordinate[1]);

                const feature = map.forEachFeatureAtPixel(
                    evt.pixel,
                    function (feature) {
                        return feature;
                    }
                );

                if (feature) {

                    let element = document.createElement("div");
                    element.classList.add("ol-popup");

                    //클릭시 줌인해줌
                    map.getView().setCenter((feature.getGeometry().getExtent()));
                    map.getView().setZoom(17);

                    let close = `<div id="popup-closer" class="ol-popup-closer">닫기</div><div>`;
                    let content = '<div class="ol-popups-css2" > <div> 설치명 : ' + feature.values_.posnm + '</div> <br>' + '<div>주소명 : ' + feature.values_.pos_addr + '</div>';

                    content += "</div></div>";
                    element.innerHTML = close;
                    element.innerHTML += content;
                    element.style.display = "block";


                    let overlay = new Overlay({
                        element: element,
                        autoPan: false,
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
                    poiLayer.getSource().addFeature(feature);

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
        MapServer();
        list.map(function (a, i) {
            const position = fromLonLat([Number(a.xpos), Number(a.ypos)]);
            const pointFeature = new Feature({
                geometry: new Point(position),
                posnm: a.posnm,
                pos_addr: a.pos_addr
            });
            poiLayer.getSource().addFeature(pointFeature);

            if (a.posnm === solarMapId) {
                mapObject.map?.getView()?.setCenter(fromLonLat([Number(a.xpos), Number(a.ypos)]));
                mapObject.map?.getView()?.setZoom(15.3);

                PoiLayerMarker.getSource().clear()
                PoiLayerMarker.getSource().addFeature(pointFeature);
            }
            return list[i]
        });
    }, [solarMapId]);


    const MapServer = async () => {
        fetch(`/nodeApi/solarPos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setList(res.result);
            res.result.forEach((element) => {
                let x = Number(element.xpos);
                let y = Number(element.ypos);

                if (x > 0) {
                    let pos = fromLonLat([Number(element.xpos), Number(element.ypos)]);

                    const pointFeature = new Feature({
                        geometry: new Point(pos),
                    });

                    pointFeature.set("posnm", element.posnm);
                    pointFeature.set("pos_addr", element.pos_addr);
                    poiLayer.getSource().addFeature(pointFeature);
                }
            });
        })
    }

    return(
        <div>
            <SolarFacNew open={open} handleClose={handleClose}/>
            <Button variant="contained" size={"large"}
                    sx={{marginTop: -3, position: "relative", zIndex: 9999999}}
                    fullWidth onClick={()=>{handleOpen();}}>
                시설물 생성
            </Button>

            <div id="mapg" value={mapObject}
                 style={{height: "50rem", width: "100%", marginLeft: "0%", marginTop: "1vh"}}>
            </div>
        </div>
    )
}
export default SolarFacMap;