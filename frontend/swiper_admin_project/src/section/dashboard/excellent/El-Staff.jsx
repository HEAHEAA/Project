
//우수사원
import {useContext} from "react";
import {ElImgContext} from "../../../context/excellent/El-Img-Context.jsx";
import {ElAwardImgContext} from "../../../context/excellent/El-Award-Img-Context.jsx";

function ElStaff(){
    const {imgURL} = useContext(ElImgContext);
    const {imgAURL} = useContext(ElAwardImgContext);

    let imgUrlData = [];
    for(let i  = 0; i<imgURL.length; i++){
        for(let j = 0; j<imgAURL.length; j++){
            if(i === j){
                imgUrlData.push({
                    staffId: imgURL[i]?.ex_em_idx,
                    staffImgUrl: imgURL[i]?.ex_em_picture,
                    staffName: imgURL[i]?.ex_em_name,
                    staffGrade: imgURL[i]?.ex_em_grade,
                    staffPart: imgURL[i]?.ex_em_part,
                    awardId: imgAURL[j]?.ea_idx,
                    awardImgUrl: imgAURL[j]?.ea_picture
                })
            }
        }
    }

    return(
        <div>
            {
                imgUrlData.map((el) => (
                    <div className="el-em-section" key={el.awardId}>
                        <div className="el-em-profile-img">
                            <img src={el.staffImgUrl} alt="profile-img"/>
                        </div>
                        <div className="el-em-img">
                            <img src={el.awardImgUrl} alt="profile-img"/>
                        </div>
                        <div className="el-em-profile">
                            <h3>{el.staffPart}</h3>
                            <h2>{el.staffName} {el.staffGrade}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default ElStaff;
