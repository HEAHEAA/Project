import {createContext, useState} from "react";

export const SignUpContext = createContext({});


export const SignUpProvider = ({children}) => {
    const [userId,setUserId] = useState('');
    const [userPwd,setUserPwd] = useState('');
    const [UserClass,setUserClass] = useState(1);
    const [userName,setUserName] = useState('');


    const SignUpSubmitHandler = () => {
        fetch(`/api/signUp`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                user_pwd: userPwd,
                sys_op_user_class_id: UserClass,
                user_name: userName
            })
        }).then((res) => res.json())
    }



    return(
        <SignUpContext.Provider value={{
            userId,setUserId,
            userPwd,setUserPwd,
            UserClass,setUserClass,
            userName,setUserName,
            SignUpSubmitHandler
        }}>
            {children}
        </SignUpContext.Provider>
    )
}