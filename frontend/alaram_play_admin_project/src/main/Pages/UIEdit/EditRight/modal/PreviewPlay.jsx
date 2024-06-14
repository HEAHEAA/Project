import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import logo from "../../../../../assets/img/youngjin-logo.png";
import cloudGood from "../../../../../assets/img/cloud-good.png";
import cloudMany from "../../../../../assets/img/cloud-many.png";
import cloudBad from "../../../../../assets/img/cloud-bad.png";
import weathers from "../../../../../assets/img/cloud-Little.png";
import DisplayFoot from "../../Display/Foot/DisplayFoot.jsx";
import {useContext, useEffect, useRef} from "react";
import {WeatherContext} from "../../../../../api/UIEdit/Display/WeatherContext.jsx";
import {NodeContext} from "../../../../../api/UIEdit/Display/NodeContext.jsx";
import {DisplayResize} from "../../../../../api/UIEdit/Display/DisplayResize.jsx";
import {DisplayDataContext} from "../../../../../api/UIEdit/Display/DisplayDataContext.jsx";
import {PlaybackContext} from "../../../../../api/PlayBack/PlaybackContext.jsx";
import {FileListContext} from "../../../../../api/FileList/FileListContext.jsx";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

//state
import {VeryGood, Better, Bad, VeryBad,} from "./Preview-state.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


