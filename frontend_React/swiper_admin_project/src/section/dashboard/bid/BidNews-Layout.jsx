import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext} from "react";
import {BidContext} from "../../../context/bid/BidContext.jsx";
import {Money} from "../../../utils/money.jsx";

function BidNewsLayout(){
    const {bidNews} = useContext(BidContext);

    return(
        <div className="bid-section">
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "#14af98"}}>
                        <TableRow >
                            <TableCell sx={{color: "white"}}>낙찰일</TableCell>
                            <TableCell sx={{color: "white"}}>용역명</TableCell>
                            <TableCell sx={{color: "white"}}>발주처</TableCell>
                            <TableCell sx={{color: "white"}}>낙찰가</TableCell>
                            <TableCell sx={{color: "white"}}>공동도급비율</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            bidNews?.map((sbid) => (
                                <TableRow key={sbid.sbid_idx}>
                                    <TableCell>{sbid.sbid_date.substring(0,10)}</TableCell>
                                    <TableCell>{sbid.sbid_name}</TableCell>
                                    <TableCell>{sbid.sbid_devi}</TableCell>
                                    <TableCell>
                                        {Money(sbid.sbid_cost)}
                                    </TableCell>
                                    <TableCell>{sbid.sbid_rate}%</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default BidNewsLayout;
