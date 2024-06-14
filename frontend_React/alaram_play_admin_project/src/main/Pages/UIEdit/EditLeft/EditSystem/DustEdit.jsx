import {FormControl, InputLabel, Select, Table, TableCell, TableContainer, TableRow} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {TiDelete} from "react-icons/ti";
import {useContext, useState} from "react";
import {DisplayDataContext} from "../../../../../api/UIEdit/Display/DisplayDataContext.jsx";
import {BsPlusSquare} from "react-icons/bs";
import {DisplayResize} from "../../../../../api/UIEdit/Display/DisplayResize.jsx";
import Button from "@mui/material/Button";

function DustEdit() {
    const {
        gradeData
    } = useContext(DisplayDataContext);
    const {
        sensorList,
        updateSensor,UpdateSensorOnsubmit
    } = useContext(DisplayResize);

    //1. 오브젝트 -> 리스트화
    let arr = gradeData[0];
    let key = Object.keys(arr || []); //예외 처리
    let keyFilter = key.pop();


    return (
        <div>
            <h3>대기</h3>
            <TableContainer>
                <Table>
                    {
                        updateSensor.map((a, i) => (
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
                                            defaultValue={sensorList[i].name}
                                            onChange={(e) => {
                                                updateSensor[i] = {
                                                    id: a.id,
                                                    name: e.target.value,
                                                    state: a.state
                                                }
                                                UpdateSensorOnsubmit();
                                            }}

                                        >
                                            {
                                                key.map((arr, inx) => (
                                                    <MenuItem key={inx} value={arr}>{
                                                        arr === 'khaiGrade' ? '통합대기환경' : (
                                                            arr === 'so2Grade' ? '이황산가스' : (
                                                                arr === 'coGrade' ? '일산화탄소' : (
                                                                    arr === 'o3Grade' ? '오존' : (
                                                                        arr === 'no2Grade' ? '이산화질소' : (
                                                                            arr === 'pm10Grade' ? '미세먼지' : (
                                                                                arr === 'pm25Grade' ? '초미세먼지' : null
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    }</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </TableCell>



                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"} onClick={()=>{
                                    if(a.state === 'true'){
                                        updateSensor[i] = {
                                            id: a.id,
                                            name: a.name,
                                            state: 'false'
                                        }
                                        UpdateSensorOnsubmit();
                                    }
                                    if(a.state === 'false'){
                                        updateSensor[i] = {
                                            id: a.id,
                                            name: a.name,
                                            state: 'true'
                                        }
                                        UpdateSensorOnsubmit();
                                    }
                                }}>
                                    <h2 style={{textAlign: "center"}}>
                                        {
                                            a.state === 'true' ? <TiDelete/> : <BsPlusSquare/>
                                        }
                                    </h2>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </Table>
            </TableContainer>

            <br/>
        </div>
    )
}

export default DustEdit;