import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import WeekPicker from "../../components/date-picker/WeekPicker.jsx";
import {Add} from "@mui/icons-material";
import {useContext} from "react";
import {ImgBaseSrcContext} from "../../context/config/ImgBaseSrcContext.jsx";
import {useNavigate} from "react-router-dom";

const AddGroupNewsPage = () => {
    const {
        imageSrc, setImageSrc, encodeFileToBase64,
        imageSrc01, setImageSrc01, encodeFileToBase6401,
        imageSrc02, setImageSrc02, encodeFileToBase6402
    } = useContext(ImgBaseSrcContext);
    const navigate = useNavigate();

    return (
        <div>
            <div className="booksPage-layout-news">
                <div className="bookAdd-layout01">
                    <input
                        type={"file"}
                        id="book-upload-img"
                        style={{display: "none"}}
                        onChange={(e) => {
                            encodeFileToBase64(e.target.files[0]);
                        }}
                    />
                    <label htmlFor="book-upload-img">
                        {
                            imageSrc ?
                                <div>
                                    <img src={imageSrc} alt="preview-book-img" className="book-upload-img"/>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color={"inherit"}
                                        onClick={() => {
                                            setImageSrc('');
                                        }}>이미지 취소</Button>
                                </div>
                                :
                                <div className="book-upload-img">
                                    Click !
                                </div>
                        }
                    </label>
                </div>

                <div className="bookAdd-layout03">
                    <Grid container spacing={4} className="modal-grid">
                        <Grid item xs={12} sm={12}>
                            <input
                                type={"file"}
                                id="book-upload-img02"
                                style={{display: "none"}}
                                onChange={(e) => {
                                    encodeFileToBase6401(e.target.files[0]);
                                }}
                            />
                            <label htmlFor="book-upload-img02">
                                {
                                    imageSrc01 ?
                                        <div>
                                            <img src={imageSrc01} alt="preview-book-img" className="book-upload-img02"/>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                color={"inherit"}
                                                onClick={() => {
                                                    setImageSrc01('');
                                                }}>이미지 취소</Button>
                                        </div>
                                        :
                                        <div className="book-upload-img02">
                                            Click !
                                        </div>

                                }
                            </label>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <input
                                type={"file"}
                                id="book-upload-img03"
                                style={{display: "none"}}
                                onChange={(e) => {
                                    encodeFileToBase6402(e.target.files[0]);
                                }}
                            />
                            <label htmlFor="book-upload-img03">
                                {
                                    imageSrc02 ?
                                        <div>
                                            <img src={imageSrc02} alt="preview-book-img" className="book-upload-img03"/>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                color={"inherit"}
                                                onClick={() => {
                                                    setImageSrc02('');
                                                }}>이미지 취소</Button>
                                        </div>
                                        :
                                        <div className="book-upload-img03">
                                            Click !
                                        </div>

                                }
                            </label>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span>날짜 지정</span>
                            <WeekPicker/>
                        </Grid>
                    </Grid>

                    <div style={{textAlign: "right"}}>
                        <Button variant="contained">
                            그룹 소식 추가 <Add/>
                        </Button>
                        <Button variant="contained" color={"inherit"} sx={{marginLeft: 1}} onClick={() => {
                            navigate('/group-news')
                        }}>
                            목록으로
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddGroupNewsPage;
