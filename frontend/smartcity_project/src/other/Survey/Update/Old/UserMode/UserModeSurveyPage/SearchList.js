import './style/searchlist.scss';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    tableCellClasses,
    Stack,
    Pagination, AppBar,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import MoveUpTwoToneIcon from '@mui/icons-material/MoveUpTwoTone';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import { BsPersonFillLock } from "react-icons/bs";


function SearchList() {
    const navigate = useNavigate();
    // 로고 버튼
    const handleLogo = () => {
        navigate("/");
    };
    // 1. 설문조사 목록 데이터 연동
    const [surveys, setSurveys] = useState([]);
    const getSurList = () => {
        axios
            .get(`/nodeApi/survey?pageno=1&rowcount=1000`)
            .then((response) => {
                const data = response.data.result?.map((survey) => {
                    return {
                        ...survey,
                        // 닐짜 뒷부분 정리 (replace 함수 처리)
                        sv_stdate: survey.sv_stdate,
                        sv_eddate: survey.sv_eddate,
                    };
                });
                setSurveys(data);
                // List가 1개라면, 바로 survey 페이지 나오게 하기.
                if (data.length === 1) {
                    const {seqno, sv_title, sv_content, sv_stdate, sv_eddate} = data[0];
                    handleClick(seqno, sv_title, sv_content, sv_stdate, sv_eddate);
                }
            })
            .catch((error) => {
                console.log("실패 :", error);
            });
    };
    useEffect(() => {
        getSurList();
    }, []);

    // 2. survey page에 state 값 넘겨주기
    const handleClick = (seqno, sv_title, sv_content, sv_stdate, sv_eddate) => {
        navigate(`/survey/${seqno}`, {
            state: {seqno, sv_title, sv_content, sv_stdate, sv_eddate},
        });
    };

    // 3. 최신순
    // 최신순 여부 상태 변수
    const [isLatest, setIsLatest] = useState(true);
    // 최신순 정렬 또는 다른 정렬 기준으로 리스트 정렬
    const handleSort = (key) => {
        if (key === "sv_stdate") {
            // "sv_stdate" 기준(시작일) 으로 내림차순 정렬
            const sortedSurveys = surveys.slice().sort((a, b) => {
                return new Date(b.sv_stdate) - new Date(a.sv_stdate);
            });
            setSurveys(sortedSurveys);
        } else {
            // 다른 key 값에 따라 오름차순 정렬
            const sortedSurveys = surveys.slice().sort((a, b) => {
                if (key === "seqno")
                    return a.seqno - b.seqno; // 번호를 오름차순으로 정렬
                else if (key === "sv_title")
                    return a.sv_title.localeCompare(b.sv_title); // 제목을 사전순으로 정렬
                else if (key === "sv_content")
                    return a.sv_content.localeCompare(b.sv_content); // 내용을 사전순으로 정렬
            });
            setSurveys(sortedSurveys);
        }
        setIsLatest(false); // 최신순 여부를 false로 설정
    };
    // 최신순으로 리스트를 정렬하는 함수
    const handleSortLatest = () => {
        const sortedSurveys = surveys.slice().reverse();
        setSurveys(sortedSurveys);
        setIsLatest(true);
    };

    // 4. 페이지 네이션
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지 당 아이템 수
    const totalPages = Math.ceil(surveys.length / itemsPerPage); // 전체 페이지 수

    // 페이지 변경 시 호출되는 함수
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage); // 현재 페이지 상태를 변경
    };

    // table커스터마이징
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,

        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    const darkTheme = createTheme({
        palette: {
            mode: 'light',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <AppBar color={'inherit'}>
                    <div className="listWrapper">
                        <header className="listHeader">
                            <div className="logoFlex">
                                <img
                                    className="logo"
                                    src={process.env.PUBLIC_URL + '/img/yesan.png'}
                                    alt="로고"
                                    onClick={handleLogo}
                                />
                            </div>

                            <div className="headflex">
                                <h2>설문조사</h2>
                                <div className="utileWrap">
                                    <ul className="locationWrap">
                                        <li className="n1">홈 <ArrowForwardIosIcon/></li>
                                        <li className="n2">소통과 참여 <ArrowForwardIosIcon/></li>
                                        <li className="n3">설문조사</li>
                                    </ul>
                                </div>



                            </div>

                        </header>


                        <div className="listBody">



                            <div className="titleMain">

                                <div className="titleLeft">
                                    <h3>설문조사 목록</h3>
                                    <Button variant="contained"  style={{float: "right"}} onClick={()=>{
                                        navigate('/survey')
                                    }}>
                                        관리자 모드변경 <BsPersonFillLock/>
                                    </Button>
                                    <Button
                                        className="sortButton"
                                        variant="outlined"
                                        size="small"
                                        onClick={handleSortLatest}
                                        endIcon={<MoveUpTwoToneIcon/>}
                                    >
                                        정렬
                                    </Button>



                                </div>
                            </div>
                            {/* 태이블 */}
                            <TableContainer className="tableContainer" component={Paper}>
                                <Table sx={{minWidth: 700}} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell onClick={() => handleSort("seqno")}>
                                                번호
                                            </StyledTableCell>
                                            <StyledTableCell onClick={() => handleSort("sv_title")}>
                                                주제
                                            </StyledTableCell>
                                            <StyledTableCell onClick={() => handleSort("sv_content")}>
                                                내용
                                            </StyledTableCell>
                                            <StyledTableCell onClick={() => handleSort("sv_stdate")}>
                                                시작일
                                            </StyledTableCell>
                                            <StyledTableCell onClick={() => handleSort("sv_eddate")}>
                                                종료일
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {surveys
                                            .slice(
                                                (currentPage - 1) * itemsPerPage,
                                                currentPage * itemsPerPage
                                            )
                                            .map((survey) => (
                                                <StyledTableRow
                                                    hover
                                                    key={survey.seqno}
                                                    onClick={() =>
                                                        handleClick(
                                                            survey.seqno,
                                                            survey.sv_title,
                                                            survey.sv_content,
                                                            survey.sv_stdate,
                                                            survey.sv_eddate
                                                        )
                                                    }
                                                >
                                                    <StyledTableCell
                                                        sx={{textAlign: 'center'}}>{survey.seqno}</StyledTableCell>
                                                    <StyledTableCell>{survey.sv_title}</StyledTableCell>
                                                    <StyledTableCell className="content-cell">
                                                        {survey.sv_content}
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                        sx={{textAlign: 'center'}}>{survey.sv_stdate}</StyledTableCell>
                                                    <StyledTableCell
                                                        sx={{textAlign: 'center'}}>{survey.sv_eddate}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* 페이지 네이션 */}
                            <div className="pagination">
                                <Stack spacing={2}>
                                    <Pagination count={totalPages} page={currentPage} onChange={handleChangePage}
                                                variant="outlined"/>
                                </Stack>
                            </div>

                        </div>
                    </div>
                </AppBar>
            </ThemeProvider>

        </div>
    )
}

export default SearchList;