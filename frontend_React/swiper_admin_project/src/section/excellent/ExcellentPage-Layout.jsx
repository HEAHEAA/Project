import {useCallback, useContext, useState} from "react";
import {Switch} from "@mui/material";
import ElPageStaff from "./staff_awrds/El-Page-Staff.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import {ExcellentContext} from "../../context/excellent/ExcellentContext.jsx";

function ExcellentPageLayout() {
    const {exCheck, setExCheck,} = useContext(ExcellentContext);

    const handleSwitchChange = (e) => {
        setExCheck(!exCheck);
    }

    //우수사원 시상식 버튼 탭 state
    const [elBtn, setElBtn] = useState(true);
    useCallback(() => {
        setElBtn(true);
    }, []);
    return (
        <div>
            <FormControlLabel
                control={<Switch
                    checked={exCheck}
                    onChange={(e) => {
                        handleSwitchChange(e);
                    }}
                />}
                label="전체 목록 보기"
            />
            <div className="excellent-layout">
                <ElPageStaff/>
            </div>
        </div>
    )
}

export default ExcellentPageLayout;
