import React, { useEffect } from "react";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { instance as axios } from "../services/axios";
import { setUserProfileDetail } from "../services/redux-actions";
import { useDispatch, useSelector } from "react-redux";

const MainPage = () => {
  const navigate = useNavigate();
  const userProfileDispatch = useDispatch();
  useEffect(async () => {
    // getting user Data and autheitcating the use
    try {
      const userDetailRes = await axios("/auth", { withCredentials: true });
      const userDetail = await userDetailRes.data;
      userProfileDispatch(setUserProfileDetail(userDetail.user));
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
