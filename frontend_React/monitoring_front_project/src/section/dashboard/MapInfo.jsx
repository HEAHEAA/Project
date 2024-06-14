import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import "ol/ol.css"; //스타일
import {useContext, useEffect, useState} from "react";
import {DashboardContext} from "../../context/dashboardContext.jsx";
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import {Fill, Icon, Stroke, Style, Text,} from 'ol/style.js';
import {Cluster, Vector as VectorSource, XYZ} from 'ol/source.js';
import {Tile, Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from "ol/proj.js";
import {Overlay} from "ol";
import mapIcon from '../../assets/img/map.png';
import fail from '../../assets/img/fail.png';
import {themes} from "../../theme/darkThme.jsx";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {DarkModeTwoTone, MapTwoTone, MyLocationTwoTone} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";


//배경지도 레이어
const baseMap = new Tile({
    title: '배경지도',
    visible: true,
    source: new XYZ({
        url: 'http://api.vworld.kr/req/wmts/1.0.0/2FE87EEF-9182-30B0-8ACA-76EBE4CA9649/Base/{z}/{y}/{x}.png'
    })
});
//배경지도 레이어
const aerialMap = new Tile({
    title: '항공사진',
    visible: true,
    source: new XYZ({
        url: 'http://api.vworld.kr/req/wmts/1.0.0/2FE87EEF-9182-30B0-8ACA-76EBE4CA9649/Satellite/{z}/{y}/{x}.jpeg'
    })
});
//배경지도 레이어
const hybridMap = new Tile({
    title: '하이브리드',
    visible: true,
    source: new XYZ({
        url: 'http://api.vworld.kr/req/wmts/1.0.0/2FE87EEF-9182-30B0-8ACA-76EBE4CA9649/Hybrid/{z}/{y}/{x}.png'
    })
});

const popupElement = document.createElement("div");
popupElement.style.display = "none";
popupElement.id = "popup";
document.body.appendChild(popupElement);
function MapInfo(){
    const {
        siteInfoData,
        loginLastInfoData,
        xy,
        StateData,
        layout
    } = useContext(DashboardContext);
    const [reLoad,setReload] = useState(true);
    const [mapObject, setMapObject] = useState(null);
    const [switchBtn, setSwitchBtn] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        if(StateData !== null){
            let num = StateData.length;
            let total = num;
            const features = xy;
            const distanceInput = document.getElementById('distance');
            const minDistanceInput = document.getElementById('min-distance');

            for(let i = 0; i<total; i++){
                const coordinates = fromLonLat(xy[i]);
                features[i] = new Feature({
                    geometry: new Point(coordinates),
                });
                features[i].set("id", StateData[i].id);
                features[i].set("login_success", StateData[i].login_success);
                features[i].set("name", StateData[i].name);
                features[i].set("url", StateData[i].url);
                features[i].set("info", StateData[i].site_info);
                features[i].set("time", StateData[i].time);
                features[i].set("bigo", StateData[i].bigo);
            }
            const source = new VectorSource({
                features: features,
            });


            const clusterSource = new Cluster({
                distance: parseInt(distanceInput.value, 30),
                minDistance: parseInt(minDistanceInput.value, 30),
                source: source,
            });


            const map = new Map({
                target: 'map',
                view: new View({
                    center: fromLonLat([127.8257102, 35.8828093]),
                    zoom: 8,
                }),
            });

            const Switch = () => {
                if (switchBtn === 0) {
                    map.addLayer(baseMap);
                    map.addLayer(hybridMap);
                } else if (switchBtn === 1) {
                    map.addLayer(aerialMap);
                    map.addLayer(hybridMap);
                } else if (switchBtn === 2) {
                    map.addLayer(hybridMap);
                }
            }
            Switch();

            const clusters = new VectorLayer({
                source: clusterSource,
                style: function (feature) {
                    const size = feature.get('features').length;
                    let data = {};

                    for (let i = 0; i < feature.get('features').length; i++) {
                        if (feature.get('features')[i].values_.login_success === true) {
                            data = new Style({
                                image: new Icon({
                                    opacity: 1,
                                    scale: 0.09,
                                    src: mapIcon,
                                    anchor: [0.51, 0.41]
                                }),
                                zIndex: 10,
                                text: new Text({
                                    scale: 2,
                                    text: size.toString(),
                                    fill: new Fill({
                                        color: '#212121',
                                    }),
                                    stroke: new Stroke({
                                        color: "#fafafa",
                                        width: 1,
                                    }),
                                }),
                            });
                            return data;
                        } else if (feature.get('features')[i].values_.login_success === false) {
                            data = new Style({
                                image: new Icon({
                                    opacity: 1,
                                    scale: 0.11,
                                    src: fail,
                                    anchor: [0.51, 0.41]
                                }),
                                zIndex: 10,
                                text: new Text({
                                    scale: 2,
                                    text: size.toString(),
                                    fill: new Fill({
                                        color: '#212121',
                                    }),
                                    stroke: new Stroke({
                                        color: "#fafafa",
                                        width: 1,
                                    }),
                                }),
                            });
                            return data;
                        }
                    }
                },
            });
            map.addLayer(clusters);



            map.on('click', (e) => {
                //마커위치 확인
                const feature = map.forEachFeatureAtPixel(
                    e.pixel,
                    function (feature) {
                        return feature;
                    }
                );
                if (feature) {
                    let element = document.createElement("div");
                    element.classList.add("ol-popup");

                    //클릭시 줌인해줌
                    map.getView().setCenter((feature.getGeometry().getExtent()));
                    map.getView().setZoom(11);

                    let close = `<div id="popup-closer" class="ol-popup-closer">CLOSE</div><div>`;
                    let content = `<div class="ol-popups-css" >` +
                        `<table>` +
                        `<tr><th>지역</th> <td>${feature.values_.features[0].values_.name}</td></tr>` +
                        ` <tr><th>정보</th> <td>${feature.values_.features[0].values_.info}</td></tr></tr>` +
                        `<tr><th>URL</th> <td><a>${feature.values_.features[0].values_.url}</a></td></tr></tr>` +
                        `<tr><th>로그인</th> <td>${feature.values_.features[0].values_.login_success === true ? 'O' : 'X'}</td></tr></tr>` +
                        `<tr><th>조회 시간</th> <td><a>${feature.values_.features[0].values_.time}</a></td></tr></tr>` +
                        `<tr><th>에러사유 </th> <td><a>${feature.values_.features[0].values_.bigo === null ? '없음' : feature.values_.features[0].values_.bigo}</a></td></tr></tr>` +
                        `</table>`;


                    content += "</div></div></div>";
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

                    overlay.setPosition(e.coordinate);
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


                clusters.getFeatures(e.pixel).then((clickedFeatures) => {
                    if (clickedFeatures.length) {
                        // Get clustered Coordinates
                        const features = clickedFeatures[0].get('features');
                        if (features.length > 1) {

                            map.getView().setZoom(12)
                        }
                    }
                });
            });




            distanceInput.addEventListener('input', function () {
                clusterSource.setDistance(parseInt(distanceInput.value, 12));
            });

            minDistanceInput.addEventListener('input', function () {
                clusterSource.setMinDistance(parseInt(minDistanceInput.value, 12));
            });

            setMapObject({map});
            return () => {
                map.setTarget(null);
            };
        }
    }, [reLoad, switchBtn,  StateData, selectedIndex]);





    useEffect(() => {
        siteInfoData();
        loginLastInfoData();
        setReload(!reLoad);
    }, []);



    return(
        <div>
            <Box sx={themes.map_menu} className="dash-map-theme">
            <div className="dash_map_detail">
                <table>
                    <tbody>
                    <tr>
                        <td><img src={mapIcon}/></td>
                        <td>활성화</td>

                        <td><img src={fail}/></td>
                        <td>비활성화</td>
                    </tr>
                    </tbody>
                </table>
            </div>
                <Divider/>

                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => {
                            handleListItemClick(event, 0);
                            setSwitchBtn(0);
                            siteInfoData();
                        }}
                    >
                        <ListItemIcon>
                            <MapTwoTone/>
                        </ListItemIcon>
                        <ListItemText primary="기본테마"/>
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => {
                            handleListItemClick(event, 1);
                            setSwitchBtn(1);
                            siteInfoData();
                        }}
                    >
                        <ListItemIcon>
                            <MyLocationTwoTone/>
                        </ListItemIcon>
                        <ListItemText primary="항공테마"/>
                    </ListItemButton>

                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => {
                            handleListItemClick(event, 2);
                            setSwitchBtn(2);
                            siteInfoData();
                        }}
                    >
                        <ListItemIcon>
                            <DarkModeTwoTone/>
                        </ListItemIcon>
                        <ListItemText primary="다크 테마"/>
                    </ListItemButton>
                </List>
            </Box>

            <form style={{display: "none"}}>
                <div className="form-group">
                    <input id="distance" className="form-range" type="range" min="0" max="200" step="1" value="40"/>
                </div>
                <div className="form-group">
                    <input id="min-distance" className="form-range" type="range" min="0" max="200" step="1" value="20"/>
                </div>
            </form>


            <div id="map" value={mapObject} style={{height: layout[0]?.h * 50, width: "100%"}}>
            </div>



        </div>
    )
}
export default MapInfo;
