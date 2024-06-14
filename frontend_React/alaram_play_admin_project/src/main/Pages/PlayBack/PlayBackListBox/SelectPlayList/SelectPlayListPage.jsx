import {FiSearch} from "react-icons/fi";
import {Checkbox, createTheme, ThemeProvider} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {FileListContext} from "../../../../../api/FileList/FileListContext.jsx";

//이미지
import imgPic from '../../../../../assets/img/image.png';
import vidPic from '../../../../../assets/img/video.png';
import {PlaybackContext} from "../../../../../api/PlayBack/PlaybackContext.jsx";
import SelectPlayFileAdd from "./modal/SelectPlayFileAdd.jsx";
import {PreviewContext} from "../../../../../api/Preview/PreviewContext.jsx";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {BsPlayCircle} from "react-icons/bs";

function SelectPlayListPage() {
    const {
        checkItem,
        handleSingleCheck,
        onDelete,
    } = useContext(PlaybackContext);
    const {fileList} = useContext(FileListContext);
    const {
        //이미지 - 분류 - 데이터 이름
        fileImg,
        fileVdo,
        // 로드
        ImgLoad,
        VdoLoad,

        // 이미지 url
        VdoResult,
        ImgResult
    } = useContext(PreviewContext);

    //1. 파일 선택 미리보기
    useEffect(() => {
        ImgLoad();
        VdoLoad();
    }, [fileList]);


    //1. 데이터 페이징 이벤트
    //1-1. 이미지 탭 페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([fileImg]);
    const lastPage = fileImg.length % 15 === 0 ? fileImg.length / 15 : fileImg.length / 15 + 1;
    let allPage = Math.ceil(fileImg.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(fileImg.slice(15 * (page - 1)));
        } else {
            setData(fileImg.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page, fileList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }
    //1-1. 영상 탭 페이징
    const [page01, setPage01] = useState(1);
    const [data01, setData01] = useState([fileVdo]);
    const lastPage01 = fileVdo.length % 15 === 0 ? fileVdo.length / 15 : fileVdo.length / 15 + 1;
    let allPage01 = Math.ceil(fileVdo.length / 15);

    useEffect(() => {
        if (page01 === lastPage01) {
            setData01(fileVdo.slice(15 * (page - 1)));
        } else {
            setData01(fileVdo.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page01, fileList]);

    const handlePage01 = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage01(nowPageInt);
    }


    //0. 탭바 이벤트
    const [value, setValue] = useState('1');
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    //1. 테마
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });

    //2. 검색용
    const [filter, setFilter] = useState('');


    //4. 이미지 시간입력 모달
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <SelectPlayFileAdd open={open} handleClose={handleClose}/>

            <div className="list-search">
                <div className="box">
                    <div className="container-1">
                        <span className="icon"><FiSearch/></span>
                        <input
                            type="search"
                            id="search"
                            placeholder="파일명을 검색해주세요."
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                setFilter(inputValue);
                            }} value={filter}
                        />
                    </div>
                </div>
            </div>


            <div className="play-array-list">
                {
                    checkItem?.length === 0 ?
                        <h1>선택 된 파일이 없습니다.</h1> :
                        <div>
                            {checkItem?.map((arx, idx) => (
                                <div className="play-array-box" key={idx}>
                                    <p>{idx + 1}</p>
                                    <p onClick={() => {
                                        onDelete(arx);
                                    }}>x</p>
                                    <h5>{arx}번</h5>
                                </div>
                            ))}
                        </div>
                }
            </div>

            {
                checkItem?.length === 0 ? null :
                    <Button variant="contained" fullWidth onClick={() => {
                        handleOpen();
                    }} sx={{marginTop: 1}}>
                        저장하기
                    </Button>
            }


            <ThemeProvider theme={darkTheme}>
                <Box sx={{width: '100%', typography: 'body1'}}>
                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="이미지" value="1"/>
                                <Tab label="동영상" value="2"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="file-play-select">
                                {
                                    data?.filter((dataIs) => {
                                        const title = dataIs.origin_fileName?.toLowerCase();
                                        const input = filter.toLowerCase();
                                        return title?.includes(input);
                                    })
                                        .map((arr, inx) => (
                                            <section key={inx}>
                                                <div className="preview-mini-box">
                                                    <div className="dis-content-img03">
                                                        <div className="dis-content-img-div03">
                                                            <img src={ImgResult[inx]?.url} alt="img"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="preview-file-text-box">
                                                    <p>파일번호 : {arr.idx}번</p>
                                                    <p>파일명 : {arr.origin_fileName}</p>
                                                    <p>관리자 : {arr.reg_date}</p>
                                                </div>
                                                <div className="preview-play-box">
                                                    <p>
                                                        <Checkbox name={`select-${arr.idx}`}
                                                                  onChange={(e) => handleSingleCheck(e.target.checked, arr.idx)}
                                                                  checked={checkItem.includes(arr.idx)}
                                                        />
                                                    </p>
                                                </div>
                                            </section>
                                        ))
                                }

                            </div>
                            <Pagination
                                count={allPage}
                                variant="outlined"
                                shape="rounded"
                                sx={{marginTop: 1, float: "right"}}
                                onChange={(e) => handlePage(e)}
                            />
                        </TabPanel>


                        <TabPanel value="2">
                            <div className="file-play-select">
                                {
                                    data01?.filter((dataIs) => {
                                        const title = dataIs.origin_fileName?.toLowerCase();
                                        const input = filter.toLowerCase();
                                        return title?.includes(input);
                                    }).map((arr, inx) => (
                                        <section key={inx}>
                                            <div className="preview-mini-box">
                                                <img src={VdoResult[inx]?.url} alt="img"/>
                                            </div>
                                            <div className="preview-file-text-box">
                                                <p>파일번호 : {arr.idx}번</p>
                                                <p>파일명 : {arr.origin_fileName}</p>
                                                <p>관리자 : {arr.reg_date}</p>
                                            </div>
                                            <div className="preview-play-box">
                                                <p>
                                                    <Checkbox name={`select-${arr.idx}`}
                                                              onChange={(e) => handleSingleCheck(e.target.checked, arr.idx)}
                                                              checked={checkItem.includes(arr.idx)}
                                                    />
                                                </p>
                                            </div>
                                        </section>
                                    ))
                                }
                            </div>
                            <Pagination
                                count={allPage01}
                                variant="outlined"
                                shape="rounded"
                                sx={{marginTop: -1, float: "right"}}
                                onChange={(e) => handlePage01(e)}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </ThemeProvider>

        </div>
    )
}

export default SelectPlayListPage;