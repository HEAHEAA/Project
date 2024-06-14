import {FiSearch} from "react-icons/fi";
import {TableContainerStyles, TableStyles} from "../../theme/mui-style-query.jsx";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {BorderColor, DeleteSweep} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useState} from "react";

function UserLayout(){

    // 검색용
    const [filter, setFilter] = useState('');
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
                                    value={filter}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setFilter(inputValue);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr color="#f1f1f1"/>

                <TableContainer sx={TableContainerStyles}>
                    <Table sx={TableStyles}>
                        <TableHead sx={{backgroundColor: "#ececec"}}>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>아이디</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>부서</TableCell>
                                <TableCell>직급</TableCell>
                                <TableCell>수정</TableCell>
                                <TableCell>삭제</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: "#ffffff"}}>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>아이디</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>부서</TableCell>
                                <TableCell>직급</TableCell>
                                <TableCell>
                                    <Button>
                                        <BorderColor/>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button color={"error"}>
                                        <DeleteSweep/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}
export default UserLayout;
