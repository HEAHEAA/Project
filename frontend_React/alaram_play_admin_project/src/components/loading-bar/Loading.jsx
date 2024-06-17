import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

function Loading(){
    const loadingStyle = {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        textAlign: "center"
    }

    return(
        <div style={loadingStyle}>
            <Box sx={{ display: 'flex',marginLeft: 140, marginTop: 30}}>
                <CircularProgress size={'20%'} />
            </Box>
            <h1>잠시만 기다려 주세요.</h1>
        </div>
    )
}
export default Loading;