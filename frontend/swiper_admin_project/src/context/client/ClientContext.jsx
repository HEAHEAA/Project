import {createContext, useState} from "react";

export const ClientContext = createContext({});
export const ClientProvider = ({children}) => {
    /**
     * 1. client - class
     */
    const [ClientClass, setClientClass] = useState([]);

    const ClientClassOnSubmit = async () => {
        await fetch(`/api/user/class`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setClientClass(res.data);
        })
    }

    const [classValue, setClassValue] = useState({
        user_class_idx: 0,
        user_class_name: ""
    });

    // client - class - insert
    const ClientClassInsert = async () => {
        await fetch(`/api/user/class/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_class_name: classValue.user_class_name
            })
        }).then(res => res.json())
        ClientClassOnSubmit();
        setClassValue({
            user_class_idx: 0,
            user_class_name: ""
        })
    };


    // client - class - update
    const getEditClassId = async (id) => {
        for (let list of ClientClass) {
            if (list.user_class_idx === id) {
                setClassValue({
                    user_class_idx: list.user_class_idx,
                    user_class_name: list.user_class_name
                })
            }
        }
    }

    const ClientClassUpdate = async () => {
        await fetch(`/api/user/class/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify(classValue)
        }).then(res => res.json())
        ClientClassOnSubmit();
        setClassValue({
            user_class_idx: 0,
            user_class_name: ""
        })
    }

    // client - class - delete
    const ClientClassDelete = async (target) => {
        await fetch(`/api/user/class/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_class_idx: target
            })
        });
        ClientClassOnSubmit();
        setClassValue({
            user_class_idx: 0,
            user_class_name: ""
        })
    }

    /**
     * 2. client - part
     */
    const [ClientPart, setClientPart] = useState([]);

    const ClientPartOnSubmit = async () => {
        await fetch(`/api/user/part/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setClientPart(res.data);
        })
    }

    const [partValue, setPartValue] = useState({
        user_part_idx: 0,
        user_part_name: ""
    });

    // client - part - insert
    const ClientPartInsert = async () => {
        await fetch(`/api/user/part/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_part_name: partValue.user_part_name
            })
        }).then(res => res.json())
        ClientPartOnSubmit();
        setPartValue({
            user_part_idx: 0,
            user_part_name: ""
        })
    }

    // client - part - update
    const getEditPartId = async (id) => {
        for (let list of ClientPart) {
            if (list.user_part_idx === id) {
                setPartValue({
                    user_part_idx: list.user_part_idx,
                    user_part_name: list.user_part_name
                })
            }
        }
    }

    const ClientPartUpdate = async () => {
        await fetch(`/api/user/part/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify(partValue)
        }).then(res => res.json())
        ClientPartOnSubmit();
        setPartValue({
            user_part_idx: 0,
            user_part_name: ""
        })
    }

    //client - part - delete
    const ClientPartDelete = async (target) => {
        await fetch(`/api/user/part/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_part_idx: target
            })
        })
        ClientPartOnSubmit();
        setPartValue({
            user_part_idx: 0,
            user_part_name: ""
        })
    }

    /**
     * 3. client - grade
     */
    const [ClientGrade, setClientGrade] = useState([]);
    const ClientGradeOnSubmit = async () => {
        await fetch(`/api/user/grade/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setClientGrade(res.data);
        })
    }

    const [gradeValue, setGradeValue] = useState({
        user_grade_idx: 0,
        user_grade_name: ""
    });

    //client - grade - insert
    const ClientGradeInsert = async () => {
        await fetch(`/api/user/grade/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_grade_name: gradeValue.user_grade_name
            })
        }).then(res => res.json())
        ClientGradeOnSubmit();
        setGradeValue({
            user_grade_idx: 0,
            user_grade_name: ""
        });
    }

    //client - grade - update
    const getEditGradeId = async (id) => {
        for (let list of ClientGrade) {
            if (list.user_grade_idx === id) {
                setGradeValue({
                    user_grade_idx: list.user_grade_idx,
                    user_grade_name: list.user_grade_name
                })
            }
        }
    }

    const ClientGradeUpdate = async () => {
        await fetch(`/api/user/grade/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_grade_idx: gradeValue.user_grade_idx,
                user_grade_name: gradeValue.user_grade_name
            })
        }).then(res => res.json())
        ClientGradeOnSubmit();
        setGradeValue({
            user_grade_idx: 0,
            user_grade_name: ""
        });
    }

    const ClientGradeReUpdate = async () => {
        await fetch(`/api/user/grade/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_grade_idx : gradeValue.user_grade_idx,
                user_grade_name : gradeValue.user_grade_name
            })
        }).then(res => res.json())
        ClientGradeOnSubmit();
        setGradeValue({
            user_grade_idx : 0,
            user_grade_name : ""
        });
    }

    //client - grade - delete
    const ClientGradeDelete = async (target) => {
        await fetch(`/api/user/grade/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify({
                user_grade_idx: target
            })
        }).then(res => res.json())
        ClientGradeOnSubmit();
        setGradeValue({
            user_grade_idx: 0,
            user_grade_name: ""
        });
    }

    return (
        <ClientContext.Provider value={{
            // - 사용자 권한
            ClientClassOnSubmit,
            ClientClass, setClientClass,

            classValue, setClassValue,
            getEditClassId,

            ClientClassInsert,
            ClientClassUpdate,
            ClientClassDelete,


            // - 사용자 부서
            ClientPartOnSubmit,
            ClientPart, setClientPart,

            partValue, setPartValue,
            getEditPartId,

            ClientPartInsert,
            ClientPartUpdate,
            ClientPartDelete,

            // - 사용자 직급
            ClientGradeOnSubmit,
            ClientGrade, setClientGrade,

            gradeValue, setGradeValue,
            getEditGradeId,

            ClientGradeInsert,
            ClientGradeUpdate,

            ClientGradeReUpdate,

            ClientGradeDelete

        }}>
            {children}
        </ClientContext.Provider>
    )
}
