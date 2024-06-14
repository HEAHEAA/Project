import {Table, TableCell, TableContainer, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useContext} from "react";
import {SubScriptContext} from "../../../api/subscription/SubScriptContext.jsx";


function Admin() {
    const { groupValue,setGroupValue} = useContext(SubScriptContext);

    return (
        <div>
            <TableContainer>
                <Table>

                    <TableRow>
                        <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                            <h4 style={{textAlign: "center"}}>관리자 명</h4>
                        </TableCell>
                        <TableCell style={{width: "90%"}} size={"small"}>
                            <TextField id="outlined-basic"
                                       label="고객사 정보를 입력해주세요."
                                       variant="outlined"
                                       helperText="텍스트 20자까지 가능합니다."
                                       fullWidth
                                       name="clnt_org_manager"
                                       onChange={(e) => {setGroupValue({...groupValue, clnt_org_manager: e.target.value});} }

                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell style={{width: "10%", backgroundColor: "#ececec"}} size={"small"}>
                            <h4 style={{textAlign: "center"}}>핸드폰 번호</h4>
                        </TableCell>
                        <TableCell style={{width: "90%"}} size={"small"}>
                            <TextField id="outlined-basic"
                                       label="고객사 정보를 입력해주세요."
                                       variant="outlined"
                                       helperText="핸드폰번호 “-”를 제외한 숫자만 입력해 주세요."
                                       fullWidth
                                       name="clnt_org_contact"
                                       onChange={(e) => {setGroupValue({...groupValue, clnt_org_contact: e.target.value});} }

                            />
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>


        </div>
    )
}

export default Admin;