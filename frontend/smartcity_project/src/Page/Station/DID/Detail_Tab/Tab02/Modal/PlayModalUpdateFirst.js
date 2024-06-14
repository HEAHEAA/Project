import {useContext, useEffect} from "react";
import {ControlContext} from "../../../../../../ContextServer/ControlContext";
import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import {TablePagination} from "@mui/material";
import Button from "@mui/material/Button";
import ReactDragList from "react-drag-list";
import {FiAlignJustify} from "react-icons/fi";
import TableCell from "@mui/material/TableCell";

function PlayModalUpdateFirst({setFirst, firs}) {
    const {
        didList,
        GetDIDList,
        setDidList,

        checkId,
        setCheckId,
        updateCheckItem,
        setUpdateCheckItem,
        updateCheckId,
        setUpdateCheckId,
    } = useContext(ControlContext);

    //페이징처리함수
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //did Get List
    useEffect(() => {
        GetDIDList();
    }, []);


    //전체 체크 타이틀값
    const handleAllCheck = (checked) => {
        if (checked) {
            const idArray = [];
            didList.forEach((el) => idArray.push(el.origin_fileName));
            setUpdateCheckItem(idArray);
        } else {
            setUpdateCheckItem([]);
        }
    }

    //전체 체크 아이디값
    const handleAllCheckID = (checked) => {
        if (checked) {
            const idArray = [];
            didList.forEach((el) => idArray.push(el.idx));
            setCheckId(idArray)
        } else {
            setCheckId([]);
        }
    }

    //단일 선택 타이틀
    const handleSingleCheckbox = (checked, id) => {
        if (checked) {
            //단일 선택시 체크된 아이템을 배열에추가
            setUpdateCheckItem(prev => [...prev, id]);
        } else {
            setUpdateCheckItem(updateCheckItem.filter((el) => el !== id))
        }
    };

    //단일 선택 체크박스(아이디값)
    const handleSingleCheckId = (checked, id) => {
        if (checked) {
            setUpdateCheckId(prev => [...prev, id]);
        } else {
            setUpdateCheckId(updateCheckId.filter((el) => el !== id))
        }
    };


    const handleUpdate = (evt, updated) => {
        setDidList([...updated]);
    }

    const dragList = (record, index) => (
        <div style={{width: "100%", height: 55, backgroundColor: "#1c63c2", marginTop: "0.2vh"}}>
            <TableCell className="controls-did-ul" key={index}>
                <li>
                    <FiAlignJustify style={{fontSize: 18, marginRight: "2vh"}}/>

                    <Checkbox
                        type="checkbox" className="station-checkbox"
                        id={`${record.origin_fileName}`}
                        name={`select-${record.origin_fileName}`}
                        onChange={(e) => {
                            handleSingleCheckbox(e.target.checked, record.origin_fileName);
                            handleSingleCheckId(e.target.checked, record.idx);
                        }}
                        checked={!!updateCheckItem.includes(record.origin_fileName)}
                        size={"small"}
                    />
                    {record.origin_fileName}
                </li>
            </TableCell>
        </div>
    )


    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h4">
                <Checkbox type="checkbox" name="select-all"
                          onChange={(e) => {
                              handleAllCheck(e.target.checked);
                              handleAllCheckID(e.target.checked);
                          }}
                          checked={updateCheckItem.length === didList.length}
                          size={"small"}/> 전체파일선택
            </Typography>
            <br/>
            <ReactDragList
                style={{color: "white"}}
                dataSource={didList}
                row={dragList}
                handles={false}
                className='simple-drag'
                rowClassName='simple-drag-row'
                onUpdate={handleUpdate} //정렬 목록이 변경될 때 호출됨
            >
            </ReactDragList>


            <TablePagination
                rowsPerPageOptions={[8, 16, 24, 100]}
                component="div"
                count={didList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{width: "100%", backgroundColor: "#1c63c2",color: "white"}}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: 10,
                        height: 10,
                        cursor: "default"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f3f3f3",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#e8e8e8",
                        borderRadius: 0
                    },
                }}
            />

            <hr/>
            <Button variant="contained" fullWidth onClick={() => {
                setFirst(true);
            }}>다음</Button>
        </div>
    )
}

export default PlayModalUpdateFirst;