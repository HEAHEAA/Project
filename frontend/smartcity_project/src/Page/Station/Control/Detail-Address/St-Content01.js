import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AppBar} from "@progress/kendo-react-layout";
import Station01Ud from "../Detail-Update/Station01Ud";
import {useContext} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {useNavigate} from "react-router-dom";
import {TablePagination} from "@mui/material";
import {DetailPageBg} from "../../../../Componet/style-config/light-theme";

function StContent01() {
    const {nodes, pop, setPop} = useContext(StationContext);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const navigate = useNavigate();
    const GoMain = () => {
        navigate('/station');
    }


    return (
        <div>
            {
                pop === true ? <Station01Ud/> : null
            }
            <AppBar sx={DetailPageBg}>
                <div className="St-Detail01">
                    <p className="k-icon k-i-x" style={{"fontSize": 40}} onClick={GoMain}></p>
                    <h1>스마트 정류장 목록</h1>
                    <TableContainer component={Paper} style={{marginTop: "5vh", width: "90%", marginLeft: "5%"}} sx={{
                        marginTop: 5
                    }}>
                        <Table sx={{minWidth: 100}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>시설물 ID</TableCell>
                                    <TableCell>시설물명</TableCell>
                                    <TableCell>시설물타입</TableCell>
                                    <TableCell>시설물타입코드</TableCell>
                                    <TableCell>설치위치</TableCell>
                                    <TableCell>설치일자</TableCell>
                                    <TableCell>설치위도</TableCell>
                                    <TableCell>설치경도</TableCell>
                                    <TableCell>설치업체명</TableCell>
                                    <TableCell>사용여부</TableCell>
                                    <TableCell>연결여부</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    nodes
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (arr, inx) {
                                            return (
                                                <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                          className="tableHover" key={nodes[inx]?.data.nodeId}>
                                                    <TableCell>{nodes[inx]?.data.nodeId}</TableCell> {/*시설물 ID*/}
                                                    <TableCell
                                                        style={{width: "7%"}}>{nodes[inx]?.data.nodeNm}</TableCell> {/*시설물명*/}
                                                    <TableCell
                                                        style={{width: "7%"}}>{nodes[inx]?.data.nodeTypeCd}</TableCell> {/* 시설물 타입 */}
                                                    <TableCell
                                                        style={{width: "10%"}}>{nodes[inx]?.data.nodeTypeNm}</TableCell> {/*시설물 코드*/}
                                                    <TableCell
                                                        style={{width: "7%"}}>{nodes[inx]?.data.instlAddr}</TableCell> {/*설치위치*/}
                                                    <TableCell
                                                        style={{width: "7%"}}>{nodes[inx]?.data.instlYmd}</TableCell> {/*설치일자*/}
                                                    <TableCell>{nodes[inx]?.data.instlLattd}</TableCell> {/*설치위도*/}
                                                    <TableCell>{nodes[inx]?.data.instlLngtd}</TableCell> {/*설치경도*/}
                                                    <TableCell>{nodes[inx]?.data.instlCmpnyNm}</TableCell> {/*설치업체명*/}
                                                    <TableCell>{nodes[inx]?.data.ordNo === 1 ? '사용' : '미사용'}</TableCell> {/*사용여부*/}
                                                    <TableCell
                                                        style={{width: 100}}>{nodes[inx]?.data.useYn === 1 ? '연결중' : '미연결'}</TableCell> {/*연결여부*/}
                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>

                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 15, 25]}
                        component="div"
                        count={nodes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{width: "90%", marginLeft: "5%", backgroundColor: "#2c2c2c"}}

                    />
                </div>
            </AppBar>
        </div>
    )
}

export default StContent01;