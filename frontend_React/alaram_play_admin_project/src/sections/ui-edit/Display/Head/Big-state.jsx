import veryGood from "../../../../../assets/img/veryGood-01.png";
import good from "../../../../../assets/img/good-01.png";
import better from "../../../../../assets/img/better-01.png";
import bad from "../../../../../assets/img/bad-01.png";
import veryBad from "../../../../../assets/img/veryBad-01.png";

export const BVeryGood = () => {
    return (
        <div className="cnDonutChart" data-degree-value="72.0" data-color="rgb(50, 161, 255)"
             data-back-color="rgb(214, 228, 243)" data-code="a07">
            <img src={veryGood} alt="매우좋음"/>

            <svg width="500" height="500" focusable="false">
                <g transform="translate(250,250)">
                    <circle r="165" fill="rgb(255, 255, 255)" stroke="rgb(214, 228, 243)"
                            strokeWidth="40"></circle>
                    <circle r="165" fill="none" transform="rotate(-80)"
                            stroke="rgb(50, 161, 255)"
                            strokeWidth="45" strokeLinecap="round"
                            strokeDasharray="1150.66370614359172"
                            strokeDashoffset="1000.53096491487338"></circle>
                </g>
            </svg>
        </div>
    )
}

export const BGood = () => {
    return (
        <div className="cnDonutChart" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={good} alt="good"/>
            <svg width="500" height="500" focusable="false">
                <g transform="translate(250,250)">
                    <circle r="165" fill="rgb(255, 255, 255)" stroke="rgb(200, 240, 212)" strokeWidth="40"></circle>
                    <circle r="165" fill="none" transform="rotate(-80)" stroke="rgb(0, 199, 60)" strokeWidth="45"
                            strokeLinecap="round"
                            strokeDasharray="1300.66370614359172"
                            strokeDashoffset="1000.53096491487338"></circle>
                </g>
            </svg>
        </div>
    )
}

export const BBetter = () => {
    return (
        <div className="cnDonutChart" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={better} alt="보통"/>
            <svg width="500" height="500" focusable="false">
                <g transform="translate(250,250)">
                    <circle r="165" fill="rgb(255, 255, 255)" stroke=" rgb(240, 229, 200)" strokeWidth="40"></circle>
                    <circle r="165" fill="none" transform="rotate(-80)" stroke="rgb(255, 185, 0)" strokeWidth="45"
                            strokeLinecap="round"
                            strokeDasharray="1470.66370614359172"
                            strokeDashoffset="1000.53096491487338"></circle>
                </g>
            </svg>
        </div>
    )
}

export const BBad = () => {
    return (
        <div className="cnDonutChart" data-degree-value="180.0" data-color="rgb(248, 81, 11)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={bad} alt="나쁨"/>
            <svg width="500" height="500" focusable="false">
                <g transform="translate(250,250)">
                    <circle r="165" fill="rgb(255, 255, 255)" stroke=" rgb(240, 212, 200)" strokeWidth="40"></circle>
                    <circle r="165" fill="none" transform="rotate(-80)" stroke="rgb(255, 115, 17)" strokeWidth="45"
                            strokeLinecap="round"
                            strokeDasharray="1700.66370614359172"
                            strokeDashoffset="1000.53096491487338"></circle>
                </g>
            </svg>
        </div>
    )
}

export const BVeryBad = () => {
    return (
        <div className="cnDonutChart" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(202, 240, 212)" data-code="a09">
            <img src={veryBad} alt="매우나쁨"/>
            <svg width="500" height="500" focusable="false">
                <g transform="translate(250,250)">
                    <circle r="165" fill="rgb(255, 255, 255)" stroke="rgb(240, 200, 200)"
                            strokeWidth="40"></circle>
                    <circle r="165" fill="none" transform="rotate(-80)" stroke="rgb(239, 73, 73)"
                            strokeWidth="45"
                            strokeLinecap="round" strokeDasharray="2100.66370614359172"
                            strokeDashoffset="1000.53096491487338"></circle>
                </g>
            </svg>
        </div>
    )
}
