import './foot.scss';
import {useState} from "react";
import {useQuery} from "react-query";
function DisplayFoot() {
    //좌측 edit 상위로직에서 데이터를 부르고 있으므로, 캐시 저장된 상태 데이터만 불러온다.
    const {data}  = useQuery('news-list');

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
                                data?.data.data.map((s,i) => (
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
                                data?.data.data.map((s,i) => (
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