function PreviewPlay({open, handleClose}) {
    const {weather} = useContext(WeatherContext);
    const {sensorFic} = useContext(NodeContext);
    const {resizeList,
        updateResize,
        ResizingNumberUpdate,
        resizeModal,setResizeModal
    } = useContext(DisplayResize);
    const {
        //스와이퍼 아이디
        swiperIdx,
        setSwiperIdx,
        //스와이퍼 돌리는 로드
        swiperUrl,
    } = useContext(PlaybackContext);
    const {GetFileList} = useContext(FileListContext);
    const {PlayBackListOnsubmit,} = useContext(PlaybackContext);

    useEffect(() => {
        //1. 파일리스트
        GetFileList();
        //2. 현재 재생목록 리스트
        PlayBackListOnsubmit();
    }, []);


    //swiper
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    //swiper 이벤트
    //1-1. array len값에 맞춰서 time값을 받아오고 해당 받아온 값을 스와이퍼 시간에 넣어준다
    let timeIss = swiperUrl[swiperIdx]?.time || 10000;
    const handleSwiperChange = (swiperCore) => {
        const {activeIndex} = swiperCore;
        setSwiperIdx(activeIndex);
    }

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    //1. 복합악취 4개일땐 이 함수만 사용
    let sensorSplit = sensorFic.grade?.split('#');
    let gradeArr = [];
    for (let i = 0; i < sensorSplit?.length; i++) {
        gradeArr.push(sensorSplit[i].split('|'));
    }

    let sensorGrade = sensorFic.sensor_data?.split('#');
    let gradeAddr = []; // 수치값
    for (let i = 0; i < sensorGrade?.length; i++) {
        gradeAddr.push(sensorGrade[i].split('|')[1]);
    }

    // 현재 시간 계산하기
    const now = new Date();
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const koreaTimeDiff = 9 * 120 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff).toISOString();
    const update = koreaNow.replaceAll('T', ' ');
    const nows = update.replaceAll('Z', ' ').substring(0, 16);


    const dateIs = nows.substring(0, 10);
    const dateReplace = dateIs.replaceAll('-', '');

    const timeIs = nows.substring(11, 13);
    const timeResut = timeIs + '00'


    //1.날씨
    let temp = []; //기온
    let pty = []; //강수량 코드 //0없음 ,1. 비 ,2. 비/눈, 3. 눈,  5.빗방울, 6. 빗방울 눈날림, 7.눈날림
    let sky = []; //하늘상태 코드값

    for (let i = 0; i < weather.length; i++) {
        if (weather[i].category === 'TMP') {
            temp.push(weather[i])
        }
        if (weather[i].category === 'PTY') {
            pty.push(weather[i]);
        }
        if (weather[i].category === "SKY") {
            sky.push(weather[i]);
        }
    }

    let skyValue = [];
    for (let i = 0; i < sky.length; i++) {
        if (sky[i]?.fcstDate === dateReplace && sky[i]?.fcstTime === timeResut) {
            skyValue.push(sky[i])
        }
    }

    let ptyValue = [];
    for (let i = 0; i < pty.length; i++) {
        if (pty[i]?.fcstDate === dateReplace && pty[i].fcstTime === timeResut) {
            ptyValue.push(pty[i]);
        }
    }

    let TempValue = [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i]?.fcstDate === dateReplace && temp[i].fcstTime === timeResut) {
            TempValue.push(temp[i]);
        }
    }


    let ws = [];
    let ds = [];
    let cs = [];
    let fs = [];
    for (let i = 0; i < resizeList.length; i++) {
        if (resizeList[i].name === '날씨 정보') {
            ws.push(resizeList[i]);
        }
        if (resizeList[i].name === '대기 정보') {
            ds.push(resizeList[i]);
        }
        if (resizeList[i].name === '홍보물 정보') {
            cs.push(resizeList[i])
        }
        if (resizeList[i].name === '뉴스 정보') {
            fs.push(resizeList[i])
        }
    }

    const Header = () => {
        return (
            <div className="ui-display-weather-size-mini"
                 style={{width: parseInt(ws[0]?.width / 2.16), height: parseInt(ws[0]?.height / 1.8)}}>
                <div className="dis-head-mini">
                    <section>
                        <img src={logo} alt="logo-pic"/>
                        <p>{sensorFic.sys_net_node_name}</p>
                    </section>
                    <section>
                        {
                            skyValue[0]?.fcstValue === '1' ? <img src={cloudGood} alt="weather-pic"/> : (
                                skyValue[0]?.fcstValue === '3' ? <img src={cloudMany} alt="weather-pic"/> : (
                                    skyValue[0]?.fcstValue === '4' ? <img src={cloudBad} alt="weather-pic"/> :
                                        <img src={weathers} alt="weather-pic"/>
                                )
                            )
                        }
                        <div className="header-text">
                            <p>{nows}</p>
                            <p>
                                오늘날씨 |
                                {
                                    skyValue[0]?.fcstValue === '1' ? '맑음' : (
                                        skyValue[0]?.fcstValue === '3' ? '구름많음' : (
                                            skyValue[0]?.fcstValue === '4' ? '흐림' : '-'
                                        )
                                    )
                                }
                            </p>
                            <p>
                                기온 &nbsp;
                                <span>{TempValue[0]?.fcstValue}</span>&nbsp;
                                강수확률 &nbsp;
                                <span>{
                                    ptyValue[0]?.obsrValue === '0' ? '없음' : (
                                        ptyValue[0]?.obsrValue === '1' ? '비' : (
                                            ptyValue[0]?.obsrValue === '2' ? '비/눈' : (
                                                ptyValue[0]?.obsrValue === '3' ? '눈' : (
                                                    ptyValue[0]?.obsrValue === '5' ? '빗방울' : (
                                                        ptyValue[0]?.obsrValue === '6' ? '빗방울/눈' : (
                                                            ptyValue[0]?.obsrValue === '7' ? '눈날림' : '없음'
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                }</span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        )
    }


    const GradeContent = () => {
        const {gradeList} = useContext(DisplayDataContext);

        const progressCircle = useRef(null)
        const progressContent = useRef(null)
        const onAutoplayTimeLeft = (s, time, progress) => {
            progressCircle.current.style.setProperty('--progress', 1 - progress)
            progressContent.current.textContent = `${Math.ceil(timeIs / 1000)}s`
        }

        // //swiper 이벤트
        // //1-1. array len값에 맞춰서 time값을 받아오고 해당 받아온 값을 스와이퍼 시간에 넣어준다
        let timeIs = 10000
        const handleSwiperChange = (swiperCore) => {
            const {activeIndex} = swiperCore
        }

        return (
            <div className="ui-display-head-size"
                 style={{width: parseInt(ds[0]?.width / 2.2), height: parseInt(ds[0]?.height / 2.1)}}>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{delay: timeIs, disableOnInteraction: false}}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    onSlideChange={handleSwiperChange}
                    className="mySwiper"
                >
                    {
                        gradeList.map((arr, inx) => (
                            <div>
                                {
                                    inx % 2 === 0 ? (
                                        <SwiperSlide>
                                            <div className="dis-select-content">
                                                <div className="dis-dust03-mini" style={{marginLeft: -6}}>
                                                    <section className="dis-select">
                                                        {
                                                            gradeList[inx].data === 1 ? <VeryGood/> : (
                                                                gradeList[inx].data === 2 ? <Better/> : (
                                                                    gradeList[inx].data === 3 ? <Bad/> : (
                                                                        gradeList[inx].data === 4 ? <VeryBad/> : null
                                                                    )
                                                                )
                                                            )
                                                        }
                                                        <div className="dis-select-title-p">
                                                            {
                                                                gradeList[inx].data === 1 ?
                                                                    <h1 style={{color: "rgb(50, 161, 255)"}}>좋음</h1> : (
                                                                        gradeList[inx].data === 2 ?
                                                                            <h1 style={{color: "rgb(255, 185, 0)"}}>보통</h1> : (
                                                                                gradeList[inx].data === 3 ?
                                                                                    <h1 style={{color: "rgb(255, 115, 17)"}}>나쁨</h1> : (
                                                                                        gradeList[inx].data === 4 ?
                                                                                            <h1 style={{color: "rgb(239, 73, 73)"}}>매우나쁨</h1> : null
                                                                                    )
                                                                            )
                                                                    )
                                                            }
                                                            <h2 style={{color: "rgb(38,38,38)"}}>
                                                                {gradeList[inx].name}
                                                            </h2>
                                                        </div>
                                                    </section>
                                                </div>


                                                <div className="dis-dust03-mini">
                                                    <section className="dis-select">
                                                        {
                                                            gradeList[inx + 1]?.data === 1 ? <VeryGood/> : (
                                                                gradeList[inx + 1]?.data === 2 ? <Better/> : (
                                                                    gradeList[inx + 1]?.data === 3 ? <Bad/> : (
                                                                        gradeList[inx + 1]?.data === 4 ?
                                                                            <VeryBad/> : null
                                                                    )
                                                                )
                                                            )
                                                        }
                                                        <div className="dis-select-title-p">
                                                            {
                                                                gradeList[inx + 1]?.data === 1 ?
                                                                    <h1 style={{color: "rgb(50, 161, 255)"}}>좋음</h1> : (
                                                                        gradeList[inx + 1]?.data === 2 ?
                                                                            <h1 style={{color: "rgb(255, 185, 0)"}}>보통</h1> : (
                                                                                gradeList[inx + 1]?.data === 3 ?
                                                                                    <h1 style={{color: "rgb(255, 115, 17)"}}>나쁨</h1> : (
                                                                                        gradeList[inx + 1]?.data === 4 ?
                                                                                            <h1 style={{color: "rgb(239, 73, 73)"}}>매우나쁨</h1> : null
                                                                                    )
                                                                            )
                                                                    )
                                                            }
                                                            <h2 style={{color: "rgb(38,38,38)"}}>
                                                                {gradeList[inx + 1]?.name}
                                                            </h2>
                                                        </div>
                                                    </section>
                                                </div>


                                            </div>
                                        </SwiperSlide>
                                    ) : null
                                }
                            </div>
                        ))
                    }
                    <div className="autoplay-progress" slot="container-end" style={{display: 'none'}}>
                        <p ref={progressCircle}></p>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>

        )
    }


    const Content = () => {
        return (
            <div className="ui-display-content-size-mini"
                 style={{width: parseInt(cs[0]?.width / 2.17), height: parseInt(cs[0]?.height / 2.1)}}>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{delay: timeIss, disableOnInteraction: false}}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    onSlideChange={handleSwiperChange}
                >

                    {
                        swiperUrl.map((arr, inx) => (
                            <div key={arr.idx || arr.idx} className="mini">
                                {
                                    arr.type === 'image' ?
                                        <SwiperSlide
                                            style={{
                                                width: parseInt(cs[0]?.width / 2),
                                                height: parseInt(cs[0]?.height / 2.1)
                                            }}>

                                            <div className="dis-content-img-mini"
                                                 style={{height: parseInt(cs[0]?.height / 2.1)}}
                                            >
                                                <div className="dis-content-img-div-mini">
                                                    <img src={arr.url} alt="test-img"/>
                                                </div>
                                            </div>

                                        </SwiperSlide> : (
                                            arr.type === 'video' ?
                                                <SwiperSlide>
                                                    <div className="dis-content-img-mini">
                                                        <div className="dis-content-img-div-mini">
                                                            <video controls className="media-video" muted autoPlay loop>
                                                                <source src={arr.url} type="video/mp4"/>
                                                            </video>
                                                        </div>
                                                    </div>

                                                </SwiperSlide> : null
                                        )
                                }
                            </div>
                        ))
                    }

                    <div
                        className="autoplay-progress"
                        slot="container-end"
                        style={{display: 'none'}}
                    >
                        <p ref={progressCircle}></p>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>
        )
    }

    const Foot = () => {
        return (
            <div className="ui-display-foot-size-mini"
                 style={{width: parseInt(fs[0]?.width / 2.2), height: parseInt(fs[0]?.height / 1.5)}}
            >
                <DisplayFoot/>
            </div>
        )
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    handleClose();
                    setResizeModal(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="preview-modal">
                    {
                        resizeModal === true ?
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                <strong>Edit Size Preview</strong>
                            </Typography> : null
                    }

                    <div className="mini-modal">
                        {
                            updateResize[0]?.name === '날씨 정보' ? <Header/> : (
                                updateResize[0]?.name === '대기 정보' ? <GradeContent/> : (
                                    updateResize[0]?.name === '홍보물 정보' ? <Content/> : (
                                        updateResize[0]?.name === '뉴스 정보' ? <Foot/> : null
                                    )
                                )
                            )
                        }


                        {
                            updateResize[1]?.name === '날씨 정보' ? <Header/> : (
                                updateResize[1]?.name === '대기 정보' ? <GradeContent/> : (
                                    updateResize[1]?.name === '홍보물 정보' ? <Content/> : (
                                        updateResize[1]?.name === '뉴스 정보' ? <Foot/> : null
                                    )
                                )
                            )
                        }

                        {
                            updateResize[2]?.name === '날씨 정보' ? <Header/> : (
                                updateResize[2]?.name === '대기 정보' ? <GradeContent/> : (
                                    updateResize[2]?.name === '홍보물 정보' ? <Content/> : (
                                        updateResize[2]?.name === '뉴스 정보' ? <Foot/> : null
                                    )
                                )
                            )
                        }
                        {
                            updateResize[3]?.name === '날씨 정보' ? <Header/> : (
                                updateResize[3]?.name === '대기 정보' ? <GradeContent/> : (
                                    updateResize[3]?.name === '홍보물 정보' ? <Content/> : (
                                        updateResize[3]?.name === '뉴스 정보' ? <Foot/> : null
                                    )
                                )
                            )
                        }
                    </div>
                    <br/>

                    {
                        resizeModal === true ?
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                <Button variant="contained" fullWidth onClick={() => {
                                    ResizingNumberUpdate();
                                    alert('적용이 완료 되었습니다.');
                                    handleClose();
                                    setResizeModal(false);
                                }}>사이즈 적용</Button>

                                <Button variant="contained"
                                        fullWidth color={'inherit'}
                                        sx={{marginTop:1}}
                                        onClick={() => {
                                            handleClose();
                                            setResizeModal(false);
                                        }}>
                                    취소
                                </Button>
                            </Typography>:null
                    }

                </Box>
            </Modal>
        </div>
    )
}

export default PreviewPlay;