import {useContext, useEffect} from "react";
import {LoginContext} from "../../api/login/LoginContext.jsx";
import axios from "axios";

function MapTest() {
    const {RefreshToken} = useContext(LoginContext);
    // const excelDown = async (e) => {
    //     e.preventDefault()
    //     RefreshToken();
    //     await axios({
    //         url:`/api/excel/usage`,
    //         method: 'POST',
    //         responseType: 'blob',
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem("login"),
    //         },
    //         data: {
    //             token : localStorage.getItem("login"),
    //             sdate: "2023-10-01",
    //             edate : "2023-10-31",
    //             org_id : "jihee"
    //         },
    //     }).then(res => {
    //         const url = window.URL.createObjectURL(new Blob([res.data], {
    //             type: res.headers['content-type']
    //         }));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'xlsx');
    //         document.body.appendChild(link);
    //         link.click();
    //         window.location.reload();
    //     })
    // }






    return (
        <div>


            {/*<form onSubmit={excelDown}>*/}
            {/*    <button type={"submit"}>*/}
            {/*        엑셀 다운로드*/}
            {/*    </button>*/}
            {/*</form>*/}

        </div>
    )
}

export default MapTest;