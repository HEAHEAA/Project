import { TextField} from "@mui/material";
import logo from '../../../../../assets/img/busan-logo.png';
import Button from "@mui/material/Button";

function LogoEdit(){
    return(
        <div>
            <TextField
                type="file"
                id="files"
                variant="outlined"
                fullWidth
            />

            <h3>현재 로고</h3>
            <div className="dis-preview-img">
                <img src={logo}/>
            </div>
            <br/>
        </div>
    )
}
export default LogoEdit;