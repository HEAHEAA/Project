import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {ControlContext} from "../../../../ContextServer/ControlContext";
import {AppBar, CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";
import {DetailPageBg} from "../../../../Componet/style-config/light-theme";


function CoContent06() {
    const {
        mediaURL,
        mediaType,
        PlayBtn02,
        GetDIDFileGetCircle,
        PlayBtn,
        playNum,setPlayNum,
        fileArr,
        PlayListCircleList,
    } = useContext(ControlContext);
    useEffect(() => {
        GetDIDFileGetCircle();
    }, PlayBtn);

    const navigate = useNavigate();
    const GoCo = () => {
        navigate('/station/did');
    }


    if (PlayBtn === true) {
        return (
            <>
                <AppBar style={DetailPageBg}>
                    <div style={{"fontSize": 40, textAlign: "right", marginTop: "1vh", marginBottom: "1vh"}} onClick={GoCo}>
                        <Button variant="contained">닫기</Button>
                    </div>
                    <>
                        {mediaType === 'image' ? (
                            <img
                                src={mediaURL}
                                alt="Media"
                                width={"100%"} height={851}
                            />
                        ) : mediaType === 'video' ? (
                            <>
                                <video controls width={"100%"} height={874} className="media-video">
                                    <source src={mediaURL} type="video/mp4"/>
                                </video>
                            </>
                        ) : (
                            <p>재생하고싶은 목록을 클릭해주세요. <br/></p>
                        )}

                    </>
                </AppBar>
            </>
        )
    } else if (PlayBtn02 === true) {
        return (
            <>
                <AppBar style={DetailPageBg}>
                    <div style={{"fontSize": 40, textAlign: "right", marginTop: "1vh", marginBottom: "1vh"}} onClick={GoCo}>
                        <Button variant="contained">닫기</Button>
                    </div>

                    {mediaType === 'image' ? (
                        <div style={{marginTop: "4vh"}}>
                            <img src={mediaURL} alt="Media" width={"800px"} height={"600px"}/>
                            <br/>
                            <p style={{paddingTop: "5vh"}}>{playNum+1}/{fileArr.length}</p>
                        </div>


                    ) : mediaType === 'video' ? (
                        <>
                            <div style={{marginTop: "4vh"}}>
                                <video controls width={"100%"} height={"600px"} className="media-video">
                                    <source src={mediaURL} type="video/mp4"/>
                                </video>

                                <p style={{paddingTop: "5vh"}}>{playNum+1}/{fileArr.length}</p>
                            </div>
                        </>
                    ) : (
                        <div><CircularProgress/></div>
                    )}

                    <Button variant="outlined" onClick={()=>{
                        if(fileArr.length-1 > playNum){
                            setPlayNum(playNum+1);
                            PlayListCircleList();
                        }

                        if(fileArr.length-1 === playNum){
                            setPlayNum(0);
                            PlayListCircleList();
                        }

                        if(fileArr.length-1 < playNum){
                            setPlayNum(playNum-1);
                            PlayListCircleList();
                        }
                    }}>
                        다음페이지
                    </Button>

                </AppBar>

            </>
        )
    }
}

export default CoContent06;










