import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {KpiContext} from "../../../../ContextServer/KpiContext";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {AppBar, MenuItem, Select, TablePagination} from "@mui/material";
import Box from "@mui/material/Box";
import {BsXLg} from "react-icons/bs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
    DetailExitIcon,
    DetailPageBg,
    SelectBoxs,
    TableHeader,
    TextWhite
} from "../../../../Componet/style-config/light-theme";
import Text from "ol/style/Text";

function KpContent02() {
    const [values, setValues] = React.useState('1');
    const navigate = useNavigate();
    const {access, RefreshToken} = useContext(LoginContext);

    const {
        Survey,
        falseFilter,
        dateSurveyList,
        setDateSurveyList,
        sdate,
        setSdate,
        edate,
        setEdate,
        DateSurveyDataOnSubmit
    } = useContext(KpiContext);


    const [value, setValue] = useState(18);
    const onSelect = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const [voteList, setVoteList] = useState([]);
    useEffect(() => {
        VoteValue();
        Survey();
    }, [value]);


    //1. 설문조사 날짜별 조회
    useEffect(() => {
        DateSurveyDataOnSubmit();
    }, [value, sdate, edate]);

    let selectFilterGet = [];
    for (let i = 0; i < dateSurveyList.length; i++) {
        if (dateSurveyList[i][0].seqno === value) {
            selectFilterGet.push(dateSurveyList[i])
        }
    }


    //2 .테이블에 표출할 날짜별 타이틀, 투표수
    let select = [];
    for (let i = 0; i < selectFilterGet["0"]?.length; i++) {
        select.push({
            title: selectFilterGet[0][i]?.sv_ans_content,
            vote: selectFilterGet[0][i]?.vote
        })
    }

    //3 .중복값끼리 묶기
    const groupValues = select.reduce((acc, current) => {
        acc[current.title] = acc[current.title] || [];
        acc[current.title].push(current.vote);
        return acc;
    }, {});

    //3-1. 위에서 만든 객체를 key로 돌려서 새로운 객체 return
    const groups = Object.keys(groupValues).map((key) => {
        return {title: key, vote: [groupValues[key]]};
    });



    //4. 중복값끼리 합친 vote array 값 합치기
    let vote = [];
    let title = [];
    for(let i = 0; i<groups.length; i++){
        vote.push(groups[i].vote);
        title.push(groups[i].title);
    }
    let voteSum = [];
    let chartData = [];
    for(let j =0; j<vote.length; j++){
        let sum = 0;
        voteSum.push(parseInt(sum += vote[j][0]))

        chartData.push({
            name: groups[j].title,
            y: parseInt(sum += vote[j][0])
        })
    }


    const VoteValue = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/result?seqno=${value}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            }
        }).then(res => res.json()).then(res => {
            setVoteList(res.data.result)
        })
    }

    //날짜별 데이터 엑셀출력하기
    const XlFun = (e) => {
        e.preventDefault();
        e.persist();

        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
        } else {
            ac = access
        }
        axios({
            url: '/api/excel/survey',
            method: "POST",
            responseType: 'blob',
            headers: {
                Authorization: 'Bearer ' + ac,
            },
            data: {
                sdate: sdate,
                edate: edate
            }
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data],{
                type: res.headers['content-type']
            }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'xlsx');
            document.body.appendChild(link);
            link.click();
            window.location.reload();
        })

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
                color: 'black',
                fontWeight: 'light'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: '군민만족도',
            colorByPoint: true,
            data: chartData
        }]
    };
    return (
        <div>
            <div className="Se-Detail01">
                <AppBar style={DetailPageBg}>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <BsXLg style={DetailExitIcon}
                               onClick={() => {
                                   navigate(`/kpi`);
                               }}/>

                        <TabContext value={values}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList o aria-label="lab API tabs example">
                                    <Tab label="군민 만족도 조사 통계" value="1"/>
                                </TabList>
                            </Box>


                            <TabPanel value="1">
                                <div className="kpi-box-table">
                                    <FormControl fullWidth sx={SelectBoxs}>
                                        <InputLabel id="demo-simple-select-label">설문지 선택</InputLabel>
                                        <Select
                                            sx={{color: TextWhite.color}}
                                            value={value}
                                            onChange={(e) => onSelect(e)}
                                        >
                                            {
                                                falseFilter.map(function (arr, inx) {
                                                    return (
                                                        <MenuItem value={arr.seqno}>
                                                            {arr.sv_title}
                                                        </MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                    <br/>

                                    <div className="kpi-chart-date">
                                        <div className="kpi-chart-date-text">
                                            시작일
                                        </div>
                                        <div className="kpi-chart-date-form">
                                            <TextField
                                                type={"date"}
                                                id="outlined-basic"
                                                variant="outlined"
                                                fullWidth
                                                sx={{paddingRight: 2, color: TextWhite.color}}
                                                value={sdate}
                                                onChange={(e) => setSdate(e.target.value)}

                                            />
                                        </div>
                                        <div className="kpi-chart-date-text">
                                            종료일
                                        </div>
                                        <div className="kpi-chart-date-form">
                                            <TextField
                                                type={"date"}
                                                id="outlined-basic"
                                                variant="outlined"
                                                fullWidth
                                                sx={{paddingRight: 2,color: TextWhite.color}}
                                                value={edate}
                                                onChange={(e) => setEdate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>

                                    <HighchartsReact highcharts={Highcharts} options={options}/>

                                    <hr/>
                                    <form onSubmit={(e) => XlFun(e)}>
                                        <Button variant="contained"
                                                sx={{float: "right", marginRight: 2}}
                                                color={"success"}
                                                type={"submit"}
                                        >
                                            엑셀 다운로드</Button>
                                    </form>

                                    <TableContainer>
                                        <Table sx={{minWidth: "100%", fontSize: 11}} aria-label="simple table">
                                            <TableHead style={TableHeader}>
                                                <TableRow>
                                                    {
                                                        groups.map((arr, inx) => (
                                                            <>
                                                                <TableCell size={"small"} align={"center"} style={TextWhite}>{arr.title}</TableCell>
                                                            </>

                                                        ))
                                                    }
                                                </TableRow>

                                            </TableHead>
                                            <TableBody >
                                                <TableRow>
                                                    {
                                                        voteSum.map((arr,inx) => (
                                                            <TableCell size={"small"} align={"center"}>{arr}</TableCell>
                                                        ))
                                                    }

                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </AppBar>
            </div>

        </div>
    )
}

export default KpContent02;


