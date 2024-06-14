import React, {useEffect, useMemo, useState} from "react";
import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import {Icon, Style} from "ol/style";
import solarIcon from "../../../../img-bg/solar.png";
import VectorLayer from "ol/layer/Vector";
import solarPointIcon from "../../../../img-bg/solar_change.png";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Point} from "ol/geom";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function SolarBigMap(){
    const [mapObject, setMapObject] = useState(null);
    const [list,setList] = useState([]);


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

    const PoiLayerMarker = useMemo(()=> {
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
    },[]);


    useEffect(()=> {
        if (mapObject === null) {
            const map = new OlMap({
                target: "mapi",
                view: new View({
                    projection: getProjection("EPSG:3857"),
                    zoom: 14,
                    center: fromLonLat([126.8467102, 36.6928093]),
                }),
            });
            map.addLayer(aerialMap);
            map.addLayer(poiLayer);
            setMapObject({map});


            map.on("singleclick", (evt) => {
                map.getViewport().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';

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
                    let content = '<div class="ol-popups-css" >' + feature.values_.posnm;

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
    },[]);

    useEffect(()=>{
        MapServer();
    },[]);


    const MapServer = async () => {
        fetch(`/nodeApi/solarPos`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setList(res.result);
            res.result.forEach((element) => {
                let x = Number(element.xpos);
                let y = Number(element.ypos);

                if(x > 0){
                    let pos = fromLonLat([Number(element.xpos),Number(element.ypos)]);

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
    const navigate = useNavigate();
    return(
        <div>
            <div className="station-pop">
                <Button sx={{marginTop:1,marginBottom:1,marginLeft: 1, width: "20%", float: "left"}} variant="contained" onClick={() => {navigate('/solarPanel')}}>
                    닫기
                </Button>
                <div id="mapi" value={mapObject} style={{height: '94vh'}}></div>
            </div>
        </div>
    )
}
export default SolarBigMap;