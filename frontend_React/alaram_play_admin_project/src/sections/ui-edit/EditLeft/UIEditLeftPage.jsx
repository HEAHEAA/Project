import {TbEdit} from "react-icons/tb";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewsEdit from "./EditSystem/NewsEdit.jsx";
import {useState} from "react";
import EditSize from "./EditSystem/EditSize.jsx";
import EditNumber from "./EditSystem/EditNumber.jsx";
import PlaceEdit from "./EditSystem/PlaceEdit.jsx";
import {LayoutEditData} from "../../../hooks/sections/display/UseContentOrder.jsx";
import OnOffDisplay from "./EditSystem/OnOffDisplay.jsx";

function UIEditLeftPage() {
    const {isLoading: layoutLoading,data:layoutData,isError: layoutError} = LayoutEditData();

    //1. 판넬 이벤트 - (첫 로딩 , 1번 판넬만 열리게)
    const [expanded, setExpanded] = useState(1);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if(layoutLoading) return <>Loading...</>
    if(layoutError) return <>Error!</>




    return (
        <div className="ui-edit-box">
            <p className="ui-edit-box-text"><TbEdit/> 화면편집 설정</p>
            <br/>

            {/******3. news edit*****/}
            <Accordion sx={{zIndex: 999}} expanded={expanded === 1} onChange={handleChange(1)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    sx={{
                        backgroundColor: "#628ec9",
                        color: 'white',
                        height: "70px",
                    }}
                >
                    <Typography>화면 시간 설정</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <OnOffDisplay/>
                </AccordionDetails>
            </Accordion>



            {/******3. news edit*****/}
            <Accordion sx={{zIndex: 999}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    sx={{
                        backgroundColor: "#628ec9",
                        color: 'white',
                        height: "70px",
                    }}
                >
                    <Typography>뉴스</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <NewsEdit/>
                </AccordionDetails>
            </Accordion>


            {/******4. 순서*****/}
            <Accordion sx={{zIndex: 999}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    sx={{
                        backgroundColor: "#628ec9",
                        color: 'white',
                        height: "70px",
                    }}
                >
                    <Typography>순서 변경</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EditNumber layoutData={layoutData.data.data}/>
                </AccordionDetails>
            </Accordion>

            {/******5. 사이즈*****/}
            <Accordion sx={{zIndex: 999}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "white"}}/>}
                    sx={{
                        backgroundColor: "#628ec9",
                        color: 'white',
                        height: "70px",
                    }}
                >
                    <Typography>사이즈 변경</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EditSize/>
                </AccordionDetails>
            </Accordion>


        </div>
    )
}

export default UIEditLeftPage;
