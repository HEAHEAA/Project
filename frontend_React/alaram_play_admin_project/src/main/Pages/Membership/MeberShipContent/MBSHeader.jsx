import {useContext, useState} from "react";
import {MemberContext} from "../../../../api/MemberShip/MemberContext.jsx";
import * as React from 'react';
import {FiSearch} from "react-icons/fi";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import AddUser from "./modal/AddUser.jsx";
import UserSignupOn from "./modal/UserSignupOn.jsx";


function MBSHeader() {
    const {group, menuId} = useContext(MemberContext);

    //회원 추가등록 이벤트
    const [addOpen, setAddOpen] = useState(false);
    const handleAddOpen = () => setAddOpen(true);
    const handleAddClose = () => setAddOpen(false);

    //회원 승인 이벤트
    const [signOpen, setSignOpen] = useState(false);
    const handleSignOpen = () => setSignOpen(true);
    const handleSignClose = () => setSignOpen(false);


    return (
        <div className="mbs-head">
            {
                group[menuId] === '전체회원' ? <AllHeader
                    group={group}
                    menuId={menuId}
                    open={addOpen}
                    handeOpen={handleAddOpen}
                    handleClose={handleAddClose}
                /> : (
                    group[menuId] === '승인대기' ? <SignOffHeader
                        group={group}
                        menuId={menuId}
                        open={signOpen}
                        handleOpen={handleSignOpen}
                        handleClose={handleSignClose}
                    /> : (
                        group[menuId] === '승인완료' ? <SignOnHeader
                            group={group}
                            menuId={menuId}
                            open={addOpen}
                            handeOpen={handleAddOpen}
                            handleClose={handleAddClose}
                        /> : null
                    )
                )
            }
        </div>
    )
}

const AllHeader = ({group, menuId, open, handeOpen, handleClose}) => {
    const {memberList, setAllFilter} = useContext(MemberContext);
    return (
        <div>
            {/*모달*/}
            <AddUser open={open} handleClose={handleClose}/>

            <div className="mbs-head-title">
                <h1>회원 관리 <small>| {group[menuId]}</small></h1>
                <p>회원 정보/승인을 관리하는 페이지 입니다.</p>
            </div>
            <hr/>
            <div className="mbs-head-select">
                <div className="mbs-head-section04">
                    <div className="mbs-list-search">
                        <div className="mbs-box">
                            <div className="mbs-container-1">
                                <span className="mbs-icon"><FiSearch/></span>
                                <input
                                    type="search"
                                    id="mbs-search"
                                    placeholder="사용자 아이디를 입력해주세요."
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setAllFilter(inputValue);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mbs-head-section05">
                    <Button variant="contained" onClick={() => {
                        handeOpen();
                    }}>
                        회원 추가 등록
                    </Button>
                </div>
                <p>총 <strong>{memberList.length}명</strong>의 회원이 있습니다.</p>
            </div>
        </div>
    )
}


const SignOffHeader = ({group, menuId, open, handleClose, handleOpen}) => {
    const {signupOffList, checkItem, setSignOffFilter} = useContext(MemberContext);
    return (
        <div>
            <UserSignupOn open={open} handleClose={handleClose}/>

            <div className="mbs-head-title">
                <h1>회원 관리 <small>| {group[menuId]}</small></h1>
                <p>회원 정보/승인을 관리하는 페이지 입니다.</p>
            </div>
            <hr/>
            <div className="mbs-head-select">
                <div className="mbs-head-section04">
                    <div className="mbs-list-search">
                        <div className="mbs-box">
                            <div className="mbs-container-1">
                                <span className="mbs-icon"><FiSearch/></span>
                                <input
                                    type="search"
                                    id="mbs-search"
                                    placeholder="사용자 아이디를 입력해주세요."
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setSignOffFilter(inputValue);
                                    }}

                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mbs-head-section05">
                    <Button variant="contained" color={"success"} onClick={() => {
                        if (checkItem.length === 0) {
                            alert('승인 회원을 체크 해주세요!');
                        } else {
                            handleOpen();
                        }
                    }}>
                        회원 승인
                    </Button>
                </div>
                <p>미승인 대기회원은 총 <strong>{signupOffList.length}명</strong>의 회원이 있습니다.</p>
            </div>
        </div>
    )
}


const SignOnHeader = ({group, menuId, open, handeOpen, handleClose}) => {
    const {signupOnList,setSignOnFilter} = useContext(MemberContext);
    return (
        <div>
            {/*모달*/}
            <AddUser open={open} handleClose={handleClose}/>

            <div className="mbs-head-title">
                <h1>회원 관리 <small>| {group[menuId]}</small></h1>
                <p>회원 정보/승인을 관리하는 페이지 입니다.</p>
            </div>
            <hr/>
            <div className="mbs-head-select">
                <div className="mbs-head-section04">
                    <div className="mbs-list-search">
                        <div className="mbs-box">
                            <div className="mbs-container-1">
                                <span className="mbs-icon"><FiSearch/></span>
                                <input
                                    type="search"
                                    id="mbs-search"
                                    placeholder="사용자 아이디를 입력해주세요."
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        setSignOnFilter(inputValue);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mbs-head-section05">
                    <Button variant="contained" onClick={() => {
                        handeOpen();
                    }}>회원 추가 등록</Button>
                </div>
                <p>승인 회원은 총 <strong>{signupOnList.length}명</strong>입니다.</p>
            </div>
        </div>
    )
}


export default MBSHeader;