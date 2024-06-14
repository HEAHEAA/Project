import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../../ContextServer/LoginContext";
import {SecurityLightContext} from "../../../../../ContextServer/SecurityContext";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import Table from "@mui/material/Table";
import {CircularProgress, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import Tab01Update from "../SL01_TabComponent/Update/Tab01/Tab01Update";
import NewTab01 from "../SL01_TabComponent/Add/Tab01/NewTab01";
import Button from "@mui/material/Button";
import {BsFillPencilFill} from "react-icons/bs";
import {Paginations, TableCells, TableHeader, TextWhite} from "../../../../../Componet/style-config/light-theme";

function SL01Tab02() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {Btn01} = useContext(SecurityLightContext);
    const [Loading, setLoading] = useState(true);
    const [getList, setGetList] = useState([]);


    //페이징처리 함수
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //모달오픈함수
    const [modal, setModal] = React.useState(false);
    const handleOpen = () => {
        setModal(true);
    };
    const handleClose = () => {
        setModal(false);
    };


    //입력 모달오픈
    const [AddModal, setAddModal] = useState(false);
    const handleAddOpen = () => {
        setAddModal(true);
    };
    const handleAddClose = () => {
        setAddModal(false);
    };


    const [lampId, setLampId] = useState(''); //장비 아이디 (수정불가)
    const [region, setRegion] = useState(''); //지역 (수정불가)

    const [status, setStatus] = useState(''); //상태 (수정가능)
    const [cate, setCate] = useState('') // 보안등 (수정가능)
    const [user, setUser] = useState(''); //민원인
    const [company, setCompany] = useState(''); //업체 (수정가능)
    const [content, setContent] = useState(''); //점검내용 수정 (수정가능)


    //데이터 가져오기
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        fetch(`/api/exam/selectExamList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setGetList(res.data);
                setLoading(false);
            })
    }


    //데이터 삽입
    const AddExamData = async () => {
        const exam = {
            lamp_id: lampId,
            lamp_region: region,
            lamp_cate: cate,
            exam_status: status,
            exam_user: user,
            exam_company: company,
            exam_content: content
        }
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/exam/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify(exam)
        })
        setLampId('');
        setRegion('');
        setCate('');
        setStatus('');
        setUser('');
        setCompany('');
        setContent('');
        getData();
    }


    //수정하기
    const [editId, setEditId] = useState('');

    //수정할 아이디 가지고 내용가져오기
    const GetEditId = async (id) => {
        for (let list of getList) {
            if (list.sl_exam_idx === id) {
                setLampId(list.lamp_id);
                setRegion(list.lamp_region)

                setStatus(list.exam_status);
                setCate(list.lamp_cate);
                setCompany(list.exam_company);
                setContent(list.exam_content);
            }
        }
        setEditId(id);
    }


    const EditExamData = async () => {
        for (let list of getList) {
            if (list.sl_exam_idx === editId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/exam/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        exam_status: status,
                        lamp_cate: cate,
                        exam_company: company,
                        exam_content: content,
                        sl_exam_idx: list.sl_exam_idx
                    })
                })
            }
        }
        setStatus('');
        setCate('');
        setCompany('');
        setContent('');
        getData();
    }


    const Delete = async () => {
        for (let list of getList) {
            if (list.sl_exam_idx === editId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login').replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/exam/delete`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        sl_exam_idx: list.sl_exam_idx
                    })
                })
            }
        }
        getData();
    }


    return (
        <div>
            {
                Loading === true ? <Box sx={{display: 'flex'}} style={{marginLeft: "45%"}}>
                    <CircularProgress size={"7rem"} color={'info'}/>
                </Box> : null
            }

            <NewTab01
                AddModal={AddModal}
                setAddModal={setAddModal}
                handleAddClose={handleAddClose}
                lampId={lampId}
                setLampId={setLampId}
                region={region}
                setRegion={setRegion}
                status={status}
                setStatus={setStatus}
                cate={cate}
                setCate={setCate}
                user={user}
                setUser={setUser}
                company={company}
                setCompany={setCompany}
                content={content}
                setContent={setContent}
                AddExamData={AddExamData}
            />


            <Tab01Update
                modal={modal}
                setModal={setModal}
                handleClose={handleClose}
                lampId={lampId}
                setLampid={setLampId}
                region={region}
                setRegion={setRegion}
                status={status}
                setStatus={setStatus}
                cate={cate}
                setCate={setCate}
                company={company}
                setCompany={setCompany}
                content={content}
                setContent={setContent}
                EditExamData={EditExamData}
                Delete={Delete}
            />

            <Button
                variant="contained"
                // color={"inherit"}
                onClick={() => {
                    handleAddOpen();
                }}
                sx={{marginTop: 1, marginBottom: 1}}
                fullWidth
            > 유지보수신청<BsFillPencilFill/>
            </Button>

            <TableContainer>
                <Table sx={{minWidth: "100%"}} aria-label="simple table">
                    <TableHead style={TableHeader}>
                        <TableRow>
                            <TableCell size={"small"} style={TextWhite}>장비번호</TableCell>
                            <TableCell size={"small"} style={TextWhite}>신고내역</TableCell>
                            <TableCell size={"small"} style={TextWhite}>요청일자</TableCell>
                            <TableCell size={"small"} style={TextWhite}>민원처리상태</TableCell>
                            <TableCell size={"small"} style={TextWhite}>신고자성명</TableCell>
                            <TableCell size={"small"} style={TextWhite}>담당자업체</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (a, i) {
                                    return (
                                        <TableRow onClick={() => {
                                            GetEditId(a.sl_exam_idx)
                                            handleOpen();
                                        }}
                                                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                  className="tableHover" key={(rowsPerPage * page) + i}
                                        >
                                            <TableCell size={"small"} style={{width: "40px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.lamp_id}</TableCell>
                                            <TableCell size={"small"}
                                                       style={{width: "20px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_content}</TableCell>
                                            <TableCell size={"small"}
                                                       style={{width: "70px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_bgn_date}</TableCell>
                                            <TableCell size={"small"}
                                                       style={{width: "30px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_status}</TableCell>
                                            <TableCell size={"small"} style={{width: "30px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_user}</TableCell>
                                            <TableCell size={"small"}
                                                       style={{width: "30px",backgroundColor: TableCells.backgroundColor, color: TableCells.color}}>{a.exam_company}</TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 15, 20, 100]}
                component="div"
                count={getList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={Paginations}
            />


        </div>


    )
}

export default SL01Tab02;