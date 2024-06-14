import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useContext} from "react";
import {SignUpContext} from "../../../../ContextServer/SIgnUpContext";


function UserInfo() {


    const {UserClass, setUserClass} = useContext(SignUpContext);

    const onSelect = (e) => {
        e.preventDefault();
        setUserClass(e.target.value);
    }


    return (
        <div>
            <Typography variant="h6" gutterBottom>
                권한입력
            </Typography>
            <Box sx={{minWidth: 100}}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        권한
                    </InputLabel>
                    <NativeSelect
                        defaultValue={UserClass}
                        onChange={(e) => onSelect(e)}
                    >
                        <option value={4}>일반사용자</option>
                        <option value={3}>담당자</option>
                        <option value={2}>총괄담당자</option>
                        <option value={1}>관리자</option>
                    </NativeSelect>
                </FormControl>
            </Box>
        </div>
    )
}

export default UserInfo;