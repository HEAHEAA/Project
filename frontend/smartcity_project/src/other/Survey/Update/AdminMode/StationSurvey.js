import {BsFillChatRightTextFill} from "react-icons/bs";
import Button from "@mui/material/Button";
import {BiMessageSquareAdd, BiUserCircle} from "react-icons/bi";
import TextField from "@mui/material/TextField";
import {FaSearch} from "react-icons/fa";
import {Card, CardActions, CardContent, TablePagination} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AiFillEdit} from "react-icons/ai";
import {AppBar} from "@progress/kendo-react-layout";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../ContextServer/SurveysContext";
import {useNavigate} from "react-router-dom";

function StationSurvey(){
    const {
        surveyAllList,
        SurveyMainSubmit,

        //설문조사 id 값 가져오기
        SurveyEditGetId
    } = useContext(SurveysContext);
    const navigate = useNavigate();

    //설문조사 전체 리스트
    useEffect(() => {
        SurveyMainSubmit();
    }, []);


    //현재 사용중인 값만 보여주기
    let falseFilter = surveyAllList.filter((datas) => datas.useyn === true);
    const [filter, setFilter] = useState(''); //검색용


    //페이징 함수
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return(
        <div>
            <AppBar themeColor={"dark"}>
                <div className="surveyMain-header">
                    <div className="surveyMain-header-1">
                        <p> 현재 진행중인 설문조사 <BsFillChatRightTextFill style={{marginLeft: "1vh"}}/></p>
                    </div>

                    <div className="surveyMain-header-2" onClick={() => {
                        navigate('/survey/user/home');
                    }}>
                        <Button variant="outlined" color={"inherit"}> 사용자 모드 변경 <BiUserCircle
                            style={{fontSize: 20, marginLeft: 5}}/></Button>
                    </div>
                </div>


                <div className="surveyMain-Content">
                    <div className="surveyMain-Content-search">
                        <TextField label="제목을 검색해주세요." sx={{width: "90%", float: "left", marginLeft: 1}}
                                   onChange={(e) => {const inputValue = e.target.value;setFilter(inputValue);}} value={filter}
                        />


                        <Button sx={{float: "left", marginLeft: 1, height: 55}} variant="contained" color={"info"}>
                            <FaSearch style={{color: "white"}}/>
                        </Button>
                    </div>

                    <div className="surveyMain-Content-add">
                        <Button variant="contained" color={"info"}
                                sx={{float: "right", marginRight: 1, width: "18%", height: 55}} onClick={() => {
                            navigate('/survey/post');
                        }}>
                            설문조사 생성<BiMessageSquareAdd style={{fontSize: 20, marginLeft: 5}}/>
                        </Button>
                    </div>


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
                                    <div key={arr.seqno}>
                                        {
                                            arr.useyn === false? null : <Card sx={{
                                                maxWidth: "100%",
                                                textAlign: "left",
                                                marginLeft: 1,
                                                border: "2px solid #595959"
                                            }}>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        {arr.sv_title}
                                                    </Typography>
                                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                        게시 시작일 : {arr.sv_stdate} ~ 게시 종료일 : {arr.sv_eddate}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {arr.sv_content.substring(0, 120)}...
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" color={"warning"} onClick={() => {
                                                        navigate(`/survey/put/${arr.seqno}`);
                                                        SurveyEditGetId(arr.seqno);
                                                    }}>
                                                        설문조사 수정 <AiFillEdit style={{fontSize: 16, marginLeft: 3}}/>
                                                    </Button>
                                                    {/*<Button size="small">*/}
                                                    {/*    답변 통계 <BsGraphUpArrow style={{fontSize: 16, marginLeft: 5}}/>*/}
                                                    {/*</Button>*/}
                                                </CardActions>
                                            </Card>
                                        }
                                        <br/>
                                    </div>
                                )
                            })
                    }

                    <TablePagination
                        sx={{minWidth: "100%"}}
                        variant="outlined"
                        rowsPerPageOptions={[4, 10, 15, 100]}
                        component="div"
                        count={falseFilter.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{width: "100%", backgroundColor: "#2c2c2c"}}
                        size={"small"}
                    />

                </div>


            </AppBar>
        </div>
    )
}
export default StationSurvey;