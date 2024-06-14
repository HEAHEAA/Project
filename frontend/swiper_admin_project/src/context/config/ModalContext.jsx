import {createContext, useState} from "react";

export const ModalContext = createContext({});
export const ModalProvider = ({children}) => {

    //삭제 할 때 사용 할 훅
    const [deleteModal,setDeleteModal] = useState(false);
    const handleDeleteOpen = () => setDeleteModal(true);
    const handleDeleteClose = () => setDeleteModal(false);

    return(
        <ModalContext.Provider value={{
            deleteModal,setDeleteModal,
            handleDeleteOpen,
            handleDeleteClose
        }}>
            {children}
        </ModalContext.Provider>
    )
}
