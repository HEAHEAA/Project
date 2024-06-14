import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {Pagination, TabList, TabPanel} from "@mui/lab";
import {TabContext} from '@mui/lab';
import {useContext, useEffect, useState} from "react";
import LoginForm from "./LoginForm.jsx";
import {LoginContext} from "../../api/login/LoginContext.jsx";
import FindIDPW from "./find/FindIDPW.jsx";
import {NoticeContext} from "../../api/system/NoticeContext.jsx";
import NoticeModal from "./NoticeModal/NoticeModal.jsx";


function Login() {
    const {
        //아이디 비밀번호 찾기
        findId, setFindId
    } = useContext(LoginContext);

    const defaultTheme = createTheme();

    //1.탭바를 위한 이벤트
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setFindId(false);
    }, []);


    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{height: '100vh'}}>
                    <CssBaseline/>
                    <Grid
                        className="background"
                        item
                        xs={false}
                        sm={4}
                        md={7}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                        <Box sx={{width: '100%', typography: 'body1'}}>
                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    {
                                        findId === false ?
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab label="로그인" value="1"/>
                                                <Tab label="공지사항" value="2"/>
                                            </TabList> :
                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                <Tab label="아이디/비밀번호 찾기" value="1"/>
                                            </TabList>
                                    }
                                </Box>
                                {
                                    findId === false ? <>
                                        <TabPanel value="1">
                                            <LoginForm/>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <LoginNotion/>
                                        </TabPanel>
                                    </> : <>
                                        <TabPanel value="1">
                                            <FindIDPW/>
                                        </TabPanel>
                                    </>
                                }
                            </TabContext>
                        </Box>

                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}

function LoginNotion() {
    const {
        NoticeGetOnSubmit,
        data,
        handlePage,
        allPage,
        startDate,
        setStartDate,
        endDate,
        setEndDate,

        GetNoticeEditId,
    } = useContext(NoticeContext);
    useEffect(() => {
        NoticeGetOnSubmit();
    }, [startDate, endDate]);

    const [filter, setFilter] = useState(''); //검색용


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>

            <NoticeModal open={open} handleClose={handleClose}/>
            <div className="login-notion-head">
                <p>공지사항</p>
            </div>

            <div className="login-notion-search">
                <TextField
                    id="outlined-basic"
                    label="제목을 검색해주세요."
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setFilter(inputValue);
                    }} value={filter}
                />
            </div>



                <div className="ni-start">
                    <TextField id="outlined-basic"
                               type={"date"}
                               variant="outlined"
                               sx={{marginTop: 2,}}
                               value={startDate}
                               onChange={(e) => setStartDate(e.target.value)}

                    />
                </div>
                <div className="ni-smooth">
                    <span> ~ </span>
                </div>
                <div className="ni-End">
                    <TextField id="outlined-basic"
                               type={"date"}
                               variant="outlined"
                               sx={{marginTop: 2}}
                               value={endDate}
                               onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>


            <div className="login-notion-table">
                <TableContainer sx={{marginTop: 3}}>
                    <Table>
                        <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                            <TableRow>
                                <TableCell>제목</TableCell>
                                <TableCell>게시시작일</TableCell>
                                <TableCell>게시종료일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data
                                    .filter((data) => {
                                        const title = data.notice_title.toLowerCase();
                                        const input = filter.toLowerCase();
                                        return title.includes(input)
                                    })
                                    .map((arr, inx) => (
                                        <TableRow key={arr.notice_idx} onClick={()=>{
                                            GetNoticeEditId(arr.notice_idx);
                                            handleOpen();
                                        }}>
                                            <TableCell>
                                                {arr.notice_title}
                                            </TableCell>
                                            <TableCell>
                                                {arr.notice_start_date?.substring(0, 16)}
                                            </TableCell>
                                            <TableCell>
                                                {arr.notice_end_date?.substring(0, 16)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Pagination count={allPage} variant="outlined"
                        defaultPage={1}
                        sx={window.innerWidth > 1200 ? {width: "40%", marginLeft: "40%", marginTop: "1vh"} :
                            {width: "100%", marginLeft: "0%", marginTop: "1vh"}}
                        onChange={(e) => handlePage(e)}
            />

        </div>
    )
}

export default Login;