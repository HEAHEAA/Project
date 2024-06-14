
//시상식
import {useContext} from "react";
import {ElAwardImgContext} from "../../../context/excellent/El-Award-Img-Context.jsx";

function ElAwards(){
    const {imgAURL} = useContext(ElAwardImgContext);

    return(
        <div>
            {
                imgAURL.map((arr) => (
                    <div className="el-em-section">
                        <div className="el-em-img">
                            <img src={arr.ea_picture} alt="profile-img"/>
                        </div>
                        <div className="el-em-profile">

                            <h2>
                                {arr.start_month?.substring(0,4)}년도
                                &nbsp;
                                {arr.start_month?.substring(4,5)}월
                            </h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default ElAwards;