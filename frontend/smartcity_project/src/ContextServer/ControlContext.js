import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {LoginContext} from "./LoginContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {BiCustomize} from "react-icons/bi";

import Highcharts from "highcharts";
import Control01 from "../Page/Station/DID/Detail/Control01";
import Control02 from "../Page/Station/DID/Detail/Control02";

export const ControlContext = createContext({});

export const ControlProvider = ({children}) => {
    //토큰
    const {access, RefreshToken} = useContext(LoginContext);

    const [fileUpdateLoading,setFileUpdateLoading] = useState(true);
    const [fileUpdate,setFileUpdate] = useState(false);

    //파일관리
    const [didList, setDidList] = useState([]); //파일관리 리스트
    const [deleteId, setDeleteId] = useState(0); //삭제할 id 값
    const [deleteFileName, setDeleteFileName] = useState(''); //삭제할 파일이름

    const [checkItem, setCheckItem] = useState([]);    //체크된 아이템 담을 배열
    const [checkId, setCheckId] = useState([]); //체크된 아이템 아이디

    const [updateCheckItem, setUpdateCheckItem] = useState([]); //재생목록에서 파일선택할것
    const [updateCheckId, setUpdateCheckId] = useState([]); //재생목록에서 파일 id 담을거


    const [PlayBtn, setPlayBtn] = useState(false); //파일관리 재생버튼
    const [PlayFileName, setPlayFileName] = useState(''); //플레이할 파일 이름
    const [PlayFileId, setPlayFileId] = useState(0); //플레이할 파일 id


    const [PlayBtn02, setPlayBtn02] = useState(false); //재생목록 재생버튼
    const [uploadFileName, setUploadFileName] = useState(''); //업로드된 파일이름
    const [uploadFileId, setUploadFileId] = useState(0); //업로드 파일 id


    const [mediaURL, setMediaURL] = useState('');  //미디어 다운로드
    const [mediaType, setMediaType] = useState('');  //미디어 다운로드

    const [detail, setDetail] = useState([]); //재생목록 디테일

    const [deletePlayId, setDeletePlayId] = useState(0); //did 재생목록 삭제아이디값


    //재생목록
    const [upEdit, setUpEdit] = useState(0);
    const [UpStart, setUpStart] = useState('');
    const [UpEnd, setUpEnd] = useState('');
    const [UpTime, setUpTime] = useState(0);
    const [UpTitle, setUpTitle] = useState('');
    const [UpContent, setUpContent] = useState('');
    const [UpUseYN, setUpUseYN] = useState(1);


    //파일관리 -> 파일리스트 GET
    const GetDIDList = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/board/playlist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setDidList(res.data);
        })
    }

    //파일관리 -> 파일삭제 delete(POST)
    const DeleteDID = async () => {
        for (let list of didList) {
            if (list.idx === deleteId) {
                RefreshToken();
                let ac = null;
                if (access == '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                } else {
                    ac = access
                }
                await fetch(`/api/board/playlist/delete`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        idx: list.idx
                    })
                })
            }
        }
        GetDIDList();
    }


    const [input, setInput] = useState([]);

    const handleTextValueChange = (e) => {
        const {name, value} = e.target;

        setInput((input) => {
            return {...input, [name]: value};
        });
    };


    const AddPlayValue = {
        file_idx: checkId, //파일아이디
        time: input, //파일재생시간
        pm_start: '', //게시시작일
        pm_end: '', //게시 종료일
        pm_title: '', //재생목록제목
        pm_content: '', //재생목록 내용
    }


    //재생목록관리
    const [playList, setPlayList] = useState([]); //재생목록 목록 리스트
    const [AddPlay, setAddPlay] = useState(AddPlayValue);

    const {time, file_idx, pm_content, pm_end, pm_start, pm_title} = AddPlayValue;
    //한번에 인풋 변경이벤트
    const onValueAddChange = (e) => {
        setAddPlay({...AddPlay, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        PlayDIDList();
    },[]);

    //재생목록관리 목록 가져오기
    const PlayDIDList = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/board/promotion/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setPlayList(res.data);
        })
    }

    //재생목록생성
    const PlayDIDAdd = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/board/promotion/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                file_idx: checkItem,
                time: input,
                pm_start: pm_start,
                pm_end: pm_end,
                pm_title: pm_title,
                pm_content: pm_content
            })
        })
        setAddPlay({
            file_idx: [], //파일아이디
            time: [], //파일재생시간
            pm_start: '', //게시시작일
            pm_end: '', //게시 종료일
            pm_title: '', //재생목록제목
            pm_content: '', //재생목록 내용
        });
        PlayDIDList();
    }

    const GetDIDFileGetCircle = async () => {
        RefreshToken();
        let ac = null;
        if (access === "") {
            ac = localStorage.getItem("login")?.replaceAll('"', "");
        } else {
            ac = access;
        }

        //데이터 리스트 가져옴
        await axios.get(`/api/file/promotion/img`, {
            params: {
                filename: PlayFileName,
                name: PlayFileId,
            },
            headers: {
                Authorization: 'Bearer ' + ac,
            },
            responseType: 'arraybuffer'
        })
            .then((response) => {
                if (response.status === 200) {

                    const contentType = response.headers['content-type'];

                    // 동영상인 경우
                    if (contentType && contentType.startsWith('application/octet-stream')) {
                        const videoBlob = new Blob([response.data], {type: 'video/mp4'});
                        const videoURL = URL.createObjectURL(videoBlob);
                        setMediaURL(videoURL);
                        setMediaType('video');
                    }
                    // 이미지인 경우
                    else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([response.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        setMediaURL(imageURL);
                        setMediaType('image');
                    }
                }
            })
            .catch((error) => {
                console.error('API 호출중 오류', error);
            });
    }


    const fileArr = uploadFileName.split(',');
    const [playNum, setPlayNum] = useState(0);

    //재생목록 재생하기
    const PlayListCircleList = async () => {
        RefreshToken();
        let ac = null;
        if (access === "") {
            ac = localStorage.getItem("login")?.replaceAll('"', "");
        } else {
            ac = access;
        }

        //데이터 리스트 가져옴
        axios.get(`/api/file/promotion/img`, {
            params: {
                filename: fileArr[playNum],
                name: uploadFileId,
            },
            headers: {
                Authorization: 'Bearer ' + ac,
            },
            responseType: 'arraybuffer'
        }).then((response) => {
            if (response.status === 200) {

                const contentType = response.headers['content-type'];

                // 동영상인 경우
                if (contentType && contentType.startsWith('application/octet-stream')) {
                    const videoBlob = new Blob([response.data], {type: 'video/mp4'});
                    const videoURL = URL.createObjectURL(videoBlob);
                    setMediaURL(videoURL);
                    setMediaType('video');
                }
                // 이미지인 경우
                else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                    const imageBlob = new Blob([response.data], {type: contentType});
                    const imageURL = URL.createObjectURL(imageBlob);
                    setMediaURL(imageURL);
                    setMediaType('image');
                }
            }
        })
            .catch((error) => {
                console.error('API 호출중 오류', error);
            });
    }


    ///재생목록관리 수정 아이디값 가져오기
    const GetEditPlayID = async (id) => {
        for (let list of playList) {
            if (list.pm_idx === id) {
                setUpStart(list.pm_start);
                setUpEnd(list.pm_end);
                setUpTime(list.time);
                setUpTitle(list.pm_title);
                setUpContent(list.pm_content);
                setUpUseYN(list.pm_use);
            }
        }
        setUpEdit(id);
    }


    useEffect(()=>{
        PlayDidDetail();
    },[]);
    //재생목록 디테일 페이지
    const PlayDidDetail = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/board/promotion/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setDetail(res.data);
        })
    }

    const DeletePlayEm = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/board/promotion/del`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                pm_idx: deletePlayId,
            })
        })
        PlayDIDList();
    }

    const CoTile = [
        {widgetId: "1", col: 1, colSpan: 4, rowSpan: 4,},
        {widgetId: "2", col: 5, colSpan: 2, rowSpan: 4,},
        // {widgetId: "3", col: 4, colSpan: 3, rowSpan: 2,},
    ];

    const getPositions04 = CoTile => {
        return (
            JSON.parse(localStorage.getItem("dashboard04")) || CoTile
        );
    };
    const CoNavigate = useNavigate();
    const GoCoDetail01 = () => {
        CoNavigate('/control/1');
    }
    const GoCoDetail02 = () => {
        CoNavigate('/control/2');
    }

    const CoConfig = [
        {
            id: "1",
            header: "미디어/홍보물 재생목록",
            body: <div>
                <div>
                    <div className="icon-line">
                        <BiCustomize onClick={GoCoDetail01} className="tile-icon"/>
                    </div>
                    <Control01/>
                </div>
            </div>,
            active: true,
        },
        {
            id: "2",
            header: "홍보물확인",
            body: <div>
                <div className="icon-line">
                    <BiCustomize onClick={GoCoDetail02} className="tile-icon"/>
                </div>
                <Control02/>
            </div>,
            active: true,
        },
    ];

    const [positions04, setPositions04] = useState(getPositions04(CoTile));
    const [widgets04, setWidgets04] = useState(CoConfig);


    const activeWidgets04 = useMemo(() => {
        return widgets04.reduce((acc, widget04) => {
            if (!widget04.active) return acc;
            acc.push(widget04);
            return acc;
        }, []);
    }, [widgets04]);

    const filteredPositions04 = useMemo(() => {
        return positions04.filter(positions04 => {
            return activeWidgets04.find(widget04 => widget04.id === positions04.widgetId)
                ?.active;
        });
    }, [activeWidgets04, positions04]);

    const handleReposition04 = e => {
        setPositions04(e.value);
        localStorage.setItem("dashboard04", JSON.stringify(e.value));
        for (let i = 0; i < Highcharts.charts.length; i += 1) {
            if (Highcharts.charts[i] !== undefined) {
                Highcharts.charts[i].reflow();
                Highcharts.charts[i].redraw();
            }
        }
    };

    const onResetLayout04 = () => {
        setPositions04(CoTile);
        localStorage.setItem(
            "dashboard04",
            JSON.stringify(CoTile)
        );
    };

    const onToggleWidget04 = e => {
        setPositions04(CoTile);
        localStorage.setItem(
            "dashboard04",
            JSON.stringify(CoTile)
        );
        const {id} = e.target.props;
        const {value} = e.target;
        const updatedWidgets04 = widgets04.map(widget04 => {
            if (widget04.id === id) {
                return {
                    ...widget04,
                    active: value,
                };
            }
            return widget04;
        });
        setWidgets04(updatedWidgets04);
    }


    return (
        <ControlContext.Provider value={{
            playNum, setPlayNum,
            fileArr,
            checkItem, setCheckItem,
            checkId, setCheckId,

            updateCheckItem, setUpdateCheckItem,
            updateCheckId, setUpdateCheckId,

            didList, setDidList,
            GetDIDList,
            deleteId, setDeleteId,
            deleteFileName, setDeleteFileName,
            DeleteDID, //did 관리 삭제
            PlayDIDList,

            mediaURL, setMediaURL,
            mediaType, setMediaType,

            playList, setPlayList,

            time,
            file_idx,
            pm_content,
            pm_end,
            pm_start,
            pm_title,
            PlayDIDAdd,
            onValueAddChange,
            GetDIDFileGetCircle,
            PlayListCircleList,

            input, setInput,
            handleTextValueChange,

            PlayBtn, setPlayBtn,
            PlayBtn02, setPlayBtn02,

            uploadFileName, setUploadFileName,
            uploadFileId, setUploadFileId,

            PlayFileName, setPlayFileName,
            PlayFileId, setPlayFileId,
            GetEditPlayID,


            upEdit, setUpEdit,
            UpStart, setUpStart,
            UpEnd, setUpEnd,
            UpTime, setUpTime,
            UpTitle, setUpTitle,
            UpContent, setUpContent,
            UpUseYN, setUpUseYN,

            deletePlayId, setDeletePlayId,
            DeletePlayEm,
            PlayDidDetail,

            onResetLayout04,
            widgets04,
            onToggleWidget04,
            filteredPositions04,
            activeWidgets04,
            handleReposition04,


            fileUpdateLoading,setFileUpdateLoading,
            fileUpdate,setFileUpdate,
        }}>
            {children}
        </ControlContext.Provider>
    )


}