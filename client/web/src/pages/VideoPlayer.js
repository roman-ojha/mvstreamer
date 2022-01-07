import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import PauseButton from "../assets/svg/PauseButton.svg";
import PlayButton from "../assets/svg/PlayButton.svg";
import Video01 from "../assets/video/Video01.mp4";

const VideoPlayer = () => {
  // creating video element
  const [buttonValue, setButtonValue] = useState({
    playVideo: false,
    loopVideo: false,
    favoriteVideo: false,
    fullScreen: false,
    volume: false,
    frequency: false,
  });
  const [video] = useState(document.createElement("video"));
  const [currentVideoTime, setCurrentVideoTime] = useState(video.currentTime);
  const [totalVideoDuration, setTotalVideoDuration] = useState(0);
  const [mouseMove, setMouseMove] = useState(false);
  const currentVideoTimeInMin = `${Math.floor(
    currentVideoTime / 60
  )}:${Math.floor(currentVideoTime % 60)}`;
  const totalVideoDurationInMin = `${Math.floor(
    totalVideoDuration / 60
  )}:${Math.floor(totalVideoDuration % 60)}`;
  var songBufferPercentage;
  var calculateTotalBufferWidth = 0;

  function exitHandler() {
    // event triggered when exiting fullscreen
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setButtonValue({
        ...buttonValue,
        fullScreen: !buttonValue.fullScreen,
      });
    }
  }

  useEffect(() => {
    // setting attribute for the video element
    video.setAttribute("src", Video01);
    video.id = "VideoPlayerPage_VideoPlayer";
    video.className = "VideoPlayer_Field";
    const vContainerElm = document.getElementsByClassName(
      "VideoPlayer_Page_Container"
    )[0];
    // appending video element
    vContainerElm.append(video);
    video.addEventListener("timeupdate", (event) => {
      setTotalVideoDuration(video.duration);
      setCurrentVideoTime(video.currentTime);
      var calPercentage = (video.currentTime / video.duration) * 100;
      document.getElementsByClassName(
        "Video_Player_Current_Progress"
      )[0].style.width = `${calPercentage}%`;
    });

    document.addEventListener("mousemove", () => {
      var calPercentage = (video.currentTime / video.duration) * 100;
      document.getElementsByClassName(
        "Video_Player_Current_Progress"
      )[0].style.width = `${calPercentage}%`;
      document.getElementsByClassName(
        "VideoPlayer_Page_NavBar_Plus_BottomBar_Container"
      )[0].style.visibility = "visible";
    });
    document.addEventListener("mouseleave", () => {
      setTimeout(() => {
        document.getElementsByClassName(
          "Video_Player_Current_Progress"
        )[0].style = "transition-duration: 0ms;";
        document.getElementsByClassName(
          "VideoPlayer_Page_NavBar_Plus_BottomBar_Container"
        )[0].style.visibility = "hidden";
      }, 500);
    });
  }, []);
  const setVideoTimeOnClick = (event) => {
    try {
      var fullProgressBar;
      if (
        event.target.className === "Video_Player_ProgressBar_Controller_Button"
      ) {
        // if we are clicking in the button it means that we don't want to move any where so we will return
        return;
      } else if (event.target.className === "Video_Player_Current_Progress") {
        fullProgressBar = event.target.parentNode.parentNode;
      } else if (event.target.className === "Video_Player_Buffer_Bar") {
        fullProgressBar = event.target.parentNode;
      } else if (
        event.target.className === "Video_Player_ProgressBar_Controller"
      ) {
        fullProgressBar = event.target;
      }
      const totalWidth = fullProgressBar.getBoundingClientRect().width;
      const clickedWidth =
        event.clientX - event.target.getBoundingClientRect().left;
      // getting the position of the mouse where user click in progressive bar according to that element not windows element
      const getPercentage = (clickedWidth / totalWidth) * 100;
      // getting the percentage where user clicked on progressive bar
      if (getPercentage < 0) {
        getPercentage = 0;
      } else if (getPercentage > 100) {
        getPercentage = 100;
      }
      const totalSongDuration = video.duration;
      const getClickTimePosition = (getPercentage / 100) * totalSongDuration;
      video.currentTime = getClickTimePosition;
      // setting the time where user had clicked
    } catch (err) {}
  };
  return (
    <>
      <div className="Video_Player_Plus_Background_Container">
        <div className="Video_Player_Background"></div>
        <div className="VideoPlayer_Page_Container">
          {/* <video
            // src={Video01}
            id="VideoPlayerPage_VideoPlayer"
            className="VideoPlayer_Field"
          ></video> */}
          <div className="VideoPlayer_Page_NavBar_Plus_BottomBar_Container">
            <div className="VideoPlayer_Page_NavBar_Container">
              <Icon
                width="3.5rem"
                icon="eva:arrow-ios-back-outline"
                color="#000000B3"
                style={{ marginLeft: "1.2rem" }}
              />
              <div className="VideoPlayer_NavBar_TitleSName_Container">
                <h2>Kavhi Khusi Kavhi Gam</h2>
                <p>Sonu Nigam</p>
              </div>
              <img src={User_Image} alt="userimg" />
            </div>
            <div className="VideoPlayer_Page_BottomBar_Controller_Container">
              <div className="Video_Player_TimeStamp_ProgressBar_Container">
                <h1
                  style={{
                    marginRight: "1rem",
                    width: "6rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {currentVideoTimeInMin}
                </h1>
                <div
                  className="Video_Player_ProgressBar_Controller"
                  onClick={setVideoTimeOnClick}
                >
                  <div className="Video_Player_Buffer_Bar">
                    <div className="Video_Player_Current_Progress">
                      <div className="Video_Player_ProgressBar_Controller_Button"></div>
                    </div>
                  </div>
                </div>
                <h1
                  style={{
                    marginLeft: "1rem",
                    width: "6rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  {totalVideoDurationInMin}
                </h1>
              </div>
              <div className="VideoPlayer_Pause_Play_Next_Previous_Button_Controller">
                <Icon
                  width="2.8rem"
                  icon="cil:loop-1"
                  icon="ph:activity-bold"
                  cursor="pointer"
                  color="rgb(125 148 173 / 56%)"
                />
                <div></div>
                <div></div>
                <Icon
                  width="2.8rem"
                  icon="cil:loop-1"
                  color="rgb(125 148 173 / 56%)"
                  cursor="pointer"
                  color={
                    buttonValue.loopVideo
                      ? "#1976D2CC"
                      : "rgb(125 148 173 / 56%)"
                  }
                  onClick={() => {
                    setButtonValue({
                      ...buttonValue,
                      loopVideo: !buttonValue.loopVideo,
                    });
                  }}
                />

                <Icon
                  width="3rem"
                  icon="bx:bxs-playlist"
                  cursor="pointer"
                  color="rgb(125 148 173 / 56%)"
                />
                <Icon
                  width="3rem"
                  icon="fluent:previous-24-filled"
                  color="#1976D2CC"
                  cursor="pointer"
                />

                {buttonValue.playVideo ? (
                  <img
                    src={PauseButton}
                    alt="PauseButton"
                    style={{ width: "5.7rem", cursor: "pointer" }}
                    onClick={() => {
                      video.pause();
                      setButtonValue({
                        ...buttonValue,
                        playVideo: false,
                      });
                    }}
                  />
                ) : (
                  <img
                    src={PlayButton}
                    style={{ width: "5.7rem", cursor: "pointer" }}
                    onClick={() => {
                      video.play();
                      setButtonValue({
                        ...buttonValue,
                        playVideo: true,
                      });
                    }}
                  />
                )}
                <Icon
                  width="3rem"
                  icon="fluent:next-24-filled"
                  color="#DB392CCC"
                  cursor="pointer"
                />
                <Icon
                  width="3rem"
                  icon="ic:round-favorite"
                  cursor="pointer"
                  color={
                    buttonValue.favoriteVideo
                      ? "#DB392CCC"
                      : "rgb(188 126 121 / 65%)"
                  }
                  onClick={() => {
                    setButtonValue({
                      ...buttonValue,
                      favoriteVideo: !buttonValue.favoriteVideo,
                    });
                  }}
                />
                {buttonValue.fullScreen ? (
                  <Icon
                    width="3rem"
                    cursor="pointer"
                    color="rgb(188 126 121  /65%)"
                    icon="mdi:fullscreen-exit"
                    onClick={() => {
                      document.exitFullscreen();
                      document.addEventListener(
                        "fullscreenchange",
                        exitHandler
                      );
                      document.addEventListener(
                        "webkitfullscreenchange",
                        exitHandler
                      );
                      document.addEventListener(
                        "mozfullscreenchange",
                        exitHandler
                      );
                      document.addEventListener(
                        "MSFullscreenChange",
                        exitHandler
                      );
                    }}
                  />
                ) : (
                  <Icon
                    width="3rem"
                    cursor="pointer"
                    color="rgb(188 126 121  /65%)"
                    icon="mdi:fullscreen"
                    onClick={() => {
                      document
                        .getElementsByClassName(
                          "Video_Player_Plus_Background_Container"
                        )[0]
                        .requestFullscreen();
                      setButtonValue({
                        ...buttonValue,
                        fullScreen: !buttonValue.fullScreen,
                      });
                    }}
                  />
                )}
                <div></div>
                <div></div>
                <Icon
                  color="rgb(145 94 90 / 60%)"
                  width="2.8rem"
                  icon="bx:bxs-volume-full"
                  cursor="pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
