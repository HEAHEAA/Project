
import NewsPageLayout from "../../section/news/NewsPage-Layout.jsx";
import '../../_style/news/news.css';
import {useContext, useEffect} from "react";
import {NewsContext} from "../../context/news/NewsContext.jsx";
import {Switch} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

function News() {
    const {
        newsCheck, setNewsCheck,
        NewsAllData,
        NewsWeeksData
    } = useContext(NewsContext);
    useEffect(() => {
        if (newsCheck === false) {
            NewsWeeksData(); //업계소식
        } else if (newsCheck === true) {
            NewsAllData();
        }
    }, [newsCheck]);

    const handleSwitchChange = (e) => {
        setNewsCheck(!newsCheck);
    }
    return (
        <div className="container">
            <div className="news-title">
                <h1>
                    엔지니어링 업계 소식
                    <span style={{color: "#1c63c2"}}>(HyperLink)</span>
                </h1>
                <FormControlLabel
                    control={<Switch
                        checked={newsCheck}
                        onChange={(e) => {
                            handleSwitchChange(e);
                        }}
                    />}
                    label="전체 목록 보기"
                    sx={{float: 'right'}}
                />
            </div>

            <NewsPageLayout/>
        </div>
    )
}

export default News;
