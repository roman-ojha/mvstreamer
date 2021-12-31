import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const NavBarANDMiniplayer = () => {
  return (
    <>
      <div className="MVstreamer_Navbar">
        <Link to="/">
          <div className="NavBar_HomePage_Outline">
            <Icon
              icon="ant-design:home-filled"
              color="white"
              width="55px"
              height="55px"
            />
          </div>
        </Link>
        <Link to="/music">
          <div className="NavBar_Music_Outline">
            <Icon
              icon="cib:apple-music"
              color="white"
              width="50px"
              height="50px"
            />
          </div>
        </Link>
        <div></div>
        <div></div>
        <div></div>
        <div className="MVstreamer_MiniPlayer">
          <div className="MVstreamer_MiniPlayer_TimeStamp"></div>
          <div className="MVstreamer_MiniPlayer_Inner">
            <Icon
              className="MVstreamer_MiniPlayer_Icons1"
              icon="fluent:previous-24-filled"
              color="#1976D2"
              width="55px"
              height="55px"
            />
            <Icon
              className="MVstreamer_MiniPlayer_Icons2"
              icon="bi:play-circle-fill"
              color="black"
              width="55px"
              height="55px"
            />
            <Icon
              className="MVstreamer_MiniPlayer_Icons3"
              icon="fluent:next-24-filled"
              color="DB392C"
              width="55px"
              height="55px"
            />
          </div>
        </div>
        <div className="NavBar_Video_Outline">
          <Icon
            icon="clarity:video-gallery-solid"
            color="white"
            width="55px"
            height="55px"
          />
        </div>
        <div className="NavBar_File_Outline">
          <Icon icon="bx:bxs-folder" color="white" width="55px" height="55px" />
        </div>
      </div>
    </>
  );
};

export default NavBarANDMiniplayer;
