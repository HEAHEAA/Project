import {useNavigate} from "react-router-dom";
import {BiAddToQueue} from "react-icons/bi";
import ModalMap from "../Map/ModalMap";
import {ViewAllIcon} from "../../../../Componet/style-config/light-theme";

function SL01() {
    const SeNavigate = useNavigate();
    const GoSeDetail01 = () => {
        SeNavigate('/securityLight/sub1');
    }

    return (
        <div>
            <button onClick={GoSeDetail01} className="bigger-icon" style={ViewAllIcon}>
                <BiAddToQueue/>
            </button>
            <ModalMap/>
        </div>
    )
}

export default SL01;