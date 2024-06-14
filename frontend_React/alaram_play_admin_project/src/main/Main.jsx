import TopBar from "../component/TopBar.jsx";
import FileListPage from "./Pages/FileList/FileListPage.jsx";
import PlayBackPage from "./Pages/PlayBack/PlayBackPage.jsx";
import UiEditPage from "./Pages/UIEdit/UiEditPage.jsx";
import * as React from 'react';
import {DisplayProvider} from "../api/UIEdit/Display/DisplayResize.jsx";
import {DisplayDataProvider} from "../api/UIEdit/Display/DisplayDataContext.jsx";
import {FileListProvider} from "../api/FileList/FileListContext.jsx";
import {PlayBackProvider} from "../api/PlayBack/PlaybackContext.jsx";
import {WeatherProvider} from "../api/UIEdit/Display/WeatherContext.jsx";
import {PreviewProvider} from "../api/Preview/PreviewContext.jsx";
import {PBPPreviewProvider} from "../api/PlayBack/PBPreviewContext.jsx";
import {NodeProvider} from "../api/UIEdit/Display/NodeContext.jsx";
import MemberShipPage from "./Pages/Membership/MemberShipPage.jsx";
import {MemberProvider} from "../api/MemberShip/MemberContext.jsx";

function Main() {

    return (
        <div>
            <DisplayProvider>
                <DisplayDataProvider>
                    <WeatherProvider>
                        <FileListProvider>
                            <PlayBackProvider>
                                <PreviewProvider>
                                    <PBPPreviewProvider>
                                        <NodeProvider>
                                            <MemberProvider>
                                                <TopBar/>
                                                {/*<Test/>*/}
                                                {
                                                    window.location.pathname === '/home' ? <FileListPage/> : (
                                                        window.location.pathname === '/home/play' ? <PlayBackPage/> : (
                                                            window.location.pathname === '/home/ui' ? <UiEditPage/> : (
                                                                window.location.pathname === '/home/membership' ?
                                                                    <MemberShipPage/> : null
                                                            )
                                                        )
                                                    )
                                                }
                                            </MemberProvider>

                                        </NodeProvider>
                                    </PBPPreviewProvider>
                                </PreviewProvider>
                            </PlayBackProvider>
                        </FileListProvider>
                    </WeatherProvider>
                </DisplayDataProvider>
            </DisplayProvider>
        </div>
    )
}

export default Main;