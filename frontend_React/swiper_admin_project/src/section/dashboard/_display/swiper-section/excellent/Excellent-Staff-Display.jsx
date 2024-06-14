import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {FootLogo} from "../display-config.jsx";
import {MediaCardStyle} from "../../../../../theme/mui-style-query.jsx";
import {useContext, useEffect, useState} from "react";
import {ExcellentContext} from "../../../../../context/excellent/ExcellentContext.jsx";
import {DisplayContext} from "../../../../../context/dashboard/DisplayContext.jsx";
import {NoticeContext} from "../../../../../context/notice/NoticeContext.jsx";
import {ElImgContext} from "../../../../../context/excellent/El-Img-Context.jsx";
import {ElAwardImgContext} from "../../../../../context/excellent/El-Award-Img-Context.jsx";

function ExcellentStaffDisplay() {
    const {staffPage} = useContext(DisplayContext);
    const {imgURL} = useContext(ElImgContext);
    const {imgAURL} = useContext(ElAwardImgContext);

    //공지사항 갯수만큼 빼준다.
    const {noticeAlarmList} = useContext(NoticeContext);
    let noticeLen = Math.ceil(noticeAlarmList?.length / 4);
    let total = noticeLen + 1;

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

    const [data, setData] = useState(imgUrlData);
    const lastPage = imgUrlData.length % 3 === 0 ? imgUrlData.length / 3 : imgUrlData.length / 3 + 1;

    useEffect(() => {
        if (staffPage === lastPage) {
            setData(imgUrlData.slice(3 * (staffPage - total)));
        } else {
            setData(imgUrlData.slice(3 * (staffPage - total), 3 * (staffPage - total) + 3));
        }
    }, [staffPage]);

    return (
        <div className="excellent-display-container">
            <div className="excellent-display-section-header">
                <h3>이달의</h3>
                <h3>우 수 사 원</h3>
            </div>

            <div className="excellent-display-top-img">
                {
                    data.map((el) => (
                        <div className="excell-section">
                            <img src={el.staffImgUrl} alt="img"/>
                            <p>{el.staffPart}</p>
                            <p>{el.staffName} {el.staffGrade}</p>
                        </div>
                    ))
                }
            </div>
            <div className="excellent-display-section-content">
                {
                    data.map((el) => (
                        <div className="excellent-display-section-img" key={el.staffId}>
                            <div className="excellent-display-section-card">
                                <Card sx={MediaCardStyle}>
                                    <CardMedia sx={{height: 230}} image={el.awardImgUrl}/>
                                </Card>
                                <h2>{el.staffName} {el.staffGrade}</h2>
                            </div>
                        </div>
                    ))
                }
            </div>

            <FootLogo/>
        </div>
    )
}

export default ExcellentStaffDisplay;
