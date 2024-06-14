import {createContext, useState} from "react";

export const SignupContext = createContext({});

export const SignupProvider = ({children}) => {

    //1. 회원가입 정보
    const [singUpValue,setSignupValue] = useState({
        user_id: "", //아이디
        user_pwd: "", //비밀번호
        sys_op_user_class_id: 0, //권한
        user_name: "" //이름
    });

    //2. 회원가입 성공여부
    const [signupSuccess,setSignupSuccess] = useState(false);

    const signUpOnSubmit = async () => {
       await fetch(`/api/signUp`,{
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify(singUpValue)
       }).then(res => res.json()).then(res => {
           setSignupSuccess(res.success);
       });
       // -완료 되었으면 비워두기
        setSignupValue({
            user_id: "", //아이디
            user_pwd: "", //비밀번호
            sys_op_user_class_id: 0, //권한
            user_name: "" //이름
        })
    }


    return(
        <SignupContext.Provider value={{
            singUpValue,setSignupValue,
            signUpOnSubmit,
            signupSuccess,
        }}>
            {children}
        </SignupContext.Provider>

    )
}