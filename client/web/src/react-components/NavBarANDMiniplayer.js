import React from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import PlayButton from "../assets/icons/PlayButton.png";

const NavBarANDMiniplayer = () => {
  const designActiveLink = ({ isActive }) => {
    if (isActive === true) {
      return {
        backgroundColor: "#FFFFFF4D",
        borderRadius: "10px",
      };
    }
  };
  return (
    <>
      <div className="MVstreamer_Navbar">
        <NavLink to="/" style={designActiveLink}>
          <div className="NavBar_HomePage_Outline">
            <Icon
              icon="ant-design:home-filled"
              color="#FFFFFFDB"
              width="55px"
              height="55px"
              transform={window.location.pathname === "/" ? "scale(1.05)" : ""}
            />
          </div>
        </NavLink>
        <NavLink
          to="/music"
          style={designActiveLink}
          className="NavBar_Music_Outline"
        >
          <div className="NavBar_HomePage_Outline">
            <Icon
              icon="cib:apple-music"
              color="#FFFFFFDB"
              width="48px"
              height="48px"
              transform={
                window.location.pathname === "/music" ? "scale(1.05)" : ""
              }
            />
          </div>
        </NavLink>
        <div></div>
        <div></div>
        <div></div>
        <NavLink to="/mplayer" className="MVstreamer_MiniPlayer">
          <div className="MVstreamer_MiniPlayer_TimeStamp"></div>
          <div className="MVstreamer_MiniPlayer_Inner">
            <Icon
              className="MVstreamer_MiniPlayer_Icons1"
              icon="fluent:previous-24-filled"
              color="#1976D2"
              width="55px"
              height="55px"
            />
            <img
              src={PlayButton}
              style={{ width: "100px", height: "100px", marginTop: "23px" }}
            />
            <Icon
              className="MVstreamer_MiniPlayer_Icons3"
              icon="fluent:next-24-filled"
              color="DB392C"
              width="55px"
              height="55px"
            />
          </div>
        </NavLink>
        <NavLink
          to="/video"
          style={designActiveLink}
          className="NavBar_Video_Outline"
        >
          <div className="NavBar_HomePage_Outline">
            <Icon
              icon="clarity:video-gallery-solid"
              color="#FFFFFFDB"
              width="52px"
              height="52px"
              transform={
                window.location.pathname === "/video" ? "scale(1.05)" : ""
              }
            />
          </div>
        </NavLink>
        <NavLink
          to="/file"
          style={designActiveLink}
          className="NavBar_File_Outline"
        >
          <div className="NavBar_HomePage_Outline">
            <Icon
              icon="bx:bxs-folder"
              color="#FFFFFFDB"
              width="55px"
              height="55px"
              transform={
                window.location.pathname === "/file" ? "scale(1.05)" : ""
              }
            />
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default NavBarANDMiniplayer;
