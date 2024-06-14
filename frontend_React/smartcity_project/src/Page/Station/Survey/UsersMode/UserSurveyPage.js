import './css/surveyUserStyle.css';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {BsSearch} from "react-icons/bs";
import {TablePagination} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SurveysContext} from "../../../../ContextServer/SurveysContext";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import UserSurveyDetailPage from "./UserSurveyDetailPage";
import {TextWhite} from "../../../../Componet/style-config/light-theme";

function UserSurveyPage() {
    const {
        SurveyUserAllList,
        surveyList, setSurveyList,
        GetSurvey,
        mainSeq, setMainSeq,
    } = useContext(SurveysContext);
    const {access, RefreshToken, role} = useContext(LoginContext);

    const navigate = useNavigate();

    useEffect(() => {
        SurveyUserAllList();
    }, []);


    //현재 사용중인 값만 보여주기
    let falseFilter = surveyList.filter((datas) => datas.useyn === true);
    const [filter, setFilter] = useState(''); //전체리스트 검색용


    //페이징 함수
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //  //페이지가 1개라면 기본 첫번째 디테일 페이지가 보이도록
    useEffect(()=>{
        if(falseFilter.length === 1){
            GetSurvey(18);
            navigate('/survey/user/home/detail')
        }
    },[]);

    if(falseFilter.length === 1) {
        return (
            <UserSurveyDetailPage/>
        )
    }else {
        return (
            <div className="survey-box-body">
                <div className="survey-header">
                    <h2>2023 예산군 『스마트 버스정류장』 설문조사</h2>
                </div>

                <div className="survey-body">
                    <div className="survey-search-body">
                        <input
                            type={"text"}
                            placeholder="설문조사 제목을 입력해주세요."
                            value={filter}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                setFilter(inputValue)
                            }}
                        />
                        <Button variant="contained" color={"secondary"}><BsSearch/></Button>
                    </div>

                    <TableContainer>
                        <Table sx={{maxWidth: "70%", marginLeft: "15%", marginTop: 2}} aria-label="simple table">
                            <TableHead style={{backgroundColor: "#1f002c"}}>
                                <TableRow>
                                    <TableCell size={"small"} style={{width: 30,color:TextWhite.color}}>#</TableCell>
                                    <TableCell size={"small"} style={{width: 100,color:TextWhite.color}}>제목</TableCell>
                                    <TableCell size={"small"} style={{width: 150,color:TextWhite.color}}>내용</TableCell>
                                    <TableCell size={"small"} style={{width: 30,color:TextWhite.color}}>시작일</TableCell>
                                    <TableCell size={"small"} style={{width: 30,color:TextWhite.color}}>종료일</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    [...falseFilter]
                                        .reverse()
                                        .filter((data) => {
                                            const title = data.sv_title.toLowerCase();
                                            const input = filter.toLowerCase();
                                            return title.includes(input)
                                        })
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (arr, inx) {
                                            return (
                                                <TableRow key={(rowsPerPage * page) + inx} onClick={() => {
                                                    navigate(`/survey/user/home/detail`);
                                                    GetSurvey(arr.seqno);
                                                    setMainSeq(arr.seqno);
                                                }}>
                                                    <TableCell style={{width: 30, color: "black"}}>
                                                        {(rowsPerPage * page) + inx + 1}
                                                    </TableCell>
                                                    <TableCell style={{width: 100, color: "black"}}>
                                                        {arr.sv_title}
                                                    </TableCell>
                                                    <TableCell style={{width: 150, color: "black"}}>
                                                        {arr.sv_content.substring(0, 15)} ...
                                                    </TableCell>
                                                    <TableCell style={{width: 30, color: "black"}}>
                                                        {arr.sv_stdate}
                                                    </TableCell>
                                                    <TableCell style={{width: 30, color: "black"}}>
                                                        {arr.sv_eddate}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        sx={{maxWidth: "70%", marginLeft: "15%"}}
                        variant="outlined"
                        rowsPerPageOptions={[4, 10, 15, 100]}
                        component="div"
                        count={falseFilter.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{width: "70%", backgroundColor: "#1f002c"}}
                        size={"small"}
                    />

                </div>
            </div>
        )
    }


}

export default UserSurveyPage;