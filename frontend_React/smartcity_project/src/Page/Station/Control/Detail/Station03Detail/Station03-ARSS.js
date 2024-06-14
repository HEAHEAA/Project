import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import {TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";
function Station03ARSS({page,rowsPerPage}){

    const {timeList, agent} = useContext(StationContext);

    return(
        <div>
            <TableContainer style={{ cursor: "default"}} sx={{marginTop: -4,
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
                            <TableCell size={"small"} align={"center"} style={{width: 100,color: TextWhite.color}}>출력시간</TableCell>
                            <TableCell size={"small"} align={"center"} style={{width: 50,color: TextWhite.color}}>온도(℃)</TableCell>
                            <TableCell size={"small"} align={"center"} style={{width: 50,color: TextWhite.color}}>습도(%)</TableCell>
                            <TableCell size={"small"} align={"center"} style={{width: 50,color: TextWhite.color}}>미세먼지</TableCell>
                            <TableCell size={"small"} align={"center"} style={{width: 70,color: TextWhite.color}}>초미세먼지</TableCell>
                            <TableCell size={"small"} align={"center"} style={{width: 70,color: TextWhite.color}}>이산화탄소</TableCell>
                            <TableCell size={"small"} align={"center"} style={{fontSize: 11,width: 70,color: TextWhite.color}}>VOCs휘발성 화합물</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            timeList
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.reverse()
                                ?.map(function (arr, inx) {
                                    return (
                                        <TableRow key={(rowsPerPage * page) + inx} className="tableHover">
                                            {
                                                agent === "arss" ? <>
                                                    <TableCell size={"small"} style={TableCells}> {arr.intime} </TableCell>
                                                    {
                                                        arr.vals?.map((data) => (
                                                            <>
                                                                <TableCell size={"small"}style={TableCells}>{data?.toFixed(2)}</TableCell>
                                                            </>
                                                        ))
                                                    }

                                                </> : null
                                            }
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
export default Station03ARSS;