import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function Station03ARCO({dvList, page, rowsPerPage}) {
    return (
        <div>
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
                <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table" className="cw02Table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell size={"small"} align={"center"}
                                       style={{ color: TextWhite.color}}>운전여부</TableCell>
                            {/*"oprt"- 운전여부*/}
                            <TableCell size={"small"} align={"center"}
                                       style={{color:TextWhite.color}}>운전모드</TableCell>
                            <TableCell size={"small"} align={"center"}
                                       style={{ color:TextWhite.color}}>제상모드</TableCell>
                            {/*"dtm" -측정시간*/}
                            <TableCell size={"small"} align={"center"}
                                       style={{color: TextWhite.color}}>측정시간</TableCell>
                            {/*oprtMode - 운전모드*/}
                            <TableCell size={"small"} align={"center"}
                                       style={{color: TextWhite.color}}>바람세기</TableCell>
                            {/* windSts*/}
                            <TableCell size={"small"} align={"center"}
                                       style={{color: TextWhite.color}}>냉방온도</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {
                            [...dvList]
                                ?.reverse()
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map(function (arr, inx) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + inx} className="tableHover">
                                            <TableCell size={"small"} style={TableCells}> {arr.oprt === 1 ? 'ON' : 'OFF'} </TableCell>

                                            <TableCell size={"small"} style={TableCells}>
                                                {
                                                    arr.oprtMode === "0" ? '냉방' : (
                                                        arr.oprtMode === "1" ? '제습' : (
                                                            arr.oprtMode === "2" ? '송풍' : (
                                                                arr.oprtMode === "3" ? '자동' : (
                                                                    arr.oprtMode === "4" ? '난방' : null
                                                                )
                                                            )
                                                        )
                                                    )
                                                }
                                            </TableCell>

                                            <TableCell size={"small"} style={TableCells}>
                                                {arr.dfrst === 1 ? "자동" : "수동"}
                                            </TableCell>

                                            <TableCell size={"small"} style={TableCells}>{arr.dtm}</TableCell>

                                            <TableCell size={"small"} style={TableCells}>
                                                {
                                                    arr.windSts === "1" ? '약' : (
                                                        arr.windSts === "2" ? '중' : (
                                                            arr.windSts === "3" ? '강' : (
                                                                arr.windSts === "4" ? '자동' : null
                                                            )
                                                        )
                                                    )
                                                }
                                            </TableCell>

                                            <TableCell size={"small"} style={TableCells}>{arr.coolTemp}℃</TableCell>
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

export default Station03ARCO;