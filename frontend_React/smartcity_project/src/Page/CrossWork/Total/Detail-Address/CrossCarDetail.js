import {useContext, useState} from "react";
import {CrossWalkContext} from "../../../../ContextServer/CrossWalkContext";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import moment from "moment/moment";
import {AppBar, MenuItem, Select, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {AiOutlineSearch} from "react-icons/ai";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function CrossCarDetail(){
    const {car, start02, setStart02, end, setEnd, ListCarTotalSubmit,sysNum,setSysNum,list} = useContext(CrossWalkContext);
    const navigate = useNavigate();

    const [value, setValue] = React.useState('1');

    //페이징
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleStartDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('DD-MM-YYYY');
        setStart02(formattedDate);
        setStart02(e.target.value);
    }

    const handleEndDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('DD-MM-YYYY');
        setEnd(formattedDate);
        setEnd(e.target.value);
    }

    //중복제거
    let listArr = [...list];
    const result = listArr.filter((item,id) => {
        return listArr.findIndex((item1,id2) => {
            return item.node_seq === item1.node_seq
        }) === id
    })
    return(
        <div>
            <div className="Se-Detail01">
                <AppBar style={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/crosswalk/total`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="스마트횡단보도 차량통계" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>

                                    <FormControl sx={{width: "30%", float: "left"}}>
                                        <InputLabel id="demo-simple-select-label">관리명</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sysNum}
                                            label="Age"
                                            onChange={(e) => setSysNum(e.target.value)}
                                        >
                                            {
                                                result.map(function (a,i){
                                                    return(
                                                        <MenuItem value={a.node_seq}>{a.node_name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField type={"date"}
                                               variant="outlined"
                                               style={{float: "left", marginRight: "0.5vh",marginLeft: "2vh"}}
                                               value={start02}
                                               onChange={handleStartDateChange}
                                    />

                                    <TextField type={"date"}
                                               variant="outlined"
                                               style={{float: "left"}}
                                               value={end}
                                               onChange={handleEndDateChange}
                                    />


                                    <Button onClick={()=>{
                                        ListCarTotalSubmit();
                                    }}
                                            size={"large"}
                                            variant="contained"
                                            sx={{float: "left", width: 150,marginTop: 0,marginBottom: 1,height:55, marginLeft: "2vh"}}
                                    ><AiOutlineSearch/></Button>

                                    <TableContainer style={{marginTop: "0.5vh"}} sx={{
                                        "&::-webkit-scrollbar": {
                                            width: 10,
                                            height: 10,
                                            cursor: "default"
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            backgroundColor: "#565656",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "#282828",
                                            borderRadius: 0
                                        }
                                    }}>
                                        <Table sx={{minWidth: 850}} aria-label="simple table">
                                            <TableHead style={TableHeader}>
                                                <TableRow>
                                                    <TableCell size={"small"} style={TextWhite}>관리번호</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>차선번호</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>차량평균속도</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>차선차량수</TableCell>
                                                    <TableCell size={"small"} style={TextWhite}>측정시각</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    car
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map(function (arr, inx) {
                                                            return (
                                                                <TableRow key={(rowsPerPage * page) + inx} className="tableHover">
                                                                    <TableCell style={TableCells}>{arr.node_seq}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.lane}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.speed}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.COUNT}</TableCell>
                                                                    <TableCell style={TableCells}>{arr.reg_datetime?.replace(/(T|Z)/g, " ").replace(/-/g, ".")}</TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                }
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            variant="outlined"
                                            rowsPerPageOptions={[15, 14, 21, 100]}
                                            component="div"
                                            count={car.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#1c63c2",
                                                color: "white",
                                                height: "5vh",
                                                overflow: "hidden"
                                            }}
                                            size={"small"}
                                        />
                                    </TableContainer>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}
export default CrossCarDetail;