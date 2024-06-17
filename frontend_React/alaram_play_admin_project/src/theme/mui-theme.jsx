import {createTheme} from "@mui/material";

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        fontFamily: 'SUITE-Regular',
        fontWeight: 300
    }
});

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'SUITE-Regular',
        fontWeight: 300
    }
});