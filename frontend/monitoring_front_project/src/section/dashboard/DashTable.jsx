import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {useContext} from "react";
import {DashboardContext} from "../../context/dashboardContext.jsx";
import {themes} from "../../theme/darkThme.jsx";
import Button from "@mui/material/Button";

export const DashTable = () => {
    const {StateData,layout} = useContext(DashboardContext);
    return (
        <div>
            <div className="dash-table-layout">
                <TableContainer>
                    <Table>
                        <TableHead style={themes.dash_table_head}>
                            <TableRow>

                                <TableCell size={"small"} sx={{color: themes.color}}>
                                    <h4 style={{textAlign: "left"}}>지역</h4>
                                </TableCell>
                                <TableCell size={"small"} sx={{color: themes.color}}>
                                    <h4 style={{textAlign: "center"}}>사이트 정보</h4>
                                </TableCell>

                                <TableCell size={"small"} sx={{color: themes.color}}>
                                    <h4 style={{textAlign: "left"}}>성공 유/무</h4>
                                </TableCell>
                                <TableCell size={"small"} sx={{color: themes.color}}>
                                    <h4 style={{textAlign: "left"}}>시간</h4>
                                </TableCell>
                                <TableCell size={"small"} sx={{color: themes.color}}>
                                    <h4 style={{textAlign: "left"}}>사이트 이동</h4>
                                </TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody sx={themes.dash_table_body} style={{maxHeight: layout[1]?.h*35}}>
                            {
                                StateData.length === 0 ? <TableRow className="not-error-text"
                                                                   sx={{color: localStorage.getItem('mode') === 'dark' ? 'white' : 'black'}}>
                                    <TableCell>
                                        실시간 데이터가 없습니다.
                                    </TableCell>
                                </TableRow> : <>
                                    {
                                        StateData.map((arr) => (
                                            <TableRow key={arr.id}>

                                                <TableCell size={"small"} sx={{color: themes.color}}>
                                                    <h4 style={{textAlign: "left"}}>
                                                        {arr.login_success === true ?
                                                            <span> {arr.name}</span> :
                                                            <span style={{color: "red"}}> {arr.name}</span>}

                                                    </h4>
                                                </TableCell>
                                                <TableCell size={"small"} sx={{color: themes.color}}>
                                                    <h4 style={{textAlign: "center"}}>
                                                        {arr.login_success === true ?
                                                            <span> {arr.site_info}</span> :
                                                            <span style={{color: "red"}}> {arr.site_info}</span>}

                                                    </h4>
                                                </TableCell>

                                                <TableCell size={"small"} sx={{color: themes.color}}>
                                                    <h4 style={{textAlign: "center"}}>
                                                        {arr.login_success === true ?
                                                            <span style={{color: "yellowgreen"}}>O</span> :
                                                            <span style={{color: "red"}}>X</span>}
                                                    </h4>
                                                </TableCell>
                                                <TableCell size={"small"} sx={{color: themes.color}}>
                                                    <h4 style={{textAlign: "left"}}>
                                                        {arr.login_success === true ?
                                                            <span> {arr.time.slice(5,16)}</span> :
                                                            <span style={{color: "red"}}> {arr.time.slice(5,16)}</span>}

                                                    </h4>
                                                </TableCell>

                                                <TableCell size={"small"} sx={{color: themes.color}}>

                                                    {arr.login_success === true ?
                                                        <Button variant="contained" color={"info"} onClick={() => {
                                                            window.open(arr.url);
                                                        }}>
                                                            접속
                                                        </Button> :
                                                        <span style={{color: "red"}}> 접속불가 </span>}


                                                </TableCell>

                                            </TableRow>
                                        ))
                                    }
                                </>

                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
