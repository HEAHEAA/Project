
import Card from "@mui/material/Card";
import {MediaCardStyle} from "../../theme/mui-style-query.jsx";
import CardMedia from "@mui/material/CardMedia";
import pic from '../../assets/image/null-picture.jpg';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {FootLogo} from "../dashboard/_display/swiper-section/display-config.jsx";


export const MainEditPlay = ({contentFilter}) => {
    return(
        <div className="main-display-container">
            <section>
                <div>동해종합 기술공사 소식지</div>
            </section>
            <section>
                <div>
                    {localStorage.getItem('year-week')?.substring(0,4)}년
                    {localStorage.getItem('year-week')?.substring(4,5)}월
                    {localStorage.getItem('year-week')?.substring(5,6)}주차
                </div>
            </section>
            <section>

                <div className="title-section-box">
                    <ul>
                        <li>알림사항</li>
                        <li>주요일정</li>
                        <li>이달의 우수사원</li>
                    </ul>
                    <ul>
                        <li>낙찰 및 입찰현황</li>
                        <li>소식/News</li>
                        <li>문화소식</li>
                        <li>동해그룹 소식</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export const NoticeEditPlay = ({contentFilter}) => {
    return(
        <div className="main-display-container">
            <div className="main-display-title">
                공지사항
            </div>
            <br/>
            <br/>
            <br/>

            <div className="notice-display-section">
                <section>알림 사항</section>
                <ul>
                    <li>편집용 알림</li>
                </ul>
            </div>

            <div className="notice-display-section">
                <section>금주 주요일정</section>
                <ul>
                    <li>편집용 일정</li>
                </ul>
            </div>
        </div>
    )
}


export const ExcellentEditPlay = ({contentFilter}) => {

    return(
        <div className="excellent-display-container" >
            <div className="excellent-display-section-header" style={{width: "72%"}}>
                <br/>
                <h3>우수 사원</h3>
                <h3>0 월 우 수 사 원</h3>
            </div>

            <div className="excellent-display-top-img-mini">
                <div className="excell-section-mini">
                    <img src={pic} alt="img"/>
                    <p>경영지원실</p>
                    <p>홍길동 사원</p>
                </div>
                <div className="excell-section-mini">
                    <img src={pic} alt="img"/>
                    <p>경영지원실</p>
                    <p>홍길동 사원</p>
                </div>
                <div className="excell-section-mini">
                    <img src={pic} alt="img"/>
                    <p>경영지원실</p>
                    <p>홍길동 사원</p>
                </div>
            </div>

            <div className="excellent-display-section-content" style={{width: "72%"}}>

                <div className="excellent-display-section-img" >
                    <div className="excellent-display-section-card">
                        <Card sx={MediaCardStyle}>
                            <CardMedia sx={{height: 230}} image={pic}/>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    )
}


export const BidEditPlay = ({contentFilter}) => {

    return(
        <div className="bid-display-container">
            <div className="bid-display-section"
                 style={{width: "62%"}}
            >

                <div className="bid-display-title">
                    <h1>금주
                        <span>낙찰소식</span>
                    </h1>
                </div>


                <div className="bid-display-board">
                    <TableContainer>
                        <Table>
                            <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                <TableRow>
                                    <TableCell>낙찰일</TableCell>
                                    <TableCell>구분</TableCell>
                                    <TableCell>용역명</TableCell>
                                    <TableCell>발주처</TableCell>
                                    <TableCell>낙찰가</TableCell>
                                    <TableCell>공동도급비율</TableCell>
                                    <TableCell>비고</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: "#ffffff"}}>
                                <TableRow >
                                    <TableCell>낙찰일</TableCell>
                                    <TableCell>구분</TableCell>
                                    <TableCell>용역명</TableCell>
                                    <TableCell>발주처</TableCell>
                                    <TableCell>낙찰가</TableCell>
                                    <TableCell>공동도급비율</TableCell>
                                    <TableCell>비고</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <FootLogo/>
        </div>
    )
}


export const NewsEditPlay = ({contentFilter}) => {
    return(
        <div className="main-display-container">
            <div className="main-display-title">
                엔지니어링 업계 소식 (HyperLink)
            </div>
            <br/>
            <br/>
            <div className="news-display-section">
                <section>
                    업계소식 내용
                </section>
                <section>
                    업계소식 링크
                </section>
            </div>

        </div>
    )
}

export const BookEditPlay = ({contentFilter}) => {

    return(
        <div className="main-display-container">

            <div>
                <div className="main-display-title">
                    추천도서
                </div>
                <br/>
                <br/>

                <div className="book-display-section01">
                    <div className="book-display-content-img">
                        <div className="book-display-content-img-div">
                            <img src={pic} alt="image" className="book-display-content-img-img"/>
                        </div>
                    </div>
                </div>

                <div className="book-display-section02">
                    <section>책 소 개</section>
                    <section>
                        책소개
                    </section>
                </div>

                <div className="book-display-section03">
                    <section>요약 추천</section>
                    <section>책 요약</section>
                </div>
            </div>
        </div>
    )
}
