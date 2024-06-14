import {useEffect, useState} from "react";
import {Tile} from "ol/layer.js";
import {XYZ} from "ol/source.js";
import LayerGroup from "ol/layer/Group.js";
import {Map as OlMap, View} from "ol";
import {fromLonLat, get as getProjection} from "ol/proj.js";

function MultiScreenThree(){
    const [mapObject, setMapObject] = useState(null);

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
        const map = new OlMap({
            target: "mapb",
            view: new View({
                projection: getProjection("EPSG:3857"),
                zoom: 13,
                center: fromLonLat([127.0067102, 37.7628093]),
            }),
        });
        map.addLayer(baseMap);
        map.addLayer(aerialGroupMap);

        // map.addControl(
        //     new LayerSwitcher({
        //         tipLabel: '레이어범례',
        //         mouseover:true,
        //         collapsed:true
        //     })
        // );

        setMapObject({map});
        return () => {
            map.setTarget(null);
        };
    }, []);
    return(
        <div>

            <div id="mapb" value={mapObject} style={{height: "24.5vh", overflow: "hidden"}}></div>
        </div>
    )
}
export default MultiScreenThree;