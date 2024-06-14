import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {useContext, useState} from "react";
import {NewsContext} from "../../../context/news/NewsContext.jsx";

function NewsLayout(){
    const {newsWeek} = useContext(NewsContext);
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return(
        <div className="news-section">
            {
                newsWeek.map((news,idx) => (
                    <Accordion
                        expanded={expanded === `panel${idx+1}`}
                        onChange={handleChange(`panel${idx+1}`)}
                        key={news.in_idx}
                    >
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>
                                {news.in_content}
                            </Typography>
                        </AccordionSummary>
                    </Accordion>
                ))
            }
        </div>
    )
}
export default NewsLayout;
