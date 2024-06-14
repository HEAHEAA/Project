import { Route, Routes } from "react-router-dom";
import Main from "./Main/display/Main";
import "./style/Main.css";
import { WeatherProvider } from "./context/WeatherContext";
import { PlayProvider } from "./context/PlayContext";
import { FootProvider } from "./context/FootContext";
import { NodeProvider } from "./context/NodeContext";
import { ResizeProvider } from "./context/ResizeContext";
import MainPlaceSelect from "./Main/main-place/MainPlace-Select";
import { PlaceProvider } from "./context/PlaceContext";
import { useState } from "react";
import { DataTime, Nows } from "./util/date-time";
import { FadeProvider } from "./context/FadeContext";
import { DisplayOnProvider } from "./context/DisplayOnContext";

function App() {


  return (
    <div>
      <FadeProvider>
        <DisplayOnProvider>
          <PlaceProvider>
            <ResizeProvider>
              <WeatherProvider>
                <PlayProvider>
                  <FootProvider>
                    <NodeProvider>
                      <Routes>
                        <Route path="/" element={<MainPlaceSelect />} />
                        <Route path="/main" element={<Main />} />
                      </Routes>
                    </NodeProvider>
                  </FootProvider>
                </PlayProvider>
              </WeatherProvider>
            </ResizeProvider>
          </PlaceProvider>
        </DisplayOnProvider>
      </FadeProvider>
    </div>
  );
}

export default App;
