import Pagination from '@mui/material/Pagination';
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {BsPlayCircle, BsPlus} from "react-icons/bs";
import {GoTasklist} from "react-icons/go";
import {FiSearch} from "react-icons/fi";
import { useContext, useEffect, useState} from "react";
import FileUploadModal from "./modal/FileUploadModal.jsx";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {DarkTheme} from "../../../theme/mui-theme.jsx";
import {FileList} from "../../../hooks/sections/file/UseFile.jsx";
import Loading from "../../../components/loading-bar/Loading.jsx";
import {ImgPreview, SingleFileLoad, VdoPreview} from "../../../hooks/sections/file/UseFilePreview.jsx";
import {FileContext} from "../../../context/FileContext.jsx";

function FileListBoxPage() {
    //파일 리스트
    const {isLoading: fileLoading, data: fileList, isError: fileError} = FileList();
    const {singleFile,setSingleFile} = useContext(FileContext);



    /**
     * 파일 분류 함수
     **/
    let fileImgList = []; //이미지
    let fileVdoList = []; //동영상
    for (let i = 0; i < fileList?.data.data.length; i++) {
        if (fileList.data.data[i].upload_fileName.includes('mp4')) {
            fileVdoList.push(fileList.data.data[i])
        }
        if (fileList.data.data[i].upload_fileName.includes('png') || fileList.data.data[i].upload_fileName.includes('jpg')|| fileList.data.data[i].upload_fileName.includes('jpeg')) {
            fileImgList.push(fileList.data.data[i]);
        }
    }


    /**
     * 파일 -이미지 페이징
     **/
    //1-1. 이미지 탭 페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([fileImgList]);
    const lastPage = fileImgList.length % 15 === 0 ? fileImgList.length / 15 : fileImgList.length / 15 + 1;
    let allPage = Math.ceil(fileImgList.length / 15);

    useEffect(() => {
        if (page === lastPage) {
            setData(fileImgList.slice(15 * (page - 1)));
        } else {
            setData(fileImgList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page,fileList]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }


    /**
     * 파일 -영상 페이징
     **/
    const [page01, setPage01] = useState(1);
    const [data01, setData01] = useState([fileVdoList]);
    const lastPage01 = fileVdoList.length % 15 === 0 ? fileVdoList.length / 15 : fileVdoList.length / 15 + 1;
    let allPage01 = Math.ceil(fileVdoList.length / 15);

    useEffect(() => {
        if (page01 === lastPage01) {
            setData01(fileVdoList.slice(15 * (page - 1)));
        } else {
            setData01(fileVdoList.slice(15 * (page - 1), 15 * (page - 1) + 15));
        }
    }, [page01, fileList]);

    const handlePage01 = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage01(nowPageInt);
    }


    /**
     * 탭바 이벤트
     **/
    const [value, setValue] = useState('1');
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    /**
     * 파일 업로드
     **/
    const [uploadOpen, setUploadOpen] = useState(false);
    const handleUploadOpen = () => setUploadOpen(true);
    const handleUploadClose = () => setUploadOpen(false);


    //4. 검색용
    const [filter, setFilter] = useState('');



    if (fileLoading) return <><Loading/></>
    if (fileError) return <>Error!</>

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
                            placeholder="파일명을 검색해주세요."/>
                    </div>
                </div>
            </div>
            <br/>
            <ThemeProvider theme={DarkTheme}>
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
                                <ImgPreview data={data} singleFile={singleFile} setSingleFile={setSingleFile} />
                                <Pagination
                                    count={allPage}
                                    variant="outlined"
                                    shape="rounded"
                                    sx={{marginTop: 1, float: "right"}}
                                    onChange={(e) => handlePage(e)}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="file-list-select">
                                <VdoPreview data={data01} singleFile={singleFile} setSingleFile={setSingleFile}/>
                                <Pagination
                                    count={allPage01}
                                    variant="outlined"
                                    shape="rounded"
                                    sx={{marginTop: 1, float: "right"}}
                                    onChange={(e) => handlePage01(e)}
                                />
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default FileListBoxPage;
