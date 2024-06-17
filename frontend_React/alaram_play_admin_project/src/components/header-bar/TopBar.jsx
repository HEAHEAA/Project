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
import {Stack, ThemeProvider} from "@mui/material";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PiAlarmDuotone} from "react-icons/pi";
import {RxTextAlignJustify} from "react-icons/rx";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {PiFolderOpenDuotone, PiDesktopDuotone, PiMagicWandDuotone, PiUserCircleDuotone} from "react-icons/pi";
import {deepOrange} from "@mui/material/colors";
import {PiUsersThreeDuotone} from "react-icons/pi";
import {LoginContext} from "../../context/LoginContext.jsx";
import {LightTheme} from "../../theme/mui-theme.jsx";
import {NodeContext} from "../../context/NodeContext.jsx";
import {useQueryClient} from "react-query";

function TopBar() {
    const {nodeList} = useContext(NodeContext);
    const {LogoutOnSubmit} = useContext(LoginContext);

    for (let i = 0; i < nodeList?.length; i++) {
        if (nodeList[i]?.sys_net_node_id === parseInt(localStorage.getItem('node'))) {
            localStorage.setItem('nodeName', nodeList[i]?.sys_net_node_name)
        }
    }


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


    //로그아웃 시, 캐시 전체 캐시 삭제하기
    const queryClient = useQueryClient();
    const handleCacheRemove = () => {
        queryClient.removeQueries('file-list');
        queryClient.removeQueries('play-list');

        queryClient.removeQueries('get-preview-img');
        queryClient.removeQueries('get-preview-vdo');
        queryClient.removeQueries('swiper-list');

        queryClient.removeQueries('preview-single-file');

        queryClient.removeQueries('play-preview-img');
        queryClient.removeQueries('play-preview-vdo');
        queryClient.removeQueries('news-list');
        queryClient.removeQueries('node-data');
        queryClient.removeQueries('weather-list');
        queryClient.removeQueries('layout-data');
    }


    return (
        <div>
            <ThemeProvider theme={LightTheme}>
                <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <Toolbar>

                        <Box sx={{display: {xs: "block", md: 'none'}}} onClick={() => {
                            setMbMenu(true);
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
                                cursor: "pointer",
                                width: '300px',
                            }}
                            onClick={() => {
                                navigate('/home');
                            }}
                        >
                            <PiAlarmDuotone style={{fontSize: 30}}/>

                            &nbsp;&nbsp;
                            {localStorage.getItem('nodeName') === '명보기업' ? '맘모스 프라자' : (
                                localStorage.getItem('nodeName') === '신평장림산업단지 혁신지원센터' ? '장림 2동 행정복지센터 ' : (
                                    localStorage.getItem('nodeName') === '부산 제1공장' ? "장림 1동 행정복지센터" : (
                                        localStorage.getItem('nodeName') === '동남공업' ? "감천 1동 행정복지센터" : (
                                            localStorage.getItem('nodeName') === '대동WF공업' ? "부산산단환경개선센터" : (
                                                localStorage.getItem('nodeName') === '다대2펌프장' ? "다대2동행정복지센터" : (
                                                    localStorage.getItem('nodeName') === '성신사' ? "다대1동행정복지센터" : (
                                                        localStorage.getItem('nodeName') === '신한은행 신평금융센터' ? "구평동행정복지센터" : (
                                                            localStorage.getItem('nodeName') === '청산에식품' ? "신평1동행정복지센터" : (
                                                                localStorage.getItem('nodeName') === '사하구민 장례식장' ? "장림유수지 인근" : localStorage.getItem('nodeName')
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )} 환경알림이

                            {/*&nbsp;{nodeName[0]?.sys_net_node_name} 환경알림이  &nbsp; &nbsp;  <span className="xs-none">|</span>*/}
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
                                    <Avatar sx={{bgcolor: deepOrange[500]}} onClick={handleOpenUserMenu}>
                                        {localStorage.getItem('++')}
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
                                <MenuItem onClick={() => {
                                    LogoutOnSubmit();
                                    handleCacheRemove();
                                }}>
                                    <Typography textAlign="center">로그아웃</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>


                    {/*모바일 화면일때 보여지는 메뉴바*/}
                    {
                        mbMenu === true ?
                            <Paper sx={{width: "100%", maxWidth: '100%', display: {xs: "block", md: "none"}}}>
                                <MenuList>
                                    <MenuItem onClick={() => {
                                        navigate('/home');
                                        setMbMenu(false);
                                    }}>
                                        <ListItemIcon>
                                            <PiFolderOpenDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>파일 리스트</ListItemText>
                                    </MenuItem>


                                    <MenuItem onClick={() => {
                                        navigate('/home/play');
                                        setMbMenu(false);
                                    }}>
                                        <ListItemIcon>
                                            <PiDesktopDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>재생 현황</ListItemText>
                                    </MenuItem>


                                    <MenuItem onClick={() => {
                                        navigate('/home/ui');
                                        setMbMenu(false);
                                    }}>
                                        <ListItemIcon>
                                            <PiMagicWandDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>화면 편집 설정</ListItemText>
                                    </MenuItem>

                                    <MenuItem onClick={() => {
                                        navigate('/home/membership');
                                        setMbMenu(false);
                                    }}>
                                        <ListItemIcon>
                                            <PiUsersThreeDuotone fontSize="25"/>
                                        </ListItemIcon>
                                        <ListItemText>회원 관리</ListItemText>
                                    </MenuItem>

                                    <Divider/>

                                    <MenuItem onClick={() => {
                                        setMbMenu(false);
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