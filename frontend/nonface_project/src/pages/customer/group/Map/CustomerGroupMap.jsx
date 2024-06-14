import React, {useContext, useState, useEffect, useMemo} from "react";
import "ol/ol.css"; //스타일
import {Feature, Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj"; //위경도
import {Vector, XYZ} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import {Point} from "ol/geom";
import LayerSwitcher from "ol-layerswitcher";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import LayerGroup from "ol/layer/Group";
import icon from '../../../../assets/img/arrow03.png';
import arrow from '../../../../assets/img/check.png';
import {Tile} from "ol/layer";
import {Style, Icon, Text, Fill, Stroke, Circle} from "ol/style";
import {CustomerGroupContext} from "../../../../api/customer/CustomerGroupContext.jsx";

function CustomerGroupMap() {
    const {
        //조직도 - 수정할 조직값
        groupEditValue,
        setGroupEditValue,
        GetGroupListEditId,
        xpos, setXpos,
        ypos, setYpos,
        updateSuc,
    } = useContext(CustomerGroupContext);
    const [mapObject, setMapObject] = useState(null);

    //배경지도 레이어
    const midNightMap = new Tile({
        title: '다크지도',
        displayInLayerSwitcher: false,
        visible: false,
        source: new XYZ({
            url: 'http://api.vworld.kr/req/wmts/1.0.0/F29065AD-8D42-3A88-8D7F-4DADA8D2E838/midnight/{z}/{y}/{x}.png'
        })
    });
    //배경지도 레이어
    const baseMap = new Tile({
        title: '배경지도',
        displayInLayerSwitcher: false,
        visible: true,
        source: new XYZ({
            url: 'http://api.vworld.kr/req/wmts/1.0.0/F29065AD-8D42-3A88-8D7F-4DADA8D2E838/Base/{z}/{y}/{x}.png'
        })
    });
    //배경지도 레이어
    const aerialMap = new Tile({
        title: '항공사진',
        visible: false,
        source: new XYZ({
            url: 'http://api.vworld.kr/req/wmts/1.0.0/F29065AD-8D42-3A88-8D7F-4DADA8D2E838/Satellite/{z}/{y}/{x}.jpeg'
        })
    });
    //배경지도 레이어
    const hybridMap = new Tile({
        title: '하이브리드',
        visible: true,
        source: new XYZ({
            url: 'http://api.vworld.kr/req/wmts/1.0.0/F29065AD-8D42-3A88-8D7F-4DADA8D2E838/Hybrid/{z}/{y}/{x}.png'
        })
    });

    const aerialGroupMap = new LayerGroup({
        title: '항공지도',
        baseLayer: true,
        openInLayerSwitcher: true,
        visible: false,
        layers: [aerialMap, hybridMap]
    })

    const darkGroupMap = new LayerGroup({
        title: '배경지도(다크)',
        baseLayer: true,
        openInLayerSwitcher: true,
        visible: false,
        layers: [midNightMap, hybridMap]
    })


    const poiLayer = useMemo(() => { // poi drawing 하기 위한 레이어 생성  usememo 로 생성해야, 자꾸 생성하지 않음..
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.12,
                src: icon,
                anchor: [0.5, 1]
            }),
            zIndex: 10
        })
        let markerSource = new Vector();
        let markerLayer = new VectorLayer({
            source: markerSource, //마커 feacture들
            style: markerStyle, //마커 스타일
        });
        return markerLayer;
    }, []);


    const updatePoiLayer = useMemo(() => { // poi drawing 하기 위한 레이어 생성  usememo 로 생성해야, 자꾸 생성하지 않음..
        const markerStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 0.12,
                src: arrow,
                anchor: [0.5, 1]
            }),
            zIndex: 10
        })
        let markerSource = new Vector();
        let markerLayer = new VectorLayer({
            source: markerSource, //마커 feacture들
            style: markerStyle, //마커 스타일
        });
        return markerLayer;
    }, []);


    useEffect(() => {
        const map = new OlMap({
            target: "map",
            view: new View({
                projection: getProjection("EPSG:3857"),
                zoom: 13,
                center: fromLonLat([127.0067102, 37.4628093]),
            }),
        });
        map.addLayer(darkGroupMap);
        map.addLayer(baseMap);
        map.addLayer(aerialGroupMap);
        map.addLayer(poiLayer);
        map.addLayer(updatePoiLayer);

        map.addControl(
            new LayerSwitcher({
                tipLabel: '레이어범례',
                mouseover: true,
                collapsed: true
            })
        );


        map.on("singleclick", (e) => {
            setXpos(`${e.coordinate[0]}`);
            setYpos(`${e.coordinate[1]}`);


            const pointFeature = new Feature({
                geometry: new Point(e.coordinate),
            });

            updatePoiLayer.getSource().clear();
            updatePoiLayer.getSource().addFeature(pointFeature);
        })

        setMapObject({map});
        return () => null;
    }, [updateSuc]);


    let array = new Array(groupEditValue);
    useEffect(() => {
        array.forEach((el) => {
            let x = Number(el.clnt_org_x_pos);
            let y = Number(el.clnt_org_y_pos);

            if (x > 0) {
                let pos = fromLonLat([Number(el.clnt_org_x_pos), Number(el.clnt_org_y_pos)]);


                const pointFeature = new Feature({
                    geometry: new Point(pos),
                });

                pointFeature.set("clnt_org_id", el.clnt_org_id);
                pointFeature.set("clnt_org_name", el.clnt_org_name);
                pointFeature.set("clnt_org_x_pos", el.clnt_org_x_pos);
                pointFeature.set("clnt_org_y_pos", el.clnt_org_y_pos);

                if(updateSuc.length === 0){
                    poiLayer.getSource().clear()
                }else if(updateSuc.length === undefined){
                    updatePoiLayer.getSource().clear()
                    poiLayer.getSource().clear()
                }
                poiLayer.getSource().addFeature(pointFeature);
            }
        });
    }, [GetGroupListEditId]);


    return (
        <div>
            <div id="map" value={mapObject}
                 style={{height: "78vh", width: "100%", marginLeft: "0%", marginTop: "0vh",overflow: "hidden"}}></div>
        </div>
    )
}

export default CustomerGroupMap;