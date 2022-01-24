import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import PlayButton from "../assets/icons/PlayButton.png";
import PauseButton from "../assets/icons/PauseButton.png";
import { useSelector } from "react-redux";

const NavBarANDMiniplayer = () => {
  const [mediaPlay, setMediaPlay] = useState(false);
  const audio = useSelector((state) => state.currentAudioReducer);
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
      <div className="MVstreamer_MiniPlayer_Container">
        <div className="MVstreamer_MiniPlayer">
          <div className="MVstreamer_MiniPlayer_Inner">
            <Icon
              className="MVstreamer_MiniPlayer_previous_Icon"
              icon="fluent:previous-24-filled"
              color="#1976D2"
            />
            {mediaPlay ? (
              <img
                src={PauseButton}
                className="MVstreamer_MiniPlayer_Pause_Icon"
                onClick={() => {
                  audio.pause();
                  setMediaPlay(!mediaPlay);
                }}
              />
            ) : (
              <img
                src={PlayButton}
                className="MVstreamer_MiniPlayer_Play_Icon"
                onClick={() => {
                  audio.pause();
                  setMediaPlay(!mediaPlay);
                }}
              />
            )}
            <Icon
              className="MVstreamer_MiniPlayer_Next_Icon"
              icon="fluent:next-24-filled"
              color="DB392C"
            />
          </div>
        </div>
      </div>
      <div className="MVstreamer_Navbar">
        <NavLink to="/" style={designActiveLink}>
          <div className="NavBar_HomePage_Outline">
            <Icon
              className="Buttom_NavBar_Icons"
              icon="ant-design:home-filled"
              color="#FFFFFFDB"
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
              className="Buttom_NavBar_Icons"
              icon="cib:apple-music"
              color="#FFFFFFDB"
              transform={
                window.location.pathname === "/music" ? "scale(1.05)" : ""
              }
            />
          </div>
        </NavLink>
        <div className="MVstreamer_minPlayer_Space_Dive"></div>
        <div className="MVstreamer_minPlayer_Space_Dive"></div>
        <div className="MVstreamer_minPlayer_Space_Dive"></div>
        <NavLink
          to="/video"
          style={designActiveLink}
          className="NavBar_Video_Outline"
        >
          <div className="NavBar_HomePage_Outline">
            <Icon
              className="Buttom_NavBar_Icons"
              icon="clarity:video-gallery-solid"
              color="#FFFFFFDB"
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
              className="Buttom_NavBar_Icons"
              icon="bx:bxs-folder"
              color="#FFFFFFDB"
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
