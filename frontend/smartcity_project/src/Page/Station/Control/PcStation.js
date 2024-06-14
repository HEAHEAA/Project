import {useContext, useEffect} from "react";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import Station01Ud from "./Detail-Update/Station01Ud";
import Station02Ud from "./Detail-Update/Station02Ud";
import {StationContext} from "../../../ContextServer/StationContext";
import Button from "@mui/material/Button";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import * as React from "react";
import {ThemeBar} from "../../../Componet/style-config/ThemeBar";


function PcStation() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {
        pop,
        pop01,
        mapPop,
        onResetLayout,
        widgets,
        onToggleWidget,
        filteredPositions,
        activeWidgets,
        handleReposition,
    } = useContext(StationContext);
    const {GetMenuSubmit} = useContext(MenuContext);


    useEffect(() => {
        GetMenuSubmit();
    }, []);

    useEffect(() => {
        RefreshToken();
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
        fetch(`/api/log/pageMoved?url=/station`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    return (
        <div>

            {
                pop === true ? <Station01Ud/> : null
            }
            {
                pop01 === true ? <Station02Ud/> : null
            }

            <div>
                <div className="pcStation">
                    <div className="stationContent">
                        <div className="stationContent-head">

                            <div className="stationContent-head01">

                                <Button variant="contained" onClick={onResetLayout}>
                                    기본 화면
                                </Button>

                            </div>



                            <div className="stationContent-head02">
                                <div>

                                    {widgets.map(widget => {
                                        return (
                                            <div key={widget.id}>
                                                <Switch
                                                    checked={widget.active}
                                                    onChange={onToggleWidget}
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
                            positions={filteredPositions}
                            gap={{rows: 7, columns: 7}}
                            items={activeWidgets}
                            // ignoreDrag={(e) => {
                            //     return !(e.target.classList.contains("k-card-title"));
                            // }}
                            onReposition={handleReposition}
                            className="tileLayout"
                        />


                    </div>
                </div>
            </div>
        </div>
    )
}

export default PcStation;