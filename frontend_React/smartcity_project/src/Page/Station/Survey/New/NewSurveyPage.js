import {useContext, useEffect, useState} from "react";
import {SurveysContext} from "../../../../ContextServer/SurveysContext";
import Button from "@mui/material/Button";
import {BsFillChatRightTextFill, BsGraphUpArrow} from "react-icons/bs";
import TextField from "@mui/material/TextField";
import {AppBar} from "@progress/kendo-react-layout";
import {Card, CardActions, CardContent, TablePagination} from "@mui/material";
import * as React from "react";
import {BiMessageSquareAdd, BiUserCircle} from "react-icons/bi";
import {FaSearch} from "react-icons/fa";
import Typography from "@mui/material/Typography";
import {AiFillEdit} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {MenuContext} from "../../../../ContextServer/MenuContext";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import TotalVote from "./Vote/TotalVote";

function NewSurveyPage() {
    const {surveyAllList, SurveyMainSubmit,surveyNum,setSurveyNum} = useContext(SurveysContext);
    const navigate = useNavigate();
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
            ac = localStorage.getItem('login')?.replaceAll('"', '')
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

    //투표결과 모달창
    // 답변[생성]모달
    const [vote, setVote] = useState([]);
    const [voteResult,setVoteResult] = useState([]);
    const [seq,setSeq] = useState(0);
    const [Open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const voteGetSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/result?seqno=${seq}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            }
        }).then(res => res.json()).then(res => {
            setVote(res.data);
            setVoteResult(res.data.result);
        })
    }


    useEffect(() => {
        voteGetSubmit();
    }, [seq]);


    return (
        <div>
            <AppBar>
                <TotalVote vote={vote} voteResult={voteResult} Open={Open} handleClose={handleClose} seq={seq} voteGetSubmit={voteGetSubmit}/>

                <div className="surveyMain-header">
                    <div className="surveyMain-header-1">
                        <p> 현재 진행중인 설문조사 <BsFillChatRightTextFill style={{marginLeft: "1vh"}}/></p>
                    </div>

                    <div className="surveyMain-header-2">
                        <Button variant="outlined" color={"inherit"} onClick={() => {navigate(`/survey/user/home`)}}> 사용자 모드 변경 <BiUserCircle
                            style={{fontSize: 20, marginLeft: 5}}/></Button>
                    </div>
                </div>


                <div className="surveyMain-Content">
                    <div className="surveyMain-Content-search">
                        <TextField label="제목을 검색해주세요." sx={{width: "90%", float: "left", marginLeft: 1}}
                                   onChange={(e) => {
                                       const inputValue = e.target.value;
                                       setFilter(inputValue);
                                   }} value={filter}
                        />


                        <Button sx={{float: "left", marginLeft: 1, height: 55}} variant="contained" color={"info"}>
                            <FaSearch style={{color: "white"}}/>
                        </Button>
                    </div>

                    <div className="surveyMain-Content-add">
                        <Button variant="contained" color={"info"}
                                sx={{float: "right", marginRight: 1, width: "18%", height: 55}} onClick={()=>{
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
                                            arr.useyn === false ? null : <Card sx={{
                                                maxWidth: "100%",
                                                textAlign: "left",
                                                marginLeft: 1,
                                                border: "1px solid white",
                                                backgroundColor: "#154e9a",
                                                color: "white"
                                            }}>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        {arr.sv_title}
                                                    </Typography>
                                                    <Typography sx={{fontSize: 14}} color="white" gutterBottom>
                                                        게시 시작일 : {arr.sv_stdate} ~ 게시 종료일 : {arr.sv_eddate}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {arr.sv_content.substring(0, 120)}...
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button variant="contained" size="small" color={"warning"} onClick={() => {
                                                        navigate(`/survey/put/${arr.seqno}`);
                                                        setSurveyNum((rowsPerPage * page) + inx);
                                                    }}>
                                                        설문조사 수정 <AiFillEdit style={{fontSize: 16, marginLeft: 3}}/>
                                                    </Button>
                                                    {/*<Button size="small" variant="contained" onClick={()=>{*/}
                                                    {/*    handleOpen();*/}
                                                    {/*    setSeq(arr.seqno);*/}
                                                    {/*}}>*/}
                                                    {/*    투표 결과보기*/}
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
                        style={{width: "100%", backgroundColor: "#1c63c2",color:"white"}}
                        size={"small"}
                    />


                </div>


            </AppBar>
        </div>
    )
}

export default NewSurveyPage;