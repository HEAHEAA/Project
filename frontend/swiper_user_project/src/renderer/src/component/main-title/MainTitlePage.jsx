import '../../style/main-title/main-title.css'
import {Foot} from "../_config/foot-logo";
import {Nows, Week} from "../../util/date-time";
import {useContext} from "react";
import {UiEditContext} from "../../context/all/UiEditContext";

function MainTitlePage(){
  const {mainEdit} = useContext(UiEditContext);
  const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();

    return Math.ceil((currentDate + firstDay) / 7);
  };

  const week = getWeek(new Date(Nows));

    return(
        <div className="main-container">
            <section>
                <div>동해종합 기술공사 소식지</div>
            </section>
            <section>
                <div>
                  {Nows.substring(0,4)} 년도 &nbsp;
                  {Nows.substring(5,7)} 월 &nbsp;
                  {week} 주 차
                </div>
            </section>
            <section>
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
            </section>


          <Foot/>

        </div>
    )
}
export default MainTitlePage;
