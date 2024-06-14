import {createContext, useContext, useEffect, useState} from "react";
import {LoginContext} from "./LoginContext";

export const SurveysContext = createContext({});

export const SurveysProvider = ({children}) => {
    //토큰할당
    const {access, RefreshToken, role} = useContext(LoginContext);

    //설문지 리스트 1.

    //1-1. 설문조사관리-전체리스트
    const [surveyAllList, setSurveyAllList] = useState([]);
    const [surveyNum, setSurveyNum] = useState(0);
    const SurveyMainSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey?currentPage=1&currentElement=100000`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setSurveyAllList(res.data);
        })
    }


    //1-2. 설문조사관리-설문등록
    const [title, setTitle] = useState(''); //설문제목
    const [svContent, setSvContent] = useState(''); //설문내용
    const [StartDate, setStartDate] = useState(''); // 시작일 ex:) 2023-05-13
    const [EndDate, setEndDate] = useState(''); //종료일 ex:) 2023-05-14

    const SurveyAddSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                sv_title: title,
                sv_content: svContent,
                sv_stdate: StartDate,
                sv_eddate: EndDate
            })
        })
        setTitle('');
        setSvContent('');
        setStartDate('');
        setEndDate('');

        SurveyMainSubmit();
    }


    //설문조사수정하기
    //1-3.수정할 아이디 및 데이터 값 받아오기
    const [EditMainId, setEditMainId] = useState('');

    const SurveyEditGetId = async (id) => {
        for (let list of surveyAllList) {
            if (list.seqno === id) {
                setTitle(list.sv_title);
                setSvContent(list.sv_content);
                setStartDate(list.sv_stdate);
                setEndDate(list.sv_eddate);
            }
        }
        setEditMainId(id);
    }


    //1-4. 설문조사관리-설문수정
    const [useYn, setUseYn] = useState(true); //사용유무(false 일시 삭제)

    const SuveyEditSubmit = async () => {
        for (let list of surveyAllList) {
            if (list.seqno === EditMainId) {
                RefreshToken();
                let ac = null;
                if (access === '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                    // ac = localStorage.getItem('login')
                } else {
                    ac = access
                }
                await fetch(`/api/survey`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        seqno: list.seqno,
                        sv_title: title,
                        sv_content: svContent,
                        sv_stdate: StartDate,
                        sv_eddate: EndDate,
                        useyn: useYn,
                    })
                })
            }
        }

        setTitle('');
        setSvContent('');
        setStartDate('');
        setEndDate('');
        setUseYn(true);

        SurveyMainSubmit();
    }


    //설문지 리스트 질문받기 2.
    const [SvSeqNo, setSvSeqNo] = useState(0); //설문조사 페이지 받아올 번호

    //2-1. 설문조사관리-질문 리스트
    const [SvQuestList, setSvQuestList] = useState([]); //설문조사 페이지 질문리스트

    const SurveyQuestSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${SvSeqNo}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setSvQuestList(res.data);
        })
    }


    //2-2. 설문조사관리 - 질문 등록
    const [questContent, setQuestContent] = useState('');

    const SurveyQuestAddSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                sv_seqno: SvSeqNo,
                sv_question_no: SvQuestList.length + 1, //질문 총 갯수 +1을 id값으로
                sv_question_content: questContent
            })
        })
        setQuestContent('');

        SurveyQuestSubmit();
    }


    //2-3 설문조사관리 - 질문수정할 데이터 값 받아오기
    const [editQuestId, setEditQuestId] = useState(0);

    const EditQuestGetId = async (id) => {
        for (let list of SvQuestList) {
            if (list.seqno === id) {
                setQuestContent(list.sv_question_content);
            }
        }
        setEditQuestId(id);
    }

    //2-4 설문조사관리 - 질문 수정
    const [questUseYn, setQuestUseYn] = useState(true);

    //2-1. 설문조사관리-질문 리스트
    const SurveyQuestEditSubmit = async () => {
        for (let list of SvQuestList) {
            if (list.seqno === editQuestId) {
                RefreshToken();
                let ac = null;
                if (access === '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                    // ac = localStorage.getItem('login')
                } else {
                    ac = access
                }
                await fetch(`/api/survey/question?sv_seqno=${SvSeqNo}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        seqno: list.seqno,
                        sv_question_no: list.sv_question_no,
                        sv_question_content: questContent,
                        useyn: questUseYn,
                    })
                })
            }
        }
        setQuestContent('');
        SurveyQuestSubmit();
    }


    ///3. 설문조사관리 설문-질문-답변받기
    const [svAnswerList, setSvAnswerList] = useState([]);
    const [questNo, setQuestNo] = useState(0); //설문조사 페이지-질문번호


    //2-1. 설문조사관리-답변  리스트

    useEffect(() => {

    }, []);


    const SurveyAnswerSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        await fetch(`/api/survey/singleAnswer?sv_main_seqno=${SvSeqNo}&sv_question_seqno=${questNo}&sv_ans_no=1`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setSvAnswerList(res.data);
        })
    }


    //2-2. 설문조사 - 답변등록
    const [answerContent, setAnswerContent] = useState('');

    const SurveyAnswerAdd = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
            // ac = localStorage.getItem('login')
        } else {
            ac = access
        }
        fetch(`/api/survey/answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify({
                sv_main_seqno: SvSeqNo,
                sv_question_seqno: questNo,
                sv_ans_no: 1,
                sv_ans_content: answerContent
            })
        })
        setAnswerContent('');
        SurveyAnswerSubmit();
    }


    //2-3 설문조사관리 - 답변 수정할 데이터 값 받아오기
    const [AnswerEditId, setAnswerEditId] = useState(0);

    const SvAnswerEditGetId = async (id) => {
        for (let list of svAnswerList) {
            if (list.seqno === id) {
                setAnswerContent(list.sv_ans_content);
            }
        }
        setAnswerEditId(id);
    }

    //2-4. 설문조사관리 - 답변수정
    const [answerUseYn, setAnswerUseYn] = useState(true);

    const SvAnswerEditSubmit = async () => {
        for (let list of svAnswerList) {
            if (list.seqno === AnswerEditId) {
                RefreshToken();
                let ac = null;
                if (access === '') {
                    ac = localStorage.getItem('login')?.replaceAll('"', '')
                    // ac = localStorage.getItem('login')
                } else {
                    ac = access
                }
                await fetch(`/api/survey/answer`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + ac,
                    },
                    body: JSON.stringify({
                        sv_main_seqno: list.sv_main_seqno,
                        sv_question_seqno: questNo,
                        sv_ans_no: 1,
                        sv_ans_content: answerContent,
                        useyn: answerUseYn,
                        seqno: list.seqno
                    })
                })
            }
        }
        setAnswerContent('');
        SurveyAnswerSubmit();
    }


    ///////userMode-유저모드 API
    const [surveyList, setSurveyList] = useState([]); //전체리스트

    const SurveyUserAllList = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey?currentPage=1&currentElement=10000`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setSurveyList(res.data);
        })
    }

    //데이터 값 불러오기
    const [editId, setEditId] = useState(0);
    const [userTitle, setUserTitle] = useState('');
    const [userContent, setUserContent] = useState('');
    const [userSdate, setUserSdate] = useState('');
    const [userEdate, setUserEdate] = useState('');

    const GetSurvey = async (id) => {
        for (let list of surveyList) {
            if (list.seqno === id) {
                setUserTitle(list.sv_title);
                setUserContent(list.sv_content);
                setUserSdate(list.sv_stdate);
                setUserEdate(list.sv_eddate);
            }
        }
        setEditId(id);
    }


    //질문 불러오기
    const [questList, setQuestList] = useState([]);
    const QuestGetSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/question?sv_seqno=${editId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setQuestList(res.data);
        })
    }

    //답변 불러오기
    const [answerList, setAnswerList] = useState([]);

    const AnswerGetSubmit = async () => {
        RefreshToken();
        let ac = null;
        if (access === '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/answer?sv_main_seqno=${editId}&useyn=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
        }).then(res => res.json()).then(res => {
            setAnswerList(res.data);
        })
    }



    let [vote,setVote] = useState([]);
    //투표하기
    const SubmitVote = async () => {
        RefreshToken();
        let ac = null;
        if (access == '') {
            ac = localStorage.getItem('login')?.replaceAll('"', '')
        } else {
            ac = access
        }
        await fetch(`/api/survey/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + ac,
            },
            body: JSON.stringify(vote)
        }).then(res => res.json())
    }


    return (
        <SurveysContext.Provider value={{
            surveyNum, setSurveyNum,
            vote,setVote,
            SubmitVote,


            //유저모드
            SurveyUserAllList,
            surveyList, setSurveyList,

            //데이터 GET
            GetSurvey,
            userTitle, setUserTitle,
            userContent, setUserContent,
            userSdate, setUserSdate,
            userEdate, setUserEdate,

            //질문 GET
            QuestGetSubmit,
            questList,

            //답변
            AnswerGetSubmit,
            answerList, setAnswerList,

            // 1. 설문조사 전체 리스트
            surveyAllList, setSurveyAllList, SurveyMainSubmit,

            //1-1 설문조사 - 답변 전체리스트
            SvQuestList, setSvQuestList, SurveyQuestSubmit,

            //1-2 설문조사 - 질문 전체 리스트
            svAnswerList, setSvAnswerList, SurveyAnswerSubmit,


            //2. 설문조사 등록 (제목/내용/시작일/종료일)
            title, setTitle,
            svContent, setSvContent,
            StartDate, setStartDate,
            EndDate, setEndDate,
            SurveyAddSubmit,

            // 2-1. 설문조사 질문 등록 (내용)
            questContent, setQuestContent, SurveyQuestAddSubmit,

            //2-2 설문조사 답변등록 (내용)
            answerContent, setAnswerContent, SurveyAnswerAdd,

            //3. 설문조사 수정 Id
            SurveyEditGetId,

            // 3-1 설문조사 질문수정 id
            EditQuestGetId,

            //3-2 설문조사 답변수정 id
            SvAnswerEditGetId,


            //4. 설문 수정하기
            SuveyEditSubmit,
            useYn, setUseYn,

            //4-1. 설문 질문수정하기
            questUseYn, setQuestUseYn,
            SurveyQuestEditSubmit,

            //4-2 답변 수정하기
            answerUseYn, setAnswerUseYn,
            SvAnswerEditSubmit,


            //5. 설문조사 메인 페이지 번호 가져오기
            SvSeqNo, setSvSeqNo,

            //6. 설문조사 질문 번호 가져오기
            questNo, setQuestNo,


        }}>
            {children}
        </SurveysContext.Provider>
    )
}