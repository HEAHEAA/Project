import {useContext} from "react";
import {DisplayEditContext} from "../../context/dashboard-edit/DisplayEditContext.jsx";
import {
    BidEditPlay,
    BookEditPlay,
    ExcellentEditPlay,
    MainEditPlay,
    NewsEditPlay,
    NoticeEditPlay
} from "./edit-dashboard.jsx";
import '../../_style/dahboardEdit/dashboard-edit.css'
import {Table, TableCell, TableContainer, TableRow} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
function DashboardEditDetail(){
    const navigate = useNavigate();
    const {
        selectMenu,
        contentFilter,setContentFilter,
        UIEditSizeInsert
    }=  useContext(DisplayEditContext);

    return(
        <div className="display-edit-page">
            {/*<br/>*/}
            {/*<div className="display-edit-page-title">*/}
            {/*        {*/}
            {/*            selectMenu === "0" ? '메인화면' : (*/}
            {/*                selectMenu === "1" ? '공지사항 화면' : (*/}
            {/*                    selectMenu === "2" ? '우수사원/시상식 화면' : (*/}
            {/*                        selectMenu === "3" ? '낙찰/입찰 화면' : (*/}
            {/*                            selectMenu === "4" ? '소식뉴스 화면' : (*/}
            {/*                                selectMenu === "5" ? '추천도서 화면' : null*/}
            {/*                            )*/}
            {/*                        )*/}
            {/*                    )*/}
            {/*                )*/}
            {/*            )*/}
            {/*        }*/}
            {/*        편집*/}
            {/*</div>*/}

            {/*<div className="display-edit-play-box">*/}

            {/*    <div className="display-edit-play">*/}

            {/*        <div className="display-play-box">*/}
            {/*            {*/}
            {/*                selectMenu === "0" ? <MainEditPlay contentFilter={contentFilter}/> : (*/}
            {/*                    selectMenu === "1" ? <NoticeEditPlay contentFilter={contentFilter}/> : (*/}
            {/*                        selectMenu === "2" ? <ExcellentEditPlay contentFilter={contentFilter}/> : (*/}
            {/*                            selectMenu === "3" ? <BidEditPlay contentFilter={contentFilter}/> : (*/}
            {/*                                selectMenu === "4" ? <NewsEditPlay contentFilter={contentFilter}/> : (*/}
            {/*                                    selectMenu === "5" ? <BookEditPlay contentFilter={contentFilter}/> : null*/}
            {/*                                )*/}
            {/*                            )*/}
            {/*                        )*/}
            {/*                    )*/}
            {/*                )*/}
            {/*            }*/}

            {/*        </div>*/}

            {/*        <div className="display-edit-play-title">*/}
            {/*            편집*/}
            {/*        </div>*/}


            {/*        <div className="display-edit-table">*/}
            {/*            <TableContainer>*/}
            {/*                <Table>*/}
            {/*                    {*/}
            {/*                        contentFilter.map((arr,idx) => (*/}
            {/*                            <TableRow>*/}
            {/*                                <TableCell style={{width: "15%", backgroundColor: "#e3e3e3"}} size={"small"}>*/}
            {/*                                    <h4 style={{textAlign: "center"}}>{arr.menu_name}</h4>*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell style={{width: "85%"}} size={"small"}>*/}
            {/*                                    <TextField id="outlined-basic"*/}
            {/*                                               type={"number"}*/}
            {/*                                               variant="outlined"*/}
            {/*                                               value={arr.font_size}*/}
            {/*                                               onChange={(e) => {*/}
            {/*                                                   let copy = [...contentFilter];*/}
            {/*                                                   copy[idx] = {*/}
            {/*                                                       menu_name: arr.menu_name,*/}
            {/*                                                       menu_code: arr.menu_code,*/}
            {/*                                                       font_size: e.target.value*/}
            {/*                                                   }*/}
            {/*                                                   return setContentFilter(copy);*/}
            {/*                                               }}*/}
            {/*                                    /> px(픽셀)*/}
            {/*                                    &nbsp;*/}
            {/*                                    &nbsp;*/}
            {/*                                    &nbsp;*/}
            {/*                                    &nbsp;*/}


            {/*                                    <TextField id="outlined-basic" style={{width: "5%"}} type={"color"} variant="outlined"/>  &nbsp;&nbsp;*/}
            {/*                                    <TextField id="standard-basic" style={{width: "15%"}} label="Standard" variant="standard" />*/}
            {/*                                </TableCell>*/}

            {/*                            </TableRow>*/}
            {/*                        ))*/}
            {/*                    }*/}

            {/*                    <TableRow>*/}
            {/*                        <TableCell style={{width: "15%", backgroundColor: "#e3e3e3"}} size={"small"}>*/}
            {/*                            <h4 style={{textAlign: "center"}}>화면 표출 시간</h4>*/}
            {/*                        </TableCell>*/}
            {/*                        <TableCell style={{width: "85%"}} size={"small"}>*/}
            {/*                            <TextField id="outlined-basic"*/}
            {/*                                       type={"number"}*/}
            {/*                                       variant="outlined"*/}
            {/*                            /> 초*/}
            {/*                        </TableCell>*/}
            {/*                    </TableRow>*/}
            {/*                </Table>*/}
            {/*            </TableContainer>*/}
            {/*        </div>*/}

            {/*    </div>*/}


            {/*    <div className="edit-play-button">*/}
            {/*        <Button variant="contained" color={"inherit"} onClick={()=>{*/}
            {/*            navigate('/dashboard-edit')*/}
            {/*        }}>*/}
            {/*            목록으로*/}
            {/*        </Button>*/}
            {/*        <Button variant="contained" sx={{marginLeft: 1}} onClick={()=> {*/}
            {/*            if(window.confirm('저장하시겠습니까?')){*/}
            {/*                UIEditSizeInsert();*/}
            {/*                alert('저장 완료!')*/}
            {/*            }*/}
            {/*        }}>*/}
            {/*            화면 저장*/}
            {/*        </Button>*/}


            {/*    </div>*/}


            {/*</div>*/}



        </div>
    )
}
export default DashboardEditDetail;
