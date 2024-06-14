import Box from "@mui/material/Box";
import {Avatar, MenuItem, Popover, Stack, Tooltip} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import {LoginContext} from "../../context/login/LoginContext.jsx";
import {useNavigate} from "react-router-dom";


function Logout() {
    const navigate = useNavigate();
    const {LogoutOnSubmit} = useContext(LoginContext);

    //1. 헤드바 이벤트
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div style={{width: "100%", float: "right"}}>
            <Box sx={{
                flexGrow: 0,
                marginRight: "1%",
                float: 'right',
                display: {xs: 'none', md: "block"}
            }}
                 className="log-out-icon">

                <Tooltip title="Open settings">
                    <Stack direction="row" spacing={2}>
                        <Avatar sx={{bgcolor: deepOrange[500]}} onClick={handleOpenUserMenu}>
                            test
                        </Avatar>
                    </Stack>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={()=>{
                        LogoutOnSubmit();
                        navigate('/');
                    }}>
                        <Typography textAlign="center">로그아웃</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </div>
    )
}


export default Logout;
