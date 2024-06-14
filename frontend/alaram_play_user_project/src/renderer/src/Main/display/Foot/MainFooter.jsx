import { useContext, useState } from "react";
import { FootContext } from "../../../context/FootContext";
import '../../../style/NewsAni.scss';
import { ResizeContext } from "../../../context/ResizeContext";

function MainFooter() {
  const {news} = useContext(FootContext);
  const { resize , fs } = useContext(ResizeContext)
  let size = [];
  for(let i=0; i<resize.length; i++){
    if(resize[i].name === '대기 정보'){
      size.push(resize[i]);
    }
  }


  const [animate, setAnimate] = useState(true);
    return (
      <div className="main-footer" style={{width: parseInt(fs[0]?.width), height: parseInt(fs[0]?.height)}}>
        <div className="wrapper">
          <div className="slide_container">
            <ul
              className="slide_wrapper"
            >

              <div
                className={"slide original".concat(
                  animate ? "" : " stop"
                )}
              >
                {
                  news.map((s, i) => (
                    <li key={i}>
                      <div className="item">
                        {s.news_content}
                      </div>
                    </li>
                  ))
                }
              </div>


              <div
                className={"slide clone".concat(animate ? "" : " stop")}
              >
                {
                  news.map((s, i) => (
                    <li key={i}>
                      <div className="item">
                        {s.news_content}
                      </div>
                    </li>
                  ))
                }
              </div>


            </ul>
          </div>
        </div>
      </div>
    )
}

export default MainFooter;
