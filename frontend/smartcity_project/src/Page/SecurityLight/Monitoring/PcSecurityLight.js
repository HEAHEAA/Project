import {useContext, useEffect} from "react";
import {TileLayout} from "@progress/kendo-react-layout";
import Button from "@mui/material/Button";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import {SecurityLightContext} from "../../../ContextServer/SecurityContext";
import {Switch} from "@progress/kendo-react-inputs";
import {ThemeBar} from "../../../Componet/style-config/ThemeBar";
import * as React from "react";

function PcSecurityLight() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);
    const {
        onResetLayout03,
        filteredPositions03,
        activeWidgets03,
        handleReposition03,
        onToggleWidget03,
        widgets03,
        GetLampData,
    } = useContext(SecurityLightContext);

    useEffect(() => {
        GetMenuSubmit();
        GetLampData();
    }, []);


    //사용자가  메뉴 들어왔을 시, server로 보내주는 API
    useEffect(() => {
        Log();
    }, []); //kpi페이지 이동시 Log 남김

    const Log = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        fetch(`/api/log/pageMoved?url=/securityLight`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    return (
        <div>
            <div className="pcSecurityLight">
                <div className="stationContent">
                    <div className="stationContent-head">
                        <div className="stationContent-head01">
                            <Button variant="contained" onClick={onResetLayout03}>
                                기본 화면
                            </Button>
                        </div>

                        <div className="stationContent-head02">

                            <div>
                                {widgets03.map(widget03 => {
                                    return (
                                        <div key={widget03.id}>
                                            <Switch
                                                checked={widget03.active}
                                                onChange={onToggleWidget03}
                                                id={widget03.id}
                                                className="switch"
                                                size={"large"}
                                                offLabel={widget03.header}
                                                onLabel={widget03.header}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <TileLayout
                        id="tileLayout2"
                        columns={2}
                        rowHeight="22.9vh"
                        positions={filteredPositions03}
                        gap={{rows: 7, columns: 7}}
                        items={activeWidgets03}
                        // ignoreDrag={(e) => {
                        //     return !(e.target.classList.contains("k-card-title"));
                        // }}
                        onReposition={handleReposition03}
                        className="tileLayout"
                    />
                </div>
            </div>
        </div>
    )
}

export default PcSecurityLight;