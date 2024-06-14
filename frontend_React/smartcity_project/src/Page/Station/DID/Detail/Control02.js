import {useContext, useEffect} from "react";
import {ControlContext} from "../../../../ContextServer/ControlContext";
import {CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";


function Control02() {
    const {
        mediaURL,
        mediaType,
        PlayBtn02,
        setPlayBtn02,
        PlayBtn,
        setPlayBtn,
        playNum, setPlayNum,
        fileArr,
        PlayListCircleList,
    } = useContext(ControlContext);


    if (PlayBtn === true) {
        setPlayBtn02(false);
        return (
            <>
                <>
                    {mediaType === 'image' ? (
                        // <img src={mediaURL} alt="Media" width={"100%"} height={"700px"}/>
                        <img src={mediaURL} alt="Media" width={"100%"} height={"700px"}/>
                    ) : mediaType === 'video' ? (
                        <>
                            <video controls width={"100%"} height={"700px"} className="media-video">
                                <source src={mediaURL} type="video/mp4"/>
                            </video>
                        </>
                    ) : (
                        <div><CircularProgress/></div>
                    )}

                </>
            </>
        )
    }


    if (PlayBtn02 === true) {
        setPlayBtn(false);
        return (
            <>
                <Button variant="contained" fullWidth onClick={() => {
                    if (fileArr.length - 1 > playNum) {
                        setPlayNum(playNum + 1);
                        PlayListCircleList();
                    }

                    if (fileArr.length - 1 === playNum) {
                        setPlayNum(0);
                        PlayListCircleList();
                    }

                    if (fileArr.length - 1 < playNum) {
                        setPlayNum(playNum - 1);
                        PlayListCircleList();
                    }
                }} sx={{marginTop: -4, zIndex: 9999999999, position: "relative"}}>
                    다음페이지
                </Button>


                {mediaType === 'image' ? (
                    <div style={{marginTop: "4vh"}}>
                        <img src={mediaURL} alt="Media" width={"100%"} height={"600px"}/>
                        <br/>
                        <p style={{paddingTop: "5vh"}}>{playNum + 1}/{fileArr.length}</p>
                    </div>


                ) : mediaType === 'video' ? (
                    <>
                        <div style={{marginTop: "4vh"}}>
                            <video controls width={"100%"} height={"600px"} className="media-video">
                                <source src={mediaURL} type="video/mp4"/>
                            </video>

                            <p style={{paddingTop: "5vh"}}>{playNum + 1}/{fileArr.length}</p>
                        </div>
                    </>
                ) : (
                    <div><CircularProgress/></div>
                )}


            </>
        )
    }
}

export default Control02;











