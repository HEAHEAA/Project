import Button from "@mui/material/Button";
import {FiSearch} from "react-icons/fi";
import {AddLink, BorderColor, DeleteSweep, MapsUgc} from "@mui/icons-material";
import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AlignCenter} from "../../theme/same-style.jsx";
import {useContext, useEffect, useState} from "react";
import AddNews from "./AddNews.jsx";
import UpdateNewsModal from "./UpdateNews-Modal.jsx";
import {DeleteModal} from "../../components/modal/delete-modal.jsx";
import {TableContainerStyles, TableStyles} from "../../theme/mui-style-query.jsx";
import {NewsContext} from "../../context/news/NewsContext.jsx";

function NewsPageLayout() {
    const {
        newsWeek,
        getEditNewsData,
        DeleteNewsData
    } = useContext(NewsContext);

    //업계소식 추가 이벤트
    const [addModal, setAddModal] = useState(false);
    const handleOpen = () => setAddModal(true);
    const handleClose = () => setAddModal(false);

    //업계소식 수정 이벤트
    const [updateModal, setUpdateModal] = useState(false);
    const handleUpdateOpen = () => setUpdateModal(true);
    const handleUpdateClose = () => setUpdateModal(false);

    // 검색용
    const [filter, setFilter] = useState('');
    //페이징 처리

    const [page, setPage] = useState(1);
    const [data, setData] = useState([newsWeek]);
    const lastPage = newsWeek.length % 15 === 0 ? newsWeek.length / 15 : newsWeek.length / 15 + 1;
    let allPage = Math.ceil(newsWeek.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(newsWeek.slice(15 * (page - 1)));
        } else {
            setData(newsWeek.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, newsWeek]);
    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    return (
        <div>

            {/*모달*/}
            <AddNews
                addModal={addModal}
                handleClose={handleClose}
            />
            <UpdateNewsModal
                updateModal={updateModal}
                handleClose={handleUpdateClose}
            />
            <DeleteModal/>

            {/*모달*/}

            <div className="newsPage-layout">
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
                        handleOpen();
                    }}>
                        업계 소식 추가 &nbsp; <AddLink/>
                    </Button>
                </div>
                <hr color="#f1f1f1"/>

                <TableContainer sx={TableContainerStyles}>
                    <Table sx={TableStyles}>
                        <TableHead sx={{backgroundColor: "#ececec"}}>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell>날짜</TableCell>
                                <TableCell>수정</TableCell>
                                <TableCell>삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: "#ffffff"}}>
                            {
                                data
                                    .filter((datas) => {
                                        const title = datas?.in_content?.toLowerCase();
                                        const input = filter.toLowerCase();
                                        return title?.includes(input);
                                    })
                                    .map((news, idx) => (
                                        <TableRow key={news.in_idx}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell>{news.in_content}</TableCell>

                                            <TableCell>

                                                {news.start_week?.substring(0, 4)}년

                                                {
                                                    news.start_week?.substring(4, 6) === '10' ? news.start_week?.substring(4, 6) : (
                                                        news.start_week?.substring(4, 6) === '11' ? news.start_week?.substring(4, 6) : (
                                                            news.start_week?.substring(4, 6) === '12' ? news.start_week?.substring(4, 5) :
                                                                news.start_week?.substring(4, 5)
                                                        )
                                                    )
                                                }월


                                                {
                                                    news.start_week?.substring(4, 6) === '10' ? news.start_week?.substring(4, 5) : (
                                                        news.start_week?.substring(4, 6) === '11' ? news.start_week?.substring(4, 5) : (
                                                            news.start_week?.substring(4, 6) === '12' ? news.start_week?.substring(4, 5) :
                                                                news.start_week?.substring(5, 6)
                                                        )
                                                    )
                                                }주차


                                            </TableCell>

                                            <TableCell>
                                                <Button onClick={() => {
                                                    handleUpdateOpen();
                                                    getEditNewsData(news.in_idx);
                                                }}>
                                                    <BorderColor/>
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button color={"error"} onClick={() => {
                                                    if (window.confirm('정말 삭제 하시겠습니까?')) {
                                                        DeleteNewsData(news.in_idx)
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

export default NewsPageLayout;
