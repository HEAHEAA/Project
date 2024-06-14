import {useNavigate} from "react-router-dom";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {useContext} from "react";
import {StationContext} from "../../../../ContextServer/StationContext";
import * as React from "react";
import {BsXLg} from "react-icons/bs";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import {AppBar,} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {
    DetailExitIcon,
    DetailPageBg, TableCells,
    TableHeader,
    TextBlack,
    TextWhite
} from "../../../../Componet/style-config/light-theme";


function ReContent02(){
    const {RecordName,timeList, agent, startDate,
        endDate, setEndDate,} = useContext(StationContext);
    const navigate = useNavigate();

    //탭를 위한 함수
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


        let values = [];
        let dust = [];
        for (let i = 0; i < timeList.length; i++) {
            if(agent === 'arss'){
                values.push(timeList[i].vals);
            }
        }


        let good = [];
        let better = [];
        let bad = [];
        let veryBad = [];
        for (let j = 0; j < values.length; j++) {
            if (agent === 'arss') {
                dust.push(values[j][2]);

                if (0 <= values[j][2] && values[j][2] <= 15) {
                    good.push(values[j][2]);
                }
                if (15 < values[j][2] && values[j][2] <= 35) {
                    better.push(values[j][2]);
                }
                if (36 < values[j][2] && values[j][2] <= 76) {
                    bad.push(values[j][2]);
                }
                if (76 < values[j][2]) {
                    veryBad.push(values[j][2]);
                }
            }
        }

        const options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                backgroundColor: "transparent",
            },
            title: {
                text: '',
                align: 'left'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                itemStyle: {
                    color: '#000000',
                    fontWeight: 'light'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true
                },
                series: {
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.percentage:.1f}%'
                    }
                }
            },
            series: [{
                name: RecordName,
                colorByPoint: true,
                data: [{
                    name: `좋음 (${good.length}건)`,
                    y: good.length,
                    sliced: true,
                    selected: true,
                    color: "#61c1ff"
                }, {
                    name: `보통 (${better.length}건)`,
                    y: better.length,
                    color: "#ffe250"
                }, {
                    name: `나쁨 (${bad.length}건)`,
                    y: bad.length,
                    color: "coral"
                }, {
                    name: `매우나쁨 (${veryBad.length}건)`,
                    y: veryBad.length,
                    color: "red"
                }]
            }]
        };
        return(
            <div>
                <div className="Se-Detail01">
                    <AppBar sx={DetailPageBg}>
                        <Box sx={{width: '100%', typography: 'body1'}}>
                            <BsXLg style={DetailExitIcon}
                                   onClick={() => {
                                       navigate(`/station/record`)
                                   }}/>

                            <TabContext value={value}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <TabList o aria-label="lab API tabs example" onChange={handleChange}>
                                        <Tab label="미세먼지 차트" value="1"/>
                                    </TabList>
                                </Box>

                                <TabPanel value="1">
                                    {
                                        agent === "arss" ? <div>
                                            <HighchartsReact highcharts={Highcharts} options={options}/>

                                            <h6 style={{float: "left",color: TextBlack.color}}>설정날짜 : {startDate} ~ {endDate} </h6>

                                            <TableContainer style={{cursor: "default"}} sx={{marginTop: 1}}>
                                                <Table sx={{minWidth: 700}} aria-label="simple table">
                                                    <TableHead style={TableHeader}>
                                                        <TableRow>
                                                            <TableCell align={"center"} style={TextWhite}>좋음</TableCell>
                                                            <TableCell align={"center"} style={TextWhite}>보통</TableCell>
                                                            <TableCell align={"center"} style={TextWhite}>나쁨</TableCell>
                                                            <TableCell align={"center"} style={TextWhite}>매우나쁨</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableCell align={"center"} style={TableCells}>{good.length} 건</TableCell>
                                                        <TableCell align={"center"} style={TableCells}>{better.length} 건</TableCell>
                                                        <TableCell align={"center"} style={TableCells}>{bad.length} 건</TableCell>
                                                        <TableCell align={"center"} style={TableCells}>{veryBad.length} 건</TableCell>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                        </div> : null
                                    }
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </AppBar>
                </div>
            </div>
        )

}
export default ReContent02;

