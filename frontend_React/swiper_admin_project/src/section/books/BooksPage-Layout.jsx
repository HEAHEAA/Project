import {FiSearch} from "react-icons/fi";
import Button from "@mui/material/Button";
import {BookmarkAdd, BorderColor, DeleteSweep} from "@mui/icons-material";
import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlignCenter} from "../../theme/same-style.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DeleteModal} from "../../components/modal/delete-modal.jsx";
import {TableContainerStyles, TableStyles} from "../../theme/mui-style-query.jsx";
import {BookContext} from "../../context/book/BookContext.jsx";

function BooksPageLayout() {
    const {
        bookWeek, getEditBookData,
        setBookTargetFile,
        setBookValue,
        DeleteBookData
    } = useContext(BookContext);
    const navigate = useNavigate();

    // 검색용
    const [filter, setFilter] = useState('');

    //페이징 처리
    const [page, setPage] = useState(1);
    const [data, setData] = useState(bookWeek);
    const lastPage = bookWeek.length % 15 === 0 ? bookWeek.length / 15 : bookWeek.length / 15 + 1;
    let allPage = Math.ceil(bookWeek.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(bookWeek.slice(15 * (page - 1)));
        } else {
            setData(bookWeek.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, bookWeek]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    return (
        <div>
            {/*모달*/}
            <DeleteModal/>
            {/*모달*/}
            <div className="booksPage-layout01">
                <div className="notice-search-header">
                    <div className="list-search">
                        <div className="box">
                            <div className="container-1">
                                <span className="icon"><FiSearch/></span>
                                <input
                                    type="search"
                                    id="search"
                                    placeholder="Search.."
                                    value={filter}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setFilter(inputValue);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <Button variant="contained" sx={{float: 'right'}} onClick={() => {
                        navigate('/book/add');
                        setBookValue({
                            re_content: "",
                            re_pic: "",
                            re_summary: "",
                            start_week: localStorage.getItem('year-week')
                        })
                    }}>
                        추천 도서 추가 &nbsp; <BookmarkAdd/>
                    </Button>
                </div>
                <hr color="#f1f1f1"/>

                <TableContainer sx={TableContainerStyles}>
                    <Table sx={TableStyles}>
                        <TableHead sx={{backgroundColor: "#ececec"}}>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>책 소개</TableCell>
                                <TableCell>수정</TableCell>
                                <TableCell>삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: "#ffffff"}}>
                            {
                                data
                                    .filter((datas) => {
                                        const title = datas?.re_content?.toLowerCase();
                                        const input = filter.toLowerCase();
                                        return title?.includes(input);
                                    })
                                    .map((arr) => (
                                        <TableRow key={arr.re_idx}>
                                            <TableCell>{arr.re_idx}</TableCell>
                                            <TableCell>{arr.re_content?.substring(0, 30)}...</TableCell>
                                            <TableCell>
                                                <Button onClick={() => {
                                                    getEditBookData(arr.re_idx);
                                                    setBookTargetFile(arr.re_pic);
                                                    navigate('/book/update');
                                                }}>
                                                    <BorderColor/>
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button color={"error"} onClick={() => {
                                                    if (window.confirm('정말 삭제 하시겠습니까?')) {
                                                        DeleteBookData(arr.re_idx);
                                                    }
                                                }}>
                                                    <DeleteSweep/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <Pagination
                    count={allPage}
                    variant="outlined"
                    sx={AlignCenter}
                    onChange={(e) => handlePage(e)}
                />
                <br/>
            </div>
        </div>

    )
}

export default BooksPageLayout;
