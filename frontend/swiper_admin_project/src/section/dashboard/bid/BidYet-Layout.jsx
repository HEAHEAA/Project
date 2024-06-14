import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext} from "react";
import {BidContext} from "../../../context/bid/BidContext.jsx";
import {Money} from "../../../utils/money.jsx";

function BidYetLayout(){
    const {bidYet} = useContext(BidContext);

    return(
        <div className="bid-section">
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "#1598a4"}}>
                        <TableRow >
                            <TableCell sx={{color: "white"}}>구분</TableCell>
                            <TableCell sx={{color: "white"}}>용역명</TableCell>
                            <TableCell sx={{color: "white"}}>발주처</TableCell>
                            <TableCell sx={{color: "white"}}>기초금액</TableCell>
                            <TableCell sx={{color: "white"}}>입찰일</TableCell>
                            <TableCell sx={{color: "white"}}>비고</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                           bidYet.map((sbid) => (
                                <TableRow key={sbid.bid_idx}>
                                    <TableCell>{sbid.bid_order}</TableCell>
                                    <TableCell>{sbid.bid_name}</TableCell>
                                    <TableCell>{sbid.bid_devi}</TableCell>
                                    <TableCell>
                                        {Money(sbid.bid_cost)}
                                    </TableCell>
                                    <TableCell>{sbid.bid_date?.substring(0,10)}</TableCell>
                                    <TableCell>{sbid.bid_note}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default BidYetLayout;