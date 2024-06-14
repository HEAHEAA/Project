import '../_style/sidebar/sidebar.css';
import SideBar from "../components/side-bar/SideBar.jsx";
import InnerContent from "./InnerContent.jsx";
import {ModalProvider} from "../context/config/ModalContext.jsx";
import {ImgBaseSrcProvider} from "../context/config/ImgBaseSrcContext.jsx";
import {BidProvider} from "../context/bid/BidContext.jsx";
import {ExcellentProvider} from "../context/excellent/ExcellentContext.jsx";
import {NoticeProvider} from "../context/notice/NoticeContext.jsx";
import {NewsProvider} from "../context/news/NewsContext.jsx";
import {BookProvider} from "../context/book/BookContext.jsx";
import {ElImgProvider} from "../context/excellent/El-Img-Context.jsx";
import {DisplayProvider} from "../context/dashboard/DisplayContext.jsx";
import {BookFileProvider} from "../context/book/BooksFileContext.jsx";
import {UserProvider} from "../context/users/UsersContext.jsx";
import {ElAwardImgProvider} from "../context/excellent/El-Award-Img-Context.jsx";
import {BidExcelProvider} from "../context/bid/BidExcelContext.jsx";
import {DisplayEditProvider} from "../context/dashboard-edit/DisplayEditContext.jsx";


function Main() {
    return (
        <>
            <ModalProvider>
                <ImgBaseSrcProvider>
                    <DisplayEditProvider>
                        <DisplayProvider>
                            <BidProvider>
                                <BidExcelProvider>
                                    <ExcellentProvider>
                                        <ElImgProvider>
                                            <ElAwardImgProvider>
                                                <NoticeProvider>
                                                    <NewsProvider>
                                                        <BookProvider>
                                                            <BookFileProvider>
                                                                <UserProvider>
                                                                    <SideBar>
                                                                        <InnerContent/>
                                                                    </SideBar>
                                                                </UserProvider>
                                                            </BookFileProvider>
                                                        </BookProvider>
                                                    </NewsProvider>
                                                </NoticeProvider>
                                            </ElAwardImgProvider>
                                        </ElImgProvider>
                                    </ExcellentProvider>
                                </BidExcelProvider>
                            </BidProvider>
                        </DisplayProvider>
                    </DisplayEditProvider>
                </ImgBaseSrcProvider>
            </ModalProvider>
        </>

    )
}

export default Main;
