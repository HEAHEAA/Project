import {useContext, useEffect} from "react";
import {KpiContext} from "../../../ContextServer/KpiContext";
import Button from "@mui/material/Button";
import * as React from "react";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import {MenuContext} from "../../../ContextServer/MenuContext";
import {LoginContext} from "../../../ContextServer/LoginContext";

function PcKPIManage(){
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);
    const {
        onResetLayout09,
        widgets09,
        onToggleWidget09,
        filteredPositions09,
        activeWidgets09,
        handleReposition09,
        setEditDetailPage,
        getKPiAPI,
        getHeat,
        KpiList,
    } = useContext(KpiContext);

    useEffect(() => {
        getKPiAPI();
        getHeat();
        KpiList();
        setEditDetailPage(true);
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
        fetch(`/api/log/pageMoved?url=/kpi/manage`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    return(
        <div>

            <div className="stationContent-head01">
                <Button variant="contained" onClick={onResetLayout09}>
                    기본 화면
                </Button>
            </div>

            <div className="stationContent-head02">
                <div>
                    {widgets09?.map(widget09 => {
                        return (
                            <div key={widget09.id}>
                                <Switch
                                    checked={widget09.active}
                                    onChange={onToggleWidget09}
                                    id={widget09.id}
                                    className="switch"
                                    size={"large"}
                                    offLabel={widget09.header}
                                    onLabel={widget09.header}
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
                    positions={filteredPositions09}
                    gap={{rows: 7, columns: 7}}
                    items={activeWidgets09}
                    onReposition={handleReposition09}
                />
            </div>

        </div>
    )
}
export default PcKPIManage;