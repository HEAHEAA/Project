import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useNavigate} from "react-router-dom";

function MobileBottom(){
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    return(
        <div>
            <Box sx={{ position: "fixed", bottom: 10, width: "100%"}}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{backgroundColor: "#f5f5f5", color: "white"}}
                >
                    <BottomNavigationAction label="메뉴" icon={<RestoreIcon />}/>
                    <BottomNavigationAction label="메인" icon={<RestoreIcon />} onClick={()=>{
                        navigate('/home');
                    }}/>
                    <BottomNavigationAction label="로그아웃" icon={<FavoriteIcon />} onClick={()=>{
                        navigate('/');
                    }}/>
                </BottomNavigation>
            </Box>
        </div>
    )
}
export default MobileBottom;