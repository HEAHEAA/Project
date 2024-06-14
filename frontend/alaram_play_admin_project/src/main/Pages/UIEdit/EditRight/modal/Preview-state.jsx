import veryGood from "../../../../../assets/img/veryGood-01.png";
import good from "../../../../../assets/img/good-01.png";
import better from "../../../../../assets/img/better-01.png";
import bad from "../../../../../assets/img/bad-01.png";
import veryBad from "../../../../../assets/img/veryBad-01.png";

export  const VeryGood = () => {
    return (
        <div className="cnDonutChart-mini-p" data-degree-value="72.0" data-color="rgb(50, 161, 255)"
             data-back-color="rgb(214, 228, 243)" data-code="a07">
            <img src={veryGood} alt="매우좋음"/>

            <svg width="100" height="150" focusable="false">
                <g transform="translate(50,70)">
                    <circle r="30" fill="rgb(255, 255, 255)" stroke="rgb(214, 228, 243)"
                            strokeWidth="10"></circle>
                    <circle r="30" fill="none" transform="rotate(-80)"
                            stroke="rgb(50, 161, 255)"
                            strokeWidth="12" strokeLinecap="round"
                            strokeDasharray="1050.66370614359172"
                            strokeDashoffset="1000.53096491487338"></circle>
                </g>
            </svg>
        </div>
    )
}

export const Good = () => {
    return (
        <div className="cnDonutChart-mini-p" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={good} alt="good"/>
            <svg width="100" height="150" focusable="false">
                <g transform="translate(50,70)">
                    <circle r="30" fill="rgb(255, 255, 255)" stroke="rgb(200, 240, 212)" strokeWidth="10"></circle>
                    <circle r="30" fill="none" transform="rotate(60)" stroke="rgb(0, 199, 60)" strokeWidth="12"
                            strokeLinecap="round" strokeDasharray="350.66370614359172"
                            strokeDashoffset="400.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}


export const Better = () => {
    return (
        <div className="cnDonutChart-mini-p" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={better} alt="보통"/>
            <svg width="100" height="150" focusable="false">
                <g transform="translate(50,70)">
                    <circle r="30" fill="rgb(255, 255, 255)" stroke=" rgb(240, 229, 200)" strokeWidth="10"></circle>
                    <circle r="30" fill="none" transform="rotate(50)" stroke="rgb(255, 185, 0)" strokeWidth="12"
                            strokeLinecap="round" strokeDasharray="330.66370614359172"
                            strokeDashoffset="400.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}

export  const Bad = () => {
    return (
        <div className="cnDonutChart-mini-p" data-degree-value="180.0" data-color="rgb(248, 81, 11)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={bad} alt="나쁨"/>
            <svg width="100" height="150" focusable="false">
                <g transform="translate(50,70)">
                    <circle r="30" fill="rgb(255, 255, 255)" stroke=" rgb(240, 212, 200)" strokeWidth="10"></circle>
                    <circle r="30" fill="none" transform="rotate(-85)" stroke="rgb(255, 115, 17)" strokeWidth="12"
                            strokeLinecap="round" strokeDasharray="200.66370614359172"
                            strokeDashoffset="400.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}

export  const VeryBad = () => {
    return (
        <div className="cnDonutChart-mini-p" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(202, 240, 212)" data-code="a09">
            <img src={veryBad} alt="매우나쁨"/>
            <svg width="100" height="150" focusable="false">
                <g transform="translate(50,70)">
                    <circle r="30" fill="rgb(255, 255, 255)" stroke="rgb(240, 200, 200)"
                            strokeWidth="10"></circle>
                    <circle r="30" fill="none" transform="rotate(-90)" stroke="rgb(239, 73, 73)"
                            strokeWidth="12"
                            strokeLinecap="round" strokeDasharray="2000.66370614359172"
                            strokeDashoffset="1000.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}






export  const BVeryGood = () => {
    return (
        <div className="cnDonutChart-mini" data-degree-value="72.0" data-color="rgb(50, 161, 255)"
             data-back-color="rgb(214, 228, 243)" data-code="a07">
            <img src={veryGood} alt="매우좋음"/>

            <svg width="200" height="200" focusable="false">
                <g transform="translate(110,100)">
                    <circle r="65" fill="rgb(255, 255, 255)" stroke="rgb(214, 228, 243)"
                            strokeWidth="15"></circle>
                    <circle r="65" fill="none" transform="rotate(-80)"
                            stroke="rgb(50, 161, 255)"
                            strokeWidth="17" strokeLinecap="round"
                            strokeDasharray="1050.66370614359172"
                            strokeDashoffset="1000.53096491487338"></circle>
                </g>
            </svg>
        </div>
    )
}

export const BGood = () => {
    return (
        <div className="cnDonutChart-mini" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={good} alt="good"/>
            <svg width="200" height="200" focusable="false">
                <g transform="translate(110,100)">
                    <circle r="65" fill="rgb(255, 255, 255)" stroke="rgb(200, 240, 212)" strokeWidth="15"></circle>
                    <circle r="65" fill="none" transform="rotate(60)" stroke="rgb(0, 199, 60)" strokeWidth="17"
                            strokeLinecap="round" strokeDasharray="350.66370614359172"
                            strokeDashoffset="400.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}


export const BBetter = () => {
    return (
        <div className="cnDonutChart-mini" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={better} alt="보통"/>
            <svg width="200" height="200" focusable="false">
                <g transform="translate(110,100)">
                    <circle r="65" fill="rgb(255, 255, 255)" stroke=" rgb(240, 229, 200)" strokeWidth="15"></circle>
                    <circle r="65" fill="none" transform="rotate(50)" stroke="rgb(255, 185, 0)" strokeWidth="17"
                            strokeLinecap="round" strokeDasharray="330.66370614359172"
                            strokeDashoffset="400.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}

export  const BBad = () => {
    return (
        <div className="cnDonutChart-mini" data-degree-value="180.0" data-color="rgb(248, 81, 11)"
             data-back-color="rgb(200, 240, 212)" data-code="a09">
            <img src={bad} alt="나쁨"/>
            <svg width="200" height="200" focusable="false">
                <g transform="translate(110,100)">
                    <circle r="65" fill="rgb(255, 255, 255)" stroke=" rgb(240, 212, 200)" strokeWidth="15"></circle>
                    <circle r="65" fill="none" transform="rotate(-85)" stroke="rgb(255, 115, 17)" strokeWidth="17"
                            strokeLinecap="round" strokeDasharray="200.66370614359172"
                            strokeDashoffset="400.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}

export  const BVeryBad = () => {
    return (
        <div className="cnDonutChart-mini" data-degree-value="180.0" data-color="rgb(0, 199, 60)"
             data-back-color="rgb(202, 240, 212)" data-code="a09">
            <img src={veryBad} alt="매우나쁨"/>
            <svg width="200" height="200" focusable="false">
                <g transform="translate(110,100)">
                    <circle r="65" fill="rgb(255, 255, 255)" stroke="rgb(240, 200, 200)"
                            strokeWidth="15"></circle>
                    <circle r="65" fill="none" transform="rotate(-90)" stroke="rgb(239, 73, 73)"
                            strokeWidth="17"
                            strokeLinecap="round" strokeDasharray="2000.66370614359172"
                            strokeDashoffset="1000.83185307179586"></circle>
                </g>
            </svg>
        </div>
    )
}