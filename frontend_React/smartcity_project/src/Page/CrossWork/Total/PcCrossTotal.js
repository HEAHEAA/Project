import {useContext, useEffect} from "react";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {CrossWalkContext, CrossWalkProvider} from "../../../ContextServer/CrossWalkContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import Button from "@mui/material/Button";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import {ThemeBar} from "../../../Componet/style-config/ThemeBar";
import * as React from "react";

function PcCrossTotal(){
    const {access, RefreshToken} = useContext(LoginContext);
    const {
        ListSubmit,
        onResetLayout02,
        widgets02,
        onToggleWidget02,
        filteredPositions02,
        activeWidgets02,
        handleReposition02,
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
        fetch(`/api/log/pageMoved?url=/crosswalk/total`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }



    return(
        <div>
            <CrossWalkProvider>
                <div className="pcCrossWalk">
                    <div className="stationContent">
                        <div className="stationContent-head">
                            <div className="stationContent-head01">
                                <Button variant="contained" onClick={onResetLayout02}>
                                    기본 화면
                                </Button>
                            </div>

                            <div className="stationContent-head02">
                                <div>
                                    {widgets02.map(widget02 => {
                                        return (
                                            <div key={widget02.id}>
                                                <Switch
                                                    checked={widget02.active}
                                                    onChange={onToggleWidget02}
                                                    id={widget02.id}
                                                    className="switch"
                                                    size={"large"}
                                                    offLabel={widget02.header}
                                                    onLabel={widget02.header}
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
                            positions={filteredPositions02}
                            gap={{rows: 7, columns: 7}}
                            items={activeWidgets02}
                            onReposition={handleReposition02}
                            className="tileLayout"
                        />
                    </div>
                </div>

            </CrossWalkProvider>
        </div>
    )
}
export default PcCrossTotal;