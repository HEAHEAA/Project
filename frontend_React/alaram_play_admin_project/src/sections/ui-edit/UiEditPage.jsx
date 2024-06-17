import UIDisplay from "./Display/UIDisplay.jsx";
import UIEditLeftPage from "./EditLeft/UIEditLeftPage.jsx";
import UIEditRightPage from "./EditRight/UIEditRightPage.jsx";
import {useContext, useEffect} from "react";
import {DisplayOnContext} from "../../context/DisplayOnContext.jsx";
import Button from "@mui/material/Button";

function UiEditPage() {
    const {onOffTimeDataOnSubmit} = useContext(DisplayOnContext);

    useEffect(() => {
        onOffTimeDataOnSubmit();
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
