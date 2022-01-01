import React from "react";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <Outlet />
      <NavBarANDMiniplayer />
    </div>
  );
};

export default MainPage;
