import {useContext} from "react";
import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";
import ElStaff from "./El-Staff.jsx";
import {ExcellentContext} from "../../../context/excellent/ExcellentContext.jsx";

function ExcellentLayout(){
    const {elBtn, setElBtn} = useContext(ExcellentContext);
    return(
        <div className="dashboard-layout">
            <ButtonGroup size="large" aria-label="large button group">
                <Button
                    key="one"
                    variant={elBtn === true ? "contained" : "outlined"}
                    onClick={() => {
                        setElBtn(true);
                    }}>우수사원/시상식</Button>
            </ButtonGroup>
            <ElStaff/>
        </div>
    )
}
export default ExcellentLayout;
