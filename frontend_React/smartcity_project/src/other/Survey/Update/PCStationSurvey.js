import {useContext, useEffect, useState} from "react";
import {SurveyContext, SurveyProvider} from "../../../ContextServer/SurveyContext";
import {LoginContext} from "../../../ContextServer/LoginContext";
import {MenuContext} from "../../../ContextServer/MenuContext";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import {BsClipboard2PlusFill, BsPersonFillGear} from "react-icons/bs";
import TextField from "@mui/material/TextField";
import TabPanel from "@mui/lab/TabPanel";
import {AppBar} from "@progress/kendo-react-layout";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@mui/material";

function PCStationSurvey(){
    const {AllList, surveyNum, setSurveyNum,AllListGetAPI} = useContext(SurveyContext);
    const [filter, setFilter] = new useState(""); //제목 검색용 필터
    const {access, RefreshToken} = useContext(LoginContext);
    const {GetMenuSubmit} = useContext(MenuContext);

    useEffect(()=>{
        GetMenuSubmit();
    },[]);
    //사용자가  메뉴 들어왔을 시, server로 보내주는 API
    useEffect(() => {
        Log();
    }, []); //kpi페이지 이동시 Log 남김

    const Log = () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/log/pageMoved?url=/servey`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
    }


    const navigate = useNavigate();

    useEffect(()=>{
        AllListGetAPI();
    },[])


    //페이징이벤트
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //mui 다크모드
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });

    //
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return(
        <div>
            <SurveyProvider>
                <Box sx={{width: '100%', typography: 'body1'}} className="survey-page">
                    <TabContext value={value}>
                        <div className="media-size">
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                    <Tab label="설문조사 리스트" value="1"/>                                </TabList>
                            </Box>

                            <Button variant="outlined" onClick={() => {
                                navigate(`/survey/post`)
                            }} style={{marginTop: "4vh", float: "right",marginRight: "4vh"}} className="survey-plus-form">
                                설문지추가<BsClipboard2PlusFill/></Button>


                            <Button variant="outlined" onClick={() => {navigate(`/survey/user/home`)}}
                                    color={"secondary"}
                                    style={{marginTop: "4vh", float: "right",marginRight: "1vh"}} className="survey-plus-form"
                            >
                                사용자모드 변경  <BsPersonFillGear/></Button>

                            <section className="survey-box-head-search">
                                <TextField label="검색어를 입력하세요." variant="standard"
                                           placeholder="Search"
                                           onChange={(e) => {
                                               const inputValue = e.target.value;
                                               setFilter(inputValue);
                                           }}
                                           value={filter}
                                           style={{
                                               width: "50%",
                                               float: "left"
                                               , marginLeft: "2vh",
                                               marginTop: "-0.5vh"
                                           }}
                                />
                            </section>

                            <TabPanel value="1">
                                <div className="survey-box">
                                    <AppBar themeColor={"dark"}>

                                        <ThemeProvider theme={darkTheme}>
                                            <TableContainer style={{marginTop: "0vh"}}>
                                                <Table sx={{minWidth: 850}} aria-label="simple table">
                                                    <TableHead style={{backgroundColor: "#232323"}}>
                                                        <TableRow>
                                                            <TableCell>설문번호</TableCell>
                                                            <TableCell>설문제목</TableCell>
                                                            <TableCell>게시시작일</TableCell>
                                                            <TableCell>게시종료일</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {AllList.filter((data) => {
                                                            const title = data.sv_title.toLowerCase();
                                                            const input = filter.toLowerCase();
                                                            return title.includes(input)
                                                        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map(function (arr, inx) {
                                                                return (
                                                                    <TableRow onClick={() => {
                                                                        navigate(`/survey/put/${arr.seqno}`);
                                                                        setSurveyNum((rowsPerPage * page) + inx);
                                                                    }} key={arr.seqno} className="tableHover">
                                                                        <TableCell
                                                                            style={{width: "10px"}}>{(rowsPerPage * page) + inx + 1}</TableCell>
                                                                        <TableCell
                                                                            style={{width: "120px"}}>{arr.sv_title}</TableCell>
                                                                        <TableCell
                                                                            style={{width: "20px"}}>{arr.sv_stdate?.replace(/(T|Z)/g, " ").replace(/-/g, ".")}</TableCell>
                                                                        <TableCell
                                                                            style={{width: "20px"}}>{arr.sv_eddate?.replace(/(T|Z)/g, " ").replace(/-/g, ".")}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                variant="outlined"
                                                rowsPerPageOptions={[10, 15, 25, 100]}
                                                component="div"
                                                count={AllList.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                style={{width: "100%", backgroundColor: "#2c2c2c"}}
                                            />
                                        </ThemeProvider>
                                    </AppBar>
                                </div>
                            </TabPanel>
                        </div>
                    </TabContext>
                </Box>
            </SurveyProvider>
        </div>
    )
}
export default PCStationSurvey;