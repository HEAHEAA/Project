import FilePlayPage from "./FilePlayBox/FilePlayPage.jsx";
import FileListBoxPage from "./FileListBox/FileListBoxPage.jsx";
import {useContext, useEffect} from "react";
import {NodeContext} from "../../context/NodeContext.jsx";
function FileListPage(){
    const {LayoutCheck,layoutData,LayoutDefaultPost} = useContext(NodeContext);

    useEffect(() => {
        LayoutCheck();
    }, []);

    useEffect(() => {
        if(layoutData.length === 0){
            LayoutDefaultPost();
        }
    }, [LayoutCheck]);




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