import {useContext} from "react";
import {ControlContext} from "../../../../../ContextServer/ControlContext";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import Button from "@mui/material/Button";
import {AiFillPlaySquare} from "react-icons/ai";
import PlayListUpdate from "./Modal/PlayListUpdate";
import {TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function PlayList() {
    const {
        playList, setUploadFileName, setUploadFileId, PlayListCircleList, GetEditPlayID, setDeletePlayId, DeletePlayEm,PlayFileId, setPlayFileId
    } = useContext(ControlContext);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <PlayListUpdate open={open} handleClose={handleClose}/>
            <TableContainer style={{cursor: "default"}} sx={{
                "&::-webkit-scrollbar": {
                    width: 10,
                    height: 10,
                    cursor: "default"
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "#565656",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#282828",
                    borderRadius: 0
                }
            }}>
                <Table sx={{minWidth: 1080}} aria-label="simple table">
                    <TableHead style={TableHeader}>
                        <TableCell align={"left"} style={TextWhite}>재생</TableCell>
                        <TableCell align={"left"} style={TextWhite}>제목</TableCell>
                        <TableCell align={"left"} style={TextWhite}>내용</TableCell>
                        <TableCell align={"left"} style={TextWhite}>게시시작</TableCell>
                        <TableCell align={"left"} style={TextWhite}>게시종료</TableCell>
                        <TableCell align={"left"} style={TextWhite}>수정</TableCell>
                        <TableCell align={"left"} style={TextWhite}>삭제</TableCell>
                    </TableHead>
                    <TableBody>

                        {
                            playList.map(function (arr, inx) {
                                return (
                                    <TableRow key={arr.pm_idx}>
                                        <TableCell style={{width: 10,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>
                                            <Button onClick={() => {
                                                setUploadFileId(arr.pm_idx);
                                                setUploadFileName(arr.pm_upload_name);
                                                PlayListCircleList();
                                            }}>
                                                재생<AiFillPlaySquare fontSize={20}/>
                                            </Button>
                                        </TableCell>

                                        <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>{arr.pm_title}</TableCell>
                                        <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>{arr.pm_content}</TableCell>
                                        <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>{arr.pm_start}</TableCell>
                                        <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>{arr.pm_end}</TableCell>

                                        <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>
                                            <Button variant="contained" size={"small"} onClick={() => {
                                                GetEditPlayID(arr.pm_idx);
                                                handleOpen();
                                            }}>
                                                수정
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}>
                                            <Button variant="contained" color={"error"} onClick={() => {
                                                setDeletePlayId(arr.pm_idx);
                                                if (window.confirm('재생목록 을 삭제할 시 파일도 함께 삭제가 됩니다. 삭제하시겠습니까?')) {
                                                    DeletePlayEm();
                                                    handleClose();
                                                    alert('삭제가 완료 되었습니다.');
                                                }
                                            }}>
                                                삭제
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    )
}

export default PlayList;