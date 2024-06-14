import {useContext, useState} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@mui/material";


function Station01() {
    const {checkItem, nodies} = useContext(StationContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    if (checkItem.length > 0) {
        return (

            <div className="station01">
                <TableContainer style={{marginTop: "-3vh", cursor: "default"}} sx={{
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
                    <Table sx={{minWidth: 1780, fontSize: 11}} aria-label="simple table" className="cw02Table">
                        <TableHead style={{backgroundColor: "#232323"}}>
                            <TableRow>
                                <TableCell size={"small"}>
                                    {/*<Checkbox type="checkbox" name="select-all"*/}
                                    {/*          onChange={(e) => handleAllCheck(e.target.checked)}*/}
                                    {/*          checked={checkItem.length === nodies.length}*/}
                                    {/*          size="small"*/}
                                    {/*/>*/}
                                </TableCell>
                                <TableCell size={"small"}>시설물ID</TableCell>
                                <TableCell size={"small"}>시설물명</TableCell>
                                <TableCell size={"small"}>시설물타입</TableCell>
                                <TableCell size={"small"}>시설물타입코드</TableCell>
                                <TableCell size={"small"}>설치위치</TableCell>
                                <TableCell size={"small"}>설치일자</TableCell>
                                <TableCell size={"small"}>설치위도</TableCell>
                                <TableCell size={"small"}>설치경도</TableCell>
                                <TableCell size={"small"}>설치업체명</TableCell>
                                <TableCell size={"small"}>사용여부</TableCell>
                                <TableCell size={"small"}>연결여부</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                nodies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (a, i) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + i}>
                                            <TableCell style={{width: 50}}>
                                                {/*<Checkbox type="checkbox" className="station-checkbox"*/}
                                                {/*          id={`${a.nodeId}`}*/}
                                                {/*          name={`select-${a.nodeId}`}*/}
                                                {/*          onChange={(e) => handleSingleCheck(e.target.checked, a.nodeId)}*/}
                                                {/*          checked={!!checkItem.includes(a.nodeId)}*/}

                                                {/*          size="small"/>*/}
                                            </TableCell>
                                            <TableCell style={{width: 150}}>{a.nodeId}</TableCell>
                                            <TableCell style={{width: 180}}>{a.nodeNm}</TableCell>
                                            <TableCell style={{width: 130}}>{a.nodeTypeCd}</TableCell>
                                            <TableCell style={{width: 130}}>{a.nodeTypeNm}</TableCell>
                                            <TableCell style={{width: 130}}>{a.instlAddr}</TableCell>
                                            <TableCell style={{width: 130}}>{a.instlYmd}</TableCell>
                                            <TableCell style={{width: 130}}>{a.instlLattd}</TableCell>
                                            <TableCell style={{width: 130}}>{a.instlLngtd}</TableCell>
                                            <TableCell
                                                style={{width: 130}}>{a.instlCmpnyNm}</TableCell>
                                            <TableCell
                                                style={{width: 130}}>{nodies[0].ordNo === 1 ? '사용' : '미사용'}</TableCell>
                                            <TableCell
                                                style={{width: 130}}>{nodies[0].useYn === 1 ? '연결중' : '미연결'}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    sx={{minWidth: "100%"}}
                    variant="outlined"
                    rowsPerPageOptions={[5, 14, 21, 100]}
                    component="div"
                    count={nodies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{width: "100%", backgroundColor: "#2c2c2c"}}
                    size={"small"}
                />

            </div>

        )
    } else {
        return (
            <div>
                원하는 시설물 목록을 클릭해주세요.
            </div>
        )
    }

}

export default Station01;