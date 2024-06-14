import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useContext} from "react";
import {BidContext} from "../../../context/bid/BidContext.jsx";
import {Money} from "../../../utils/money.jsx";

function BidStateLayout(){
    const {bidState} = useContext(BidContext);
    return(
        <div className="bid-section">
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "#1480af"}}>
                        <TableRow >
                            <TableCell sx={{color: "white"}}>구분</TableCell>
                            <TableCell sx={{color: "white"}}>용역명</TableCell>
                            <TableCell sx={{color: "white"}}>발주처 </TableCell>
                            <TableCell sx={{color: "white"}}>기초금액</TableCell>
                            <TableCell sx={{color: "white"}}>입찰일</TableCell>
                            <TableCell sx={{color: "white"}}>비고</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{backgroundColor: "#ffffff"}}>
                        {
                            bidState?.map((bid) => (
                                <TableRow key={bid.bid_idx}>
                                    <TableCell>{bid.bid_order}</TableCell>
                                    <TableCell>{bid.bid_name}</TableCell>
                                    <TableCell>{bid.bid_devi}</TableCell>
                                    <TableCell>
                                        {Money(bid.bid_cost)}
                                    </TableCell>
                                    <TableCell>{bid.bid_date?.substring(0,10)}</TableCell>
                                    <TableCell>{bid.bid_note}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default BidStateLayout;