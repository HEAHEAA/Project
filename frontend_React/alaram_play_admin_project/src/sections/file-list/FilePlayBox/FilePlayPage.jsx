import playNull from '../../../assets/img/playNull.png';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {useContext, useState} from "react";
import DeleteModal from "./modal/DeleteModal.jsx";
import {FileContext} from "../../../context/FileContext.jsx";
import {SingleFileLoad} from "../../../hooks/sections/file/UseFilePreview.jsx";

function FilePlayPage() {
    const {singleFile, setSingleFile} = useContext(FileContext);

    //1. 삭제 모달
    const [DeleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);

    return (
        <div className="file-play-content">
            <DeleteModal open={DeleteOpen} handleClose={handleDeleteClose}/>

            <SingleFileLoad singleFile={singleFile}/>

            <div className="file-update">
                <div className="file-update-title">
                    <h4>파일정보</h4>
                </div>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>파일명</h4>
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
                                    <h4 style={{textAlign: "center"}}>파일이름</h4>
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
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color={"error"} onClick={() => {
                    handleDeleteOpen();
                }}>파일삭제</Button>
            </div>
        </div>
    )
}

export default FilePlayPage;