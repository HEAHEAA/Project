import {useContext, useEffect} from "react";
import {Switch} from "@progress/kendo-react-inputs";
import {TileLayout} from "@progress/kendo-react-layout";
import {UserContext, UserProvider} from "../../ContextServer/UserContext";
import Button from "@mui/material/Button";
import {LoginContext} from "../../ContextServer/LoginContext";
import {ThemeBar} from "../../Componet/style-config/ThemeBar";
import * as React from "react";


function PcUsers() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {
        onResetLayout06,
        widgets06,
        onToggleWidget06,
        filteredPositions06,
        activeWidgets06,
        handleReposition06,
        getUser,
        userOnDayLog,
    } = useContext(UserContext);

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        userOnDayLog();
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
        fetch(`/api/log/pageMoved?url=/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    return (
        <div>
            <UserProvider>
                <div className="pcUser">
                    <div className="stationContent">
                        <div className="stationContent-head">
                            <div className="stationContent-head01">
                                <Button variant="contained" onClick={onResetLayout06}>
                                    기본 화면
                                </Button>
                            </div>

                            <div className="stationContent-head02">
                                <div>
                                    {widgets06?.map(widget06 => {
                                        return (
                                            <div key={widget06.id}>
                                                <Switch
                                                    checked={widget06.active}
                                                    onChange={onToggleWidget06}
                                                    id={widget06.id}
                                                    className="switch"
                                                    size={"large"}
                                                    offLabel={widget06.header}
                                                    onLabel={widget06.header}
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
                            rowHeight="14.95vh"
                            positions={filteredPositions06}
                            gap={{rows: 7, columns: 7}}
                            items={activeWidgets06}
                            // ignoreDrag={(e) => {
                            //     return !(e.target.classList.contains("k-card-title"));
                            // }}
                            onReposition={handleReposition06}
                            className="tileLayout"
                        />
                    </div>
                </div>
            </UserProvider>
        </div>
    )
}

export default PcUsers;