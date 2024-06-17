import {ThemeProvider} from "@mui/material";
import {FaPlaceOfWorship} from "react-icons/fa";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import {DarkTheme} from "../../theme/mui-theme.jsx";
import MenuItem from "@mui/material/MenuItem";
import React, {useCallback, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {NodeContext} from "../../context/NodeContext.jsx";

function MainPlace() {
    const navigate = useNavigate();
    const {
        nodeId,
        handleChange,
        nodeList,
        NodeIdDataOnSubmit,
    } = useContext(NodeContext);

    //노드 리스트 불러오기
    useEffect(() => {
        NodeIdDataOnSubmit();
    }, []);

    //노드 아이디 로컬스토리지에 저장하기
    useEffect(() => {
        nodeNum();
    }, [nodeId]);


    //노드 아이디-로컬스토리지저장
    const nodeNum = useCallback(() => {
        localStorage.setItem('node', nodeId);
    }, [nodeId]);


    return (
        <ThemeProvider theme={DarkTheme}>
            <div className="login-bg">
                <div className="login-box-fade">

                    <div className="login-inner">
                        <FaPlaceOfWorship className="fade-icon"/>
                        <h1>지점을 선택 해 주세요.</h1>

                        <FormControl sx={{m: 1, minWidth: '80%'}}>
                            <InputLabel id="demo-simple-select-helper-label">지점선택</InputLabel>
                            <Select
                                label="선택"
                                value={nodeId || 0}
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>선택</MenuItem>
                                {
                                    nodeList.map((arr) => (
                                        <MenuItem
                                            value={arr.sys_net_node_id}
                                            key={arr.sys_net_node_id}
                                        >
                                            {arr.sys_net_node_id === 120 ? '맘모스 프라자' : (
                                                arr.sys_net_node_id === 112 ? "장림 2동 행정복지센터" : (
                                                    arr.sys_net_node_id === 109 ? "장림 1동 행정복지센터" : (
                                                        arr.sys_net_node_id === 118 ? "감천 1동 행정복지센터" : (
                                                            arr.sys_net_node_id === 101 ? "부산산단환경개선센터" : (
                                                                arr.sys_net_node_id === 117 ? "다대2동행정복지센터" : (
                                                                    arr.sys_net_node_id === 115 ? "다대1동행정복지센터" : (
                                                                        arr.sys_net_node_id === 105 ? "구평동행정복지센터" : (
                                                                            arr.sys_net_node_id === 107 ? "신평1동행정복지센터" : (
                                                                                arr.sys_net_node_id === 111 ? "장림유수지 인근" : arr.sys_net_node_name
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>편집 할 지점을 선택 해주세요.</FormHelperText>
                        </FormControl>


                        <Button variant="contained" color={"info"} sx={{width: '80%'}}
                                onClick={() => {
                                    if (nodeId === 0) {
                                        alert('지점을 선택해주세요.')
                                    } else {
                                        navigate('/home');
                                    }
                                }}
                        >
                            선택 완료
                        </Button>

                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default MainPlace;