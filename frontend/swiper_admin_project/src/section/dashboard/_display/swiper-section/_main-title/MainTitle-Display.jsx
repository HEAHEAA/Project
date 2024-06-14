import {FootLogo} from "../display-config.jsx";

function MainTitleDisplay(){
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

            <FootLogo/>
        </div>
    )
}
export default MainTitleDisplay;
