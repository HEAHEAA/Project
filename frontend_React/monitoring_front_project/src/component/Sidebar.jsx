import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/img/LOGO.png';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {darkMode} from "../theme/darkThme.jsx";
import {lightMode} from "../theme/lightTheme.jsx";
import PageviewTwoToneIcon from '@mui/icons-material/PageviewTwoTone';
import {RealTimeReloadModal} from "./RealTimeReloadModal.jsx";
import {RealtimeContext} from "../context/realtimeContext.jsx";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SaveIcon from '@mui/icons-material/Save';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import {DashboardContext} from "../context/dashboardContext.jsx";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ResetTvIcon from '@mui/icons-material/ResetTv';


export const Sidebar = () => {
    const {
        dragOpen,setDragOpen,
        handleUpdateLayout,
        handleResetLayout
    } = useContext(DashboardContext);

    const {realTimeModal, handleRealTimeOpen, handleRealTimeClose} = useContext(RealtimeContext);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


    const DrawerList = (
        <Box sx={
            {width: 240, backgroundColor: localStorage.getItem('mode') === 'dark' ? '#282c38' : '#f5f5f5'}
        } role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['대시보드', '데이터 상세조회', '에러 이력 관리'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {
                            if(index === 0){
                                navigate('/');
                            }else if(index === 1){
                                navigate('/realtime');
                            }else if(index ===2){
                                navigate('/errinfo/edit')
                            }
                        }}>
                            <ListItemIcon>
                                {index === 0 ?  <SpaceDashboardIcon/> :(
                                    index === 1 ? <SaveIcon/> : (
                                        index === 2 ? <SmsFailedIcon/> : null
                                    )
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const [anchorEl, setAnchorEl] = useState(null);
    const openTheme = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            {/*모달*/}
            <RealTimeReloadModal open={realTimeModal} handleClose={handleRealTimeClose}/>


            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"
                    sx={{backgroundColor: localStorage.getItem('mode') === 'dark' ? '#2f3243' : '#1c63c2'}}
                >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 5 , marginLeft: 2}} onClick={() => {
                            navigate('/');
                        }}>
                            <img src={logo} alt="logo" className="logo" />
                        </Typography>


                        {
                            dragOpen === false ?<>
                                    <Button variant="contained"
                                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                                            className="edit-display-btn"
                                            id="edit-display-btn"
                                            onClick={()=>{
                                                setDragOpen(true);
                                            }}>
                                        화면편집 &ensp;<FullscreenIcon/>
                                    </Button>

                                    <Button variant="contained"
                                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, marginLeft: 1 }}
                                            color={"secondary"}
                                            className="edit-display-btn"
                                            id="edit-display-btn"
                                            onClick={()=>{
                                                if(window.confirm('레이아웃을 되돌리겠습니까?')){
                                                    handleResetLayout();
                                                    location.reload();
                                                }
                                            }}
                                    >
                                        화면 초기화 &ensp;<ResetTvIcon/>
                                    </Button>
                                </>
                              :
                                <>
                                    <Button variant="contained" color={"success"}
                                            sx={{marginLeft: 2}}
                                            className="edit-display-btn"
                                            onClick={()=>{
                                                if(window.confirm('레이아웃을 수정 하시겠습니까?')){
                                                    handleUpdateLayout();
                                                    location.reload();
                                                    alert('저장 완료');
                                                }
                                            }}>
                                        화면저장 &ensp;<PageviewTwoToneIcon/>
                                    </Button>

                                    <Button variant="contained" color={"error"}
                                            className="edit-display-btn"
                                            sx={{marginLeft: 2}}
                                            onClick={()=>{
                                                setDragOpen(false);
                                            }}>
                                        취소 &ensp;<PageviewTwoToneIcon/>
                                    </Button>
                                </>

                        }

                        &ensp;
                        <div className="realtime-btn-start">
                            <Button variant="contained" color={"warning"}
                                    onClick={()=>{handleRealTimeOpen();}}>
                                실시간 데이터 확인 &ensp;<PageviewTwoToneIcon/>
                            </Button>
                        </div>
                        &ensp;
                        <Button color="inherit" onClick={handleClick}>
                            <Brightness4Icon/>
                        </Button>

                    </Toolbar>
                </AppBar>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openTheme}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        localStorage.setItem('theme', JSON.stringify(lightMode));
                        localStorage.setItem('mode', 'light');
                        location.reload();
                    }}>
                        <div className="theme-light-ex"></div>&nbsp; Light
                    </MenuItem>

                    <MenuItem onClick={()=>{
                        handleClose();
                        localStorage.setItem('theme', JSON.stringify(darkMode));
                        localStorage.setItem('mode', 'dark');
                        location.reload();
                    }}>
                        <div className="theme-dark-ex"></div>&nbsp; Dark
                    </MenuItem>
                </Menu>

            </Box>

            {/*<Button onClick={toggleDrawer(true)}>Open drawer</Button>*/}
            <Drawer open={open} onClose={toggleDrawer(false)} sx={{'& .MuiDrawer-paper': localStorage.getItem('mode') === 'dark' ? '#282c38' : '#f5f5f5',}}>
                {DrawerList}
            </Drawer>
        </div>
    )
}


