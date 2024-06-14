import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {SurveysContext} from "../../../../../ContextServer/SurveysContext";
import {BiEnvelope } from "react-icons/bi";

function DetailBox({groupKey, handleJsonChange, handleOpen, onSubmit}) {
    const navigate = useNavigate();

    const {
        questList, setQuestList,
        mainSeq, setMainSeq,
        questSeq, setQuestSeq,
        ansSeq, setAnsSeq,
        SubmitVote,

        handleChange,
        next, setNext,
    } = useContext(SurveysContext);


    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="survey-body-2">


                    {
                        <div>
                            <div className="survey-body-quest-head">

                                {
                                    next === questList.length ? <>
                                        <p style={{textAlign :"center"}}>참여해주셔서 감사합니다.</p>
                                    </> : <p>{questList[next]?.sv_question_content}</p>
                                }

                            </div>
                            {
                                groupKey.map(function (arr, inx) {
                                    return (
                                        <div>
                                            {
                                                questList[next]?.seqno === parseInt(arr.sv_question_seqno) ?
                                                    <div>
                                                        {
                                                            groupKey[inx].ansSeqno.map(function (anwer, index) {
                                                                return (
                                                                    <div style={{
                                                                        textAlign: 'left',
                                                                        marginBottom: "1vh",
                                                                        marginTop: "4vh"
                                                                    }}>
                                                                        <input type={"radio"}
                                                                               value={anwer}
                                                                               id={`${arr}`}
                                                                               onChange={(e) => {
                                                                                   handleChange(e)
                                                                                   setMainSeq(questList[next]?.sv_seqno)
                                                                                   setQuestSeq(parseInt(groupKey[inx].sv_question_seqno));
                                                                                   setAnsSeq(anwer);
                                                                               }}
                                                                               name={inx}
                                                                               style={{
                                                                                   marginLeft: "5vh"
                                                                               }}
                                                                        />
                                                                        <label
                                                                            style={{paddingLeft: '2vh'}}
                                                                            onClick={() => {
                                                                                setMainSeq(questList[next]?.seqno)
                                                                                setQuestSeq(parseInt(groupKey[inx].sv_question_seqno));
                                                                                setAnsSeq(anwer);
                                                                            }}>
                                                                            {groupKey[inx].sv_ans_content[index]}
                                                                        </label>

                                                                    </div>
                                                                )
                                                            })
                                                        }
=
                                                    </div> : <div></div>
                                            }

                                        </div>
                                    )
                                })
                            }

                            {
                                next < questList.length ? <>
                                    <button className="nextBtn" onClick={() => {
                                        setNext(next + 1)
                                    }}>
                                        다음
                                    </button>
                                </> : null
                            }


                            {
                                next === questList.length ? <>
                                    <br/>
                                    <h4>설문조사가 참여가 완료 되었습니다.</h4>
                                    <p>제출하시겠습니까?</p>

                                    <button className="nextBtnEnd" onClick={() => {
                                        setNext(next + 1);
                                        SubmitVote();
                                        handleOpen();
                                    }}>
                                        제출하기 <BiEnvelope fontSize={20}/>
                                    </button>
                                </> : null
                            }



                        </div>

                    }


                    {/*<form onSubmit={onSubmit}>*/}
                    {/*    {*/}
                    {/*        [...questList]*/}
                    {/*            .map(function (arr, inx) {*/}

                    {/*                return (*/}
                    {/*                    <div className={`surveyBoxTitle ${arr.focus ? "error" : ""}`}*/}
                    {/*                         id={`buttons-group${inx}`}>*/}
                    {/*                        <div className="survey-body-quest-head">*/}
                    {/*                            <p>{arr.sv_question_content}</p>*/}
                    {/*                        </div>*/}

                    {/*                        <RadioGroup sx={{marginLeft: 5}}*/}
                    {/*                                    className="radioGroup"*/}
                    {/*                                    id={`${arr}`}*/}
                    {/*                                    name={inx}*/}
                    {/*                                    onChange={handleJsonChange}*/}
                    {/*                        >*/}

                    {/*                            {*/}
                    {/*                                groupKey.map(function (a, i) {*/}

                    {/*                                    return (*/}
                    {/*                                        <div>*/}
                    {/*                                            {arr.seqno === parseInt(a.sv_question_seqno) ? <>*/}
                    {/*                                                {*/}
                    {/*                                                    groupKey[inx].ansSeqno.map(function (anwer, index) {*/}
                    {/*                                                        return (*/}
                    {/*                                                            <div style={{*/}
                    {/*                                                                textAlign: 'left',*/}
                    {/*                                                                marginBottom: "1vh",*/}
                    {/*                                                                marginTop: "1vh"*/}
                    {/*                                                            }}>*/}
                    {/*                                                                <input type={"radio"}*/}
                    {/*                                                                       value={anwer}*/}
                    {/*                                                                       id={`${arr}`}*/}
                    {/*                                                                       onChange={(e) => {*/}
                    {/*                                                                           handleChange(e);*/}
                    {/*                                                                           setMainSeq(arr.sv_seqno)*/}
                    {/*                                                                           setQuestSeq(parseInt(groupKey[inx].sv_question_seqno));*/}
                    {/*                                                                           setAnsSeq(anwer);*/}
                    {/*                                                                       }}*/}
                    {/*                                                                       name={inx}*/}
                    {/*                                                                       style={{zIndex: 99999999999}}*/}
                    {/*                                                                />*/}
                    {/*                                                                <label*/}
                    {/*                                                                    style={{paddingLeft: '2vh'}}*/}
                    {/*                                                                    onClick={() => {*/}
                    {/*                                                                        setQuestSeq(parseInt(groupKey[inx].sv_question_seqno))*/}
                    {/*                                                                        setAnsSeq(anwer);*/}
                    {/*                                                                    }}>*/}
                    {/*                                                                    {groupKey[inx].sv_ans_content[index]}*/}
                    {/*                                                                </label>*/}

                    {/*                                                                <button>dd</button>*/}
                    {/*                                                            </div>*/}
                    {/*                                                        )*/}
                    {/*                                                    })*/}
                    {/*                                                }*/}
                    {/*                                            </> : null*/}
                    {/*                                            }*/}
                    {/*                                        </div>*/}
                    {/*                                    )*/}

                    {/*                                })*/}
                    {/*                            }*/}
                    {/*                        </RadioGroup>*/}
                    {/*                    </div>*/}
                    {/*                )*/}
                    {/*            })*/}
                    {/*    }*/}

                    {/*</form>*/}
                </div>
            </form>

            <div style={{marginTop: "1vh"}}>


            </div>


            {/*<Button variant="outlined" sx={{marginTop: 1, marginBottom: 1}} onClick={() => {*/}
            {/*    SubmitVote();*/}
            {/*    handleOpen();*/}
            {/*}}>*/}
            {/*    제출*/}
            {/*</Button>*/}
            {/*<Button variant="outlined" color={"error"} sx={{marginLeft: "1vh", marginTop: 1, marginBottom: 1}}*/}
            {/*        onClick={() => {*/}
            {/*            navigate('/survey/user/home');*/}
            {/*        }}>*/}
            {/*    취소*/}
            {/*</Button>*/}
        </div>
    )
}

export default DetailBox;