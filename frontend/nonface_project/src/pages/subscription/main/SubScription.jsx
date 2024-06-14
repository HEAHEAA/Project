import Default from "../sub/Default.jsx";
import Group from "../sub/Group.jsx";
import Admin from "../sub/Admin.jsx";
import Button from "@mui/material/Button";
import {useContext, useEffect} from "react";

import {SubScriptContext} from "../../../api/subscription/SubScriptContext.jsx";
import {useNavigate} from "react-router-dom";

function SubScription() {
    const {
        //고객사 유형
        ClientListOnSubmit,
        //관제 유형 조회
        ControlListOnSubmit,

        GroupInsertSubmit,
        groupValue
    } = useContext(SubScriptContext);

    const navigate = useNavigate();


    useEffect(()=>{
        ClientListOnSubmit();
        ControlListOnSubmit();
    },[]);


    return (
        <div className="scrip-content">

            <div className="scrip-head">
                <h2>회원사 관리</h2>
            </div>

            <section className="scrip-section">
                <h3>■ 기본정보</h3>
                <Default/>
            </section>


            <section className="scrip-section">
                <h3>■ 조직정보</h3>
                <Group/>

            </section>
            <section className="scrip-section">
                <h3>■ 관리자 정보</h3>
                <Admin/>
            </section>
            <section className="scrip-section">
                <p> ☞최초 비밀번호는 관리자 로그인 ID+핸드폰 번호 뒤4자리 + !!입니다.</p>
            </section>

            <section className="scrip-section">
                <Button variant="contained" onClick={()=>{
                    if(groupValue.clnt_org_id === '' &&
                        groupValue.clnt_org_name === '' &&
                        groupValue.clnt_org_type === '' &&
                        groupValue.app_install_cnt === '' &&
                        groupValue.clnt_org_manager === '' &&
                        groupValue.clnt_org_contact === ''){
                        alert('빈칸이 존재합니다.')
                    }else {

                        if(window.confirm('정말 저장하시겠습니까?')){
                            GroupInsertSubmit();
                        }

                    }
                }}>저장</Button>
                <Button variant="outlined" color={"inherit"} onClick={()=>{
                    navigate('/scripList');
                }}>
                    목록
                </Button>
            </section>

        </div>
    )
}

export default SubScription;