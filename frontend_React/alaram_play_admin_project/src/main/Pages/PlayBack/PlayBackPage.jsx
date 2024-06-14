import PlaySwiperPage from "./PlayBackSwiperBox/PlaySwiperPage.jsx";
import SelectTab from "./PlayBackListBox/SelectTab.jsx";
import {useContext, useEffect} from "react";
import {PlaybackContext} from "../../../api/PlayBack/PlaybackContext.jsx";
import {FileListContext} from "../../../api/FileList/FileListContext.jsx";

function PlayBackPage() {
    const {GetFileList} = useContext(FileListContext);
    const {
        PlayBackListOnsubmit,
    } = useContext(PlaybackContext);

    useEffect(() => {
        //1. 파일리스트
        GetFileList();
        //2. 현재 재생목록 리스트
        PlayBackListOnsubmit();
    }, []);



    return (
        <div>
            <div className="contanier">
                <div className="play-back-play-box">
                    <PlaySwiperPage/>
                </div>
                <div className="play-back-list-box">
                    <SelectTab/>
                </div>
            </div>
        </div>
    )
}

export default PlayBackPage;