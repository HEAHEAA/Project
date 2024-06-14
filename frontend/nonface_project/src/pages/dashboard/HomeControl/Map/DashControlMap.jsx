import {useContext, useEffect, useState} from "react";
import 'ol/ol.css';  //스타일
import {Tile, Vector as VectorLayer} from "ol/layer.js";
import {Cluster, Vector as VectorSource, XYZ} from "ol/source.js";
import LayerGroup from "ol/layer/Group.js";
import {View} from "ol";
import {fromLonLat} from "ol/proj.js";
import LayerSwitcher from "ol-layerswitcher";
import {LoginContext} from "../../../../api/login/LoginContext.jsx";
import {DashboardContext} from "../../../../api/dashboard/DashboardContext.jsx";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import {Fill, Icon, Stroke, Style, Text} from "ol/style.js";
import arrow from "../../../../assets/img/free-icon-location-5582962.png";
import Map from "ol/Map.js";

function DashControlMap(){
    const {RefreshToken} = useContext(LoginContext);
    const {clientCheck,setClientCheck,checkClientList} = useContext(DashboardContext);
    const [mapObject, setMapObject] = useState(null);
    const [list, setList] = useState([]);



    let xy = [];
    for (let i = 0; i < list.length; i++) {
        xy.push([list[i].clnt_org_x_pos, list[i].clnt_org_y_pos])
    }


    //배경지도 레이어
    const baseMap = new Tile({
        title : '배경지도',
        displayInLayerSwitcher: false,
        visible : true,
        source : new XYZ({
            url : 'http://api.vworld.kr/req/wmts/1.0.0/F29065AD-8D42-3A88-8D7F-4DADA8D2E838/Base/{z}/{y}/{x}.png'
        })
    });
    //배경지도 레이어
    const aerialMap = new Tile({
        title : '항공사진',
        visible : false,
        source : new XYZ({
            url : 'http://api.vworld.kr/req/wmts/1.0.0/F29065AD-8D42-3A88-8D7F-4DADA8D2E838/Satellite/{z}/{y}/{x}.jpeg'
        })
    });
    //배경지도 레이어
    const hybridMap = new Tile({
        title : '하이브리드',
        visible : true,
        source : new XYZ({
            url : 'http://api.vworld.kr/req/wmts/1.0.0/F29065AD-8D42-3A88-8D7F-4DADA8D2E838/Hybrid/{z}/{y}/{x}.png'
        })
    });

    const aerialGroupMap = new LayerGroup({
        title:'항공지도',
        baseLayer: true,
        openInLayerSwitcher: true,
        visible:false,
        layers:[aerialMap, hybridMap]
    })

    useEffect(() => {
        if(list !== null) {
            let num = list.length;
            const total = num;
            const features = xy;
            const distanceInput = document.getElementById('distance');
            const minDistanceInput = document.getElementById('min-distance');

            for (let i = 0; i <total; i++) {
                const coordinates =  fromLonLat(xy[i]);
                // features[i] = new Feature(new Point(coordinates));
                features[i] = new Feature({
                    geometry: new Point(coordinates),
                });
                features[i].set("id", list[i].clnt_org_id);
            }

            const source = new VectorSource({
                features: features,
            });





            const clusterSource = new Cluster({
                distance: parseInt(distanceInput.value, 30),
                minDistance: parseInt(minDistanceInput.value, 30),
                source: source,
            });


            const styleCache = {};
            const clusters = new VectorLayer({
                source: clusterSource,
                style: function (feature) {
                    const size = feature.get('features').length;
                    let style = styleCache[size];

                    if (!style) {
                        style = new Style({
                            image: new Icon({
                                opacity: 1,
                                scale: 0.09,
                                src: arrow,
                                anchor: [0.5, 1]
                            }),
                            zIndex: 10,
                            text: new Text({
                                scale: 1.8,
                                text: size.toString(),
                                fill: new Fill({
                                    color: '#ffffff',
                                }),
                                stroke: new Stroke({
                                    color: "#727272",
                                    width: 2,
                                }),
                            }),
                        });
                        styleCache[size] = style;
                    }
                    return style;
                },
            });

            const map = new Map({
                target: 'map',
                view: new View({
                    center: fromLonLat([127.0257102, 37.4828093]),
                    zoom: 14,
                }),
            });
            map.addLayer(baseMap);
            map.addLayer(aerialGroupMap);
            map.addLayer(clusters);

            map.addControl(
                new LayerSwitcher({
                    tipLabel: '레이어범례',
                    mouseover:true,
                    collapsed:true
                })
            );



            map.on('click', (e) => {

                //마커위치 확인
                const feature = map.forEachFeatureAtPixel(
                    e.pixel,
                    function (feature) {
                        return feature;
                    }
                );



                //지점 확대 요청 이벤트
                if(feature.values_.features.length <= 1) {
                    setClientCheck(feature.values_.features[0].values_.id);
                }else {
                    setClientCheck(feature.values_.features[1].values_.id);
                }




                clusters.getFeatures(e.pixel).then((clickedFeatures) => {
                    if (clickedFeatures.length) {
                        // Get clustered Coordinates
                        const features = clickedFeatures[0].get('features');
                        if (features.length > 1) {

                            map.getView().setZoom(16)
                        }
                    }
                });
            });

            distanceInput.addEventListener('input', function () {
                clusterSource.setDistance(parseInt(distanceInput.value, 10));
            });

            minDistanceInput.addEventListener('input', function () {
                clusterSource.setMinDistance(parseInt(minDistanceInput.value, 10));
            });

            setMapObject({map});
            return () => {
                map.setTarget(null);
            };
        }
    }, [list]);

    // 좌표데이터 불러오기
    useEffect(() => {
        GetCrossWalkDetail();
    }, []);


    const GetCrossWalkDetail = async () => {
        RefreshToken();
        await fetch(`/api/client/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
        }).then(res => res.json()).then(res => {
            setList(res.data);
        })
    };

    return(
        <div>
            <form style={{display: "none"}}>
                <div className="form-group">
                    <input id="distance" className="form-range" type="range" min="0" max="200" step="1" value="40"/>
                </div>
                <div className="form-group">
                    <input id="min-distance" className="form-range" type="range" min="0" max="200" step="1" value="20"/>
                </div>
            </form>
            <div id="map" value={mapObject} style={{height: "84.7vh", width: "100%", marginLeft: "0%", marginTop: "0vh"}}></div>
        </div>
    )
}
export default DashControlMap;