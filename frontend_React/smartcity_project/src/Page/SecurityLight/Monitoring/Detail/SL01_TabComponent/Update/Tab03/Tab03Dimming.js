import * as React from "react";
import {MenuItem, Modal, Select, Slider} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useContext, useEffect} from "react";
import Typography from "@mui/material/Typography";
import {SecurityLightContext} from "../../../../../../../ContextServer/SecurityContext";
import Table from "@mui/material/Table";
import {TableCells, TableHeader} from "../../../../../../../Componet/style-config/light-theme";

function Tab03Dimming({handleClose, open, title}) {
    const {
        getData, settings, setVal01, setVal02,
        setVal03, setVal04, setVal05, setVal06,
        setVal07, setVal08, setVal09, setVal10,
        setVal11, setVal12, setVal13, setVal14,
        setVal15, setVal16, setVal17, setVal18,
        setVal19, setVal20, setVal21, setVal22,
        setVal23, setVal24,

        vals01, setVals01, setVals02, setVals03,
        setVals04, setVals05, setVals06, setVals07,
        setVals08, setVals09, setVals10, setVals11,
        setVals12, setVals13, setVals14, setVals15,
        setVals16, setVals17, setVals18, setVals19,
        setVals20, setVals21, setVals22, setVals23,
        setVals24, EditEMData,
    } = useContext(SecurityLightContext);

    useEffect(() => {
        getData();
    }, [open]);


    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "white",
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    return (
        <div>
            <React.Fragment>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{...style, width: "80%"}}>
                        <h4 id="child-modal-title">{title} 디밍밝기도 수정</h4>
                        <Typography id="server-modal-description" sx={{pt: 2}}>

                        </Typography>

                        <TableContainer sx={{
                            "&::-webkit-scrollbar": {
                                width: 10,
                                height: 10,
                                cursor: "default",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "#f3f3f3",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#d7d7d7",
                                borderRadius: 0
                            }
                        }}>
                            <Table sx={{minWidth: 2100, fontSize: "11px"}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{width: 300, backgroundColor: TableCells}}>시간</TableCell>
                                        {
                                            settings[0]?.map(function (a, i) {
                                                return (
                                                    <TableCell align={"center"} key={i}
                                                               style={TableHeader}>
                                                        {i + 1} 시
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{width: 300, backgroundColor: TableCells}}>Max</TableCell>

                                        {/* 임시용 value onchange*/}
                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][0]}
                                                onChange={(e) => setVal01(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>

                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][2]}
                                                onChange={(e) => setVal02(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][4]}
                                                onChange={(e) => setVal03(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][6]}
                                                onChange={(e) => setVal04(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][8]}
                                                onChange={(e) => setVal05(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][10]}
                                                onChange={(e) => setVal06(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][12]}
                                                onChange={(e) => setVal07(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][14]}
                                                onChange={(e) => setVal08(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][16]}
                                                onChange={(e) => setVal09(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][18]}
                                                onChange={(e) => setVal10(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][20]}
                                                onChange={(e) => setVal11(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["0"] && settings[0][22]}
                                                onChange={(e) => setVal12(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][2]}
                                                onChange={(e) => setVal13(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][4]}
                                                onChange={(e) => setVal14(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][6]}
                                                onChange={(e) => setVal15(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][8]}
                                                onChange={(e) => setVal16(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][10]}
                                                onChange={(e) => setVal17(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][12]}
                                                onChange={(e) => setVal18(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][13]}
                                                onChange={(e) => setVal19(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][14]}
                                                onChange={(e) => setVal20(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][16]}
                                                onChange={(e) => setVal21(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][18]}
                                                onChange={(e) => setVal22(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][20]}
                                                onChange={(e) => setVal23(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][22]}
                                                onChange={(e) => setVal24(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{width: 300, backgroundColor:TableCells}}>Min</TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][1]}
                                                label={vals01}
                                                onChange={(e) => setVals01(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][3]}
                                                onChange={(e) => setVals02(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][5]}
                                                onChange={(e) => setVals03(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][7]}
                                                onChange={(e) => setVals04(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][9]}
                                                onChange={(e) => setVals05(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][11]}
                                                onChange={(e) => setVals06(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][13]}
                                                onChange={(e) => setVals07(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][15]}
                                                onChange={(e) => setVals08(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][17]}
                                                onChange={(e) => setVals09(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][19]}
                                                onChange={(e) => setVals10(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][21]}
                                                onChange={(e) => setVals11(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings[0] && settings[0][23]}
                                                onChange={(e) => setVals12(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][1]}
                                                onChange={(e) => setVals13(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][3]}
                                                onChange={(e) => setVals14(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][5]}
                                                onChange={(e) => setVals15(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][7]}
                                                onChange={(e) => setVals16(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>


                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][9]}
                                                onChange={(e) => setVals17(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][11]}
                                                onChange={(e) => setVals18(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][13]}
                                                onChange={(e) => setVals19(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][15]}
                                                onChange={(e) => setVals20(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][17]}
                                                onChange={(e) => setVals21(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][19]}
                                                onChange={(e) => setVals22(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][21]}
                                                onChange={(e) => setVals23(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>

                                        <TableCell style={{width: 50}}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                defaultValue={settings["1"] && settings[1][23]}
                                                onChange={(e) => setVals24(e.target.value)}
                                            >
                                                <MenuItem value={10}>0%</MenuItem>
                                                <MenuItem value={1}>10%</MenuItem>
                                                <MenuItem value={2}>20%</MenuItem>
                                                <MenuItem value={3}>30%</MenuItem>
                                                <MenuItem value={4}>40%</MenuItem>
                                                <MenuItem value={5}>50%</MenuItem>
                                                <MenuItem value={6}>60%</MenuItem>
                                                <MenuItem value={7}>70%</MenuItem>
                                                <MenuItem value={8}>80%</MenuItem>
                                                <MenuItem value={9}>90%</MenuItem>
                                                <MenuItem value={0}>100%</MenuItem>
                                            </Select>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Button onClick={() => {
                            if (window.confirm('수정한 내용은 저장이 안됩니다.')) {
                                handleClose();
                            } else {
                                return '';
                            }
                        }} style={{
                            float: "right", marginTop: "2vh"
                        }}>
                            닫기
                        </Button>


                        <Button variant="contained" onClick={() => {
                            if (window.confirm('디밍밝기도를 수정하시겠습니까?')) {
                                EditEMData();
                                handleClose();
                            }
                        }} style={{
                            float: "right", marginTop: "2vh"
                        }}>수정완료</Button>
                    </Box>
                </Modal>
            </React.Fragment>
        </div>
    )
}

export default Tab03Dimming;