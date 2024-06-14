import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {createTheme, Stack, ThemeProvider} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PiAlarmDuotone} from "react-icons/pi";
import {RxTextAlignJustify} from "react-icons/rx";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {PiFolderOpenDuotone, PiDesktopDuotone, PiMagicWandDuotone, PiUserCircleDuotone} from "react-icons/pi";
import {LoginContext} from "../api/Login/LoginContext.jsx";
import {deepOrange, deepPurple} from "@mui/material/colors";
import { PiUsersThreeDuotone } from "react-icons/pi";

function TopBar() {
    const {LogoutOnSubmit,login} = useContext(LoginContext);
    const navigate = useNavigate();
    const [mbMenu, setMbMenu] = useState(false);

    //1. 헤드바 이벤트
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    //2. 테마
    const darkTheme = createTheme({
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });


    return (
        <div>
            <ThemeProvider theme={darkTheme}>


                <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <Toolbar>


                        <Box sx={{display: {xs: "block", md: 'none'}}} onClick={() => {
                            setMbMenu(!mbMenu);
                        }}>
                            <Tooltip title="Open settings">
                                <IconButton sx={{p: 0, textAlign: "left"}}>
                                    <RxTextAlignJustify style={{color: 'white', fontSize: 32}}/>
                                </IconButton>
                            </Tooltip>
                        </Box>


                        <Typography
                            variant="h6"
                            noWrap component="div"
                            sx={{
                                marginLeft: {xs: 5, md: 8},
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "center",
                                cursor: "pointer"
                            }}
                            onClick={()=>{
                                navigate('/home');
                            }}
                        >
                            <PiAlarmDuotone/>&nbsp; 환경알림이 재생 관리자  &nbsp; &nbsp;  <span className="xs-none">|</span>
                        </Typography>


                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button sx={{my: 2, color: 'white', display: 'block', marginLeft: 4}} onClick={() => {
                                navigate('/home');
                            }}>
                                파일 목록
                            </Button>
                            <Button sx={{my: 2, color: 'white', display: 'block', marginLeft: 2}} onClick={() => {
                                navigate('/home/play');
                            }}>
                                재생 목록
                            </Button>
                            <Button sx={{my: 2, color: 'white', display: 'block', marginLeft: 2}} onClick={() => {
                                navigate('/home/ui');
                            }}>
                                화면 편집 설정
                            </Button>
                            <Button sx={{my: 2, color: 'white', display: 'block', marginLeft: 2}} onClick={() => {
                                navigate('/home/membership');
                            }}>
                                회원 관리
                            </Button>
                        </Box>


                        <Box sx={{flexGrow: 0, marginRight: "1%", display: {xs: 'none', md: "block"}}}
                             className="log-out-icon">
                            <Tooltip title="Open settings">
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={handleOpenUserMenu}>
                                        {localStorage.getItem('id')}
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
                                }}>
                                    <Typography textAlign="center">로그아웃</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>


                    {
                        mbMenu === true ?
                            <Paper sx={{width: "100%", maxWidth: '100%', display: {xs: "block", md: "none"}}}>
                                <MenuList>

                                    <MenuItem onClick={() => {
                                        navigate('/home');
                                    }}>
                                        <ListItemIcon>
                                            <PiFolderOpenDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>파일 리스트</ListItemText>
                                    </MenuItem>


                                    <MenuItem onClick={() => {
                                        navigate('/home/play');
                                    }}>
                                        <ListItemIcon>
                                            <PiDesktopDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>재생 현황</ListItemText>
                                    </MenuItem>


                                    <MenuItem onClick={() => {
                                        navigate('/home/ui');
                                    }}>
                                        <ListItemIcon>
                                            <PiMagicWandDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>화면 편집 설정</ListItemText>
                                    </MenuItem>

                                    <MenuItem onClick={() => {
                                        navigate('/home/membership');
                                    }}>
                                        <ListItemIcon>
                                            <PiUsersThreeDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>회원 관리</ListItemText>
                                    </MenuItem>

                                    <Divider/>

                                    <MenuItem onClick={()=>{
                                        LogoutOnSubmit();
                                    }}>
                                        <ListItemIcon>
                                            <PiUserCircleDuotone fontSize="25"/>

                                        </ListItemIcon>
                                        <ListItemText>로그아웃</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </Paper> : null
                    }


                </AppBar>
            </ThemeProvider>
        </div>
    )
}

export default TopBar;