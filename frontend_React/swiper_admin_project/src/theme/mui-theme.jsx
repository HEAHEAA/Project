import {createTheme} from "@mui/material";

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'LINE-KR-Rg',
        fontWeight: 300
    }
});

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'LINE-KR-Rg',
        fontWeight: 300
    }
});

