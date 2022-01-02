import React, { useEffect } from "react";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";
import { Outlet } from "react-router-dom";
import userAuth from "../Middleware/userAuth";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  // getting user Data and autheitcating the use
  useEffect(async () => {
    try {
      const res = await userAuth();
      if (res.status !== 200) {
        // Tost Message
        console.log("Unauthorized");
      }
      const data = await res.data;
      console.log(data);
    } catch (err) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Outlet />
      <NavBarANDMiniplayer />
    </div>
  );
};

export default MainPage;
