import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function PlaceEdit() {

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">지점을 선택 해주세요.</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                >

                </Select>
                <FormHelperText>지점을 선택 해주세요.</FormHelperText>
            </FormControl>

        </div>
    )
}

export default PlaceEdit;