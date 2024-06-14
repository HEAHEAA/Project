import {useContext, useEffect} from "react";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {MenuContext} from "../../../../ContextServer/MenuContext";
import * as React from "react";
import Button from "@mui/material/Button";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";

import {StationContext} from "../../../../ContextServer/StationContext";
import {ThemeBar} from "../../../../Componet/style-config/ThemeBar";

function PcStationStatus() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);
    const {dvPostAPI, nodId, GetAllNodes, onResetLayout01,
        widgets01,
        onToggleWidget01,
        filteredPositions01,
        activeWidgets01,
        handleReposition01} = useContext(StationContext);


    useEffect(() => {
        dvPostAPI();
    }, [nodId])

    useEffect(() => {
        GetAllNodes();
    }, []);

    useEffect(() => {
        GetMenuSubmit();
    }, []);
    useEffect(() => {
        RefreshToken();
    }, []);




    //사용자가  메뉴 들어왔을 시, server로 보내주는 API
    useEffect(() => {
        Log();
    }, []);

    const Log = () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/log/pageMoved?url=/station/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    return (
        <div>
            <div>
                <div className="pcStation">
                    <div className="stationContent">
                        <div className="stationContent-head">

                            <div className="stationContent-head01">
                                <Button variant="contained" onClick={onResetLayout01}>
                                    기본 화면
                                </Button>
                            </div>


                            <div className="stationContent-head02">
                                <div>
                                    {widgets01.map(widget => {
                                        return (
                                            <div key={widget.id}>
                                                <Switch
                                                    checked={widget.active}
                                                    onChange={onToggleWidget01}
                                                    id={widget.id}
                                                    className="switch"
                                                    size={"large"}
                                                    offLabel={widget.header}
                                                    onLabel={widget.header}
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
                            rowHeight="22.80vh"
                            positions={filteredPositions01}
                            gap={{rows: 7, columns: 7}}
                            items={activeWidgets01}
                            // ignoreDrag={(e) => {
                            //     return !(e.target.classList.contains("k-card-title"));
                            // }}
                            onReposition={handleReposition01}
                            className="tileLayout"
                        />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PcStationStatus;