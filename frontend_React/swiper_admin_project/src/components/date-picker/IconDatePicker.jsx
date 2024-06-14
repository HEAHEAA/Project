import {useState} from "react";
import {Avatar, Popover, Stack, Tooltip} from "@mui/material";
import {FilterList} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import WeekPicker from "./WeekPicker.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function IconDatePicker() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box sx={{
            flexGrow: 0,
            float: 'right',
            display: {xs: 'block', md: "block"}
        }}
             className="log-out-icon">
            <Tooltip title="Open settings">
                <Stack direction="row" spacing={2}>
                    <Avatar aria-describedby={id} onClick={handleClick}>
                        <FilterList/>
                    </Avatar>
                </Stack>
            </Tooltip>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{p: 2}}>
                    <h3>날짜 필터</h3>

                    <WeekPicker/>

                    <Button onClick={() => {
                        handleClose();
                    }}>
                        선택완료
                    </Button>
                </Typography>
            </Popover>
        </Box>

    )
}

export default IconDatePicker;
