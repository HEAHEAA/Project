import {useContext} from "react";
import {SwiperLoad} from "../../../hooks/sections/play/UsePlaySwiper.jsx";
import {PlayContext} from "../../../context/PlayContext.jsx";


function PlaySwiperPage() {
    const {ResultIdDedupe} = useContext(PlayContext);
    return (
        <div className="play-file">
            <SwiperLoad ResultIdDedupe={ResultIdDedupe}/>
        </div>
    )
}

export default PlaySwiperPage;