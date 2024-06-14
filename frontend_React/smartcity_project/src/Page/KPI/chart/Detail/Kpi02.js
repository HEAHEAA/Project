import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {KpiContext} from "../../../../ContextServer/KpiContext";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import {SelectBoxs, TextWhite} from "../../../../Componet/style-config/light-theme";
function Kpi02() {
    const {access, RefreshToken} = useContext(LoginContext);
    const {falseFilter,} = useContext(KpiContext);
    const [value,setValue] = useState(18);
    const onSelect = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const [voteList,setVoteList] = useState([]);

    useEffect(()=>{
        VoteValue();
    },[value])
    const VoteValue = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/result?seqno=${value}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            }
        }).then(res => res.json()).then(res => {
            setVoteList(res.data.result)
        })
    }



    let val = [];

    let num01 = [];
    let num02 = [];
    let num03 = [];
    let num04 = [];
    let num05 = [];

    for(let i = 0; i< voteList?.length; i++){
      val.push(voteList[i]?.answer);
        num01.push(val[i][0]?.vote); // 그렇다
        num02.push(val[i][1]?.vote); //매우그렇다
        num03.push(val[i][3]?.vote); //아니다.
        num04.push(val[i][4]?.vote); // 전혀아니다
        num05.push(val[i][5]?.vote); //보통이다
    }


    const veryBad = num04.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);

    const bad = num03.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);

    const better = num05.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);

    const good = num01.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);

    const veryGood = num02.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);


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
        credits: {
            enabled: false
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
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                color: '#232323',
                fontWeight: 'light',
                marginTop: 50
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
            data: [{
                name: '매우만족',
                y:veryGood,
                sliced: true,
                selected: true,
                color: "#71a2ff"
            }, {
                name: '만족',
                y:good,
                color: "#b4f0ff"
            }, {
                name: '보통',
                y:15,
                color: "#9effbb"
            },{
                name: '나쁨',
                y:0,
                color: "#ffae51"
            },{
                name: '매우나쁨',
                y:0,
                color: "#ff8771"
            }
            ]
        }]
    };
    return (
        <div>
            <FormControl fullWidth sx={{marginTop: -3, zIndex: 9999999999, backgroundColor: SelectBoxs.backgroundColor}}>
                <InputLabel id="demo-simple-select-label">설문지 선택</InputLabel>
                <Select
                    sx={{color: TextWhite.color}}
                    value={value}
                    onChange={(e) => onSelect(e)}
                >
                    {
                        falseFilter.map(function (arr,inx){
                            return(
                                <MenuItem value={arr.seqno}>
                                    {arr.sv_title}
                                </MenuItem>
                            )
                        })
                    }

                </Select>
            </FormControl>

            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{className: "chart01-5-1"}}/>
        </div>
    )
}

export default Kpi02;

