import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu.js";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AppBar} from "@mui/material";
import {Clear, DonutSmall, Group, Home, MapsHomeWork, MiscellaneousServices} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Dashboard from "../../pages/dashboard/HomeDash/Dashboard.jsx";
import DashControl from "../../pages/dashboard/HomeControl/DashControl.jsx";
import SubScription from "../../pages/subscription/main/SubScription.jsx";
import CustomerGroup from "../../pages/customer/group/CustomerGroup.jsx";
import CustomerUser from "../../pages/customer/user/CustomerUser.jsx";
import CustomerAppDown from "../../pages/customer/appDownload/CustomerAppDown.jsx";
import MakeUseList from "../../pages/total/makeUse/MakeUseList.jsx";
import GroupMakeUseList from "../../pages/total/groupMakeUse/GroupMakeUseList.jsx";
import AlarmSystem from "../../pages/system/alarm/AlarmSystem.jsx";
import NoticeSystem from "../../pages/system/notice/NoticeSystem.jsx";

function MobileTopBar() {
    const navigate = useNavigate();

    const [menuBar,setMenuBar] = useState(false); //메뉴
    const [btn01, setBtn01] = useState(false); //청약
    const [btn02, setBtn02] = useState(false); //고객사
    const [btn03, setBtn03] = useState(false); // 통계분석
    const [btn04, setBtn04] = useState(false); //환경 설정

    return (
        <div>
            <Box sx={{display: 'flex', width: "100%", height: "10vh"}}>
                <CssBaseline/>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={()=>{
                                setMenuBar(!menuBar);
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{width: '90%', textAlign: "center"}}>
                            비대면 공동업무 시스템
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            {
                menuBar === true ?
                    <List sx={{marginTop: 0}}>
                        <ListItem disablePadding sx={{display: 'block'}}
                                  onClick={() => {
                                      setBtn01(!btn01);
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
                                              setMenuBar(false);
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
                            navigate('/scrip');
                            setMenuBar(false);
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
                            navigate('/customer');
                            setBtn02(!btn02);
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
                                                      setMenuBar(false);
                                                  }
                                                  if (row === '사용자 관리') {
                                                      navigate('/customer/user');
                                                      setMenuBar(false);
                                                  }
                                                  if (row === '앱설치 관리') {
                                                      navigate('/customer/app');
                                                      setMenuBar(false);
                                                  }

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
                            navigate('/total');
                            setBtn03(!btn03);
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
                                                      setMenuBar(false);
                                                  }
                                                  if (row === '조직 별 활용내역') {
                                                      navigate('/total/group');
                                                      setMenuBar(false);
                                                  }
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
                            navigate('/system');
                            setBtn04(!btn04);
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
                                                      navigate('/system');
                                                      setMenuBar(false);
                                                  }
                                                  if (row === '공지사항 관리') {
                                                      navigate('/system/notice');
                                                      setMenuBar(false);
                                                  }

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
                                            <ListItemText primary={row} sx={{opacity: open ? 5 : 0}}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </> : null
                        }


                    </List> : null
            }


            <Box component="main" sx={{flexGrow: 1, p: 0}}>
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
                            window.location.pathname === '/system' ? <AlarmSystem/> : null
                        }
                        {
                            window.location.pathname === '/system/notice' ? <NoticeSystem/> : null
                        }
                    </div>
                </Typography>
            </Box>
        </div>
    )
}

export default MobileTopBar;