import ExcellentPageLayout from "../../section/excellent/ExcellentPage-Layout.jsx";
import '../../_style/excellent/excellent.css';
import {useContext, useEffect} from "react";
import {ExcellentContext} from "../../context/excellent/ExcellentContext.jsx";

function Excellent() {
    const {
        exCheck, setExCheck,
        ExcellentWeekList,
        AwardWeekList,
        ExcellentAllList,
        AwardAllList,
    } = useContext(ExcellentContext);

    useEffect(() => {
        if (exCheck === false) {
            ExcellentWeekList(); //우수사원
            AwardWeekList(); //시상식
        } else if (exCheck === true) {
            ExcellentAllList();
            AwardAllList();
        }
    }, [exCheck]);

    return (
        <div className="container">
            <h1>우수 사원 / 시상식 </h1>

            <ExcellentPageLayout/>
        </div>
    )
}

export default Excellent;
