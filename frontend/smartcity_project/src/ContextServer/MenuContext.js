import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";

export const MenuContext = createContext({});

export const MenuProvider = ({children}) => {
    const {access, RefreshToken} = useContext(LoginContext);
    const [menu, setMenu] = useState();
    const [mobileMenu,setMobileMenu] = useState();


    const GetMenuSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/page/treeMenu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setMenu(res.data);
            setMobileMenu(res.data);
        })
    };


    return (
        <MenuContext.Provider value={{
            menu, setMenu,
            GetMenuSubmit,
            mobileMenu,setMobileMenu
        }}>
            {children}
        </MenuContext.Provider>
    )
}