import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import folder from '../../../../../assets/img/folder-icon.png';
import {CiPaperplane, CiCircleCheck, CiCircleRemove} from "react-icons/ci";
import {useContext, useState} from "react";
import './upload.css';
import {FileListContext} from "../../../../../api/FileList/FileListContext.jsx";


const FileInfo = ({uploadedInfo}) => (
    <ul className="preview_info">
        {Object.entries(uploadedInfo).map(([key, value]) => (
            <li key={key}>
                <span className="info_key">{key}</span>
                <span className="info_value">{value}</span>
            </li>
        ))}
    </ul>
);

const Logo = () => (
    <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
        <path fill="transparent" d="M0,0h24v24H0V0z"/>
        <path fill="#000"
              d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"/>
    </svg>
);

function FileUploadModal({handleClose, open}) {
    const {
        uploadLoading,
        setUploadLoading,
        uploadedInfo,
        setUploadedInfo,
        FileUpload
    } = useContext(FileListContext);
    const {fileUpdate, setFileUpdate} = useState(true);

    const style = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    //1. 드래그 앤 드롭 이벤트
    const [isActive, setActive] = useState(false);

    const handleDragStart = () => setActive(true);
    const handleDragEnd = () => setActive(false);
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const setFileInfo = (file) => {
        const {name, size: byteSize, type} = file;
        const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
        setUploadedInfo({name, size, type}); // name, size, type 정보를 uploadedInfo에 저장
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setActive(false);

        const file = event.dataTransfer.files[0];
        setFileInfo(file);
    };

    const handleUpload = ({target}) => {
        const file = target.files[0];
        setFileInfo(file);
    };


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="file-upload-modal">
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        <strong>파일 업로드</strong>
                    </Typography>

                    <form onSubmit={(e) => FileUpload(e)}>
                        <div className="file-drag-box">

                            <label
                                className={`preview${isActive ? ' active' : ''}`}
                                onDragEnter={handleDragStart}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragEnd}
                                onDrop={handleDrop}
                            >

                                <input
                                    type="file"
                                    className="file"
                                    name="profile_files"
                                    multiple
                                    onChange={handleUpload}
                                />
                                {uploadedInfo && <FileInfo uploadedInfo={uploadedInfo}/>}
                                {!uploadedInfo && (
                                    <>
                                        <Logo/>
                                        <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
                                        <p className="preview_desc"></p>
                                    </>
                                )}
                            </label>
                        </div>


                        <div className="file-uploading-btn">
                            <Button variant="contained" type={"submit"} onClick={() => {
                                if (window.confirm('파일을 업로드하시겠습니까?')) {
                                    FileUpload();
                                    setFileUpdate(false);
                                    alert('저장이 완료 되었습니다.');
                                    handleClose();
                                }
                            }}>저장하기</Button>
                            <Button variant="contained" color={"inherit"} onClick={handleClose}>닫기</Button>
                        </div>
                    </form>

                </Box>
            </Modal>
        </div>
    )
}

export default FileUploadModal;