import {FiSearch} from "react-icons/fi";
import {Checkbox, createTheme, ThemeProvider} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import SelectPlayFileAdd from "./modal/SelectPlayFileAdd.jsx";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {DarkTheme} from "../../../../theme/mui-theme.jsx";
import {ImgPreview, VdoPreview} from "../../../../hooks/sections/file/UseFilePreview.jsx";
import {FileList} from "../../../../hooks/sections/file/UseFile.jsx";
import {FileContext} from "../../../../context/FileContext.jsx";

function SelectPlayListPage() {
    const {data: fileList} = FileList();
    const {checkItem, handleSingleCheck, onDelete,checkResult} = useContext(FileContext);

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
    }, [page, fileList]);

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
     * 탭바
     **/
    const [value, setValue] = useState('1');
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setValue(newValue);
    };


    /**
     * 검색
     **/
    const [filter, setFilter] = useState('');

    /**
     * 시간입력 - 모달
     **/
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
                            placeholder="파일명을 검색해주세요."/>
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
                    <>
                        <Button variant="contained" fullWidth onClick={() => {
                            handleOpen();
                        }} sx={{marginTop: 1}}>
                            저장하기
                        </Button>
                    </>

            }


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
                            <div className="file-play-select">
                                <ImgPreview
                                    data={data}
                                    handleSingleCheck={handleSingleCheck}
                                    checkItem={checkItem}
                                />
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
                                <VdoPreview
                                    data={data01}
                                    handleSingleCheck={handleSingleCheck}
                                    checkItem={checkItem}
                                />
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
