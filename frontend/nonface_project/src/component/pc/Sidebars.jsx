import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dashboard from "../../pages/dashboard/HomeDash/Dashboard.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import AccountCircle from "@mui/icons-material/AccountCircle.js";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {DonutSmall, Group, Home, MapsHomeWork, MiscellaneousServices} from "@mui/icons-material";
import logo from '../../assets/img/logo.png';
import SpeedDial from '@mui/material/SpeedDial';
import Footer from "./Footer.jsx";
import DashControl from "../../pages/dashboard/HomeControl/DashControl.jsx";
import SubScription from "../../pages/subscription/main/SubScription.jsx";
import CustomerGroup from "../../pages/customer/group/CustomerGroup.jsx";
import CustomerUser from "../../pages/customer/user/CustomerUser.jsx";
import CustomerAppDown from "../../pages/customer/appDownload/CustomerAppDown.jsx";
import MakeUseList from "../../pages/total/makeUse/MakeUseList.jsx";
import GroupMakeUseList from "../../pages/total/groupMakeUse/GroupMakeUseList.jsx";
import AlarmSystem from "../../pages/system/alarm/AlarmSystem.jsx";
import NoticeSystem from "../../pages/system/notice/NoticeSystem.jsx";
import NoticeAdd from "../../pages/system/notice/add/NoticeAdd.jsx";
import NoticeEdit from "../../pages/system/notice/edit/NoticeEdit.jsx";
import {LoginContext} from "../../api/login/LoginContext.jsx";
import ScriptListPage from "../../pages/subscription/ScriptList/ScriptListPage.jsx";
import AlarmListPage from "../../pages/system/alarm/AlarmList/AlarmListPage.jsx";


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


