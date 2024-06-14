import ClientLayout from "../../section/client/ClientLayout.jsx";
import '../../_style/client/client.css';
import {useContext, useEffect} from "react";
import {ClientContext} from "../../context/client/ClientContext.jsx";

function Client() {
    const {
        ClientClassOnSubmit,
        ClientPartOnSubmit,
        ClientGradeOnSubmit,
    } = useContext(ClientContext);

    useEffect(() => {
        ClientClassOnSubmit();
        ClientPartOnSubmit();
        ClientGradeOnSubmit();
    }, []);
    return (
        <div className="container">
            <div className="news-title">
                <h1>회사 정보</h1>
            </div>

            <ClientLayout/>
        </div>
    )
}

export default Client;
