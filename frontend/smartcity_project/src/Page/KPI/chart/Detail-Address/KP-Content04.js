import {useNavigate} from "react-router-dom";
import {AppBar} from "@progress/kendo-react-layout";
import FormControl from "@mui/material/FormControl";
import {MenuItem, Modal, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useContext, useEffect, useState} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {LoginContext} from "../../../../ContextServer/LoginContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {DetailExitIcon, TextBlack} from "../../../../Componet/style-config/light-theme";
import {KpiContext} from "../../../../ContextServer/KpiContext";

function KPContent04(){
    const {editDetailPage,setEditDetailPage} =useContext(KpiContext);
    const {access,RefreshToken} = useContext(LoginContext);
    const [getData, setGetData] = useState([]); //범죄사고 Data
    const [heat, setHeat] = useState([]); //온열질환자 DATA
    const [kpiAllList,setKpiAllList] = useState([]); //kpi 전체 리스트

    const [category, setCategory] = useState(0); // 범죄사고 POST 통계치 넣어줄 카테고리 hook
    const [month, setMonth] = useState("");//범죄사고 post  월별 hook
    const [count, setCount] = useState(0); // 범죄사고 post 건수 hook
    // category = 카테고리별
    // month  = 월별
    //count 횟수

    const onSelect = (e) => {
        setCategory(e.target.value);
    }
    const navigate = useNavigate();


    const GoKp = () => {
        if(editDetailPage === false) {
            navigate('/kpi');
        }else {
            navigate('/kpi/manage');
            setEditDetailPage(false);
        }
    }


    //ok 생성 팝업
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    //범죄 교통사고  GET API
    useEffect(() => {
        getKPiAPI();
    }, []);

    const getKPiAPI = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/kpi/ca`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setGetData(res.data);
            })
    }

//온열질환자 GET DATA
    useEffect(() => {
        getHeat();
    }, []);

    const getHeat = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/kpi/heat`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then((res) => res.json())
            .then((res) => {
                setHeat(res.data);
            })
    }

    //KPi Post
    const PostKpi = () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/kpi/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                category: category,
                kmonth: month,
                count: count
            })
        }).then((res) => res.json())
    }

    useEffect(() => {
        KpiList();
    }, [])



    const KpiList =  () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login').replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/kpi/dataList`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setKpiAllList(res.data)
        })
    }



    const options08 = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
        },
        title: {
            text: '온열 질환자 데이터',
            align: 'left',
            style: {
                color: TextBlack,
                fontSize: 12,
            }
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['1월', '2월', '3월', '4월'],
            labels: {
                style: {
                    color: TextBlack
                }
            },
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -0,
            y: -10,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#1c63c2',
            shadow: true,
            itemStyle: {
                color: '#ffff',
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '온열질환자',
            data: [0, 0, 1, 2],
            color: "#56a1ff",
            dataLabels: {
                enabled: true,
                format: "<p>{point.y}</p>",
                color: 'white',
            },
        }]
    };


    //온열질환자 카운터 배열로 정렬
    // 1.각 원하는 key 값 배열을 쪼갠다.
    //2. 쪼갠 배열이 string 값이면 차트삽입이 안되므로, 다시 map을 돌려서 형변환을 시켜준다.
    //3. 형 변환이 된 배열을 차트 for문에 삽입해준다.
    let heatArr = [];
    for (let i = 0; i < heat?.length; i++) {
        heatArr += heat[i]?.count
    }
    let HeatCountArr = [...heatArr];
    // stirng 배열 -> int 배열로 형변환 방법
    let HeatMapIntArr = HeatCountArr.map(Number);


    // //온열질환자 날짜값 배열정리
    let heatKmonth = [];
    for (let i = 0; i < heat?.length; i++) {
        heatKmonth += heat[i]?.kmonth;
    }
    let heatString = heatKmonth.toString().split(`2023-`);


    /// 온열질환자 데이터 삽입
    const optionsArr = [];
    for (let i = 0; i < heat?.length; i++) {
        let option_single = JSON.parse(JSON.stringify(options08));
        option_single.series[0].name = heat[i]?.name;
        option_single.series[0].data = HeatMapIntArr;
        option_single.xAxis.categories = heatString;

        optionsArr.push(option_single);

    }


    const options01 = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',

        },
        title: {
            text: '범죄/사고 데이터',
            align: 'left',
            style: {
                color: TextBlack,
                fontSize: 12,
            }
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: ['1월', '2월', '3월', '4월'],
            labels: {
                style: {
                    color: TextBlack
                }
            },
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -0,
            y: -10,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#1c63c2',
            shadow: true,
            itemStyle: {
                color: '#ffff',
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '범죄',
            data: [85.12, 51, 2, 3, 51],
        },
            {
                name: '교통사고',
                data: [85.12, 51, 2, 3, 51],
                color: "#3a0b8a"
            },
        ]
    };


    let resultArray = []; // 카운팅해서 반환할 결과값 배열

    //json value에 있는 중복 값을 카운팅 해주는 함수
    getData?.map(item => {
        if (resultArray.find(object => {
            if (object.category === item.category && object.name === item.name) {
                object.cnt++;
                return true;
            } else {
                return false;
            }
        })) {
        } else {
            item.cnt = 1;
            resultArray.push(item);
        }
    });

    //중복 된 value 값만 가져오는 이벤트
    const cate01 = getData?.filter((list) =>
        list.category.toLowerCase().includes('1')
    );
    const cate02 = getData?.filter((list) =>
        list.category.toLowerCase().includes('2')
    );


    //교통사고 카운터
    let cate01CountArr = [];
    for (let i = 0; i < cate01?.length; i++) {
        cate01CountArr += cate01[i]?.count
    }

    let Cate01Arr = [...cate01CountArr]
    let Cate01IntArr = Cate01Arr.map(Number)


    //범죄 카운터
    let Cate02newArr = []
    for (let i = 0; i < cate02?.length; i++) {
        let arr = [];
        arr = cate02[i]?.count;
        Cate02newArr.push(arr);
    }


    // 교통사고&범죄 날짜값 배열정리
    let GetDataKmonth01 = [];
    for (let i = 0; i < resultArray[0]?.cnt; i++) {
        GetDataKmonth01 += getData[i]?.kmonth;
    }

    let getDataString01 = GetDataKmonth01.toString().split(`2023-`);


    //범죄&사고각 배열에 보여줄 차트 데이터 삽입

    const optionsArrs = [];
    for (let i = 0; i < getData?.length; i++) {
        let option_single = JSON.parse(JSON.stringify(options01));

        option_single.series[0].name = resultArray[0].name;
        option_single.series[0].data = Cate01IntArr;
        option_single.xAxis.categories = getDataString01;

        option_single.series["1"].name = resultArray[1]&&resultArray[1]?.name;
        option_single.series["1"].data = Cate02newArr;
        option_single.xAxis.categories = getDataString01;

        optionsArrs.push(option_single);
    }

    return(
        <div>
            <AppBar themeColor={"light"}>
                <div className="Kp-Detail01">
                    <p className="k-icon k-i-x" style={DetailExitIcon} onClick={GoKp}></p>

                    <div className="Kp-Detail-table">
                        <h1 style={TextBlack}>사용자 편집 및 통계분석</h1>
                    </div>

                    <div className="user-kpi">

                        <FormControl variant="filled" sx={{m: 1, minWidth: "80%"}}>
                            <span style={{textAlign: "left"}}>데이터구분</span>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={category} onChange={(e) => onSelect(e)}
                                sx={{
                                    textAlign: "left"
                                }}
                            >
                                <MenuItem value={1}>범죄</MenuItem>
                                <MenuItem value={2}>교통사고</MenuItem>
                                <MenuItem value={3}>온열질환자</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="filled" sx={{m: 1, minWidth: "80%"}}>
                            <span style={{textAlign: "left"}}>월</span>
                            <TextField type="month" variant="outlined" value={month} onChange={(e) => setMonth(e.target.value)} />
                        </FormControl>


                        <FormControl variant="filled" sx={{m: 1,  minWidth: "80%"}}>
                            <span style={{textAlign: "left"}}>횟수</span>
                            <TextField type="number" variant="outlined"  value={count} onChange={(e) => setCount(e.target.value)} />
                        </FormControl>


                        <FormControl variant="filled" sx={{m: 1,  minWidth: "80%"}}>
                            <span style={{textAlign: "left"}}>기타</span>
                            <TextField type="textarea" variant="outlined" minRows={"100%"} />
                        </FormControl>


                        <div className="userEdit-5">
                            <Button variant="contained" className="kpi-save" onClick={()=>{
                                PostKpi();
                                handleOpen();
                            }}>저장</Button>
                            <Button variant="outlined" className="kpi-close" sx={{marginLeft: "0.5vh"}}>취소</Button>
                        </div>

                    </div>


                    <KPIModal open={open} handleClose={handleClose}/>

                    <div className="user-kpi1">
                        <HighchartsReact highcharts={Highcharts} options={optionsArr[0]} containerProps={{className: "chart01-8-B"}}/>


                        <HighchartsReact highcharts={Highcharts} options={optionsArrs[0]}
                                         containerProps={{className: "chart01-9-B"}}/>


                    </div>


                </div>



            </AppBar>
        </div>
    )
}
function KPIModal({open,handleClose}){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        color: "white",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        통계데이터가 정상적으로 입력되었습니다.
                    </Typography>

                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginTop: 1}}>
                        <Button variant="outlined" fullWidth onClick={()=>{
                            handleClose();
                        }}>확인</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}


export default KPContent04;