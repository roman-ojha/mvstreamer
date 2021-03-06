import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import PauseButton from "../assets/svg/PauseButton.svg";
import PlayButton from "../assets/svg/PlayButton.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoPlayer = () => {
  const userDetail = useSelector((state) => state.userProfileDetail);
  const navigate = useNavigate();
  const location = useLocation();
  const { videoID } = useParams();
  // creating video element
  const [buttonValue, setButtonValue] = useState({
    playVideo: true,
    loopVideo: false,
    favoriteVideo: false,
    fullScreen: false,
    volume: false,
    frequency: false,
  });
  const video = useSelector((state) => state.currentVideoReducer);
  const audio = useSelector((state) => state.currentAudioReducer);
  const [currentVideoTime, setCurrentVideoTime] = useState(video.currentTime);
  const [totalVideoDuration, setTotalVideoDuration] = useState(0);
  const currentVideoTimeInMin = `${Math.floor(
    currentVideoTime / 60
  )}:${Math.floor(currentVideoTime % 60)}`;
  const totalVideoDurationInMin = `${Math.floor(
    totalVideoDuration / 60
  )}:${Math.floor(totalVideoDuration % 60)}`;
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
  video.onpause = () => {
    setButtonValue({
      ...buttonValue,
      playVideo: false,
    });
  };
  useEffect(() => {
    var videoBufferPercentage;
    var calculateTotalBufferWidth = 0;
    // video.onprogress = function () {
    //   // getting the buffer length of song
    //   videoBufferPercentage = (video.buffered.end(0) / video.duration) * 100;
    // };
    const vContainerElm = document.getElementsByClassName(
      "VideoPlayer_Page_Container"
    )[0];
    // appending video element
    vContainerElm.append(video);
    // controlling state on video time update
    // updating video controller ========================================================
    const timeUpdate = () => {
      try {
        videoBufferPercentage = (video.buffered.end(0) / video.duration) * 100;
      } catch (e) {}
      if (!buttonValue.playVideo) {
        setButtonValue({
          ...buttonValue,
          playVideo: true,
        });
      }
      setTotalVideoDuration(video.duration);
      setCurrentVideoTime(video.currentTime);
      var calPercentage = (video.currentTime / video.duration) * 100;
      calculateTotalBufferWidth =
        calPercentage + videoBufferPercentage >= 100
          ? 100
          : calPercentage + videoBufferPercentage;
      document.getElementsByClassName(
        "Video_Player_Current_Progress"
      )[0].style.width = `${calPercentage}%`;
      document.getElementsByClassName(
        "Video_Player_Buffer_Bar"
      )[0].style.width = `${calculateTotalBufferWidth}%`;
    };
    //==================================================================
    const keyDown = (e) => {
      if (e.key === " ") {
        if (!video.paused) {
          video.pause();
          setButtonValue({
            ...buttonValue,
            playVideo: false,
          });
        } else {
          video.play();
          setButtonValue({
            ...buttonValue,
            playVideo: true,
          });
        }
      } else if (e.key === "ArrowRight") {
        video.currentTime = video.currentTime + 5;
      } else if (e.key === "ArrowLeft") {
        video.currentTime = video.currentTime - 5;
      } else if (e.key === "ArrowUp") {
        if (video.volume < 0.9) {
          video.volume = video.volume + 0.07;
        } else {
          video.volume = 1;
        }
      } else if (e.key === "ArrowDown") {
        if (video.volume > 0.1) {
          video.volume = video.volume - 0.07;
        } else {
          video.volume = 0;
        }
      }
      const keyInterval = setInterval(() => {
        if (e.key === " ") {
          if (!video.paused) {
            video.pause();
            setButtonValue({
              ...buttonValue,
              playVideo: false,
            });
          } else {
            video.play();
            setButtonValue({
              ...buttonValue,
              playVideo: true,
            });
          }
        } else if (e.key === "ArrowRight") {
          video.currentTime = video.currentTime + 5;
        } else if (e.key === "ArrowLeft") {
          video.currentTime = video.currentTime - 5;
        } else if (e.key === "ArrowUp") {
          if (video.volume < 0.9) {
            video.volume = video.volume + 0.07;
          } else {
            video.volume = 1;
          }
        } else if (e.key === "ArrowDown") {
          if (video.volume > 0.1) {
            video.volume = video.volume - 0.07;
          } else {
            video.volume = 0;
          }
        }
      }, 500);
      const keyUp = () => {
        // need to stop the interval if use stop pressing the key button
        clearInterval(keyInterval);
      };
      document.addEventListener("keyup", keyUp);
    };
    // hiding controller when mouse stop moving ==========================================
    let mouseMoving = false;
    const updateMouseMove = () => {
      mouseMoving = true;
      var calPercentage = (video.currentTime / video.duration) * 100;
      document.getElementsByClassName(
        "Video_Player_Current_Progress"
      )[0].style.width = `${calPercentage}%`;
      document.getElementsByClassName(
        "VideoPlayer_Page_NavBar_Plus_BottomBar_Container"
      )[0].style.visibility = "visible";
      document.removeEventListener("mousemove", updateMouseMove);
    };
    const chackMouseMove = setInterval(() => {
      if (!mouseMoving) {
        document.getElementsByClassName(
          "Video_Player_Current_Progress"
        )[0].style = "transition-duration: 0ms;";
        document.getElementsByClassName(
          "VideoPlayer_Page_NavBar_Plus_BottomBar_Container"
        )[0].style.visibility = "hidden";
      }
      mouseMoving = false;
      document.addEventListener("mousemove", updateMouseMove);
    }, 2000);
    //===============================================================================

    video.addEventListener("timeupdate", timeUpdate);
    // controlling on keyboard press
    document.addEventListener("keydown", keyDown);
    return () => {
      video.removeEventListener("timeupdate", timeUpdate);
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("mousemove", updateMouseMove);
      clearInterval(chackMouseMove);
    };
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
          <div className="VideoPlayer_Page_NavBar_Plus_BottomBar_Container">
            <div className="VideoPlayer_Page_NavBar_Container">
              <Icon
                width="3.5rem"
                icon="eva:arrow-ios-back-outline"
                color="#000000B3"
                style={{ marginLeft: "1.2rem" }}
                cursor="pointer"
                onClick={() => {
                  navigate(`/playing/${videoID}`, {
                    state: {
                      metaData: location.state.metaData,
                      playing: buttonValue.playVideo,
                    },
                  });
                }}
              />
              <div className="VideoPlayer_NavBar_TitleSName_Container">
                <h2>{location.state.metaData.title}</h2>
                {location.state.from === "local" ? (
                  ""
                ) : (
                  <p>{location.state.metaData.artist}</p>
                )}
              </div>
              <img src={userDetail.picture} alt="userimg" />
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
                  {totalVideoDurationInMin === "NaN:NaN"
                    ? "0:0"
                    : totalVideoDurationInMin}
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
