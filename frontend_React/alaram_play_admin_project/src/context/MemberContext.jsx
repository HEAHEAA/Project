import {createContext, useState} from "react";

export const MemberContext = createContext({});
export const MemberProvider = ({children}) => {
    let group = ['전체회원', '승인대기', '승인완료'];
    const [menuId,setMenuId] = useState(0);

    //1. 전체 회원 가져오기
    const [memberList,setMemberList] = useState([]);
    const MemberListOnSubmit = async () => {
        await fetch(`/api/user/userList`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            }
        }).then(res => res.json()).then(res => {
            setMemberList(res.data);
        })
    }
    //승인 인원 필터
    let signupOnList = memberList.filter((data) => data.user_status === 1);
    //미승인 인원 - 필터
    let signupOffList = memberList.filter((data) => data.user_status === 2);

    // 검색용
    const [allFilter, setAllFilter] = useState('');
    const [signOffFilter, setSignOffFilter] = useState('');
    const [signOnFilter, setSignOnFilter] = useState('');

    //회원 승인하기 체크값
    const [checkItem,setCheckItem] = useState([]);
    const handleAllCheck = (checked) => {
        if(checked) {
            const idArray = [];
            signupOffList.forEach((el) => idArray.push(el.user_id));
            setCheckItem(idArray);
        }else {
            setCheckItem([]);
        }
    }
    //2-2. 단일 선택
    const handleCheck = (checked, id) => {
        if(checked) {
            setCheckItem(prev => [...prev, id]);
        }else {
            setCheckItem(checkItem.filter((el) => el !== id))
        }
    };


    //승인 할 아이디 값 리스트 가져오기
    let SignOnUserList = [];
    for(let i = 0; i<checkItem.length; i++){
        for(let j =0; j<memberList.length; j++){
            if(checkItem[i] === memberList[j].user_id){
                SignOnUserList.push(memberList[j]);
            }
        }
    }
    //3. 회원 승인하기
    const UserSignOnOnSubmit = async () => {
        for(let i=0; i<SignOnUserList.length; i++){
            await fetch('/api/user/update',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem("login"),
                },
                body: JSON.stringify({
                    user_name: SignOnUserList[i].user_name,
                    sys_op_user_class_id: "1",
                    user_status: 1,
                    user_id: SignOnUserList[i].user_id
                })
            }).then(res => res.json())
        }
        MemberListOnSubmit();
        setCheckItem([]);
    }


    //승인 유저 정보 수정 하기
    //이름,비밀번호 수정가능
    const [userEditValue,setUserEditValue] = useState({
        sys_op_user_class_id: 0,
        user_id: '',
        user_status: 0,
        user_name: '',
        user_pwd: '',
    });
    const GetEditUserInfo = (id) => {
        for(let list of signupOnList){
            if(list.dt_op_user_id === id){
                setUserEditValue({
                    sys_op_user_class_id: list.sys_op_user_class_id,
                    user_id: list.user_id,
                    user_status: list.user_status,
                    user_name: list.user_name ,
                    user_pwd: '',
                });
            }
        }
    }

    const EditMemberInfoOnSubmit = async () => {
        await fetch(`/api/user/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login"),
            },
            body: JSON.stringify(userEditValue)
        }).then(res => res.json())
        MemberListOnSubmit();
        setUserEditValue({
            sys_op_user_class_id: 0,
            user_id: '',
            user_status: 0,
            user_name: '',
            user_pwd: '',
        })
    }

    const [signupOn,setSignupOn] = useState(false);


    return(
        <MemberContext.Provider value={{
            group,
            menuId,
            setMenuId,

            //리스트받아오기
            MemberListOnSubmit,
            memberList,//전체 리스트
            setMemberList,
            signupOnList,//승인완료 리스트
            signupOffList, //미승인 리스트

            //그룹별 필터값
            allFilter, //1. 전체회원
            setAllFilter,
            signOffFilter, //2. 승인대기회원
            setSignOffFilter,
            signOnFilter, //3. 승인완료 회원
            setSignOnFilter,

            //승인받을 값 받아오기
            checkItem,//체크값
            setCheckItem,
            handleAllCheck, //전체 체크값
            handleCheck, //싱글 체크값

            //승인하기
            UserSignOnOnSubmit,

            //수정할 값 받아오기
            GetEditUserInfo,
            userEditValue,
            setUserEditValue,
            EditMemberInfoOnSubmit,

            signupOn,setSignupOn,
        }}>
            {children}
        </MemberContext.Provider>
    )
}