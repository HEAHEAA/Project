import {createContext, useEffect, useState} from "react";

export const DisplayEditContext = createContext({});
export const DisplayEditProvider = ({children}) => {

    // //게시물 사이즈 리스트
    // const [editList, setEditList] = useState([]);
    //
    // const DisplayEditListOnSubmit = async () => {
    //     await fetch(`/api/set/font/all`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: 'Bearer ' + localStorage.getItem("login")
    //         },
    //     }).then(res => res.json()).then(res => {
    //         setEditList(res.data);
    //     })
    // }
    //
    //
    //
    // //메뉴별 리스트 분류
    // const menuFilter = editList.filter(
    //     (data) =>
    //         data.menu_name === '메인' ||
    //         data.menu_name === '공지사항' ||
    //         data.menu_name === '우수사원/시상식' ||
    //         data.menu_name === '낙찰/입찰' ||
    //         data.menu_name === '소식뉴스' ||
    //         data.menu_name === '추천도서'
    // );
    //
    //
    // //메인 필터
    // const mainFilter = editList.filter(
    //     (data) =>
    //         data.menu_code === '0-1'||
    //         data.menu_code === '0-2'||
    //         data.menu_code === '0-3'
    // ) ;
    //
    // //공지사항 필터
    // const noticeFilter = editList.filter(
    //     (data) =>
    //         data.menu_code === '1-1'||
    //         data.menu_code === '1-2'||
    //         data.menu_code === '1-3'
    // );
    //
    // //우수사원 필터
    // const excellentFilter = editList.filter(
    //     (data) =>
    //         data.menu_code === '2-1' ||
    //         data.menu_code === '2-2'||
    //         data.menu_code === '2-3' ||
    //         data.menu_code === '2-4'
    // );
    //
    // //낙찰/입찰 필터
    // const bidFilter = editList.filter(
    //     (data) =>
    //         data.menu_code === '3-1' ||
    //         data.menu_code === '3-2'||
    //         data.menu_code === '3-3'
    // )
    //
    // //소식뉴스 필터
    // const newsFilter = editList.filter(
    //     (data) =>
    //         data.menu_code === '4-1' ||
    //         data.menu_code === '4-2'||
    //         data.menu_code === '4-3'
    // )
    //
    // //소식뉴스 필터
    // const BookFilter = editList.filter(
    //     (data) =>
    //         data.menu_code === '5-1' ||
    //         data.menu_code === '5-2'||
    //         data.menu_code === '5-3'
    // )
    //
    // //선택된 메뉴
    // const [selectMenu,setSelectMenu] = useState('1');
    //
    // //선택된 메뉴별 리스트
    // const [contentFilter,setContentFilter] = useState([]);
    // useEffect(()=>{
    //     if(selectMenu === "0"){
    //        return  setContentFilter(mainFilter);
    //     }else if(selectMenu === "1"){
    //         return setContentFilter(noticeFilter);
    //     }else if(selectMenu === "2"){
    //         return setContentFilter(excellentFilter);
    //     }else if(selectMenu === "3"){
    //         return setContentFilter(bidFilter);
    //     }else if(selectMenu === "4"){
    //         return setContentFilter(newsFilter);
    //     }else if(selectMenu === "5"){
    //         return setContentFilter(BookFilter);
    //     }
    // },[selectMenu]);
    //
    //
    // //화면 폰트 크기 insert
    //
    // const UIEditSizeInsert = async () => {
    //     for(let i = 0; i<contentFilter.length; i++){
    //         await fetch(`/api/set/insert/fs`,{
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: 'Bearer ' + localStorage.getItem("login")
    //             },
    //             body: JSON.stringify({
    //                 menu_name: contentFilter[i].menu_name,
    //                 menu_code: contentFilter[i].menu_code,
    //                 font_size: parseInt(contentFilter[i].font_size)
    //             })
    //         }).then(res => res.json())
    //     }
    //     DisplayEditListOnSubmit();
    // }

    return (
        <DisplayEditContext.Provider value={{
            // DisplayEditListOnSubmit,
            // editList, setEditList,
            //
            // menuFilter, //메뉴 리스트
            // selectMenu,setSelectMenu,
            //
            // contentFilter,setContentFilter,
            // UIEditSizeInsert,
        }}>
            {children}
        </DisplayEditContext.Provider>
    )
}
