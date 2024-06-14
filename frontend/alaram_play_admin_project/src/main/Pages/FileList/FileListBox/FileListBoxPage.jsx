import Pagination from '@mui/material/Pagination';
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {BsPlayCircle, BsPlus} from "react-icons/bs";
import {GoTasklist} from "react-icons/go";
import {FiSearch} from "react-icons/fi";
import {useContext, useEffect, useState} from "react";
import FileUploadModal from "./modal/FileUploadModal.jsx";
import {FileListContext} from "../../../../api/FileList/FileListContext.jsx";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//이미지
import {PreviewContext} from "../../../../api/Preview/PreviewContext.jsx";

function FileListBoxPage() {
    const {
        GetSingleFile, //데이터 선택
        FilePlayLoad, //선택한 데이터 로드
        fileList //총 파일 갯수 데이터
    } = useContext(FileListContext);
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

    //1. 파일 선택시, 크게보기 파일 실행
    useEffect(() => {
        FilePlayLoad();
    }, [GetSingleFile]);


    //1. 파일 선택 미리보기
    useEffect(() => {
        ImgLoad();
        VdoLoad();
    }, [fileList]);


    //0. 탭바 이벤트
    const [value, setValue] = useState('1');
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


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


    //2. 파일 업로드 모달 이벤트
    const [uploadOpen, setUploadOpen] = useState(false);
    const handleUploadOpen = () => setUploadOpen(true);
    const handleUploadClose = () => setUploadOpen(false);


    //3. 테마
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: 'SUITE-Regular',
            fontWeight: 300
        }
    });


    //4. 검색용
    const [filter, setFilter] = useState('');


    return (
        <div className="file-list-content">
            <FileUploadModal open={uploadOpen} handleClose={handleUploadClose}/>


            <div className="list-title">
                <strong><GoTasklist/> 파일 리스트</strong><br/>
                하위 파일 선택 시, 큰 화면으로 미리보기가 가능합니다.
                <Button variant="contained" color={"info"} onClick={() => {
                    handleUploadOpen();
                }}>
                    파일추가 <BsPlus/>
                </Button>
            </div>
            <hr/>

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
            <br/>


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
                            <div className="file-list-select">
                                {
                                    data?.filter((dataIs) => {
                                        const title = dataIs.origin_fileName?.toLowerCase();
                                        const input = filter.toLowerCase();
                                        return title?.includes(input);
                                    })
                                        .map((arr, inx) => (
                                            <section key={arr.idx} onClick={() => {
                                                GetSingleFile(arr.idx);
                                                FilePlayLoad(arr.upload_fileName);
                                            }}>
                                                <div className="preview-mini-box">
                                                    <div className="dis-content-img03">
                                                        <div className="dis-content-img-div03">
                                                            <img src={ImgResult[inx]?.url} alt="img"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="preview-file-text-box">
                                                    <p>파일명 : {arr.origin_fileName}</p>
                                                    <p>확장자
                                                        : {arr.upload_fileName?.substring(arr.upload_fileName.indexOf('.'))}</p>
                                                    <p>업로드일 :{arr.reg_date}</p>
                                                </div>
                                                <div className="preview-play-box">
                                                    <p><BsPlayCircle/></p>
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
                            <div className="file-list-select">
                                {
                                    data01?.filter((dataIs) => {
                                        const title = dataIs.origin_fileName?.toLowerCase();
                                        const input = filter.toLowerCase();
                                        return title?.includes(input);
                                    })
                                        .map((arr, inx) => (
                                            <section key={arr.idx} onClick={() => {
                                                GetSingleFile(arr.idx);
                                                FilePlayLoad(arr.upload_fileName);
                                            }}>
                                                <div className="preview-mini-box">
                                                    <img src={VdoResult[inx]?.url} alt="img"/>
                                                </div>
                                                <div className="preview-file-text-box">
                                                    <p>파일명 : {arr.origin_fileName}</p>
                                                    <p>확장자
                                                        : {arr.upload_fileName?.substring(arr.upload_fileName.indexOf('.'))}</p>
                                                    <p>업로드일 :{arr.reg_date}</p>
                                                </div>
                                                <div className="preview-play-box">
                                                    <p><BsPlayCircle/></p>
                                                </div>
                                            </section>
                                        ))
                                }
                            </div>
                            <Pagination
                                count={allPage01}
                                variant="outlined"
                                shape="rounded"
                                sx={{marginTop: 1, float: "right"}}
                                onChange={(e) => handlePage01(e)}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
            </ThemeProvider>


        </div>
    )
}

export default FileListBoxPage;