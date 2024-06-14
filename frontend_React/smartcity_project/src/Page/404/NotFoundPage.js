import {AppBar} from "@mui/material";

function NotFoundPage() {
    return (
        <div>
            <AppBar sx={{width: "100%", height: "100vh", backgroundColor: "white"}}>
                <h1 style={{color : "black"}}> 404 </h1>
                <hr/>
                <p style={{color : "black"}}>찾을수 없는 페이지 입니다.</p>
            </AppBar>

        </div>
    )
}

export default NotFoundPage;