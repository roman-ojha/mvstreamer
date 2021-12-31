import React from "react";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";
import HomePage from "./HomePage";
import { BottomNavRoute } from "../Routes/index";
import MusicPage from "./MusicPage";
import VideoPage from "./VideoPage";
import FilePage from "./FilePage";
import { Routes, Route } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <BottomNavRoute />
      <NavBarANDMiniplayer />
    </div>
  );
};

export default MainPage;
