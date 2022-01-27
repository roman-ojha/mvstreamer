import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import PlayButton from "../assets/icons/PlayButton.png";
import PauseButton from "../assets/icons/PauseButton.png";
import { useSelector } from "react-redux";

const NavBarANDMiniplayer = () => {
  const navigate = useNavigate();
  const { ID } = useParams();
  const location = useLocation();
  const [mediaPlay, setMediaPlay] = useState(false);
  const audio = useSelector((state) => state.currentAudioReducer);
  const video = useSelector((state) => state.currentVideoReducer);

  useEffect(() => {
    console.log(location.state.metaData.mediaType);
    const totalDegreeToRotate = 120;
    const intoDecimal = totalDegreeToRotate / 100;
    audio.onpause = function () {
      setMediaPlay(false);
    };
    video.onpause = function () {
      setMediaPlay(false);
    };
    const updateAudio = () => {
      if (mediaPlay === false) {
        setMediaPlay(true);
      }
      const progressPercentage = (audio.currentTime / audio.duration) * 100;
      if (
        document.getElementsByClassName("MVstreamer_MiniPlayer")[0] !==
        undefined
      ) {
        document.getElementsByClassName(
          "MVstreamer_MiniPlayer"
        )[0].style = `transform: rotate(${
          progressPercentage * intoDecimal
        }deg)`;
        document.getElementsByClassName(
          "MVstreamer_MiniPlayer_Inner"
        )[0].style = `transform: rotate(-${
          progressPercentage * intoDecimal
        }deg)`;
      }
    };
    const updateVideo = () => {
      if (mediaPlay === false) {
        setMediaPlay(true);
      }
      const progressPercentage = (video.currentTime / video.duration) * 100;
      if (
        document.getElementsByClassName("MVstreamer_MiniPlayer")[0] !==
        undefined
      ) {
        document.getElementsByClassName(
          "MVstreamer_MiniPlayer"
        )[0].style = `transform: rotate(${
          progressPercentage * intoDecimal
        }deg)`;
        document.getElementsByClassName(
          "MVstreamer_MiniPlayer_Inner"
        )[0].style = `transform: rotate(-${
          progressPercentage * intoDecimal
        }deg)`;
      }
    };
    audio.addEventListener("timeupdate", updateAudio);
    video.addEventListener("timeupdate", updateVideo);
    return () => {
      audio.removeEventListener("timeupdate", updateAudio);
      video.removeEventListener("timeupdate", updateVideo);
    };
  }, []);
  const designActiveLink = ({ isActive }) => {
    if (isActive === true) {
      return {
        backgroundColor: "#FFFFFF4D",
        borderRadius: "10px",
      };
    }
  };

  const navigateToMPlayer = (event) => {
    const elementCName = event.target.className;
    // MVstreamer_MiniPlayer_previous_Icon
    // MVstreamer_MiniPlayer_Pause_Icon
    // MVstreamer_MiniPlayer_Play_Icon
    // MVstreamer_MiniPlayer_Next_Icon
    if (elementCName === "MVstreamer_MiniPlayer_Inner") {
      navigate(`/mplayer/${ID}`, {
        state: { from: "url", metaData: location.state.metaData },
      });
    }
  };
  return (
    <>
      <div className="MVstreamer_MiniPlayer_Container">
        <div className="MVstreamer_MiniPlayer">
          <div
            className="MVstreamer_MiniPlayer_Inner"
            onClick={navigateToMPlayer}
          >
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
                  if (location.state.metaData.mediaType === "audio") {
                    audio.pause();
                  } else if (location.state.metaData.mediaType === "video") {
                    video.pause();
                  }
                  setMediaPlay(!mediaPlay);
                }}
              />
            ) : (
              <img
                src={PlayButton}
                className="MVstreamer_MiniPlayer_Play_Icon"
                onClick={() => {
                  if (audio.src !== "") {
                    if (location.state.metaData.mediaType === "audio") {
                      audio.play();
                      setMediaPlay(!mediaPlay);
                    }
                  }
                  if (video.src !== "") {
                    if (location.state.metaData.mediaType === "video") {
                      video.play();
                      setMediaPlay(!mediaPlay);
                    }
                  }
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
