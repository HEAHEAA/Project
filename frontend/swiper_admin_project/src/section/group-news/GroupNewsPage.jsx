import {FiSearch} from "react-icons/fi";
import Button from "@mui/material/Button";
import {BookmarkAdd} from "@mui/icons-material";
import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TableContainerStyles, TableStyles} from "../../theme/mui-style-query.jsx";
import {AlignCenter} from "../../theme/same-style.jsx";
import {useNavigate} from "react-router-dom";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const GroupNewsPage = () => {
    const navigate = useNavigate();

    return(
        <div>
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
                                />
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" sx={{float: 'right'}} onClick={()=>{
                        navigate('/group-news/add');
                    }}>
                        그룹 소식 추가 &nbsp; <BookmarkAdd/>
                    </Button>
                </div>
                <hr color="#f1f1f1"/>
                <TableContainer sx={TableContainerStyles}>
                    <Table sx={TableStyles}>
                        <TableHead sx={{backgroundColor: "#ececec"}}>
                            <TableRow>
                                <TableCell align={"center"}>#</TableCell>
                                <TableCell align={"center"}>소식 파일1</TableCell>
                                <TableCell align={"center"}>소식 파일2</TableCell>
                                <TableCell align={"center"}>소식 파일3</TableCell>
                                <TableCell align={"center"}>자세히</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: "#ffffff"}}>
                            <TableRow>
                                <TableCell align={"center"}>#</TableCell>
                                <TableCell align={"center"}>소식 파일1</TableCell>
                                <TableCell align={"center"}>소식 파일2</TableCell>
                                <TableCell align={"center"}>소식 파일3</TableCell>
                                <TableCell align={"center"}>
                                    <Button onClick={()=>{
                                        navigate('/group-news/edit')
                                    }}>
                                        <EditCalendarIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/>
                <Pagination
                    count={10}
                    variant="outlined"
                    sx={AlignCenter}
                    onChange={(e) => handlePage(e)}
                />
                <br/>
            </div>
        </div>

    )
}
export default GroupNewsPage;
