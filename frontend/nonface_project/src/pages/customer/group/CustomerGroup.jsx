import {MdGroups2} from "react-icons/md";
import {FcNext} from "react-icons/fc";
import {useContext, useEffect, useState} from "react";
import {FcFolder} from "react-icons/fc";
import {Select, Table, TableCell, TableContainer, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";
import CustomerGroupMap from "./Map/CustomerGroupMap.jsx";
import {GroupContext} from "../../../api/all/GroupContext.jsx";
import {CustomerGroupContext} from "../../../api/customer/CustomerGroupContext.jsx";

function CustomerGroup() {
    const {groupListGetOnSubmit, groupList} = useContext(GroupContext);
    const {
        //조직도 - 수정할 조직값
        GetGroupListEditId,
        groupEditValue,
        setGroupEditValue,
        GroupEditDataOnSubmit,
        //조직사 삭제
        DeleteGroupOnsubmit,
    } = useContext(CustomerGroupContext);

    useEffect(() => {
        groupListGetOnSubmit();
    }, []);

    const [hover, setHover] = useState(true);

    return (
        <div className="dashboard">
            <div className="customer-head">
                <div className="customer-head-icon">
                    <MdGroups2 style={{marginTop: "2.5vh", marginLeft: "2vh", color: "#5e5e5e"}}/>
                </div>
                <div className="customer-head-p">
                    <span> 조직 관리</span>
                    <p style={{marginLeft: "4vh"}}>조직 생성, 수정, 삭제</p>
                </div>
            </div>

            <div className="customer-content">
                <div className="customer-group-folder">
                    <h2><FcNext/> 조직도</h2>
                </div>
                <div className="customer-group-folder">
                    <p onClick={() => setHover(!hover)}><FcFolder className="folder-icon"/>전국 </p>
                    {
                        hover === true ? <div>

                            {
                                groupList.map((arr, inx) => (
                                    <>
                                        <span onClick={() => {
                                            GetGroupListEditId(arr.clnt_org_id);
                                        }}><FcFolder className="folder-icon"/> {arr.clnt_org_id}</span>
                                        <br/>
                                    </>

                                ))
                            }
                        </div> : null
                    }

                </div>


                <div className="customer-group-folder">
                    <h2><FcNext/> 상세 조직 정보</h2>
                </div>
                <div className="customer-group-detail">
                    <TableContainer>
                        <Table>
                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>조직명</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_name"
                                               value={groupEditValue.clnt_org_name}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_name: e.target.value
                                               })}

                                    />
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>조직 위치</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_loc"
                                               value={groupEditValue.clnt_org_loc}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_loc: e.target.value
                                               })}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>조직 상세주소</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_loc_detail"
                                               value={groupEditValue.clnt_org_loc_detail}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_loc_detail: e.target.value
                                               })}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>지번주소</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_addr"
                                               value={groupEditValue.clnt_org_addr}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_addr: e.target.value
                                               })}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>도로명 주소</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_road_addr"
                                               value={groupEditValue.clnt_org_road_addr}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_road_addr: e.target.value
                                               })}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>조직 담당자</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_manager"
                                               value={groupEditValue.clnt_org_manager}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_manager: e.target.value
                                               })}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>사업장번호</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_brno"
                                               value={groupEditValue.clnt_org_brno || ''}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_brno: e.target.value
                                               })}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>조직연락처</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               fullWidth
                                               name="clnt_org_contact"
                                               value={groupEditValue.clnt_org_contact}
                                               onChange={(e) => setGroupEditValue({
                                                   ...groupEditValue,
                                                   clnt_org_contact: e.target.value
                                               })}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{width: "30%", backgroundColor: "#ececec"}} size={"small"}>
                                    <h4 style={{textAlign: "center"}}>비고</h4>
                                </TableCell>
                                <TableCell style={{width: "80%"}} size={"small"}>
                                    <TextField id="outlined-basic"
                                               label=""
                                               variant="outlined"
                                               multiline
                                               rows={4}
                                               fullWidth
                                               name="clnt_org_remarks"
                                               value={groupEditValue.clnt_org_remarks}
                                               onChange={(e) => {
                                                   setGroupEditValue({
                                                       ...groupEditValue,
                                                       clnt_org_remarks: e.target.value
                                                   })
                                               }}
                                    />
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>

                </div>

                <div className="customer-group-folder">
                    <Button variant="contained" onClick={() => {
                        if (window.confirm('정말 수정하시겠습니까?')) {
                            GroupEditDataOnSubmit();
                        }
                    }}>저장</Button>
                    <Button variant="contained" color={"error"} onClick={() => {
                        if (window.confirm('정말 삭제하시겠습니까?')) {
                            DeleteGroupOnsubmit();
                        }
                    }}>
                        삭제
                    </Button>
                </div>

            </div>

            <div className="customer-content-map">
                {/*<div className="customer-content-search">*/}
                {/*    <FormControl sx={*/}
                {/*        window.innerWidth > 1200 ? {marginLeft: 2, marginTop: 2, width: "10%"} :*/}
                {/*            {marginLeft: 2, marginTop: 2, width: "40%"}*/}

                {/*    }>*/}
                {/*        <InputLabel id="demo-simple-select-label">경기도</InputLabel>*/}
                {/*        <Select*/}
                {/*            labelId="demo-simple-select-label"*/}
                {/*            id="demo-simple-select"*/}
                {/*        >*/}
                {/*            <MenuItem>전체</MenuItem>*/}
                {/*        </Select>*/}
                {/*    </FormControl>*/}


                {/*    <FormControl sx={window.innerWidth > 1200 ? {marginLeft: 2, marginTop: 2, width: "10%"} :*/}
                {/*        {marginLeft: 2, marginTop: 2, width: "45%"}}>*/}
                {/*        <InputLabel id="demo-simple-select-label">용인 수지구</InputLabel>*/}
                {/*        <Select*/}
                {/*            labelId="demo-simple-select-label"*/}
                {/*            id="demo-simple-select"*/}
                {/*        >*/}
                {/*            <MenuItem>전체</MenuItem>*/}
                {/*        </Select>*/}
                {/*    </FormControl>*/}

                {/*    <FormControl sx={*/}
                {/*        window.innerWidth > 1200 ? {marginLeft: 2, marginTop: 2, width: "10%"} :*/}
                {/*            {marginLeft: 2, marginTop: 2, width: "90%"}*/}
                {/*    }>*/}
                {/*        <InputLabel id="demo-simple-select-label">상현 1동</InputLabel>*/}
                {/*        <Select*/}
                {/*            labelId="demo-simple-select-label"*/}
                {/*            id="demo-simple-select"*/}
                {/*        >*/}
                {/*            <MenuItem>전체</MenuItem>*/}
                {/*        </Select>*/}
                {/*    </FormControl>*/}

                {/*    <Button variant="contained" color={"info"} sx={{marginLeft: 1, marginTop: 2.5}} size={"large"}>*/}
                {/*        위치저장 <BiSolidMap style={{fontSize: 25, paddingLeft: 5}}/>*/}
                {/*    </Button>*/}
                {/*</div>*/}

                <div className="customer-content-map-box">
                    <CustomerGroupMap/>
                </div>

            </div>


        </div>
    )
}

export default CustomerGroup;