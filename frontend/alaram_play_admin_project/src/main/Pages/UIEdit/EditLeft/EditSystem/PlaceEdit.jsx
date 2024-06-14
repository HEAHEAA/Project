import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function PlaceEdit() {

    return (
        <div>
            <br/>
            <span>영진기술 지점</span>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">테스트용</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                >
                    <MenuItem>서울</MenuItem>
                    <MenuItem>수원</MenuItem>
                    <MenuItem>춘천</MenuItem>
                </Select>
            </FormControl>

        </div>
    )
}

export default PlaceEdit;