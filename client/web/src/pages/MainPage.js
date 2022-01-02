import React, { useEffect } from "react";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";
import { Outlet } from "react-router-dom";
import authenticate from "../Middleware/userAuth";

const MainPage = () => {
  // getting user Data and autheitcating the use
  useEffect(async () => {
    const res = await authenticate();
    console.log(await res.data);
  }, []);
  return (
    <div>
      <Outlet />
      <NavBarANDMiniplayer />
    </div>
  );
};

export default MainPage;
