import React, { useEffect } from "react";
import Video01 from "../assets/video/Video01.mp4";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import PauseButton from "../assets/svg/PauseButton.svg";

const VideoPlayer = () => {
  var video;
  useEffect(() => {
    video = document.getElementById("VideoPlayerPage_VideoPlayer");
  }, []);
  return (
    <>
      <div className="Video_Player_Background"></div>
      <div className="VideoPlayer_Page_Container">
        <video id="VideoPlayerPage_VideoPlayer" className="VideoPlayer_Field">
          <source src={Video01} />
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
                cursor="pointer"
                color="rgb(125 148 173 / 56%)"
                icon="ph:activity-bold"
              />
              <div></div>
              <div></div>
              <Icon
                width="2.8rem"
                icon="cil:loop-1"
                cursor="pointer"
                color="rgb(125 148 173 / 56%)"
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

              <img
                src={PauseButton}
                alt="PauseButton"
                style={{ width: "5.7rem", cursor: "pointer" }}
                cursor="pointer"
              />
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
                color="rgb(188 126 121  /65%)"
              />
              <Icon
                width="3rem"
                icon="fa-solid:random"
                cursor="pointer"
                color="rgb(188 126 121  /65%)"
                icon="mdi:fullscreen"
              />
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
    </>
  );
};

export default VideoPlayer;
