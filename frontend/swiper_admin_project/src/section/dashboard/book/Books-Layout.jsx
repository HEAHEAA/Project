import BooksImg from "./Books-img.jsx";
import BooksIntroduce from "./Books-Introduce.jsx";
import BooksCommend from "./Books-commend.jsx";
import {useContext, useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {BooksFileContext} from "../../../context/book/BooksFileContext.jsx";
function BooksLayout(){
    const {bookImgUrl} = useContext(BooksFileContext);

    //대시보드 Book 페이징
    const [page, setPage] = useState(1);
    const [data, setData] = useState([bookImgUrl]);
    const lastPage = bookImgUrl.length % 1 === 0 ? bookImgUrl.length / 1 : bookImgUrl.length / 1 + 1;
    const allPage =bookImgUrl.length / 1;

    useEffect(() => {
        if (page === lastPage) {
            setData(bookImgUrl.slice(1 * (page - 1)));
        } else {
            setData(bookImgUrl.slice(1 * (page - 1), 1 * (page - 1) + 1));
        }
    }, [page, bookImgUrl]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    return(
        <>
            {
                data.map((arr) => (
                    <div  className="books-section" key={arr.re_idx}>
                        <div className="books-section01">
                            <BooksImg img={arr.re_pic}/>
                        </div>
                        <div className="books-section02">
                            <BooksIntroduce content={arr.re_content}/>
                        </div>
                        <div className="books-section03">
                            <BooksCommend summary={arr.re_summary}/>
                        </div>
                        <div className="books-section04">
                            <Pagination
                                count={allPage}
                                variant="outlined"
                                shape="rounded"
                                value={page}
                                sx={{marginTop: 1, float: "right"}}
                                onChange={(e) => handlePage(e)}
                            />
                        </div>
                    </div>
                ))
            }
        </>

    )
}
export default BooksLayout;
