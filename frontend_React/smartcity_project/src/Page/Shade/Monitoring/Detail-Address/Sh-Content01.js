import {useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {AppBar, LinearProgress, TablePagination} from "@mui/material";
import {useEffect, useState} from "react";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {
    DetailExitIcon,
    DetailPageBg,
    TableCells,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";

function ShContent01() {
    const [shadeList, setShadeList] = useState([]);
    const [mapOnClick, setMapOnClick] = useState(0);//리스트 클릭 시, mapId값으로 비교
    const [loading, setLoading] = useState(true);


    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    //페이징
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        ShadeGetList();
    }, []);

    const ShadeGetList = async () => {
        await fetch(`/nodeApi/smartShade`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(res => {
            setShadeList(res.result)
            setLoading(false);
        })
    }

    //풍향값 연산함수
    let wind = [];
    for (let i = 0; i < shadeList.length; i++) {
        let cate = ['북', '북북동', '북동', '동북동', '동', '동남동', '남동', '남남동', '남', '남남서', '남서', '서남서', '서', '서북서', '북서', '북북서'];
        let ceil = cate[Math.ceil(shadeList[i].wind / 22.5)]
        wind.push(ceil);
    }

    const navigate = useNavigate();
    const GoSh = () => {
        navigate('/smart_shade');
    }


    return (
        <div>
            <div className="Se-Detail01">
                <AppBar  sx={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/smart_shade`)
                               }}/>

                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                    <Tab label="스마트 그늘막 시설물 목록" value="1"/>
                                </TabList>
                            </Box>

                            <TabPanel value="1">
                                {
                                    loading === true ? <LinearProgress color="inherit"/> : null
                                }

                                <TableContainer
                                                sx={{
                                                    "&::-webkit-scrollbar": {
                                                        width: 10,
                                                        height: 10,
                                                        cursor: "default"
                                                    },
                                                    "&::-webkit-scrollbar-track": {
                                                        backgroundColor: "#565656",
                                                    },
                                                    "&::-webkit-scrollbar-thumb": {
                                                        backgroundColor: "#282828",
                                                        borderRadius: 0
                                                    }
                                                }}>
                                    <Table sx={{minWidth: 1880, fontSize: 11}} aria-label="simple table">
                                        <TableHead style={TableHeader}>
                                            <TableRow>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>장비명</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>위치주소(시도)</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>위치주소(시군구)</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>상세주소</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>y좌표</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>x좌표</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>온도</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>전력</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>풍향</TableCell>
                                                <TableCell style={{width: 50, color:TextWhite.color}}>기록시간</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                shadeList
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(function (a, i) {
                                                        return (
                                                            <TableRow key={(rowsPerPage * page) + i} onClick={() => {
                                                                setMapOnClick(a.id);
                                                            }} className="tableHover">
                                                                <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.fname}</TableCell>
                                                                <TableCell style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.loc1}</TableCell>
                                                                <TableCell style={{width: 70,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.loc2}</TableCell>
                                                                <TableCell style={{width: 150,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.loc3}</TableCell>
                                                                <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.lat}</TableCell>
                                                                <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.longi}</TableCell>

                                                                <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.temp}</TableCell>
                                                                <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.power}</TableCell>
                                                                <TableCell style={{width: 50,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{wind[i]}</TableCell>
                                                                <TableCell style={{width: 100,backgroundColor:TableCells.backgroundColor,color:TableCells.color}}>{a.logtime}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                            }
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        sx={{minWidth: "100%"}}
                                        variant="outlined"
                                        rowsPerPageOptions={[15, 20, 30, 100]}
                                        component="div"
                                        count={shadeList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        style={{width: "100%", backgroundColor: "#1c63c2", color: "white"}}
                                        size={"small"}
                                    />
                                </TableContainer>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>

        </div>
    )
}

export default ShContent01;