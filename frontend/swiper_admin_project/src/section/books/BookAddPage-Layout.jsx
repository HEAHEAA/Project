import {useContext} from "react";
import {ImgBaseSrcContext} from "../../context/config/ImgBaseSrcContext.jsx";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import {Add} from "@mui/icons-material";
import WeekPicker from "../../components/date-picker/WeekPicker.jsx";
import {BookContext} from "../../context/book/BookContext.jsx";

function BookAddPageLayout(){
    const { imageSrc, setImageSrc, encodeFileToBase64} = useContext(ImgBaseSrcContext);
    const {
        BooksImgUploadOnSubmit,
        bookValue,setBookValue,
        BookInsertData,
    } = useContext(BookContext);
    const navigate = useNavigate();

    return(
        <div>
            <div className="booksPage-layout">

                <div className="bookAdd-layout01">
                    <input
                        type={"file"}
                        id="book-upload-img"
                        style={{display: "none"}}
                        onChange={(e) => {
                            encodeFileToBase64(e.target.files[0]);
                            BooksImgUploadOnSubmit(e);
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

                <div className="bookAdd-layout02">
                    <Grid container spacing={4} className="modal-grid">
                        <Grid item xs={12} sm={12}>
                            <span>책 소개</span>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={12}
                                fullWidth
                                placeholder="책 소개를 입력해주세요."
                                value={bookValue.re_content}
                                onChange={(e) => setBookValue({
                                    ...bookValue , re_content: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <span>요약 추천 </span>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={12}
                                fullWidth
                                placeholder="요약 추천을 입력해주세요."
                                name="re_summary"
                                value={bookValue.re_summary}
                                onChange={(e) => setBookValue({
                                    ...bookValue , re_summary: e.target.value
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <span>날짜 지정</span>
                            <WeekPicker/>
                        </Grid>
                    </Grid>

                    <div style={{textAlign:"center"}}>
                        <Button variant="contained" onClick={()=>{
                            if(window.confirm('도서를 추가 등록 하시겠습니까?')){
                                BookInsertData();
                                navigate('/book');
                            }
                        }}>
                            도서 추가 <Add/>
                        </Button>
                        <Button variant="contained" color={"inherit"} sx={{marginLeft: 1}} onClick={()=>{
                            navigate('/book')
                        }}>
                            목록으로
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookAddPageLayout;
