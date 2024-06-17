import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {NewsDelete, NewsInsert, NewsListOnSubmit, NewsUpdate} from "../../../../hooks/sections/display/UseNews.jsx";
import {useState} from "react";

function NewsEdit() {
    const [newsId,setNewsId] = useState(0);
    const [newsBtn, setNewsBtn] = useState(true);
    const [news_content, setNews_content] = useState('');
    const {isLoading: newsLoading, data: newsList, isError: newsError} = NewsListOnSubmit();

   /**
    * 뉴스 생성
    */
    const {mutate: addNews} = NewsInsert();
    const handleNewsCreate = () => {
        const data = {
            news_content: news_content,
            node_id: parseInt(localStorage.getItem('node'))
        }
        addNews(data);
    }


    /**
     * 뉴스 업데이트
     */
    const {mutate: updateNews} = NewsUpdate();
    const handleEditNews = () => {
        const data = {
            news_idx: newsId,
            news_content: news_content,
            node_id: parseInt(localStorage.getItem('node'))
        }
        updateNews(data);
    }

    /**
     * 뉴스 삭제
     */
    const {mutate: deleteNews} = NewsDelete();
    const handleDeleteNews = (id) => {
        const data = {
            idx: id
        }
        deleteNews(data);
    }




    if (newsLoading) return <>Loading..</>
    if (newsError) return <>Error!</>


    return (
        <div>
            <h3>시정 뉴스</h3>
            <TextField
                id="filled-multiline-flexible"
                label="최소 30자 이상 입력해주세요."
                value={news_content}
                onChange={(e) => {
                    setNews_content(e.target.value);
                }}
                multiline
                rows={10}
                variant="filled"
                sx={{width: '95%', marginLeft: '2.5%'}}
            />

            {
                newsBtn === true ?
                    <Button variant="contained" sx={{width: '95%', marginLeft: '2.5%', marginTop: 1}} onClick={()=>{
                        handleNewsCreate();
                        setNews_content('');
                    }}>
                        추가
                    </Button> :
                    <div>
                        <Button variant="contained" sx={{width: '45%', marginLeft: '2.5%', marginTop: 1}} onClick={()=>{
                            handleEditNews();
                            setNews_content('');
                            setNewsBtn(true);
                        }}>
                            수정
                        </Button>
                        <Button variant="contained" color={"inherit"}
                                sx={{width: '45%', marginLeft: '2.5%', marginTop: 1}}
                                onClick={() => {
                                    setNewsBtn(true);
                                    setNews_content('');
                                }}>
                            취소
                        </Button>
                    </div>
            }


            {
                newsList?.data.data.map((arr, inx) => (
                    <div>
                        <div className="now-news-data">
                            <section>{arr.news_content}</section>
                            <section onClick={() => {
                                handleDeleteNews(arr.news_idx);
                            }}>x</section>
                        </div>
                        <div className="now-news-data-btn">
                            <Button variant="outlined" onClick={() => {
                                setNewsBtn(false);
                                setNews_content(arr.news_content);
                                setNewsId(arr.news_idx);
                            }}>
                                수정
                            </Button>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}

export default NewsEdit;