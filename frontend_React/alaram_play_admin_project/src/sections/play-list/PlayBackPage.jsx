import PlaySwiperPage from "./PlayBackSwiperBox/PlaySwiperPage.jsx";
import SelectTab from "./PlayBackListBox/SelectTab.jsx";

function PlayBackPage() {


    return (
        <div>
            <div className="contanier">
                <div className="play-back-play-box">
                    <PlaySwiperPage/>
                </div>
                <div className="play-back-list-box">
                    <SelectTab/>
                </div>
            </div>
        </div>
    )
}

export default PlayBackPage;