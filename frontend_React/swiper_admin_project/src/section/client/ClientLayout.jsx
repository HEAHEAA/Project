import Button from "@mui/material/Button";
import {ButtonGroup} from "@mui/material";
import {useState} from "react";
import ClientClassLayout from "./class/ClientClass-Layout.jsx";
import ClientPartLayout from "./part/ClientPart-Layout.jsx";
import ClientGradeLayout from "./grade/ClientGrade-Layout.jsx";

function ClientLayout(){
    const [clientBtn,setClientBtn] = useState(0);
    return(
        <div>
            <ButtonGroup size="large" aria-label="large button group">
                <Button
                    key="one"
                    variant={clientBtn === 0 ? "contained" : "outlined"}
                    onClick={() => {
                        setClientBtn(0);
                    }}>권한 관리</Button>
                <Button
                    key="two"
                    variant={clientBtn === 1 ? "contained" : "outlined"}
                    onClick={() => {
                        setClientBtn(1);
                    }}>부서 관리</Button>
                <Button
                    key="two"
                    variant={clientBtn === 2 ? "contained" : "outlined"}
                    onClick={() => {
                        setClientBtn(2);
                    }}>직급 관리</Button>
            </ButtonGroup>

            <div className="bidPage-layout">
                {
                    clientBtn === 0 ? <ClientClassLayout/> : (
                        clientBtn === 1 ? <ClientPartLayout/> : (
                            clientBtn === 2 ? <ClientGradeLayout/> : <div> 메뉴를 선택 해 주세요.</div>
                        )
                    )
                }
            </div>
        </div>
    )
}
export default ClientLayout;
