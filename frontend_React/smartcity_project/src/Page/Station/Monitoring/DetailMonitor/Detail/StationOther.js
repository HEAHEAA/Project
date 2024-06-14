import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import {TableCells, TableHeader} from "../../../../../Componet/style-config/light-theme";

function StationOther() {
    const {dv, Load02,} = useContext(StationContext);

    //디바이스목록 가나다순 정렬
    let copy = [...dv];
    copy.sort((a,b) => a.dvcNm.toUpperCase() < b.dvcNm.toUpperCase()? -1 : 1);

    if (Load02 === false) {
        return (
            <div>
                <div className="fa00">
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
                        <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                            <TableHead >
                                <TableRow>
                                    <TableCell style={TableHeader} align={"center"}>디바이스 명</TableCell>
                                    <TableCell style={TableHeader} align={"center"}>운영시작</TableCell>
                                    <TableCell style={TableHeader} align={"center"}>운영종료</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    copy.map(function (arr, inx) {
                                        return (
                                            <TableRow key={arr.dvcNo}>
                                                <TableCell style={TableCells}>{arr.dvcNm}</TableCell>
                                                <TableCell style={TableCells}>{arr.data.oprtStHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}</TableCell>
                                                <TableCell style={TableCells}>{arr.data.oprtEdHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

        )
    }

}

export default StationOther;