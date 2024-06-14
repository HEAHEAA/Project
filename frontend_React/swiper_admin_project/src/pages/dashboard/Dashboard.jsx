import '../../_style/dashboard/dashboard.css';
import '../../_style/dashboard/display.css';
import '../../_style/dashboard/dashboard-media.css';
import DisplayLayout from "../../section/dashboard/_display/Display-Layout.jsx";
import NoticeLayout from "../../section/dashboard/notice/Notice-Layout.jsx";
import ExcellentLayout from "../../section/dashboard/excellent/Excellent-Layout.jsx";
import BidNewsLayout from "../../section/dashboard/bid/BidNews-Layout.jsx";
import BidYetLayout from "../../section/dashboard/bid/BidYet-Layout.jsx";
import BidStateLayout from "../../section/dashboard/bid/BidState-Layout.jsx";
import NewsLayout from "../../section/dashboard/news/News-Layout.jsx";
import BooksLayout from "../../section/dashboard/book/Books-Layout.jsx";
import {useContext, useEffect, useState} from "react";
import {BidContext} from "../../context/bid/BidContext.jsx";
import {ExcellentContext} from "../../context/excellent/ExcellentContext.jsx";
import {NoticeContext} from "../../context/notice/NoticeContext.jsx";
import {NewsContext} from "../../context/news/NewsContext.jsx";
import {BookContext} from "../../context/book/BookContext.jsx";
import Button from "@mui/material/Button";
import {EventSourcePolyfill} from "event-source-polyfill";
import {Loop} from "@mui/icons-material";
import RoleModal from "./role-modal/RoleModal.jsx";
import {useNavigate} from "react-router-dom";
import GroupNewsLayout from "../../section/dashboard/group-news/GroupNews-Layout.jsx";

function Dashboard() {
    const navigate = useNavigate();

    const {
        BidWeekState, //입찰 현황
        BidTodayYet, //입찰 예정
        BidWeekNews //낙찰 현황
    } = useContext(BidContext);
    const {
        ExcellentWeekList, //우수사원
        AwardWeekList, // 시상식
    } = useContext(ExcellentContext);

    const {
        NoticeWeekData //공지사항
    } = useContext(NoticeContext);
    const {
        NewsWeeksData // 업계소식
    } = useContext(NewsContext);
    const {
        BookWeekData
    } = useContext(BookContext);


    useEffect(() => {
        BidWeekState();
        BidTodayYet();
        BidWeekNews();
    }, []);

    useEffect(() => {
        ExcellentWeekList(); //우수사원
        AwardWeekList(); //시상식
    }, []);

    useEffect(() => {
        NoticeWeekData(); //공지사항
    }, []);

    useEffect(() => {
        NewsWeeksData(); //업계소식
    }, []);
    useEffect(() => {
        BookWeekData(); //추천도서
    }, []);

    const sseSubmit = async () => {
        let sse = await new EventSourcePolyfill('/api/sse/refreshData',{
            heartbeatTimeout: 300000,
        })
        sse.addEventListener('refresh', function (e){
            let sseData = JSON.parse(e.data);
        })
    }

    //권한 페이지 막힘 모달
    const [role, setRole] = useState(false);
    const handleRoleOpen = () => setRole(true);
    const handleRoleClose = () => setRole(false);
    return (
        <div className="container">
            <RoleModal role={role} handleClose={handleRoleClose}/>

            <div className="dashboard-title">
                <h1>Dashboard </h1>
                <Button variant="contained"
                        sx={{marginLeft: 1}}
                        className="dashboard-title-sse"
                        onClick={(e) => {sseSubmit();}}
                >
                    데이터 갱신 <Loop/>
                </Button>
            </div>

            <div className="layout-display">
                <DisplayLayout/>
            </div>

            <div className="layout-notice">
                <h2 className="sub-title">
                   <strong>공지사항</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === "1" ||
                            localStorage.getItem('user-role') === "3" ||
                            localStorage.getItem('user-role') === "4"
                        ){
                            navigate('/notice/alarm');
                        }else {
                            handleRoleOpen();
                        }
                    }}>더보기</small>
                </h2>
                <NoticeLayout/>
            </div>

            <div className="layout-excellent">
                <h2 className="sub-title">
                    <strong>우수사원</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === '1' ||
                            localStorage.getItem('user-role' === '3')){
                            navigate('/excellent');
                        }else {
                            handleRoleOpen();
                        }
                    }}>
                        더보기
                    </small>
                </h2>
                <ExcellentLayout/>
            </div>

            <div className="layout-bid01">
                <h2 className="sub-title">
                    <strong>금주 낙찰소식</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === '1' ||
                            localStorage.getItem('user-role') === "2"){
                            navigate('/bid');
                        }else {
                            handleRoleOpen();
                        }
                    }}>
                        더보기
                    </small>
                </h2>
                <BidNewsLayout/>
            </div>

            <div className="layout-bid02">
                <h2 className="sub-title">
                    <strong>금주 입찰예정</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === '1' ||
                            localStorage.getItem('user-role') === '2'){
                            navigate('/bid');
                        }else {
                            handleRoleOpen();
                        }
                    }}>
                        더보기
                    </small>
                </h2>
                <BidStateLayout/>
            </div>

            <div className="layout-bid03">
                <h2 className="sub-title">
                    <strong>금일 입찰현황</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === '1' ||
                            localStorage.getItem('user-role') === "2"
                        ){
                            navigate('/bid');
                        }else {
                            handleRoleOpen();
                        }
                    }}>
                        더보기
                    </small>
                </h2>
                <BidYetLayout/>

            </div>

            <div className="layout-news">
                <h2 className="sub-title">
                    <strong>엔지니어링 업계소식</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === '1'){
                            navigate('/news');
                        }else {
                            handleRoleOpen();
                        }
                    }}>
                        더보기
                    </small>
                </h2>
                <NewsLayout/>
            </div>
            <div className="layout-books">
                <h2 className="sub-title">
                    <strong>문화소식</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === '1'){
                            navigate('/book');
                        }else {
                            handleRoleOpen();
                        }
                    }}>
                        더보기
                    </small>
                </h2>
                <BooksLayout/>
            </div>

            <div className="layout-group-news">
                <h2 className="sub-title">
                    <strong>동해그룹 소식</strong>
                    <small onClick={()=>{
                        if(localStorage.getItem('user-role') === '1'){
                            navigate('/group-news');
                        }else {
                            handleRoleOpen();
                        }
                    }}>
                        더보기
                    </small>
                </h2>
                <GroupNewsLayout/>
            </div>

        </div>
    )
}

export default Dashboard;
