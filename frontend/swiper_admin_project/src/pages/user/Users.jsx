import UserLayout from "../../section/users/UserLayout.jsx";
import '../../_style/users/users.css';
function Users(){
    return(
        <div className="container">
            <div className="news-title">
                <h1>
                    회원 정보
                </h1>
            </div>

            <UserLayout/>
        </div>
    )
}
export default Users;
