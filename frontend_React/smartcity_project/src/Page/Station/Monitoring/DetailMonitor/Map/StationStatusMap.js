import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, {useContext, useEffect, useMemo, useState} from "react";
import {Tile} from "ol/layer";
import {Vector, XYZ} from "ol/source";
import {Icon, Stroke, Style} from "ol/style";
import busIcon from "../../../../../img-bg/busIcon.png";
import VectorLayer from "ol/layer/Vector";
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {Point} from "ol/geom";
import {StationContext} from "../../../../../ContextServer/StationContext";
import {SnackbarProvider, useSnackbar} from 'notistack';
import busConnect from "../../../../../img-bg/busConnect.png";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";

import arrow from '../../../../../img-bg/arrow.png';
import {SelectBoxs} from "../../../../../Componet/style-config/light-theme";

function StationStatusMap() {
    const [mapObject, setMapObject] = useState({});
    const {nodAll, nodId, setNodId, dvPostAPI, dv,ArssId,setArssId,arco,setArco} = useContext(StationContext);
    const [nodeNm,setNodeNm] = useState('');


    //냉난방기 설정/실내온도 추출
    let list = [];
    for (let i = 0; i < dv?.length; i++) {
        if (dv[i]?.nodeId === ArssId) {
            list.push(dv[i]?.data);
        }
    }
    // 알림 데이터추출
    let arr = list.filter(({autoTemp}) => autoTemp);
    let indrTemp = arr[0]?.indrTemp;
    let autoTemp = arr[0]?.autoTemp;
    let total = parseInt(indrTemp) - parseInt(autoTemp);


    //알림 메세지
    const {enqueueSnackbar} = useSnackbar();


    //온도차 알림
    useEffect(() => {
        if(total !== NaN){
            if ( 5 < total){
                const handleClickVariant = (variant) => {
                    enqueueSnackbar(`${nodeNm} 설정/실내온도가 5도이상 차이납니다.`, { variant });
                };
                return  handleClickVariant('warning');
            }
            if( 5 > total){
                const handleClickVariant = (variant) => {
                    enqueueSnackbar(`${nodeNm} 설정/실내온도가 적절합니다.`, { variant });
                };
                return  handleClickVariant("success");
            }
        }else {
            return null
        }



    }, [ArssId]);



    //selectbox 이벤트
    const onSelect = (e) => {
        e.preventDefault();
        setNodId(e.target.value);
        dvPostAPI();
    }

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
        //지도 중복생성 막음
        const map = new OlMap({
            target: "map",
            view: new View({
                projection: getProjection("EPSG:3857"),
                zoom: 12,
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
            const feature = map.forEachFeatureAtPixel(
                evt.pixel,
                function (feature) {
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
                map.getView().setZoom(17);


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
                mapObject && mapObject.map?.getView()?.setZoom(17);

                arrowPointLayer.getSource().clear()
                arrowPointLayer.getSource().addFeature(pointFeature);
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
    return (
        <div>
            <FormControl
                sx={{marginTop: "-3vh",color: "white"}}
                style={SelectBoxs}
                size={"small"} fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{marginTop: -1,fontSize: 16}}>지점선택</InputLabel>
                <Select
                    value={nodId}
                    sx={{color: "white"}}
                    onChange={(e) => onSelect(e)}
                >
                    {
                        nodAll.map(function (arr, inx) {
                            return (
                                <MenuItem value={arr.nodeId} onClick={()=>{
                                    setNodeNm(arr.nodeNm);
                                    setArssId(arr.nodeId);
                                }}>{arr.nodeNm}</MenuItem>

                            )
                        })
                    }

                </Select>
            </FormControl>

            <div id="map" value={mapObject}
                 style={{height: "20.5rem", width: "100%", marginLeft: "0%", marginTop: "1vh"}}></div>
        </div>
    )
}

export default function IntegrationNotistack() {

    return (
        <SnackbarProvider maxSnack={1}>
                <StationStatusMap/>
        </SnackbarProvider>
    );
}

// export default StationStatusMap;




