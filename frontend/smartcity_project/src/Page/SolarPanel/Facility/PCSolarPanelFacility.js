import Button from "@mui/material/Button";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import {useContext, useEffect} from "react";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import {SolarPanelContext} from "../../../ContextServer/SolarPanelContext";
import {ThemeBar} from "../../../Componet/style-config/ThemeBar";
import * as React from "react";

function PCSolarPanelFacility() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);
    const {
        onResetLayout05,
        widgets05,
        onToggleWidget05,
        filteredPositions05,
        activeWidgets05,
        handleReposition05,
    } = useContext(SolarPanelContext);

    useEffect(() => {
        GetMenuSubmit();
    }, []);

    //스마트정류장 시설물관리 들어오면 로그 찍힐거
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
        fetch(`/api/log/pageMoved?url=/solarPanel/facility`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }

    return (
        <div>
            <div className="pcFac">
                <div className="stationContent">
                    <div className="stationContent-head">
                        <div className="stationContent-head01">
                            <Button variant="contained" onClick={onResetLayout05}>
                                기본 화면
                            </Button>
                        </div>

                        <div className="stationContent-head02">
                            <div>
                                {widgets05.map(widget05 => {
                                    return (
                                        <div key={widget05.id}>
                                            <Switch
                                                checked={widget05.active}
                                                onChange={onToggleWidget05}
                                                id={widget05.id}
                                                className="switch"
                                                size={"large"}
                                                offLabel={widget05.header}
                                                onLabel={widget05.header}
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
                        rowHeight="50vh"
                        positions={filteredPositions05}
                        gap={{rows: 7, columns: 7}}
                        items={activeWidgets05}
                        onReposition={handleReposition05}
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

export default PCSolarPanelFacility;