import Button from "@mui/material/Button";
import {ButtonGroup, Switch} from "@mui/material";
import {useContext} from "react";
import BidPageYet from "./components/BidPage-Yet.jsx";
import BidPageState from "./components/BidPage-State.jsx";
import BidPageNews from "./components/BidPage-News.jsx";
import {BidContext} from "../../context/bid/BidContext.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";

function BidPageLayout() {
    const {
        bidBtn, setBidBtn,
        bidAllCheck, setBidAllCheck,
    } = useContext(BidContext);

    const handleSwitchChange = (e) => {
        setBidAllCheck(!bidAllCheck);
    }
    return (
        <div>
            <ButtonGroup size="large" aria-label="large button group">
                <Button
                    key="one"
                    variant={bidBtn === 0 ? "contained" : "outlined"}
                    onClick={() => {
                        setBidBtn(0);
                    }}>금주 낙찰소식</Button>
                <Button
                    key="two"
                    variant={bidBtn === 1 ? "contained" : "outlined"}
                    onClick={() => {
                        setBidBtn(1);
                    }}>금주 입찰 예정</Button>
                <Button
                    key="two"
                    variant={bidBtn === 2 ? "contained" : "outlined"}
                    onClick={() => {
                        setBidBtn(2);
                    }}>금일 입찰현황</Button>
            </ButtonGroup>

            <FormControlLabel
                className="all-label-btn"
                control={<Switch
                    checked={bidAllCheck}
                    onChange={(e) => {
                        handleSwitchChange(e)
                    }}
                />}
                label="전체 목록 보기"
                sx={{float: 'right'}}
            />

            <div className="bidPage-layout">
                {
                    bidBtn === 0 ? <BidPageNews/> : (
                        bidBtn === 1 ? <BidPageState/>: (
                            bidBtn === 2 ? <BidPageYet/>: <div> 메뉴를 선택 해 주세요.</div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default BidPageLayout;
