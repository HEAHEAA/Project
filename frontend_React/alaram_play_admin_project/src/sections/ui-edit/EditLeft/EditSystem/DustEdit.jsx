import {FormControl, InputLabel, Select, Table, TableCell, TableContainer, TableRow} from "@mui/material";
import {TiDelete} from "react-icons/ti";
function DustEdit() {

    return (
        <div>
            <h3>대기</h3>
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                            <h4 style={{textAlign: "center"}}>{i + 1}번물질</h4>
                        </TableCell>
                        <TableCell style={{width: "80%"}} size={"small"}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">물질선택</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="update-sensor"
                                >
                                    통합대기환경'
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                            <h2 style={{textAlign: "center"}}>
                                <TiDelete/>
                            </h2>
                        </TableCell>
                    </TableRow>

                </Table>
            </TableContainer>

            <br/>
        </div>
    )
}

export default DustEdit;