function Sidebars() {
    const navigate = useNavigate();
    const {username} = useContext(LoginContext);

    //사이드바 오픈모달
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        navigate('/');
    };

    const [btn01, setBtn01] = useState(false); //청약
    const [btn02, setBtn02] = useState(false); //고객사
    const [btn03, setBtn03] = useState(false); // 통계분석
    const [btn04, setBtn04] = useState(false); //환경 설정

    // 현재 시간 계산하기
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 120 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
    const update = koreaNow.replaceAll('T', ' ');
    const nows = update.replaceAll('Z', ' ').substring(0,19);


    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{width: '15%',cursor: "pointer"}} onClick={()=>{navigate('/home')}}>
                            비대면 공동업무 시스템
                        </Typography>


                        <div className="userLogOut">
                            {auth && (
                                <div>
                                    <span className="main-time">{nows}</span>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >


                                        <AccountCircle/>
                                        <p className="main-acc">
                                            {username} 님
                                        </p>

                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>로그아웃</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </div>


                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                setBtn01(!btn01)
                                navigate('/home');
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >

                                    <Home/>
                                </ListItemIcon>
                                <ListItemText primary="홈/대시보드" sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>



                        {
                            btn01 === true ? <>
                                <ListItem disablePadding sx={{display: 'block', borderBottom: "1px solid #ccc"}}
                                          onClick={() => {
                                              setBtn01(true);
                                              navigate('/home/control');
                                          }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >

                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >

                                        </ListItemIcon>
                                        <ListItemText primary="관제 현황" sx={{opacity: open ? 5 : 0}}/>
                                    </ListItemButton>
                                </ListItem>
                            </> : null
                        }

                        {/**
                         청약관리
                         **/}

                        <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                            navigate('/scrip')
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >

                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MapsHomeWork/>
                                </ListItemIcon>
                                <ListItemText primary="청약 관리" sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>


                        {/**
                         고객사관리
                         **/}

                        <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                            setBtn02(!btn02)
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Group/>
                                </ListItemIcon>
                                <ListItemText primary="고객사 관리" sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>


                        {
                            btn02 === true ? <>
                                {(['조직관리', '사용자 관리', '앱설치 관리']).map((row) => (
                                    <ListItem disablePadding sx={{display: 'block', borderBottom: "1px solid #ccc"}}
                                              onClick={() => {
                                                  setBtn02(true)
                                                  if (row === '조직관리') {
                                                      navigate('/customer');
                                                  }
                                                  if (row === '사용자 관리') {
                                                      navigate('/customer/user');
                                                  }
                                                  if (row === '앱설치 관리') {
                                                      navigate('/customer/app');
                                                  }

                                              }} key={row}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >

                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >

                                            </ListItemIcon>
                                            <ListItemText primary={row} sx={{opacity: open ? 5 : 0}}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </> : null
                        }


                        {/**
                         통계분석
                         **/}


                        <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                            setBtn03(!btn03)
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DonutSmall/>
                                </ListItemIcon>
                                <ListItemText primary="통계 분석" sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>


                        {
                            btn03 === true ? <>
                                {(['활동 내역', '조직 별 활용내역']).map((row) => (
                                    <ListItem disablePadding sx={{display: 'block', borderBottom: "1px solid #ccc"}}
                                              onClick={() => {
                                                  setBtn03(true);

                                                  if (row === '활동 내역') {
                                                      navigate('/total');
                                                  }
                                                  if (row === '조직 별 활용내역') {
                                                      navigate('/total/group');
                                                  }
                                              }} key={row}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >

                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >

                                            </ListItemIcon>
                                            <ListItemText primary={row} sx={{opacity: open ? 5 : 0}}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </> : null
                        }


                        {/**
                         환경설정
                         **/}
                        <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                            setBtn04(!btn04)
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MiscellaneousServices/>
                                </ListItemIcon>
                                <ListItemText primary="환경 설정" sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>


                        {
                            btn04 === true ? <>
                                {(['알람 설정 관리', '공지사항 관리']).map((row) => (
                                    <ListItem disablePadding sx={{display: 'block', borderBottom: "1px solid #ccc"}}
                                              onClick={() => {
                                                  setBtn04(true);
                                                  if (row === '알람 설정 관리') {
                                                      navigate('/system/alarm');
                                                  }
                                                  if (row === '공지사항 관리') {
                                                      navigate('/system/notice');
                                                  }

                                              }} key={row}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >

                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >

                                            </ListItemIcon>
                                            <ListItemText primary={row} sx={{opacity: open ? 5 : 0}}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </> : null
                        }
                    </List>
                    <Divider/>
                </Drawer>


                <Box component="main" sx={{flexGrow: 1, p: 0}}>
                    <DrawerHeader/>
                    <Typography>

                        <div className="content">
                            {
                                window.location.pathname === '/home' ? <Dashboard/> : null
                            }
                            {
                                window.location.pathname === '/home/control' ? <DashControl/> : null
                            }

                            {
                                window.location.pathname === '/scrip' ? <SubScription/> : null
                            }
                            {
                                window.location.pathname === '/scripList' ? <ScriptListPage/> : null
                            }


                            {
                                window.location.pathname === '/customer' ? <CustomerGroup/> : null
                            }
                            {
                                window.location.pathname === '/customer/user' ? <CustomerUser/> : null
                            }
                            {
                                window.location.pathname === '/customer/app' ? <CustomerAppDown/> : null
                            }
                            {
                                window.location.pathname === '/total' ? <MakeUseList/> : null
                            }
                            {
                                window.location.pathname === '/total/group' ? <GroupMakeUseList/> : null
                            }

                            {
                                window.location.pathname === '/system/alarm' ? <AlarmSystem/> : null
                            }
                            {
                                window.location.pathname === '/system/alarm/list' ? <AlarmListPage/> : null
                            }
                            {
                                window.location.pathname === '/system/notice' ? <NoticeSystem/> : null
                            }
                            {
                                window.location.pathname === '/system/notice/add' ? <NoticeAdd/> : null
                            }
                            {
                                window.location.pathname === '/system/notice/detail' ? <NoticeEdit/> : null
                            }


                        </div>
                        <Footer/>
                    </Typography>
                </Box>
            </Box>

            <Box sx={{transform: 'translateZ(1)', flexGrow: 1}}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{position: 'absolute', bottom: 25, right: 30}}
                    icon={<img src={logo} alt={"logo"} width="80px"/>}
                    onClick={()=>{
                        navigate('/home');
                    }}
                >
                </SpeedDial>
            </Box>


        </div>
    )
}


export default Sidebars;