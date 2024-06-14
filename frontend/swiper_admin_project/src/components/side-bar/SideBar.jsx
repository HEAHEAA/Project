import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../../_style/sidebar/sidebar.css';
import {useContext, useEffect, useState} from "react";
import {indigo} from "@mui/material/colors";
import logo from '../../assets/image/donghae-logo.png';
import logoWhite from '../../assets/image/donghae-logo-white-ver.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
    ArticleTwoTone,
    BadgeTwoTone,
    BookmarksTwoTone, CameraRollTwoTone, DragHandle, ExitToApp, FormatColorText,
    ImportContactsTwoTone,
    LaptopChromebookTwoTone,
    LiveTvTwoTone, Widgets
} from "@mui/icons-material";
import InnerContent from "../../route/InnerContent.jsx";
import {useNavigate} from "react-router-dom";
import Logout from "./Logout.jsx";
import CampaignIcon from '@mui/icons-material/Campaign';
import Button from "@mui/material/Button";
import {LoginContext} from "../../context/login/LoginContext.jsx";

const drawerWidth = 240;

function SideBar() {
    const {LogoutOnSubmit} = useContext(LoginContext);

    const [Menus, setMenus] = useState([
        {
            id: 1,
            menu: "Dashboard",
        },
        {
            id: 2,
            menu: "공지사항"
        },
        {
            id: 2 - 1,
            menu: "알림사항"
        },
        {
            id: 2 - 2,
            menu: "금주 주요일정"
        },
        {
            id: 3,
            menu: "우수사원/시상식"
        },
        {
            id: 4,
            menu: "낙찰/입찰"
        },
        {
            id: 5,
            menu: "소식뉴스"
        },
        {
            id: 6,
            menu: "문화 소식"
        },
        {
            id: 6 - 1,
            menu: "동해그룹 소식"
        },
        {
            id: 7,
            menu: "권한 관리"
        },
        {
            id: 8,
            menu: "화면 편집"
        },
    ]);
    const [noticeSubMenu, setNoticeSubMenu] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user-role') === "1") {
            setMenus([
                {
                    id: 1,
                    menu: "Dashboard"
                },
                {
                    id: 2,
                    menu: "공지사항"
                },
                {
                    id: 3,
                    menu: "우수사원/시상식"
                },
                {
                    id: 4,
                    menu: "낙찰/입찰"
                },
                {
                    id: 5,
                    menu: "소식뉴스"
                },
                {
                    id: 6,
                    menu: "문화소식"
                },
                {
                    id: 9,
                    menu: "동해그룹 소식"
                },
                {
                    id: 7,
                    menu: "권한 관리"
                },
                {
                    id: 8,
                    menu: "화면 편집"
                },
            ])
        } else if (localStorage.getItem('user-role') === "2") {
            setMenus([
                {
                    id: 1,
                    menu: "Dashboard"
                },
                {
                    id: 4,
                    menu: "낙찰/입찰"
                },
                {
                    id: 8,
                    menu: "화면 편집"
                },
            ])
        } else if (localStorage.getItem('user-role') === "3") {
            setMenus([
                {
                    id: 1,
                    menu: "Dashboard"
                },
                {
                    id: 2,
                    menu: "공지사항"
                },
                {
                    id: 3,
                    menu: "우수사원/시상식"
                },
                {
                    id: 8,
                    menu: "화면 편집"
                },
            ])
        } else if (localStorage.getItem('user-role') === "4") {
            setMenus([
                {
                    id: 1,
                    menu: "Dashboard"
                },
                {
                    id: 2,
                    menu: "공지사항"
                },
                {
                    id: 8,
                    menu: "화면 편집"
                },
            ])
        }
    }, []);

    const navigate = useNavigate();
    const [menuId, setMenuId] = useState(1);

    //메뉴 호버 시, 스타일 이벤트 함수
    const menuStyle = {
        target: {
            color: indigo[50],
        },
        nonTarget: {
            color: indigo[300]
        }
    }

    /*모바일 메뉴바*/
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{width: 250}} role="presentation">
            <List>
                {Menus.map((arr, inx) => (
                    <div>
                        <ListItem key={arr.id} disablePadding
                                  onClick={() => {
                                      if (arr.id === 1) {
                                          navigate('/dashboard');
                                          setOpen(false);
                                      } else if (arr.id === 2) {
                                          setNoticeSubMenu(!noticeSubMenu);
                                          setOpen(true);
                                      } else if (arr.id === 3) {
                                          navigate('/excellent');
                                          setOpen(false);
                                      } else if (arr.id === 4) {
                                          navigate('/bid');
                                          setOpen(false);
                                      } else if (arr.id === 5) {
                                          navigate('/news');
                                          setOpen(false);
                                      } else if (arr.id === 6) {
                                          navigate('/book');
                                          setOpen(false);
                                      } else if (arr.id === 7) {
                                          navigate('/client');
                                          setOpen(false);
                                      } else if (arr.id === 8) {
                                          navigate('/dashboard-edit');
                                          setOpen(false);
                                      } else if (arr.id === 9) {
                                          navigate('/group-news');
                                          setOpen(false);
                                      }
                                  }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {
                                        arr.id === 1 ? <LaptopChromebookTwoTone/> : (
                                            arr.id === 2 ? <ArticleTwoTone/> : (
                                                arr.id === 3 ? <BadgeTwoTone/> : (
                                                    arr.id === 4 ? <BookmarksTwoTone/> : (
                                                        arr.id === 5 ? <LiveTvTwoTone/> : (
                                                            arr.id === 6 ? <ImportContactsTwoTone/> : (
                                                                arr.id === 7 ? <CameraRollTwoTone/> : (
                                                                    arr.id === 8 ? <FormatColorText/> : (
                                                                        arr.id === 9 ? <CampaignIcon/> : null
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    }
                                </ListItemIcon>
                                <ListItemText primary={arr.menu}/>
                            </ListItemButton>
                            {
                                arr.id === 2 && noticeSubMenu === true ? <ArrowDropDownIcon/> : (
                                    arr.id === 2 && noticeSubMenu === false ?
                                        <ArrowRightIcon/> : null
                                )
                            }
                        </ListItem>
                        {
                            arr.id === 2 && noticeSubMenu === true ? <>
                                <ListItem sx={{
                                    width: '80%',
                                    marginLeft: '20%',
                                    cursor: "pointer",
                                    color: "black"
                                }} onClick={() => {
                                    navigate('/notice/alarm');
                                    setOpen(false);
                                }}>
                                    알림 사항
                                </ListItem>
                                <ListItem sx={{
                                    width: '80%',
                                    marginLeft: '20%',
                                    cursor: "pointer",
                                    color: "black"
                                }} onClick={() => {
                                    navigate('/notice/schedule');
                                    setOpen(false);
                                }}>
                                    금주 주요일정
                                </ListItem>
                            </> : null
                        }
                    </div>
                ))}
            </List>
            <Divider/>
            <ListItem disablePadding onClick={()=>{
                LogoutOnSubmit();
                navigate('/');
            }}>
                <ListItemButton>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="로그아웃" />
                </ListItemButton>
            </ListItem>
        </Box>
    );
    return (
        <div>
            {/*모바일 메뉴바*/}
            <div className="mobile-menu">
                <div className="mobile-menu-top-bar">
                    <Button onClick={toggleDrawer(true)}>
                        <Widgets className="mobile-menu-toggle-btn"/>
                    </Button>
                    <img src={logoWhite} alt="logo"/>
                </div>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </div>

            {/*pc 메뉴바*/}
            <div className="pc-menu">
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="fixed" color="inherit" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                        <Toolbar>

                            <div style={{float: "left"}}>
                                <Typography variant="h6" noWrap component="div">
                                    <img src={logo} className="header-logo" alt="header-logo" onClick={() => {
                                        navigate('/dashboard')
                                    }}/>
                                </Typography>
                            </div>

                            <Logout/>
                        </Toolbar>
                    </AppBar>

                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                backgroundColor: indigo[600]
                            },

                        }}
                    >
                        <Toolbar/>
                        <Box sx={{overflow: 'auto'}}>
                            <List sx={{color: indigo[50]}}>
                                {
                                    Menus.map((arr) => (
                                        <>
                                            <ListItem disablePadding onClick={() => {
                                                setMenuId(arr.id);

                                                if (arr.id === 1) {
                                                    navigate('/dashboard');
                                                } else if (arr.id === 2) {
                                                    setNoticeSubMenu(!noticeSubMenu);
                                                } else if (arr.id === 3) {
                                                    navigate('/excellent');
                                                } else if (arr.id === 4) {
                                                    navigate('/bid');
                                                } else if (arr.id === 5) {
                                                    navigate('/news');
                                                } else if (arr.id === 6) {
                                                    navigate('/book')
                                                } else if (arr.id === 7) {
                                                    navigate('/client');
                                                } else if (arr.id === 8) {
                                                    navigate('/dashboard-edit');
                                                } else if (arr.id === 9) {
                                                    navigate('/group-news');
                                                }
                                            }} key={arr.id}>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {
                                                            arr.id === 1 ? <LaptopChromebookTwoTone
                                                                sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                arr.id === 2 ?
                                                                    <ArticleTwoTone className="hover-menu-button"
                                                                                    sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                        arr.id === 3 ?
                                                                            <BadgeTwoTone className="hover-menu-button"
                                                                                          sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                                arr.id === 4 ? <BookmarksTwoTone
                                                                                    className="hover-menu-button"
                                                                                    sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                                    arr.id === 5 ? <LiveTvTwoTone
                                                                                        className="hover-menu-button"
                                                                                        sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                                        arr.id === 6 ? <ImportContactsTwoTone
                                                                                            className="hover-menu-button"
                                                                                            sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                                            arr.id === 7 ? <CameraRollTwoTone
                                                                                                className="hover-menu-button"
                                                                                                sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                                                arr.id === 8 ? <FormatColorText
                                                                                                    className="hover-menu-button"
                                                                                                    sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : (
                                                                                                    arr.id === 9 ? <CampaignIcon
                                                                                                        className="hover-menu-button"
                                                                                                        sx={arr.id === menuId ? menuStyle.target : menuStyle.nonTarget}/> : null
                                                                                                )
                                                                                            )
                                                                                        )
                                                                                    )
                                                                                )
                                                                            )
                                                                    )
                                                            )
                                                        }
                                                    </ListItemIcon>
                                                    <ListItemText primary={arr.menu} className="hover-menu-button" sx={
                                                        arr.id === menuId ? menuStyle.target : menuStyle.nonTarget
                                                    }/>
                                                </ListItemButton>

                                                {
                                                    arr.id === 2 && noticeSubMenu === true ? <ArrowDropDownIcon/> : (
                                                        arr.id === 2 && noticeSubMenu === false ?
                                                            <ArrowRightIcon/> : null
                                                    )
                                                }

                                            </ListItem>

                                            {
                                                arr.id === 2 && noticeSubMenu === true ? <>

                                                    <ListItem sx={{
                                                        width: '80%',
                                                        marginLeft: '20%',
                                                        cursor: "pointer",
                                                        color: "white"
                                                    }} onClick={() => {
                                                        navigate('/notice/alarm');
                                                    }}>
                                                        알림 사항
                                                    </ListItem>
                                                    <ListItem sx={{
                                                        width: '80%',
                                                        marginLeft: '20%',
                                                        cursor: "pointer",
                                                        color: "white"
                                                    }} onClick={() => {
                                                        navigate('/notice/schedule');
                                                    }}>
                                                        금주 주요일정
                                                    </ListItem>
                                                </> : null
                                            }


                                        </>
                                    ))
                                }
                            </List>


                            <Divider/>
                        </Box>
                    </Drawer>

                    <Box component="main" sx={{flexGrow: 1, p: 0}}>
                        <div className="web-contents">
                            <InnerContent/>
                        </div>
                    </Box>
                </Box>
            </div>


            <Box component="main" sx={{flexGrow: 1, p: 0}}>
                <div className="mobile-contents">
                    <InnerContent/>
                </div>
            </Box>


        </div>


    )
}

export default SideBar;
