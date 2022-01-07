import React, { useEffect } from "react";
import Video01 from "../assets/video/Video01.mp4";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";

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
          <div className="VideoPlayer_Page_NavBar_Container"></div>
          <div className="VideoPlayer_Page_BottomBar_Controller_Container"></div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
