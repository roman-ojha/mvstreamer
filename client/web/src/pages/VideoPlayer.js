import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import PauseButton from "../assets/svg/PauseButton.svg";
import PlayButton from "../assets/svg/PlayButton.svg";
import Video01 from "../assets/video/Video01.mp4";

const VideoPlayer = () => {
  const [video, setVideo] = useState();
  const [buttonValue, setButtonValue] = useState({
    playVideo: false,
    loopVideo: false,
    favoriteVideo: false,
    fullScreen: false,
    volume: false,
    frequency: false,
  });
  useEffect(() => {
    setVideo(document.querySelector("video"));
  }, []);
  return (
    <>
      <div className="Video_Player_Plus_Background_Container">
        <div className="Video_Player_Background"></div>
        <div className="VideoPlayer_Page_Container">
          <video
            src={Video01}
            id="VideoPlayerPage_VideoPlayer"
            className="VideoPlayer_Field"
          >
            <iframe frameBorder="0" allowFullScreen />
          </video>
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
                <h1 style={{ marginRight: "1rem" }}>1:45</h1>
                <div className="Video_Player_ProgressBar_Controller">
                  <div className="Video_Player_Buffer_Bar">
                    <div className="Video_Player_Current_Progress">
                      <div className="Video_Player_ProgressBar_Controller_Button"></div>
                    </div>
                  </div>
                </div>
                <h1 style={{ marginLeft: "1rem" }}> 5:13</h1>
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
                        playVideo: !buttonValue.playVideo,
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
                        playVideo: !buttonValue.playVideo,
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
                      setButtonValue({
                        ...buttonValue,
                        fullScreen: !buttonValue.fullScreen,
                      });
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
