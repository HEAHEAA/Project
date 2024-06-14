import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import {LuUserSquare} from "react-icons/lu";
import {PiPasswordDuotone} from "react-icons/pi";
import {BsFillArrowRightSquareFill} from "react-icons/bs";
import Button from "@mui/material/Button";
import {useContext} from "react";
import {LoginContext} from "../../../api/login/LoginContext.jsx";
import {useNavigate} from "react-router-dom";

function FindIDPW() {
    const {
        //아이디 비밀번호 찾기
        findId, setFindId
    } = useContext(LoginContext);
    const navigate = useNavigate();

    return (
        <div>
            <Box
                sx={
                    window.innerWidth > 1200 ?
                        {
                            my: 15,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        } : {
                            my: 10,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }
                }
            >
                <Typography component="h1" variant="h3">
                    <strong>ID/비밀번호 찾기</strong>
                </Typography>
                <Typography component="p" variant="p">
                    찾고 싶은 아이디,비밀번호를 선택하세요.
                </Typography>


                <div className="find-box">
                    <div className="find-box-icon-form">
                        <LuUserSquare className="find-box-icon"/>
                    </div>
                    <div className="find-box-text-box">
                        <h1>ID 찾기
                            <br/>
                            <small>회원인증 ID 찾기</small>
                        </h1>
                    </div>

                    <div className="find-box-next-box">
                        <BsFillArrowRightSquareFill className="find-box-next-icon"/>
                    </div>

                </div>

                <div className="find-box">
                    <div className="find-box-icon-form">
                        <PiPasswordDuotone className="find-box-icon"/>
                    </div>

                    <div className="find-box-text-box">
                        <h1>비밀번호 찾기
                            <br/>
                            <small>회원인증 PW 찾기</small>
                        </h1>
                    </div>

                    <div className="find-box-next-box">
                        <BsFillArrowRightSquareFill className="find-box-next-icon"/>
                    </div>
                </div>

                <div className="find-box-foot">
                    <Button variant="contained" color={"info"} onClick={()=>{
                        setFindId(false);
                    }}>
                        로그인창으로 이동
                    </Button>
                    <Button variant="contained" color={"warning"} onClick={()=>{
                        navigate('/signup');
                    }}>
                        회원가입 하기
                    </Button>
                </div>
            </Box>

        </div>
    )
}

export default FindIDPW;