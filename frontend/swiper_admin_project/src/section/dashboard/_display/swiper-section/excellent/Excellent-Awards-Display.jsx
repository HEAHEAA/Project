import {FootLogo} from "../display-config.jsx";
import {useContext, useEffect, useState} from "react";
import Card from "@mui/material/Card";
import {MediaCardStyle} from "../../../../../theme/mui-style-query.jsx";
import CardMedia from "@mui/material/CardMedia";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {ExcellentContext} from "../../../../../context/excellent/ExcellentContext.jsx";
import {ElAwardImgContext} from "../../../../../context/excellent/El-Award-Img-Context.jsx";
import {Nows} from "../../../../../utils/date-time.jsx";
import {DisplayEditContext} from "../../../../../context/dashboard-edit/DisplayEditContext.jsx";

function ExcellentAwardsDisplay(){
    const {awardPage,setAwardPage} = useContext(DisplayContext);
    const {imgAURL} = useContext(ElAwardImgContext);
    const {noticeAlarmList} = useContext(NoticeContext);
    const {exList} = useContext(ExcellentContext);
    const {editList, setEditList} = useContext(DisplayEditContext);

    //뉴스 , 시상자 len 만큼 빼주기
    let noticeLen = Math.ceil(noticeAlarmList?.length / 4);
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

    const Month = Nows?.substring(5,7)


    return(
        <div className="excellent-display-container" >

            <div className="excellent-display-section-header"  style={window.location.pathname === '/dashboard-edit/detail' ? {width: "1400px"} : null}>
                <h3 style={{fontSize: parseInt(editList[12]?.font_size-20)}}>우수 사원</h3>
                <h1 style={{fontSize: parseInt(editList[13]?.font_size-20)}}><strong>{Month} 월 우 수 시 상</strong></h1>
            </div>

            <div className="excellent-display-section-content">

                {
                    data.map((arr) => (
                        <div className="excellent-display-section-img" key={arr.idx}>
                            <div className="excellent-display-section-card">
                               <h1 style={{fontSize: parseInt(editList[14]?.font_size)}}>{arr.idx}</h1>
                                <Card sx={MediaCardStyle}>
                                    <CardMedia
                                        sx={{height: 280}}
                                        image={arr.ea_picture}
                                    />
                                </Card>
                            </div>
                        </div>
                    ))
                }
            </div>

            <FootLogo/>
        </div>
    )
}
export default ExcellentAwardsDisplay;
