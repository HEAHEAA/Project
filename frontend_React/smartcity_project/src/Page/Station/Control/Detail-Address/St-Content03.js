import {useNavigate} from "react-router-dom";
import * as React from "react";
import {useContext} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import {AppBar, TablePagination} from "@mui/material";
import Station03ARCO from "../Detail/Station03Detail/Station03-ARCO";
import Station03ARSS from "../Detail/Station03Detail/Station03-ARSS";
import Station03UVCD from "../Detail/Station03Detail/Station03-UVCD";
import Station03CHGR from "../Detail/Station03Detail/Station03-CHGR";
import Station03LDLT from "../Detail/Station03Detail/Station03-LDLT";
import Station03ATOR from "../Detail/Station03Detail/Station03-ATOR";
import Station03HTBC from "../Detail/Station03Detail/Station03-HTBC";
import Station03PPCT from "../Detail/Station03Detail/Station03-PPCT";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {DetailExitIcon, DetailPageBg} from "../../../../Componet/style-config/light-theme";

function StContent03() {
    const {
        dvList,
        Load03,
        dvType
    } = useContext(StationContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    //페이징처리
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    if (Load03 === false) {
        if (dvType === 'ARCO') {//냉난방기
            return (
                <div>
                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03ARCO dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>

                </div>
            )
        }

        if (dvType === 'ARSS') {//환경센서
            return (
                <div>
                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03ARSS dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>

                </div>
            )
        }

        if (dvType === 'UVLD') {//UVC LED
            return (
                <div>

                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03UVCD dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>
                </div>
            )
        }

        if (dvType === 'CHGR') {//충전기
            return (
                <div>

                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03CHGR dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>
                </div>
            )
        }

        if (dvType === 'LDLT') {//LED 조명
            return (
                <div>

                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03LDLT dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>

                </div>
            )
        }


        if (dvType === 'ATDR') {//자동문
            return (
                <div>

                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03ATOR dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>
                </div>
            )
        }

        if (dvType === 'HTBC') {//자동문
            return (
                <div>
                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03HTBC dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>

                </div>
            )
        }


        if (dvType === 'PPTC') {//피플카운터
            return (
                <div>
                    <div className="Se-Detail01">
                        <AppBar sx={DetailPageBg}>
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <BsXLg style={DetailExitIcon}
                                       onClick={() => {
                                           navigate(`/station`)
                                       }}/>

                                <TabContext value={value}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                        <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                            <Tab label="디바이스 수정 이력" value="1"/>
                                        </TabList>
                                    </Box>


                                    <TabPanel value="1">
                                        <Station03PPCT dvList={dvList} page={page} rowsPerPage={rowsPerPage}/>
                                        <TablePagination
                                            sx={{minWidth: "100%"}}
                                            variant="outlined"
                                            rowsPerPageOptions={[7, 14, 21, 100]}
                                            component="div"
                                            count={dvList?.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{width: "100%", backgroundColor: "#1c63c2"}}
                                            size={"small"}
                                        />
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </AppBar>
                    </div>
                </div>
            )
        }

    } else {
        return (
            <div>
                <AppBar sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/station`)
                               }}/>
                        디바이스 목록을 선택해주세요.
                    </Box>
                </AppBar>
            </div>
        )
    }


}

export default StContent03;
