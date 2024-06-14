import {useContext, useEffect, useState} from "react";
import {ControlContext} from "../../../../../ContextServer/ControlContext";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import {TablePagination} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import DiDFileDelete from "./Modal/Control01/DiDFileDelete";
import DIDNewModal from "./Modal/Control01/DIDNewModal";
import {BsFillTrashFill} from "react-icons/bs";
import {AiFillPlaySquare} from "react-icons/ai";
import NewPlayListModal from "../Tab02/Modal/NewPlayListModal";
import {AiOutlinePlayCircle} from "react-icons/ai";
import {ImDownload3} from "react-icons/im";
import FileUsePopUp from "./Modal/FileUsePopUp";
import {TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function FileList() {
    const {
        checkItem,
        setCheckItem,
        didList,
        GetDIDList,
        setDeleteId,
        setDeleteFileName,
        checkId,
        setCheckId,
        setPlayFileName,
        setPlayFileId,
        GetDIDFileGetCircle,
        PlayBtn,
        fileUpdate,
        setFileUpdate,
        fileUpdateLoading,
        setFileUpdateLoading
    } = useContext(ControlContext);


    const [fileUse, setFileUse] = useState(false);
    const handleFileOpen = () => {
        setFileUse(true);
    };
    const handleFileClose = () => {
        setFileUse(false);
    };


    //페이징처리함수
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //신규모달오픈이벤트
    const [open, setOpen] = useState(false);
    const handleNewOpen = () => {
        setOpen(true);
    };
    const handleNewClose = () => {
        setOpen(false);
    };

    //수정모달오픈이벤트
    const [modal, setModal] = useState(false);
    const handleOpen = () => {
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };


    //신규재생표출
    const [openPlay, setOpenPlay] = useState(false);
    const handleOpenPlay = () => {
        setOpenPlay(true)
    };
    const handleClosePlay = () => {
        setOpenPlay(false)
    };


    //did Get List
    useEffect(() => {
        GetDIDList();
    }, []);


    //전체 선택 체크박스 (타이틀값)
    const handleAllCheckBox = (checked) => {
        if (checked) {
            const idArray = [];
            didList.forEach((el) => idArray.push(el.origin_fileName));
            setCheckItem(idArray)
        } else {
            setCheckItem([]);
        }
    }

    //전체 선택 체크박스 (아이디값)
    const handleAllCheckID = (checked) => {
        if (checked) {
            const idArray = [];
            didList.forEach((el) => idArray.push(el.idx));
            setCheckId(idArray)
        } else {
            setCheckId([]);
        }
    }

    //단일 선택 체크박스(타이틀값)
    const handleSingleCheckbox = (checked, id) => {
        if (checked) {
            //단일 선택시 체크된 아이템을 배열에추가
            setCheckItem(prev => [...prev, id]);
        } else {
            setCheckItem(checkItem.filter((el) => el !== id))
        }
    };

    //단일 선택 체크박스(아이디값)
    const handleSingleCheckId = (checked, id) => {
        if (checked) {
            setCheckId(prev => [...prev, id]);
        } else {
            setCheckId(checkId.filter((el) => el !== id))
        }
    };


    useEffect(() => {
        GetDIDFileGetCircle();
    }, [PlayBtn]);


    return (
        <div>
            <DiDFileDelete
                modal={modal}
                handleClose={handleClose}
            />
            <DIDNewModal
                open={open}
                handleNewClose={handleNewClose}
            />

            <NewPlayListModal
                open={openPlay}
                handleClose={handleClosePlay}
            />

            <FileUsePopUp fileUse={fileUse} handleFileOpen={handleFileOpen} handleFileClose={handleFileClose}/>


            <Button variant="contained" style={{float: "right"}} sx={{marginBottom: 2, color: "white"}} onClick={() => {
                handleNewOpen();
                setFileUpdate(false);
                setFileUpdateLoading(true);
            }} color={"info"}>
                파일업로드<ImDownload3 style={{fontSize: 21, paddingLeft: 5}}/>
            </Button>


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
                <Table sx={{minWidth: 700}} aria-label="simple table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell size={"small"}>
                                <Checkbox type="checkbox" name="select-all"
                                          onChange={(e) => {
                                              handleAllCheckBox(e.target.checked);
                                              handleAllCheckID(e.target.checked);
                                          }}
                                          defaultChecked={true}
                                          checked={checkItem.length === didList.length}
                                          size={"small"}
                                />
                            </TableCell>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>재생</TableCell>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>파일명</TableCell>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>업로드일시</TableCell>
                            <TableCell size={"small"} align={"center"} style={TextWhite}>파일삭제</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            didList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a, i) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + i} className="tableHover">
                                            <TableCell style={{width: 20, backgroundColor:TableCells.backgroundColor, color: TableCells.color}} >
                                                <Checkbox
                                                    type="checkbox" className="station-checkbox"
                                                    id={`${a.origin_fileName}`}
                                                    name={`select-${a.origin_fileName}`}
                                                    onChange={(e) => {
                                                        handleSingleCheckbox(e.target.checked, a.origin_fileName);
                                                        handleSingleCheckId(e.target.checked, a.idx);
                                                    }}
                                                    checked={!!checkItem.includes(a.origin_fileName)}
                                                    size={"small"}
                                                />
                                            </TableCell>
                                            <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor, color: TableCells.color}} align={"center"}>
                                                <Button onClick={() => {
                                                    setPlayFileId(a.idx);
                                                    setPlayFileName(a.upload_fileName);
                                                    GetDIDFileGetCircle();
                                                }}>
                                                    미리보기
                                                    <AiFillPlaySquare fontSize={20}/>

                                                </Button>
                                            </TableCell>
                                            <TableCell style={{width: 300,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}
                                                       align={"center"}>{a.origin_fileName}</TableCell>
                                            <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}
                                                       align={"center"}>{a.reg_date}</TableCell>
                                            <TableCell style={{width: 20,backgroundColor:TableCells.backgroundColor, color: TableCells.color}}
                                                       align={"center"}>
                                                <Button onClick={() => {
                                                    setDeleteId(a.idx);
                                                    setDeleteFileName(a.origin_fileName);
                                                    handleOpen();
                                                }} color={"error"}>
                                                    삭제
                                                    <BsFillTrashFill/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 100]}
                component="div"
                count={didList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{width: "100%", backgroundColor: "#1c63c2",color:"white"}}
            />

            <Button variant="outlined" color={"inherit"} onClick={() => {
                if (checkItem.length === 0) {
                    handleFileOpen();
                } else {
                    handleOpenPlay();
                }
            }} sx={{float: "left", width: "150px", marginTop: 1}}>
                재생관리<AiOutlinePlayCircle/>
            </Button>

        </div>
    )
}

export default FileList;