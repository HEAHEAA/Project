import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Pagination} from "@mui/lab";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import * as React from "react";
import DashControlMap from "./Map/DashControlMap.jsx";
import { CiYoutube } from "react-icons/ci";
import {useContext, useEffect, useState} from "react";
import {HomeControlContext} from "../../../api/dashboard/HomeControlContext.jsx";
import MultiScreenOne from "./DetailMap/MultiScreenOne.jsx";
import MultiScreenFour from "./DetailMap/MultiScreenFour.jsx";
import MultiScreenTwo from "./DetailMap/MultiScreenTwo.jsx";
import MultiScreenThree from "./DetailMap/MultiScreenThree.jsx";
import {GroupContext} from "../../../api/all/GroupContext.jsx";
import {UserContext} from "../../../api/all/UserContext.jsx";
import Loading from '../../../assets/img/loading.gif';

function DashControl(){
    const {multiBtn,setMultiBtn} = useContext(HomeControlContext);
    const {userListGetOnSubmit,userList,userLoading} = useContext(UserContext);
    const {groupListGetOnSubmit, groupList} = useContext(GroupContext);


    useEffect(() => {
        groupListGetOnSubmit();
        userListGetOnSubmit();
    }, []);



    //1. 회사명 select
    const [clientSelect,setClientSelect] = useState('jihee');
    const handleSelect = (e) => {
        setClientSelect(e.target.value);
    }
    useEffect(()=>{
        userListGetOnSubmit();
    },[clientSelect])

    let dataArr = [...userList];
    let dataFilter = dataArr.filter((data) => data.clnt_org_id === clientSelect)


    //1.페이지 네이션 이벤트 10개씩
    const [page, setPage] = useState(1); //첫페이지
    const [data, setData] = useState([]);
    const lastPage = dataFilter.length % 15 === 0 ? dataFilter.length / 15 : dataFilter.length / 15 + 1;  //마지막 페이지
    useEffect(() => {
        if (page === lastPage) { // 마지막 페이지는 데이터가 10개보다 부족할 수도 있다.
            setData(dataFilter.slice(15 * (page - 1)));
        } else {
            setData(dataFilter.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page,clientSelect,userList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    return(
        <div>
            <div className="dashControl-search-box">
                <div className="dashControl-search-head">
                    <p>회원사 <span>검색</span></p>
                    <Button variant="contained" color={"info"} onClick={()=>{
                        //클릭 시, 멀티스크린 오픈클릭 이벤트
                        setMultiBtn(!multiBtn);
                    }}>
                        멀티스크린 <CiYoutube style={{fontSize: 20, marginLeft: 5}}/>
                    </Button>
                </div>

                <div className="dashControl-select-box">
                    <Box sx={{ width: "90%",marginLeft:"5%" ,marginTop: 2, }}>
                        <p>회원사 명</p>
                        <FormControl fullWidth>

                            <InputLabel id="demo-simple-select-label">전체</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue="jihee"
                                onChange={(e) => handleSelect(e)}
                            >
                                {
                                    groupList.map((arr,inx) => (
                                        <MenuItem value={arr.clnt_org_id}>{arr. clnt_org_id}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                    </Box>

                    {/*<Box sx={{ width: "90%",marginLeft:"5%" ,marginTop: 2, }}>*/}
                    {/*    <p>검색조건 </p>*/}
                    {/*    <FormControl fullWidth>*/}

                    {/*        <InputLabel id="demo-simple-select-label">전체</InputLabel>*/}
                    {/*        <Select*/}
                    {/*            labelId="demo-simple-select-label"*/}
                    {/*            id="demo-simple-select"*/}
                    {/*            label="Age"*/}
                    {/*        >*/}
                    {/*            <MenuItem>전체</MenuItem>*/}
                    {/*        </Select>*/}
                    {/*    </FormControl>*/}
                    {/*</Box>*/}

                    <Box sx={{width: "90%", marginLeft: "5%", marginTop: 4}}>
                        <Button variant="outlined" fullWidth size={"large"}>검색</Button>
                    </Box>



                    <div className="dashControl-board">
                        {
                            userLoading === false ? <div>
                                <img src={Loading} alt="로딩중" className="dash-loading"/>
                            </div> :
                                <TableContainer>
                                    <Table>
                                        <TableHead sx={{backgroundColor: "#f3f3f3"}}>
                                            <TableRow>
                                                <TableCell>회원사 명</TableCell>
                                                <TableCell>사용자 ID</TableCell>
                                                <TableCell>상태</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data.map((arr,inx) => (
                                                    <TableRow>
                                                        <TableCell>{arr.clnt_org_id}</TableCell>
                                                        <TableCell>{arr.clnt_user_id}</TableCell>
                                                        <TableCell>이동중</TableCell>
                                                    </TableRow>
                                                ))
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                        }


                    </div>
                    <Pagination count={Math.ceil(lastPage)}
                                variant="outlined"
                                sx={{width: "90%", marginLeft: "5%", marginTop: "1vh"}}
                                onChange={(e) => handlePage(e)}
                    />
                </div>

            </div>

            <div className={multiBtn === true ? 'dashControl-map-boxOn' :'dashControl-map-box'}>

                {
                    multiBtn === true ?
                        <div className="dashControl-map-multi-box">
                            <div className="dashControl-map-multi-subBox">
                                <MultiScreenOne/>
                                <p>①</p>
                            </div>
                            <div className="dashControl-map-multi-subBox">
                                <MultiScreenTwo/>
                                <p>②</p>
                            </div>
                            <div className="dashControl-map-multi-subBox">
                                <MultiScreenThree/>
                                <p>③</p>
                            </div>
                            <div className="dashControl-map-multi-subBox">
                                <MultiScreenFour/>
                                <p>④</p>
                            </div>
                        </div> : null
                }


                <DashControlMap/>
            </div>

        </div>
    )
}
export default DashControl;