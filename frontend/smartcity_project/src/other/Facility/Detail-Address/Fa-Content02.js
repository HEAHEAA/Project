import {useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SideMenu from "../../../Componet/SideBar/SideMenu";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {AppBar} from "@progress/kendo-react-layout";

function FaContent02() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('1');


    return (
        <div>
            <div className="Se-Detail01">
                <AppBar themeColor={"dark"}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={{float: "right", fontSize: "24px", marginRight: "1vh", marginTop: "1vh"}}
                               onClick={() => {
                                   navigate(`/facility`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="속성정보 편집" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div style={{width: "100%", height: "89.5vh"}}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <h6 style={{textAlign: "left"}}>관리 명</h6>
                                            <TextField
                                                required
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <h6 style={{textAlign: "left"}}>주소</h6>
                                            <TextField
                                                required
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <h6 style={{textAlign: "left"}}>X 좌표</h6>
                                            <TextField
                                                required
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <h6 style={{textAlign: "left"}}>Y 좌표</h6>
                                            <TextField
                                                required
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>


                                    </Grid>
                                    <div className="fa-btn">
                                        <Button variant="contained" className="f-save"
                                                style={{marginRight: "0.5vh"}}>등록</Button>
                                        <Button variant="outlined" className="f-close">취소</Button>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>

        </div>
    )
}

export default FaContent02;
