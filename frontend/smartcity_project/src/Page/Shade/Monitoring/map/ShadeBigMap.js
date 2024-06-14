import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import LayerGroup from "ol/layer/Group";
import React, {useEffect, useMemo, useState} from "react";
import {Icon, Style} from "ol/style";
import shadowIcon from "../../../../img-bg/shadow_icon.png";
import VectorLayer from "ol/layer/Vector";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Point} from "ol/geom";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import shadowNaN from "../../../../img-bg/shadow_nan_icon.png";
import shadowOutIcon from "../../../../img-bg/shadow_out_icon.png";


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


function ShadeBigMap(){
    const [mapObject05, setMapObject05] = useState(null);
    const navigate = useNavigate();

    const poiLayer = useMemo(() => { // poi drawing 하기 위한 레이어 생성  usememo 로 생성해야, 자꾸 생성하지 않음..
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 1.0,
                src: shadowIcon,
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


    useEffect(() => {
        if (mapObject05 === null) {
            // 지도 중복 생성 막음
            const map = new OlMap({
                // controls: defaultControls({ zoom: false, rotate: false }).extend([]),
                target: "mapf",
                view: new View({
                    projection: getProjection("EPSG:3857"),
                    zoom: 12,
                    center: fromLonLat([126.7577102, 36.6328093]),
                }),
            });
            map.addLayer(aerialMap);
            map.addLayer(poiLayer);
            setMapObject05({map});


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
                    map.getView().setZoom(14);



                    let close = `<div id="popup-closer" class="ol-popup-closer">close</div><div>`;
                    let content = '<div class="ol-popups-css" >' + feature.values_.loc2 + "(" + feature.values_.loc3 + ")";
                    let table = '<table class="ol-popup-content"><thead><tr>' + '<td>' + "온도" + '</td> <td>' +"전력" +
                        '</td>'+'<td>'+ "풍향" +'</td>'+'</tr></thead>'+ '<tbody><tr><td>'+ feature.values_.temp +'℃'+'</td>' +
                        '<td>'+ feature.values_.power +'</td>'+'<td>'+ feature.values_.wind +'</td>'+'</tr></tbody>'+'</table>'


                    content += "</div></div>";
                    element.innerHTML = close;
                    element.innerHTML += table;
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


    useEffect(()=>{
        Data();
    },[]);

    let Data = async () =>{
        await fetch(`/nodeApi/smartShade`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then((res) => {
            res.result.forEach((element) => {
                let x = Number(element.longi);
                let y = Number(element.lat);
                if (x > 0) {
                    let pos = fromLonLat([Number(element.longi), Number(element.lat)]);

                    const pointFeature = new Feature({
                        geometry: new Point(pos),
                    });

                    let shade = null;
                    let typeNm = element.status;

                    switch (typeNm){
                        case "1    " :
                            shade = new Icon({
                                opacity: 1,
                                scale: 0.8,
                                src: shadowIcon,
                                anchor: [0.5, 1]
                            });
                            break;
                        case "0    " :
                            shade = new Icon({
                                opacity: 1,
                                scale: 0.8,
                                src: shadowOutIcon,
                                anchor: [0.5, 1]
                            });
                            break;
                        default:
                            shade = new Icon({
                                opacity: 1,
                                scale: 0.8,
                                src: shadowNaN,
                                anchor: [0.5, 1]
                            });
                            break;
                    }

                    pointFeature.setStyle(
                        new Style({
                            image: shade,
                            zIndex: 10,
                        })
                    );


                    pointFeature.set("id", element.id);
                    pointFeature.set("fcode", element.fcode);
                    pointFeature.set("loc2", element.loc2);
                    pointFeature.set("loc3", element.loc3);
                    pointFeature.set("temp", element.temp);
                    pointFeature.set("power", element.power);
                    pointFeature.set("wind", element.wind);
                    pointFeature.set("status", element.status);
                    pointFeature.set("logtime", element.logtime);
                    pointFeature.set("amode", element.amode);
                    poiLayer.getSource().addFeature(pointFeature);
                }
            });
            mapObject05?.map.getView().fit(poiLayer.getSource().getExtent());
            mapObject05?.map.getView().setZoom(mapObject05.map.getView().getZoom() - 0.5);
        })
    }


    return(
        <div>
            <div className="station-pop">
                <Button sx={{float: "left",width:'20%',marginTop:1,marginBottom:1,marginLeft: 1}} variant="contained" onClick={() => {
                    navigate('/smart_shade')
                }}>닫기</Button>

                <div id="mapf" value={mapObject05} style={{height: '94vh'}}></div>
            </div>
        </div>
    )
}
export default ShadeBigMap;