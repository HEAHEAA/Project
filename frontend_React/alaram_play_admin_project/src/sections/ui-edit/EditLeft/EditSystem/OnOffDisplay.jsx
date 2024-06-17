import {Grid, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useContext, useEffect, useState} from "react";
import {TimeData} from "../../../../util/dateTime.jsx";
import Button from "@mui/material/Button";
import {DisplayOnContext} from "../../../../context/DisplayOnContext.jsx";


const MenuProps = {
    autoFocus: false,
    PaperProps: {
        style: {
            height: 250,
            OverflowY: "scroll"
        }
    }
};

const OnOffDisplay = () => {
    const {inTimeValue,setInTimeValue,UpdateInTime,intime,setIntime,} = useContext(DisplayOnContext);

    let date = [];
    for(let i = 0; i<TimeData.length; i++){
        if(parseInt(inTimeValue.ontime) <= TimeData[i].time && parseInt(inTimeValue.offtime) >= TimeData[i].time){
            date.push(TimeData[i])
        }
    }
    let dataPOP = date.pop();



    return (
        <div>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                <h4 style={{textAlign: "center"}}></h4>
                            </TableCell>
                            <TableCell style={{width: "80%", backgroundColor: "#ececec", textAlign: "center"}}
                                       size={"small"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <h4>TIME</h4>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>


                        <TableRow>
                            <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                <h4 style={{textAlign: "center"}}>시간 편집</h4>
                            </TableCell>
                            <TableCell style={{width: "80%"}} size={"small"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth style={{textAlign: 'center'}}>
                                            <InputLabel>화면 시작</InputLabel>
                                            <Select
                                               value={inTimeValue.ontime}
                                               name="ontime"
                                               onChange={(e) => setInTimeValue({
                                                   ...inTimeValue, ontime: e.target.value
                                               })}
                                                MenuProps={MenuProps}
                                            >
                                                {
                                                    TimeData.map((arr) => (
                                                        <MenuItem value={arr.time}>
                                                            {arr.time}시
                                                        </MenuItem>
                                                    ))
                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth style={{textAlign: 'center'}}>
                                            <InputLabel>화면 종료 </InputLabel>
                                            <Select
                                                name="offtime"
                                                value={inTimeValue.offtime}
                                                onChange={(e) => setInTimeValue({
                                                    ...inTimeValue, offtime: e.target.value
                                                })}
                                                MenuProps={MenuProps}
                                            >
                                                {
                                                    TimeData.map((arr) => (
                                                        <MenuItem value={arr.time}>
                                                            {arr.time} 시
                                                        </MenuItem>
                                                    ))
                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>

            <br/>
            <p style={{fontWeight: "bold", textAlign: "right"}}>
                화면 적용 시간:
                {inTimeValue.ontime === '99' ? '00' : inTimeValue.ontime}시 ~ {inTimeValue.offtime === '99' ? '24' : inTimeValue.offtime} 시
            </p>

            <Button variant="contained" fullWidth onClick={()=>{
                if(parseInt(inTimeValue.ontime) > parseInt(inTimeValue.offtime)){
                    alert('화면 시작시간과 종료시간이 맞지 않습니다.');
                }else {
                    UpdateInTime();
                }
            }}>
                시간 적용
            </Button>
        </div>

    )
}

export default OnOffDisplay;
