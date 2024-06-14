import FilePlayPage from "./FilePlayBox/FilePlayPage.jsx";
import FileListBoxPage from "./FileListBox/FileListBoxPage.jsx";
import {useContext, useEffect} from "react";
import {FileListContext} from "../../../api/FileList/FileListContext.jsx";
import {PlaybackContext} from "../../../api/PlayBack/PlaybackContext.jsx";
import {PBPreviewContext} from "../../../api/PlayBack/PBPreviewContext.jsx";
import {PreviewContext} from "../../../api/Preview/PreviewContext.jsx";

function FileListPage(){
    const {GetFileList} = useContext(FileListContext);

    useEffect(() => {
        //1. 파일리스트
        GetFileList();
    }, []);


    return(
        <div className="contanier">
            <div className="play-list-box">
               <FilePlayPage/>
            </div>
            <div className="file-list-box">
                <FileListBoxPage/>
            </div>
        </div>
    )
}
export default FileListPage;