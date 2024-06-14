import {Table, TableCell, TableContainer, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useContext} from "react";
import {CustomerGroupContext} from "../../../api/customer/CustomerGroupContext.jsx";
import {SubScriptContext} from "../../../api/subscription/SubScriptContext.jsx";

let len = window.innerWidth;
const th = {
    pc: {
        width: "10%", backgroundColor: "#ececec"
    },
    tablet: {
        width: "10%", backgroundColor: "#ececec"
    },
    phone: {
        width: "30%", backgroundColor: "#ececec"
    }
}

function Group() {
    const {
        groupValue,setGroupValue,
    } = useContext(SubScriptContext);
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell style={len > 1200 ? th.pc : (len > 750 ? th.tablet :
                            (len > 0 ? th.phone : null))} size={"small"}>
                            <h4 style={{textAlign: "center"}}>최상위 조직명</h4>
                        </TableCell>
                        <TableCell style={{width: "90%"}} size={"small"}>
                            <TextField id="outlined-basic"
                                       label="고객사 정보를 입력해주세요."
                                       variant="outlined"
                                       fullWidth
                                       helperText="텍스트 20자까지 가능합니다"
                                      value={groupValue.clnt_org_name}
                                       onChange={(e)=>{setGroupValue({...groupValue, clnt_org_name: e.target.value});}}
                            />
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Group;