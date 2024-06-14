import {Route, Routes} from "react-router-dom";
import MainSwiper from "./routes/MainSwiper";
import './style/app.css'
import {BidNewsProvider} from "./context/bid/BidNewsContext";
import {BidStateProvider} from "./context/bid/bidStateContext";
import {BidYetProvider} from "./context/bid/BidYetContext";
import {BookProvider} from "./context/book/BookContext";
import {StaffProvider} from "./context/excellent/StaffContext";
import {AwardProvider} from "./context/excellent/AwardContext";
import {NewsProvider} from "./context/news/NewsContext";
import {NoticeProvider} from "./context/notice/NoticeContext";
import {PageProvider} from "./context/config/PageContext";
import {UserPartProvider} from "./context/config/UserPartContext";
import {useEffect} from "react";
import {EventSourcePolyfill} from "event-source-polyfill";
import ip from '../../../dist/path.json';
import {UiEditProvider} from "./context/all/UiEditContext";

function App() {
  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, 600000);
    return () => {
      clearInterval(timer);
    }
  }, []);





  return (
    <div className="container">
      <PageProvider>
        <UiEditProvider>
          <UserPartProvider>
            <BidNewsProvider>
              <BidStateProvider>
                <BidYetProvider>
                  <BookProvider>
                    <StaffProvider>
                      <AwardProvider>
                        <NewsProvider>
                          <NoticeProvider>
                            <Routes>
                              <Route path="/" element={<MainSwiper/>}/>
                            </Routes>
                          </NoticeProvider>
                        </NewsProvider>
                      </AwardProvider>
                    </StaffProvider>
                  </BookProvider>
                </BidYetProvider>
              </BidStateProvider>
            </BidNewsProvider>
          </UserPartProvider>
        </UiEditProvider>
      </PageProvider>
    </div>
  )
}

export default App
