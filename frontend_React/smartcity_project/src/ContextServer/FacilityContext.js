import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";

export const FacilityContext = createContext({});

export const FacilityProvider = ({children}) => {
    const {access,RefreshToken} = useContext(LoginContext);
    //시설물관리 이력
    const [facList,setFacList] = useState([]);

    //지도키우기
    const [mapSize,setMapSize] = useState(false);

    //시설물정보
    const [selectList,setSelectList] = useState([]);
    const [selectNum,setSelectNum] = useState('1');

    const [flIdx,setFlIdx] = useState(0);
    //시설물정보 수정할 아이디값
    const [editId,setEditId] = useState(0);
    const [code,setCode] = useState('');
    const [name,setName] = useState('');
    const [lng,setLng] = useState(0);
    const [lat,setLat] = useState(0);
    const [cate,setCate] = useState(0);

    //생성할 정보
    const [AddCode,setAddCode] = useState('');//시설물명
    const [AddName,setAddName] = useState(''); //시설물 주소
    const [AddLng,setAddLan] = useState(0); //경도
    const [AddLat,setAddLat] = useState(0); //위도
    const [AddCate,setAddCate] = useState(1); //카테고리

    //이력조회
    const [record,setRecord] = useState([]); // 이력조회리스트

    //시설물관리이력
    const FacCheckList = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/exam/selectNodeExamList`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setFacList(res.data);
        })
    }


    //관리조회리스트
    const FacListSelet = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/fac/list?code=${selectNum}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setSelectList(res.data);
            // FlRecordList();
        })
    }



    const AddFlData = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/fac/insert`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                fl_code: AddCode,
                fl_name: AddName,
                fl_lng: AddLng,
                fl_lat: AddLat,
                fl_category: AddCate
            })
        })
        setCode('');
        setName('');
        setLng(0);
        setLat(0);
        setCate(0);
        FacListSelet();
    }


    //관리조회리스트 수정하기
    const GetEditId = async (id) => {
        for(let list of selectList){
            if(list.fl_idx === id){
                setCode(list.fl_code);
                setName(list.fl_name);
                setLng(list.fl_lng);
                setLat(list.fl_lat);
                setCate(list.fl_category);
            }
        }
        setEditId(id);
    }

    const EditFlData = async () => {
        for(let list of selectList){
            if(list.fl_idx === editId){
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/fac/update`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        fl_idx: list.fl_idx,
                        fl_code: code,
                        fl_name: name,
                        fl_lng: lng,
                        fl_lat: lat,
                        fl_category: cate
                    })
                })
            }
        }
        setCode('');
        setName('');
        setLng(0);
        setLat(0);
        setCate(0);
        FacListSelet();
    }


    const FlDelete = async () => {
        for(let list of selectList){
            if(list.fl_idx === editId){
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/fac/delete`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        fl_idx: editId
                    })
                })
            }
        }
        FacListSelet();
    }


    // //시설물 이력조회
    // const FlRecordList = async () => {
    //     RefreshToken();
    //     let ac = null;
    //     if (access == '') {
    //         ac = localStorage.getItem('login').replaceAll('"', '')
    //     } else {
    //         ac = access
    //     }
    //     await fetch(`/api/fac/recordList`,{
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: 'Bearer ' + ac,
    //         },
    //     }).then(res => res.json()).then(res => {
    //         setRecord(res.data)
    //     })
    //
    // }





    return(
        <FacilityContext.Provider value={{
            facList,setFacList,
            FacCheckList,
            FacListSelet,
            selectNum,setSelectNum,
            selectList,setSelectList,
            flIdx,setFlIdx,
            mapSize,setMapSize,
            editId,setEditId,
            GetEditId,


            //생성값
            AddCode,setAddCode,
            AddName,setAddName,
            AddLng,setAddLan,
            AddLat,setAddLat,
            AddCate,setAddCate,
            AddFlData,

            //수정값
            code,setCode,
            name,setName,
            lng,setLng,
            lat,setLat,
            cate,setCate,
            EditFlData,
            FlDelete,



            record,setRecord,
        }}>
            {children}
        </FacilityContext.Provider>
    )
}