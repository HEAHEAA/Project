import {FiSearch} from "react-icons/fi";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TableContainerStyles, TableStyles} from "../../theme/mui-style-query.jsx";
import Button from "@mui/material/Button";
import {BorderColor} from "@mui/icons-material";
import {useContext} from "react";
import {DisplayEditContext} from "../../context/dashboard-edit/DisplayEditContext.jsx";
import {useNavigate} from "react-router-dom";
import '../../_style/dahboardEdit/dashboard-edit.css'

function DashboardEditPage(){
    const navigate = useNavigate();
    const {
        menuFilter,
        selectMenu,setSelectMenu
    } = useContext(DisplayEditContext);


    return(
        <div className="booksPage-layout01">
            {/*<div className="notice-search-header">*/}
            {/*    <div className="list-search">*/}
            {/*        <div className="box">*/}
            {/*            <div className="container-1">*/}
            {/*                <span className="icon"><FiSearch/></span>*/}
            {/*                <input*/}
            {/*                    type="search"*/}
            {/*                    id="search"*/}
            {/*                    placeholder="Search.."*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}
            {/*<hr color="#f1f1f1"/>*/}

            {/*<TableContainer sx={TableContainerStyles}>*/}
            {/*    <Table sx={TableStyles}>*/}
            {/*        <TableHead sx={{backgroundColor: "#ececec"}}>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell align={"center"}>#</TableCell>*/}
            {/*                <TableCell align={"center"}>메뉴명</TableCell>*/}
            {/*                <TableCell align={"center"}>수정</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody sx={{backgroundColor: "#ffffff"}}>*/}
            {/*            {*/}
            {/*                menuFilter*/}
            {/*                    .sort((a,b) => a.menu_code?.toLowerCase() < b.menu_code?.toLowerCase() ? -1 : 1)*/}
            {/*                    .map((arr,idx) => (*/}
            {/*                  <TableRow>*/}
            {/*                      <TableCell align={"center"}>{parseInt(arr.menu_code)+1}</TableCell>*/}
            {/*                      <TableCell align={"center"}>*/}
            {/*                          {arr.menu_name}*/}
            {/*                      </TableCell>*/}
            {/*                      <TableCell align={"center"}>*/}
            {/*                          <Button onClick={()=>{*/}
            {/*                              setSelectMenu(arr.menu_code);*/}
            {/*                              navigate('/dashboard-edit/detail');*/}
            {/*                          }}>*/}
            {/*                              <BorderColor/>*/}
            {/*                          </Button>*/}
            {/*                      </TableCell>*/}
            {/*                  </TableRow>*/}
            {/*              ))*/}
            {/*            }*/}

            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}

        </div>
    )
}
export default DashboardEditPage;
