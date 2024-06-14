import Dashboard from "../pages/dashboard/Dashboard.jsx";
import NoticeAlarm from "../pages/notice/Notice-Alarm.jsx";
import Excellent from "../pages/excellent/Excellent.jsx";
import Bid from "../pages/bid/Bid.jsx";
import News from "../pages/news/News.jsx";
import Books from "../pages/books/Books.jsx";
import BookAddPage from "../pages/books/BookAddPage.jsx";
import BookUpdatePage from "../pages/books/BookUpdatePage.jsx";
import Client from "../pages/client/Client.jsx";
import Users from "../pages/user/Users.jsx";
import DashboardEdit from "../pages/dashboard-edit/Dashboard-Edit.jsx";
import DashboardEditDetail from "../section/dashboard-edit/Dashboard-edit-detail.jsx";
import NoticeSchedule from "../pages/notice/Notice-Schedule.jsx";
import GroupNews from "../pages/group-news/GroupNews.jsx";
import AddGroupNews from "../pages/group-news/AddGroupNews.jsx";
import EditGroupNews from "../pages/group-news/EditGroupNews.jsx";

function InnerContent() {
    return (
        <div>
            {
                window.location.pathname === '/dashboard' ? <Dashboard/> : (
                    window.location.pathname === '/notice/alarm' ? <NoticeAlarm/> : (
                        window.location.pathname === '/notice/schedule' ? <NoticeSchedule/> : (
                            window.location.pathname === '/excellent' ? <Excellent/> : (
                                window.location.pathname === '/bid' ? <Bid/> : (
                                    window.location.pathname === '/news' ? <News/> : (
                                        window.location.pathname === '/book' ? <Books/> : (
                                            window.location.pathname === '/book/add' ? <BookAddPage/> : (
                                                window.location.pathname === '/book/update' ? <BookUpdatePage/> : (
                                                    window.location.pathname === '/client' ? <Client/> : (
                                                        window.location.pathname === '/user' ? <Users/> : (
                                                            window.location.pathname === '/dashboard-edit' ? <DashboardEdit/> : (
                                                                    window.location.pathname === '/dashboard-edit/detail' ? <DashboardEditDetail/> : (
                                                                        window.location.pathname === '/group-news' ? <GroupNews/> : (
                                                                            window.location.pathname === '/group-news/add' ? <AddGroupNews/> : (
                                                                                window.location.pathname === '/group-news/edit' ? <EditGroupNews/> : null
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            }
        </div>
    )
}

export default InnerContent;
