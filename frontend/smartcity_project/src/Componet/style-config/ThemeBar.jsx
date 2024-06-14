import {useEffect, useRef, useState} from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Select} from "@mui/material";
import {SelectBoxs, ThemeSelectBoxs} from "./light-theme";

export const ThemeBar = () => {
    const [selectNumber, setSelectNumber] = useState(0);
    const options = ['라이트 테마', '다크 테마'];

    const handleChange = (event) => {
        setSelectNumber(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem('theme', selectNumber);
    }, [selectNumber]);


    return (
        <div className="theme-bar">
            <FormControl fullWidth sx={ThemeSelectBoxs} size={"small"}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{color: "white",textAlign: "center"}}
                    value={selectNumber}
                    onChange={handleChange}
                >
                    {
                        options?.map((arr, inx) => (
                            <MenuItem value={inx} key={inx}>{arr} <span></span>
                            </MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        </div>
    )
}