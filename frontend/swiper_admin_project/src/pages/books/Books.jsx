import BooksPageLayout from "../../section/books/BooksPage-Layout.jsx";
import '../../_style/books/books.css';
import {useContext, useEffect} from "react";
import {BookContext} from "../../context/book/BookContext.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Switch} from "@mui/material";

function Books() {
    const {
        bookCheck, setBookCheck,
        BookAllData,
        BookWeekData
    } = useContext(BookContext);

    useEffect(() => {
        if (bookCheck === false) {
            BookWeekData(); //추천도서
        } else if (bookCheck === true) {
            BookAllData();
        }
    }, [bookCheck]);

    const handleSwitchChange = (e) => {
        setBookCheck(!bookCheck);
    }

    return (
        <div className="container">
            <div className="news-title">
                <h1>
                    추천 도서
                </h1>
                <FormControlLabel
                    control={<Switch
                        value={bookCheck}
                        onChange={(e) => {
                            handleSwitchChange(e);
                        }}
                    />}
                    label="전체 목록 보기"
                    sx={{float: 'right'}}
                />
            </div>

            <BooksPageLayout/>
        </div>
    )
}

export default Books;
