import "../../style/MainPlace.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { PlaceContext } from "../../context/PlaceContext";
import { Button, createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ResizeContext } from "../../context/ResizeContext";
import { WeatherContext } from "../../context/WeatherContext";
import { PlayContext } from "../../context/PlayContext";
import { NodeContext } from "../../context/NodeContext";
import { FootContext } from "../../context/FootContext";

function MainPlaceSelect() {
  const navigate = useNavigate();
  const {
    nodeList,
    NodeIdDataOnSubmit,
    nodeId, setNodeId
  } = useContext(PlaceContext);

  const { ResizingDataOnSubmit } = useContext(ResizeContext);
  const { WeatherOnSubmitData } = useContext(WeatherContext);
  const { GetFileList, PlayListOnsubmit, MediaVideo } = useContext(PlayContext);
  const { SensorFicOncSubmit } = useContext(NodeContext);
  const { NewsDataOnSubmit } = useContext(FootContext);
  useEffect(() => {
    WeatherOnSubmitData();
    ResizingDataOnSubmit();
    GetFileList();
    PlayListOnsubmit();
    MediaVideo();
    SensorFicOncSubmit();
    NewsDataOnSubmit();
  }, [nodeId]);


  const handleChange = (event) => {
    setNodeId(event.target.value);
  };

  //노드 아이디 로컬스토리지에 저장하기
  useEffect(() => {
    nodeNum();
  }, [nodeId]);


  //노드 아이디-로컬스토리지저장
  const nodeNum = useCallback(() => {
    localStorage.setItem("node", nodeId);
  }, [nodeId]);


  useEffect(() => {
    NodeIdDataOnSubmit();
  }, []);
  const DarkTheme = createTheme({
    palette: {
      mode: "dark"
    },
    typography: {
      fontFamily: "SUITE-Regular",
      fontWeight: 300
    }
  });


  return (
    <ThemeProvider theme={DarkTheme}>
      <div className="main-place-bg">
        <div className="main-place-inner">

          <h1>지점을 선택 해 주세요.</h1>


          <div className="main-place-select">
            <FormControl fullWidth className="main-place-select" size={"medium"}>
              <InputLabel id="demo-simple-select-label">선택</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={nodeId}
                onChange={handleChange}
              >
                {
                  nodeList.map((arr) => (
                    <MenuItem value={arr.sys_net_node_id} key={arr.sys_net_node_id}>
                      {arr.sys_net_node_id === 120 ? "맘모스 프라자" : (
                        arr.sys_net_node_id === 112 ? "장림 2동 행정복지센터" : (
                          arr.sys_net_node_id === 109 ? "장림 1동 행정복지센터" : (
                            arr.sys_net_node_id === 118 ? "감천 1동 행정복지센터" : (
                              arr.sys_net_node_id === 101 ? "부산산단환경개선센터" : (
                                arr.sys_net_node_id === 117 ? "다대2동행정복지센터" : (
                                  arr.sys_net_node_id === 115 ? "다대1동행정복지센터" : (
                                    arr.sys_net_node_id === 111 ? "장림유수지 인근" : (
                                      arr.sys_net_node_id === 107 ? "신평1동행정복지센터" : (
                                        arr.sys_net_node_id === 105 ? "구평동행정복지센터" : arr.sys_net_node_name
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
            </FormControl>
            <br />
            <br />
            <Button variant="contained" fullWidth onClick={() => {
              navigate("/main");
            }}>
              선택 완료
            </Button>
          </div>


        </div>
      </div>
    </ThemeProvider>
  );
}

export default MainPlaceSelect;
