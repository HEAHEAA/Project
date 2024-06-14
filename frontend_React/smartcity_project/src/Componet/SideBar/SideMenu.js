import {
    CDBSidebar,
    CDBSidebarContent, CDBSidebarFooter,
    CDBSidebarHeader,
} from 'cdbreact';
import {Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import * as Icons01 from "react-icons/bs"

import {LoginContext} from "../../ContextServer/LoginContext";
import {MenuContext} from "../../ContextServer/MenuContext";
import {IoIosLogIn} from "react-icons/io";

function SideMenu() {
    const {LogOut} = useContext(LoginContext);
    const {menu} = useContext(MenuContext);

    const [menuIndex, setMenuIndex] = useState(0);
    const [busMonitor, setBusMonitor] = useState(true);


    //Icon String 변환 이벤트
    const IconStrBackUp = ({name}) => {
        const IconComponent01 = Icons01[name];
        if (!IconComponent01) {
            return <Icons01.BsFillTruckFrontFill/>;
        }
        return <IconComponent01/>
    };


    return (
        <div>
            <div style={window.location.pathname === '/survey/user/home/detail' ? {display: 'none'} : (
                    window.location.pathname === '/survey/user/home' ? {display: 'none'} : (
                        window.location.pathname === '#/survey/user/home' ? {display: 'none'} : (
                            window.location.pathname === '#/survey/user/home/detail' ? {display: 'none'} : (
                                window.location.pathname === '/survey/user/home/detail' ? {display: 'none'} : {display: 'flex'}
                            )
                        )
                    )
                )
            } className="sideBar">
                <div className="sideBar-fixd">
                    <CDBSidebar backgroundColor="#f2efde" toggled={false} className="sideBar-sub">
                        <CDBSidebarHeader className="sidebar-header">
                            <a href="/station/status/map" style={{color: 'inherit'}}>
                                <img src={process.env.PUBLIC_URL + '/img/yesan-logo.png'} alt='yeSan-logo'
                                     className="sidebar-logo" width={140}/><br/>
                            </a>

                            <p className="sidebar-title">중소도시 스마트시티 조성</p>

                        </CDBSidebarHeader>


                        <CDBSidebarContent className="sidebar-content">
                            <Menu>
                                {
                                    menu?.map((b, i) => (
                                        <SubMenu label={b.text}
                                                 icon={<IconStrBackUp name={`${b.icon}`} className="side-icon"/>}
                                                 component={<Link to={b.url}/>} key={b.id} onClick={() => {
                                            setMenuIndex(b.id);
                                        }}
                                                 style={menuIndex === b.id ? {
                                                     color: "black",
                                                     fontWeight: "bold"
                                                 } : {color: "gray",}}
                                        >
                                            {
                                                b.children?.map(function (m, i) {
                                                    return (
                                                        <>

                                                            {
                                                                m.text === '스마트 정류장 모니터링' ?
                                                                    <div>
                                                                        <MenuItem key={b.id}
                                                                            // component={<Link to={m.url}/>}
                                                                                  style={menuIndex === b.id ? {color: "black"} : {color: "gray",}}
                                                                                  onClick={() => {
                                                                                      setBusMonitor(!busMonitor)
                                                                                  }
                                                                                  }>
                                                                            {m.text}
                                                                        </MenuItem>

                                                                        {
                                                                            busMonitor === true ? <>
                                                                                <ul style={{
                                                                                    backgroundColor: "#f2efde",
                                                                                    listStyleType: "none"
                                                                                }}>
                                                                                    <li>
                                                                                        <MenuItem key={b.id}
                                                                                                  component={<Link
                                                                                                      to='/station/all/monitor'/>}
                                                                                                  style={menuIndex === b.id ? {color: "black"} : {color: "gray",}}>
                                                                                            스마트 정류장 전체 모니터링
                                                                                        </MenuItem>
                                                                                    </li>
                                                                                </ul>
                                                                                <ul style={{
                                                                                    backgroundColor: "#f2efde",
                                                                                    listStyleType: "none"
                                                                                }}>
                                                                                    <li>
                                                                                        <MenuItem key={b.id}
                                                                                                  component={<Link
                                                                                                      to={m.url}/>}
                                                                                                  style={menuIndex === b.id ? {color: "black"} : {color: "gray",}}>
                                                                                            스마트 정류장 세부 모니터링
                                                                                        </MenuItem>
                                                                                    </li>
                                                                                </ul>
                                                                            </> : null
                                                                        }


                                                                    </div>

                                                                    :

                                                                    <MenuItem key={b.id} component={<Link to={m.url}/>}
                                                                              style={menuIndex === b.id ? {color: "black"} : {color: "gray",}}>
                                                                        {m.text}
                                                                    </MenuItem>

                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </SubMenu>
                                    ))
                                }
                            </Menu>
                            <CDBSidebarFooter style={{textAlign: 'center'}}>
                                <div className="sidebar-LogOut">
                                    <button onClick={LogOut}>
                                        <p>로그아웃 <IoIosLogIn style={{fontSize: 18}}/></p>
                                    </button>
                                </div>
                            </CDBSidebarFooter>
                        </CDBSidebarContent>
                    </CDBSidebar>
                </div>
            </div>
        </div>
    )
}


export default SideMenu;