import {createContext, useState} from "react";
export const NodeContext = createContext({});
export const NodeProvider = ({children}) => {
    const [nodeList,setNodeList] = useState([]);

    const NodeIdDataOnSubmit = async () => {
        await fetch('/api/node/list',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            setNodeList(res.data)
        })
    }

    //노드 지점 선택
    const [nodeId,setNodeId] = useState(0);
    const handleChange = (event) => {
        setNodeId(event.target.value);
    };

    //노드 지점 선택 시, 기본 레이아웃이 없다면 -> post보내주기
    const [layoutData,setLayoutData] = useState([]);
    const LayoutCheck = async () => {
        await fetch(`/api/layout/list/${localStorage.getItem('node')}`,{
            method : 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            }
        }).then(res => res.json()).then(res => {
            if(res === undefined) {
                setLayoutData(null);
            }else {
                setLayoutData(res.data);
            }
        })
    }

    let defaultLayout = [
        {
            "id": 1,
            "name": "날씨 정보",
            "number": 1,
            "width": 1080,
            "height": 220,
            "font_size": 0
        },
        {
            "id": 2,
            "name": "대기 정보",
            "number": 2,
            "width": 1080,
            "height": 310,
            "font_size": 0
        },
        {
            "id": 3,
            "name": "홍보물 정보",
            "number": 3,
            "width": 1080,
            "height": 1270,
            "font_size": 0
        },
        {
            "id": 4,
            "name": "뉴스 정보",
            "number": 4,
            "width": 1080,
            "height": 120,
            "font_size": 0
        }
    ]
    const LayoutDefaultPost = async () => {
        await fetch(`/api/layout/update/${localStorage.getItem('node')}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("login")
            },
            body: JSON.stringify(defaultLayout)
        }).then(res => res.json())
    }

    return(
        <NodeContext.Provider value={{
            nodeList,setNodeList,
            NodeIdDataOnSubmit,

            nodeId,setNodeId,
            handleChange,

            LayoutCheck,
            layoutData,setLayoutData,
            LayoutDefaultPost,

        }}>
            {children}
        </NodeContext.Provider>
    )
}