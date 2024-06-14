import {createContext, useState} from "react";

export const SignupContext = createContext({});
export const SignupProvider = ({children}) => {

    //비밀번호 체크
    const [pwdCheck,setPwdCheck] = useState(false);
     //회원가입 입력값
    const [signUpValue,setSignUpValue] = useState({
        user_id:"",
        user_pwd:"",
        user_name:"",
        user_class:1,
        user_part:1,
        user_grade:1,
        user_mail:"",
        user_status:1
    });

    //회원가입 전송
    const [singCheck,setSignCheck] = useState(false);
    const SignOnSubmit = async () => {
        if(
            signUpValue.user_id !== '' &&
            signUpValue.user_pwd !== '' &&
            signUpValue.user_name !== '' &&
            signUpValue.user_class !== 0 &&
            signUpValue.user_part !== 0 &&
            signUpValue.user_grade !== 0 &&
            signUpValue.user_mail !== '' &&
            signUpValue.user_status !== 0
        ){
            await fetch(`/api/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body :JSON.stringify({
                    user_id: signUpValue.user_id,
                    user_pwd:signUpValue.user_pwd,
                    user_name:signUpValue.user_name,
                    user_class:signUpValue.user_class,
                    user_part:signUpValue.user_part,
                    user_grade:signUpValue.user_grade,
                    user_mail:signUpValue.user_mail,
                    user_status:signUpValue.user_status
                })
            }).then(res => res.json())
        }
        setSignCheck(true);
    }

    return(
        <SignupContext.Provider value={{
            signUpValue,setSignUpValue,
            pwdCheck,setPwdCheck,
            SignOnSubmit,
            singCheck,setSignCheck
        }}>
            {children}
        </SignupContext.Provider>
    )
}
