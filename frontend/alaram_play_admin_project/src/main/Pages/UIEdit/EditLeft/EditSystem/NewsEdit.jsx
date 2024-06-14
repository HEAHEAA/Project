import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useContext, useState} from "react";
import {DisplayDataContext} from "../../../../../api/UIEdit/Display/DisplayDataContext.jsx";

function NewsEdit(){
    const {
        newsData,newsContent,setNewsContent,
        AddNewOnSubmit,
        GetEditNewsId,
        UpdateNewsOnSubmit,
        updateBtn,setUpdateBtn,
        DeleteNewsOnSubmit,
    } = useContext(DisplayDataContext);

    return(
        <div>
            <h3>시정 뉴스</h3>
            <TextField
                id="filled-multiline-flexible"
                label="최소 50자 이상 입력해주세요."
                multiline
                rows={10}
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                variant="filled"
                sx={{width: '95%', marginLeft: '2.5%'}}
            />

            {
                updateBtn === true ?<>
                        <Button variant="contained" sx={{width: '45%', marginLeft: '2.5%', marginTop: 1}} onClick={()=>{UpdateNewsOnSubmit();}}>
                            수정
                        </Button>
                        <Button variant="contained" color={"inherit"} sx={{width: '45%', marginLeft: '2.5%', marginTop: 1}} onClick={()=>{
                            setNewsContent('');
                            setUpdateBtn(false);
                        }}>
                            취소
                        </Button>
                    </>
                    : <>
                        <Button variant="contained" sx={{width: '95%', marginLeft: '2.5%', marginTop: 1}} onClick={()=>{AddNewOnSubmit();}}>추가</Button>
                    </>

            }


            {/*<Button variant="contained" sx={{width: '95%', marginLeft: '2.5%', marginTop: 1}} onClick={()=>{*/}
            {/*    if(updateBtn === false) {*/}
            {/*        AddNewOnSubmit();*/}
            {/*    }else {*/}
            {/*        UpdateNewsOnSubmit();*/}
            {/*    }*/}
            {/*}}>*/}
            {/*    {*/}
            {/*        updateBtn === true ? '저장하기' : '추가하기'*/}
            {/*    }*/}
            {/*</Button>*/}


            {
                newsData.map((arr,idx) => (
                    <div key={arr.id}>
                        <div className="now-news-data">
                            <section>&nbsp; {idx + 1}.&nbsp; {arr.news_content}</section>
                            <section onClick={()=>{
                                DeleteNewsOnSubmit(arr.news_idx);
                            }}>x</section>
                        </div>
                        <div className="now-news-data-btn">
                            <Button variant="outlined" onClick={()=>{
                                GetEditNewsId(arr.news_idx);
                                setUpdateBtn(true);
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