import {useContext, useEffect} from "react";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import {StationContext} from "../../../ContextServer/StationContext";
import Button from "@mui/material/Button";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import {ControlContext} from "../../../ContextServer/ControlContext";
import {ThemeBar} from "../../../Componet/style-config/ThemeBar";
import * as React from "react";

function PCStationDID(){
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);
    const {
        onResetLayout04,
        widgets04,
        onToggleWidget04,
        filteredPositions04,
        activeWidgets04,
        handleReposition04,
    } = useContext(StationContext);

    const {GetDIDFileGetCircle} = useContext(ControlContext);

    useEffect(()=>{
        GetDIDFileGetCircle();
    },[]);

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
        fetch(`/api/log/pageMoved?url=/station/did`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }




    return(
        <div>
            <div className="pcControl">
                <div className="stationContent">
                    <div className="stationContent-head">
                        <div className="stationContent-head01">
                            <Button variant="contained" onClick={onResetLayout04}>
                                기본 화면
                            </Button>
                        </div>

                        <div className="stationContent-head02">
                            <div>
                                {widgets04.map(widget04 => {
                                    return (
                                        <div key={widget04.id}>
                                            <Switch
                                                checked={widget04.active}
                                                onChange={onToggleWidget04}
                                                id={widget04.id}
                                                className="switch"
                                                size={"large"}
                                                offLabel={widget04.header}
                                                onLabel={widget04.header}
                                            />
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <TileLayout
                        id="tileLayout3"
                        columns={6}
                        rowHeight="22.95vh"
                        positions={filteredPositions04}
                        gap={{rows: 7, columns: 7}}
                        items={activeWidgets04}
                        onReposition={handleReposition04}
                        className="tileLayout"
                    />
                </div>
            </div>
        </div>
    )
}
export default PCStationDID;