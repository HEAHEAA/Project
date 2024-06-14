import {useContext, useEffect, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@mui/material";
import {TableCells, TableHeader, TextWhite} from "../../../../Componet/style-config/light-theme";

function CrossTotalList() {
    const {
        list,
        setSysNum,
        ListSubmit,
        LocalCrossList,
    } = useContext(CrossWalkContext);
    //선택 함수토글
    const [btnAct, setBtnAct] = useState(0);

    useEffect(() => {
        ListSubmit();
        LocalCrossList();
    }, []);


    //페이징 처리 이벤트
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //중복제거
    let listArr = [...list];
    const result = listArr.filter((item, id) => {
        return listArr.findIndex((item1, id2) => {
            return item.node_seq === item1.node_seq
        }) === id
    })

    let resultFilter = result.filter((data) =>
        data.node_seq !== 103
        && data.node_seq !== 105
        && data.node_seq !== 107
        && data.node_seq !== 108
    );



    return (
        <div>
            <Box sx={{width: '100%', typography: 'body1', marginTop: -6, zIndex: 9999999, position: 'absolute'}}>

                <div className="fa04">
                    <TableContainer style={{marginTop: "3vh", cursor: "default", marginLeft: "-2vh"}}>
                        <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                            <TableHead style={TableHeader}>
                                <TableRow>
                                    <TableCell size={"small"} align={"center"} style={TextWhite}>관리번호</TableCell>
                                    <TableCell size={"small"} align={"center"} style={TextWhite}>관리명</TableCell>
                                    <TableCell size={"small"} align={"center"} style={TextWhite}>상태</TableCell>
                                    <TableCell size={"small"} align={"center"} style={TextWhite}>업로드</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    resultFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (arr, inx) {
                                            return (
                                                <TableRow key={(rowsPerPage * page) + inx}
                                                          onClick={() => {
                                                              setSysNum(arr.node_seq);
                                                              setBtnAct(arr.node_seq);
                                                          }}
                                                          className={btnAct === arr.node_seq ? 'tableHovers' : ''}
                                                >
                                                    <TableCell style={TableCells}>{arr.node_seq}</TableCell>
                                                    <TableCell style={TableCells}>{arr.node_name}</TableCell>

                                                    {
                                                        arr.led_status === null ?
                                                            <TableCell style={TableCells}>데이터가 없습니다.</TableCell> :
                                                            <TableCell style={TableCells}>OK</TableCell>
                                                    }

                                                    <TableCell style={TableCells}>
                                                        {arr.t_light_time?.substring(5, 7)}월 {arr.t_light_time?.substring(8, 10)} 일 &nbsp;
                                                        {arr.t_light_time?.substring(11, 16)}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <TablePagination
                    sx={{minWidth: "100%"}}
                    variant="outlined"
                    rowsPerPageOptions={[15, 15, 30, 100]}
                    component="div"
                    count={resultFilter.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{width: "100%", backgroundColor: "#1c63c2", marginLeft: "-2vh",color: "white"}}
                    size={"small"}
                />
            </Box>
        </div>
    )
}

export default CrossTotalList;