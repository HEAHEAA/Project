import './foot.scss';
import {useContext, useState} from "react";
import {DisplayDataContext} from "../../../../../api/UIEdit/Display/DisplayDataContext.jsx";

function DisplayFoot() {
    const {newsData} = useContext(DisplayDataContext);

    const [animate, setAnimate] = useState(true);
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);


    return (
        <div>
            <div className="wrapper">
                <div className="slide_container">
                    <ul
                        className="slide_wrapper"
                        onMouseEnter={onStop}
                        onMouseLeave={onRun}
                    >
                        <div className={"slide original".concat(animate ? "" : " stop")}>
                            {
                                newsData.map((s, i) => (
                                    <li key={i}>
                                        <div className="item">
                                            {s.news_content}
                                        </div>
                                    </li>
                                ))
                            }
                        </div>

                        <div className={"slide clone".concat(animate ? "" : " stop")}>
                            {
                                newsData.map((s, i) => (
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

export default DisplayFoot;