import {useContext} from "react";
import {SwiperLoad} from "../../../../hooks/sections/play/UsePlaySwiper.jsx";
import {PlayContext} from "../../../../context/PlayContext.jsx";

function DisplayContent({cs}) {
    const {ResultIdDedupe} = useContext(PlayContext);

    return (
        <div>
            <SwiperLoad ResultIdDedupe={ResultIdDedupe} cs={cs}/>
        </div>
    )
}

export default DisplayContent;