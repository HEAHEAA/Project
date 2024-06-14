import playNull from '../../../../assets/img/playNull.png';
import {Button, Table, TableCell, TableContainer, TableRow, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import DeleteModal from "./modal/DeleteModal.jsx";
import {FileListContext} from "../../../../api/FileList/FileListContext.jsx";

function FilePlayPage() {
    const {singleFile, mediaURL, mediaType} = useContext(FileListContext)


    //1. 삭제 모달
    const [DeleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);

    return (
        <div className="file-play-content">
            <DeleteModal open={DeleteOpen} handleClose={handleDeleteClose}/>

            {
                mediaType === 'image' ?
                    <div className="dis-content-img02">
                        <div className="dis-content-img-div02">
                            <img src={mediaURL} alt="Media"/>
                        </div>
                    </div>
                    : (
                        mediaType === 'video' ?
                            <div className="dis-content-img02">
                                <div className="dis-content-img-div02">
                                    <video controls className="media-video" muted autoPlay loop key={mediaURL}>
                                        <source src={mediaURL} type="video/mp4"/>
                                    </video>
                                </div>
                            </div>
                            :
                            <div className="file-play">
                                <p>
                                    <img src={playNull} alt="img-null"/> <br/>
                                    재생 할 파일을 선택해주세요 !
                                </p>
                            </div>
                    )
            }


            <div className="file-update">
                <div className="file-update-title">
                    <h4>파일정보</h4>
                </div>

                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                <h4 style={{textAlign: "center"}}>파일명</h4>
                            </TableCell>
                            <TableCell style={{width: "80%"}} size={"small"}>
                                <TextField id="outlined-basic"
                                           label=""
                                           variant="outlined"
                                           value={singleFile.upload_fileName}
                                           fullWidth
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                <h4 style={{textAlign: "center"}}>파일이름</h4>
                            </TableCell>
                            <TableCell style={{width: "80%"}} size={"small"}>
                                <TextField id="outlined-basic"
                                           label=""
                                           variant="outlined"
                                           value={singleFile.origin_fileName}
                                           fullWidth
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                <h4 style={{textAlign: "center"}}>Type</h4>
                            </TableCell>
                            <TableCell style={{width: "80%"}} size={"small"}>
                                <TextField id="outlined-basic"
                                           label=""
                                           variant="outlined"
                                           value={singleFile.upload_fileName?.substring(singleFile.upload_fileName.indexOf('.'))}
                                           fullWidth
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                <h4 style={{textAlign: "center"}}>업로드 일</h4>
                            </TableCell>
                            <TableCell style={{width: "80%"}} size={"small"}>
                                <TextField id="outlined-basic"
                                           label=""
                                           variant="outlined"
                                           value={singleFile.reg_date}
                                           fullWidth
                                />
                            </TableCell>
                        </TableRow>

                    </Table>
                </TableContainer>

                <Button variant="contained" color={"error"} onClick={() => {
                    handleDeleteOpen()
                }}>파일삭제</Button>
            </div>

        </div>
    )
}

export default FilePlayPage;