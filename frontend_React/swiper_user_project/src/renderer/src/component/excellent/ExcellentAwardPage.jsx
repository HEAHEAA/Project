import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import aMan from "../../assets/section/aMan.jpg";
import CardContent from "@mui/material/CardContent";
import headerLogo from "../../assets/section/header-logo.png";
import star from "../../assets/section/star.png";
import {Foot} from "../_config/foot-logo";
import {useContext, useEffect, useState} from "react";
import {PageContext} from "../../context/config/PageContext";
import {AwardContext} from "../../context/excellent/AwardContext";
import {NoticeContext} from "../../context/notice/NoticeContext";
import {StaffContext} from "../../context/excellent/StaffContext";
import {Nows, Week} from "../../util/date-time";
import {UiEditContext} from "../../context/all/UiEditContext";

function ExcellentAwardPage(){
  const {awardPage, setAwardPage} = useContext(PageContext);
  const {imgAURL,setAURL} = useContext(AwardContext);
  const {excellentEdit} = useContext(UiEditContext);

  //페이징 처리
  const {noticeAlarmList} = useContext(NoticeContext);
  const {exList} = useContext(StaffContext);

  let noticeLen = Math.ceil(noticeAlarmList?.length / 6);
  let staffLen = Math.ceil(exList?.length / 3);
  let total = noticeLen+staffLen+1;

  const [data, setData] = useState(imgAURL);
  const lastPage = imgAURL.length % 3 === 0 ? imgAURL.length / 3 : imgAURL.length / 3 + 1;

  useEffect(() => {
    if (awardPage === lastPage) {
      setData(imgAURL.slice(3 * (awardPage - total)));
    } else {
      setData(imgAURL.slice(3 * (awardPage - total), 3 * (awardPage - total) + 3));
    }
  }, [awardPage]);

  const Month = Nows.substring(5,7)




    return(
        <div className="excellent-container">
          <div className="section-header">
            <h3 style={{fontSize: parseInt(excellentEdit[0]?.font_size)}}>우수 사원</h3>
            <h1 style={{fontSize: parseInt(excellentEdit[1]?.font_size)}}><strong>{Month}월 우 수 사 원 시상</strong></h1>
          </div>

            <div className="section-content">
                {
                    data.map((arr) => (
                      <div className="section-img" key={arr.idx}>
                        {/*<hr/>*/}
                        <div className="section-card">
                          <h1 style={{fontSize: parseInt(excellentEdit[2]?.font_size)}}>{arr.idx}</h1>
                          <Card sx={{minWidth: 500, marginLeft: 3}}>
                            <CardMedia
                              sx={{height: 350}}
                              image={arr.ea_picture}
                            />
                          </Card>
                        </div>
                      </div>
                    ))
                }

            </div>


          <Foot/>
        </div>
    )
}
export default ExcellentAwardPage;
