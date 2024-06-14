import {useContext, useEffect} from "react";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import Button from "@mui/material/Button";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {CrossWalkContext, CrossWalkProvider} from "../../../ContextServer/CrossWalkContext";
import {StationContext} from "../../../ContextServer/StationContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import CrossWalkBigMap from "./map/CrossWalkBigMap";
import {ThemeBar} from "../../../Componet/style-config/ThemeBar";
import * as React from "react";

function PcCrossWalk() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {mapPop} = useContext(StationContext);
    const {
        ListSubmit, onResetLayout01,
        widgets01,
        onToggleWidget01,
        filteredPositions01,
        activeWidgets01,
        handleReposition01,
    } = useContext(CrossWalkContext);
    const {GetMenuSubmit} = useContext(MenuContext);

    useEffect(() => {
        GetMenuSubmit();
    }, []);

    useEffect(() => {
        ListSubmit();
    }, []);


    //사용자가  메뉴 들어왔을 시, server로 보내주는 API
    useEffect(() => {
        Log();
    }, []); //kpi페이지 이동시 Log 남김

    const Log = () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/log/pageMoved?url=/crosswalk`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    return (
        <div>
            <CrossWalkProvider>

                {
                    mapPop === true ? <CrossWalkBigMap/> : null
                }

                <div className="pcCrossWalk">
                    <div className="stationContent">
                        <div className="stationContent-head">
                            <div className="stationContent-head01">
                                <Button variant="contained" onClick={onResetLayout01}>
                                    기본 화면
                                </Button>
                            </div>

                            <div className="stationContent-head02">
                                <div>
                                    {widgets01.map(widget01 => {
                                        return (
                                            <div key={widget01.id}>
                                                <Switch
                                                    checked={widget01.active}
                                                    onChange={onToggleWidget01}
                                                    id={widget01.id}
                                                    className="switch"
                                                    size={"large"}
                                                    offLabel={widget01.header}
                                                    onLabel={widget01.header}
                                                />
                                            </div>

                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <TileLayout
                            id="tileLayout"
                            columns={8}
                            rowHeight="22.8vh"
                            positions={filteredPositions01}
                            gap={{rows: 7, columns: 7}}
                            items={activeWidgets01}
                            onReposition={handleReposition01}
                            className="tileLayout"
                            // ignoreDrag={(e) => {
                            //     return !(e.target.classList.contains("k-card-title"));
                            // }}
                        />
                    </div>
                </div>

            </CrossWalkProvider>

        </div>
    )
}

export default PcCrossWalk;