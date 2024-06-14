import UIDisplay from "./Display/UIDisplay.jsx";
import UIEditLeftPage from "./EditLeft/UIEditLeftPage.jsx";
import UIEditRightPage from "./EditRight/UIEditRightPage.jsx";
import {useContext, useEffect} from "react";
import {DisplayDataContext} from "../../../api/UIEdit/Display/DisplayDataContext.jsx";
import {DisplayResize} from "../../../api/UIEdit/Display/DisplayResize.jsx";
import {WeatherContext} from "../../../api/UIEdit/Display/WeatherContext.jsx";
import {NodeContext} from "../../../api/UIEdit/Display/NodeContext.jsx";
import {FileListContext} from "../../../api/FileList/FileListContext.jsx";
import {PlaybackContext} from "../../../api/PlayBack/PlaybackContext.jsx";

function UiEditPage() {
    const {
        //1. 대기 데이터
        GradeDataOnSubmit,

        //2. 뉴스데이터
        NewsDataOnSubmit
    } = useContext(DisplayDataContext);
    const {
        ResizingDataOnSubmit,
        //1. 사이징 및 순서 변경 데이터
        SensorDataGetOnSubmit
    } = useContext(DisplayResize);

    const {
        //1. 날씨 데이터
        WeatherOnSubmitData
    } = useContext(WeatherContext);

    const {
        NodeGetOnSubmit,
        ResizingDataOnSubmitIs,
    } = useContext(NodeContext);


    //1. 대기데이터 받아오기
    useEffect(() => {
        NodeGetOnSubmit();
        ResizingDataOnSubmit();
        ResizingDataOnSubmitIs();
        SensorDataGetOnSubmit();

        GradeDataOnSubmit();
        NewsDataOnSubmit();
        WeatherOnSubmitData();
    }, []);




    return (
        <div>

            <div className="ui-contanier">
                <div className="ui-edit-left">
                    <UIEditLeftPage/>
                </div>
                <div className="ui-display">
                    <UIDisplay/>
                </div>
                <div className="ui-edit-right">
                    <UIEditRightPage/>
                </div>
            </div>
        </div>
    )
}

export default UiEditPage;