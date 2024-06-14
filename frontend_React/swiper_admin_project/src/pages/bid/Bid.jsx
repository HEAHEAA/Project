import BidPageLayout from "../../section/bid/BidPage-Layout.jsx";
import '../../_style/bid/bid.css';
import {useContext, useEffect} from "react";
import {BidContext} from "../../context/bid/BidContext.jsx";

function Bid() {
    const {
        bidAllCheck, //전체 목록 체크
        BidWeekState, //입찰 현황
        AllState,
        BidTodayYet, //입찰 예정
        BidWeekNews, //낙찰 현황
        AllNews
    } = useContext(BidContext);

    useEffect(() => {
        if (bidAllCheck === false) {
            BidWeekState();
            BidTodayYet();
            BidWeekNews();
        } else if (bidAllCheck === true) {
            AllState();
            BidTodayYet();
            AllNews();
        }
    }, [bidAllCheck]);
    return (
        <div className="container">
            <h1>입찰 낙찰 </h1>
            <BidPageLayout/>
        </div>
    )
}

export default Bid;