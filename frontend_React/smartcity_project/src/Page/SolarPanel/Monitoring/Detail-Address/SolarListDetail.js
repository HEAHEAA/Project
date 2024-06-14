import {useNavigate} from "react-router-dom";
import {AppBar, TablePagination} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {SolarPanelContext} from "../../../../ContextServer/SolarPanelContext";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
    DetailExitIcon,
    DetailPageBg,
    Paginations,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function SolarListDetail(){
    const {solarList, SolarGetListData,setSolarMapId} = useContext(SolarPanelContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        SolarGetListData();
    }, []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return(
        <div>
            <div className="Se-Detail01">
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/solarPanel`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="스마트 태양열 목록" value="1"/>
                                </TabList>
                            </Box>

                            <TabPanel value="1">

                                <TableContainer style={{marginTop: "5vh", width: "90%", marginLeft: "5%"}}>
                                    <Table sx={{minWidth: 100}} aria-label="simple table">
                                        <TableHead style={TableHeader}>
                                            <TableRow>
                                                <TableCell style={TextWhite}>장비코드</TableCell>
                                                <TableCell style={TextWhite}>장비명</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                solarList
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(function (a, i) {
                                                        return (
                                                            <TableRow key={(rowsPerPage * page) + i} onClick={()=>{setSolarMapId(a.posnm)}}
                                                                      className="tableHover">
                                                                <TableCell>{a.posnm}</TableCell>
                                                                <TableCell>{a.pos_addr}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                            }
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        sx={{minWidth: "100%"}}
                                        variant="outlined"
                                        rowsPerPageOptions={[15, 30, 60, 100]}
                                        component="div"
                                        count={solarList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        style={Paginations}
                                        size={"small"}
                                    />
                                </TableContainer>

                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>

        </div>
    )
}
export default SolarListDetail;