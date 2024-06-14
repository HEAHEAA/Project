import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {StationContext} from "../../../../../ContextServer/StationContext";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {AppBar} from "@mui/material";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../../Componet/style-config/light-theme";

function StationOtherDetail(){
    const {dv} = useContext(StationContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <div>
            <div className="Se-Detail01">
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {navigate(`/station/status`)}}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="정류장 기타 설정 매니저" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <TableContainer style={{cursor: "default"}} sx={{
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
                                    <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                                        <TableHead style={TableHeader}>
                                            <TableRow>
                                                <TableCell></TableCell>

                                                <TableCell style={TextWhite}>운영시간(오전)</TableCell>
                                                <TableCell style={TextWhite}>운영시간(오후)</TableCell>
                                                <TableCell style={TextWhite}>운영시간2(오전)</TableCell>
                                                <TableCell style={TextWhite}>운영시간2(오후)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                dv?.map(function (arr, inx) {
                                                    return (
                                                        <TableRow key={arr.dvcNo}>
                                                            <TableCell style={TableHeader}>{arr.dvcNm}</TableCell>
                                                            <TableCell style={TableCells}>{arr.data.oprtStHm === null ? '상시' : arr.data.oprtStHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}</TableCell>
                                                            <TableCell style={TableCells}>{arr.data.oprtEdHm === null ? '상시' : arr.data.oprtEdHm?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}</TableCell>
                                                            <TableCell style={TableCells}>{arr.data.oprtStHm2 === null ? '상시' : arr.data.oprtStHm2?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}</TableCell>
                                                            <TableCell style={TableCells}>{arr.data.oprtEdHm2 === null ? '상시' : arr.data.oprtEdHm2?.replace(/(\d)(?=(?:\d{2})+(?!\d))/g, '$1:')}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>
        </div>
    )
}
export default StationOtherDetail;