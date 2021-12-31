import React from "react";
import { MainRoute } from "./Routes";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import MusicPlayer from "./pages/MusicPlayer";
import { Route, Routes } from "react-router-dom";
import MusicPage from "./pages/MusicPage";
import VideoPage from "./pages/VideoPage";
import FilePage from "./pages/FilePage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <>
      <MainRoute />
    </>
  );
};

export default App;
