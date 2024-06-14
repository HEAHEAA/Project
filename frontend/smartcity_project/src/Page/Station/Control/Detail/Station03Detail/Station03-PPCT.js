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

function Station03PPCT({page, rowsPerPage}) {

    const {timeList, agent} = useContext(StationContext);


    return (
        <div>
            <TableContainer style={{cursor: "default"}} sx={{
                marginTop: -4,
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
                            <TableCell size={"small"} align={"center"} style={{width: 100,color: TextWhite.color}}>측정시간</TableCell>
                            <TableCell size={"small"} align={"center"} style={{width: 50,color: TextWhite.color}}>금일입실 수</TableCell>
                            <TableCell size={"small"} align={"center"} style={{width: 50,color: TextWhite.color}}>금일퇴실 수</TableCell>
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
                                                agent === "ppct" ? <>
                                                    <TableCell size={"small"} align={"left"} style={TableCells}> {arr.intime} </TableCell>

                                                    {
                                                        arr.vals?.map((data) => (
                                                            <>
                                                                <TableCell size={"small"} align={"left"} style={TableCells}>{data}</TableCell>
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

export default Station03PPCT;