import * as React from "react";
import Button from "@mui/material/Button";
import {MenuItem, Modal, Select} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import {useContext, useState} from "react";
import {SecurityLightContext} from "../../../../../../../ContextServer/SecurityContext";
import {TableCells} from "../../../../../../../Componet/style-config/light-theme";

function NewTab03Dimming({AddEMData, handleAddClose}) {
    const {
        addProId,
        addProName,
        AddGate,
        AddSslc,
        AddRepeater,
        Adds01, setAdds01, Adds02, setAdds02, Adds03, setAdds03, Adds04, setAdds04,
        Adds05, setAdds05, Adds06, setAdds06, Adds07, setAdds07, Adds08, setAdds08,
        Adds09, setAdds09, Adds10, setAdds10, Adds11, setAdds11, Adds12, setAdds12,
        Adds13, setAdds13, Adds14, setAdds14, Adds15, setAdds15, Adds16, setAdds16,
        Adds17, setAdds17, Adds18, setAdds18, Adds19, setAdds19, Adds20, setAdds20,
        Adds21, setAdds21, Adds22, setAdds22, Adds23, setAdds23, Adds24, setAdds24,

        Add01, setAdd01, Add02, setAdd02, Add03, setAdd03, Add04, setAdd04, Add05, setAdd05,
        Add06, setAdd06, Add07, setAdd07, Add08, setAdd08, Add09, setAdd09, Add10, setAdd10,
        Add11, setAdd11, Add12, setAdd12, Add13, setAdd13, Add14, setAdd14, Add15, setAdd15,
        Add16, setAdd16, Add17, setAdd17, Add18, setAdd18, Add19, setAdd19, Add20, setAdd20,
        Add21, setAdd21, Add22, setAdd22, Add23, setAdd23, Add24, setAdd24
    } = useContext(SecurityLightContext);

    const [open, setOpen] = useState(false);

    const [mapArr, setMapArr] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "black",
        border: 'none',
        borderRadius: "10px",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    let val = 0;

    return (
        <div>
            <React.Fragment>
                <Button onClick={() => {
                    handleOpen();
                }}
                        variant="outlined"
                        fullWidth
                >PIR 밝기수정</Button>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{...style, width: "80%"}}>
                        <h4 id="child-modal-title">장비밝기도 입력</h4>
                        <Typography id="server-modal-description" sx={{pt: 2}}>
                            시간대에 맞춰 입력해주세요. (ex) 밝기도 0~10 )
                        </Typography>

                        <TableContainer sx={{
                            "&::-webkit-scrollbar": {
                                width: 10,
                                height: 10,
                                cursor: "default",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "#565656",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#2c2c2c",
                                borderRadius: 0
                            }
                        }}>
                            <Table sx={{minWidth: 2100, fontSize: "11px"}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{width: 50, backgroundColor: TableCells}}>시간</TableCell>
                                        {
                                            mapArr.map(function (a, i) {
                                                return (
                                                    <TableCell key={i}>{i + 1} 시</TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{width: 50, backgroundColor: "#2d2d2d"}}>Max</TableCell>

                                        {/* 임시용 value onchange*/}

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"

                                                value={Add01}
                                                onChange={(e) => val(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add02}
                                                onChange={(e) => setAdd02(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add03}
                                                onChange={(e) => setAdd03(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add04}
                                                onChange={(e) => setAdd04(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add05}
                                                onChange={(e) => setAdd05(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add06}
                                                onChange={(e) => setAdd06(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add07}
                                                onChange={(e) => setAdd07(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add08}
                                                onChange={(e) => setAdd08(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add09}
                                                onChange={(e) => setAdd09(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add10}
                                                onChange={(e) => setAdd10(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add11}
                                                onChange={(e) => setAdd11(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add12}
                                                onChange={(e) => setAdd12(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add13}
                                                onChange={(e) => setAdd13(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add14}
                                                onChange={(e) => setAdd14(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add15}
                                                onChange={(e) => setAdd15(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add16}
                                                onChange={(e) => setAdd16(e.target.value)}
                                            />
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add17}
                                                onChange={(e) => setAdd17(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add18}
                                                onChange={(e) => setAdd18(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add19}
                                                onChange={(e) => setAdd19(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add20}
                                                onChange={(e) => setAdd20(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add21}
                                                onChange={(e) => setAdd21(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add22}
                                                onChange={(e) => setAdd22(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add23}
                                                onChange={(e) => setAdd23(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Add24}
                                                onChange={(e) => setAdd24(e.target.value)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{width: 50, backgroundColor: "#2d2d2d"}}>Min</TableCell>
                                        {/* 임시용 value onchange*/}
                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds01}
                                                onChange={(e) => setAdds01(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds02}
                                                onChange={(e) => setAdds02(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds03}
                                                onChange={(e) => setAdds03(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds04}
                                                onChange={(e) => setAdds04(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds05}
                                                onChange={(e) => setAdds05(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds06}
                                                onChange={(e) => setAdds06(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds07}
                                                onChange={(e) => setAdds07(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds08}
                                                onChange={(e) => setAdds08(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds09}
                                                onChange={(e) => setAdds09(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds10}
                                                onChange={(e) => setAdds10(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds11}
                                                onChange={(e) => setAdds11(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds12}
                                                onChange={(e) => setAdds12(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds13}
                                                onChange={(e) => setAdds13(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds14}
                                                onChange={(e) => setAdds14(e.target.value)}
                                            />
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds15}
                                                onChange={(e) => setAdds15(e.target.value)}
                                            />
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds16}
                                                onChange={(e) => setAdds16(e.target.value)}
                                            />
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds17}
                                                onChange={(e) => setAdds17(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds18}
                                                onChange={(e) => setAdds18(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds19}
                                                onChange={(e) => setAdds19(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds20}
                                                onChange={(e) => setAdds20(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds21}
                                                onChange={(e) => setAdds21(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds22}
                                                onChange={(e) => setAdds22(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds23}
                                                onChange={(e) => setAdds23(e.target.value)}
                                            />
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <TextField
                                                variant="outlined"
                                                value={Adds24}
                                                onChange={(e) => setAdds24(e.target.value)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button style={{float: "right", marginTop: "1vh"}} onClick={() => {
                            handleClose();
                        }}>닫기</Button>
                        <Button variant="contained" style={{float: "right", marginTop: "1vh"}} onClick={() => {
                            if (addProId === '') {
                                alert('장비번호를 입력해주세요.');
                            } else if (addProName === '') {
                                alert('장비이름을 입력해주세요.');
                            } else if (AddGate === '') {
                                alert('게이트웨이를 입력해주세요.');
                            } else if (AddSslc === 0) {
                                alert('sslc 수량을 입력해주세요.');
                            } else if (AddRepeater === 0) {
                                alert('리피터 수량을 입력해주세요.');
                            } else {
                                AddEMData();
                                handleClose();
                                handleAddClose();
                                alert('내용 생성이 완료 되었습니다.')
                            }
                        }}>
                            입력완료
                        </Button>
                    </Box>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default NewTab03Dimming;