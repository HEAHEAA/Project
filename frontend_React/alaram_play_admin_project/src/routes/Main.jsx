import TopBar from "../components/header-bar/TopBar.jsx";
import FileListPage from "../sections/file-list/FileListPage.jsx";
import PlayBackPage from "../sections/play-list/PlayBackPage.jsx";
import UiEditPage from "../sections/ui-edit/UiEditPage.jsx";
import MemberShipPage from "../sections/membership/MemberShipPage.jsx";
import {FileProvider} from "../context/FileContext.jsx";
import {PlayProvider} from "../context/PlayContext.jsx";
import {ResizeProvider} from "../context/ResizeContext.jsx";
import {MemberProvider} from "../context/MemberContext.jsx";
import {DisplayOnProvider} from "../context/DisplayOnContext.jsx";

function Main() {
    return (
        <div>
            <FileProvider> {/*파일 hook*/}
                <PlayProvider> {/*재생항목 hook*/}
                    <ResizeProvider> {/*화면편집 hook*/}
                        <MemberProvider>{/*회원관리 hook*/}
                            <DisplayOnProvider>
                                <TopBar/>
                                {
                                    window.location.pathname === '/home' ? <FileListPage/> : (
                                        window.location.pathname === '/home/play' ? <PlayBackPage/> : (
                                            window.location.pathname === '/home/ui' ? <UiEditPage/> : (
                                                window.location.pathname === '/home/membership' ? <MemberShipPage/> : null
                                            )
                                        )
                                    )
                                }
                            </DisplayOnProvider>
                        </MemberProvider>
                    </ResizeProvider>
                </PlayProvider>
            </FileProvider>
        </div>
    )
}

export default Main;
