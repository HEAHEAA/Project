import {useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import {StationContext} from "../../../ContextServer/StationContext";
import Button from "@mui/material/Button";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import {ThemeBar} from "../../../Componet/style-config/ThemeBar";
import * as React from "react";

function PCStationRecord(){
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);
    const {
        onResetLayout07,
        widgets07,
        onToggleWidget07,
        filteredPositions07,
        activeWidgets07,
        handleReposition07,
    } = useContext(StationContext);

    useEffect(() => {
        GetMenuSubmit();
    }, []);
    //사용자가  메뉴 들어왔을 시, server로 보내주는 API
    useEffect(() => {
        Log();
    }, []); //kpi페이지 이동시 Log 남김

    const Log = () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/log/pageMoved?url=/station/record`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }




    return(
        <div>
            <div className="pcRec">
                <div className="stationContent">
                    <div className="stationContent-head">
                        <div className="stationContent-head01">
                            <Button variant="contained" onClick={onResetLayout07}>
                                기본 화면
                            </Button>
                        </div>

                        <div className="stationContent-head02">
                            <div>
                                {widgets07.map(widget07 => {
                                    return (
                                        <div key={widget07.id}>
                                            <Switch
                                                checked={widget07.active}
                                                onChange={onToggleWidget07}
                                                id={widget07.id}
                                                className="switch"
                                                size={"large"}
                                                offLabel={widget07.header}
                                                onLabel={widget07.header}
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
                        rowHeight="46.35vh"
                        positions={filteredPositions07}
                        gap={{rows: 7, columns: 7}}
                        items={activeWidgets07}
                        onReposition={handleReposition07}
                        className="tileLayout"
                        // ignoreDrag={(e) => {
                        //     return !(e.target.classList.contains("k-card-title"));
                        // }}
                    />
                </div>
            </div>
        </div>
    )
}
export default PCStationRecord;