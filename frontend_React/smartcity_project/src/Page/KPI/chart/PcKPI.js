import {useContext, useEffect} from "react";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import {KpiContext} from "../../../ContextServer/KpiContext";
import Button from '@mui/material/Button';
import {LoginContext} from "../../../ContextServer/LoginContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import * as React from "react";

function PcKPI() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);
    const {
        onResetLayout08,
        widgets08,
        onToggleWidget08,
        filteredPositions08,
        activeWidgets08,
        handleReposition08,
        getKPiAPI,
        getHeat,
        KpiList,
        setEditDetailPage
    } = useContext(KpiContext);


    useEffect(() => {
        getKPiAPI();
        getHeat();
        KpiList();
        setEditDetailPage(false);
    }, []);


    useEffect(() => {
        GetMenuSubmit();
    }, []);


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
        fetch(`/api/log/pageMoved?url=/kpi`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    return (
        <div>

            <div className="stationContent-head01">
                <Button variant="contained" onClick={onResetLayout08}>
                    기본 화면
                </Button>
            </div>


            <div className="stationContent-head02">
                <div>
                    {widgets08?.map(widget08 => {
                        return (
                            <div key={widget08.id}>
                                <Switch
                                    checked={widget08.active}
                                    onChange={onToggleWidget08}
                                    id={widget08.id}
                                    className="switch"
                                    size={"large"}
                                    offLabel={widget08.header}
                                    onLabel={widget08.header}
                                />
                            </div>

                        );
                    })}
                </div>
            </div>


            <div className="mainHeight">
                <TileLayout
                    id="tileLayout"
                    columns={10}
                    rowHeight="30.65vh"
                    positions={filteredPositions08}
                    gap={{rows: 7, columns: 7}}
                    items={activeWidgets08}
                    onReposition={handleReposition08}
                    // ignoreDrag={(e) => {
                    //     return !(e.target.classList.contains("k-card-title"));
                    // }}

                />
            </div>




        </div>
    )
}

export default PcKPI;