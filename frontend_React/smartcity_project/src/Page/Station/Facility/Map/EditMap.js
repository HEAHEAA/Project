import {XYZ} from "ol/source";
import React, {useContext, useEffect, useState} from "react";
import {Map as OlMap, Overlay, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj";
import {StationContext} from "../../../../ContextServer/StationContext";
import TileLayer from "ol/layer/Tile";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import {ShadeContext} from "../../../../ContextServer/ShadeContext";
import {SecurityLightContext} from "../../../../ContextServer/SecurityContext";
import {SolarPanelContext} from "../../../../ContextServer/SolarPanelContext";

function EditMap() {
    const [mapObject, setMapObject] = useState({});
    const {setLng, setLat, setStationLng, setStationLat,} = useContext(StationContext);
    const {setCrossLng,setCrossLat,setAddCrossLng, setAddCrossLat,} = useContext(CrossWalkContext);
    const {setShadeLng, setShadeLat,setAddShadeLng, setAddShadeLat,} = useContext(ShadeContext);
    const {setAddSecurityLng, setAddSecurityLat,setSecurityLng, setSecurityLat,} = useContext(SecurityLightContext);
    const {setAddSolarLng,setAddSolarLat,setSolarLng, setSolarLat,} = useContext(SolarPanelContext);

    useEffect(() => {
            //지도 중복생성 막음
            const map = new OlMap({
                layers: [
                    new TileLayer({
                        source : new XYZ({url:'/map_folder/aerial/{z}/{y}/{x}.jpeg'})
                    }),
                ],
                target: "mapz",
                view: new View({
                    projection: getProjection("EPSG:3857"),
                    center: fromLonLat([126.8467102, 36.6928093]),
                    zoom: 12,
                }),
            });
            setMapObject({map})

            //지도 onCLick 이벤트 하는곳
            map.on("singleclick", (evt) => {
                map.getViewport().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';

                //좌표값 받아올 데이터

                //스마트정류장
                setLng(evt.coordinate[0]);
                setLat(evt.coordinate[1]);
                setStationLng(evt.coordinate[0]);
                setStationLat(evt.coordinate[1]);

                //스마트 횡단보도
                setCrossLng(evt.coordinate[0]);
                setCrossLat(evt.coordinate[1]);
                setAddCrossLng(evt.coordinate[0]);
                setAddCrossLat(evt.coordinate[1]);


                //스마트 그늘막
                setShadeLng(evt.coordinate[0]);
                setShadeLat(evt.coordinate[1]);
                setAddShadeLng(evt.coordinate[0]);
                setAddShadeLat(evt.coordinate[1]);

                //스마트 보안등
                setSecurityLng(evt.coordinate[0]);
                setSecurityLat(evt.coordinate[1]);
                setAddSecurityLng(evt.coordinate[0]);
                setAddSecurityLat(evt.coordinate[1]);


                //스마트태양열
                setAddSolarLng(evt.coordinate[0]);
                setAddSolarLat(evt.coordinate[1]);
                setSolarLng(evt.coordinate[0]);
                setSolarLat(evt.coordinate[1]);

            });
            return () => null
    }, []);


    return (
        <div>
            <div id="mapz" value={mapObject} style={{height: '35vh', width: "100%", marginLeft: "0%"}}></div>
        </div>
    )
}

export default EditMap;