import '../../style/excelllent/excellentEm.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {Foot} from "../_config/foot-logo";
import {useContext, useEffect, useState} from "react";
import {PageContext} from "../../context/config/PageContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {UserPartContext} from "../../context/config/UserPartContext";
import {Nows, Week} from "../../util/date-time";
import {UiEditContext} from "../../context/all/UiEditContext";
import {AwardContext} from "../../context/excellent/AwardContext";

function ExcellentEmPage() {
  const {staffPage} = useContext(PageContext);
  const {imgURL} = useContext(StaffContext);
  const {imgAURL, setAURL} = useContext(AwardContext);
  const {ClientPart} = useContext(UserPartContext);
  const {excellentEdit} = useContext(UiEditContext);


  let imgUrlData = [];
  for (let i = 0; i < imgURL.length; i++) {
    for (let j = 0; j < imgAURL.length; j++) {
      if (i === j) {
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


  //페이징 처리
  const {noticeAlarmList} = useContext(NoticeContext);
  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let total = noticeLen + 1


  const [data, setData] = useState(imgUrlData);
  const lastPage = imgUrlData.length % 3 === 0 ? imgUrlData.length / 3 : imgUrlData.length / 3 + 1;

  useEffect(() => {
    if (staffPage === lastPage) {
      setData(imgUrlData.slice(3 * (staffPage - total)));
    } else {
      setData(imgUrlData.slice(3 * (staffPage - total), 3 * (staffPage - total) + 3));
    }
  }, [staffPage]);

  const Month = Nows.substring(5, 7);

  return (
    <div className="excellent-container">

      <div className="section-header">
        <h3>이 달 의</h3>
        <h3>우 수 사 원</h3>
      </div>

      <div className="excellent-display-top-img">
        {
          data.map((el) => (
            <>
              <div className="excell-section">
                <img src={el.staffImgUrl} alt="img"/>
                <p>{el.staffPart}</p>
                <p>{el.staffName} {el.staffGrade}</p>
              </div>
            </>

          ))
        }
      </div>


      <div className="section-content">
        {
          data.map((el) => (
            <>
              <div className="section-img" key={el.ex_em_idx}>
                <div className="section-card">
                  <Card sx={{minWidth: 350, marginLeft: 1}}>
                    <CardMedia
                      sx={{height: 250}}
                      image={el.awardImgUrl}
                    />
                  </Card>
                </div>
              </div>
              <div className="section-img" key={el.ex_em_idx}>
                <div className="section-card">
                  <Card sx={{minWidth: 350, marginLeft: 1}}>
                    <CardMedia
                      sx={{height: 250}}
                      image={el.awardImgUrl}
                    />
                  </Card>
                </div>
              </div>
              <div className="section-img" key={el.ex_em_idx}>
                <div className="section-card">
                  <Card sx={{minWidth: 350, marginLeft: 1}}>
                    <CardMedia
                      sx={{height: 250}}
                      image={el.awardImgUrl}
                    />
                  </Card>
                </div>
              </div>
            </>

          ))
        }

      </div>


      <Foot/>
    </div>
  )
}

export default ExcellentEmPage;
