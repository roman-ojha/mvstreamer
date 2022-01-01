import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import Song_Image01 from "../assets/images/carousel_Image_02.jpg";
import Song_Image02 from "../assets/images/carousel_Image_01.jpg";
import Song_Image03 from "../assets/images/carousel_Image_03.jpg";
import PlayButton from "../assets/icons/PlayButton.png";
import PauseButton from "../assets/icons/PauseButton.png";
import Music01 from "../assets/music/audio01.mp3";

const VolumeController = () => {
  return (
    <>
      <div className="Music_Player_Volume_Controller">
        <div className="Music_Player_Current_Volume">
          <div className="Music_Player_Volume_Controller_Button"></div>
        </div>
      </div>
    </>
  );
};

const ProgressBarController = () => {
  return (
    <>
      <div className="Music_Player_ProgressBar_Controller">
        <div className="Music_Player_Buffer_Bar">
          <div className="Music_Player_Current_Progress">
            <div className="Music_Player_ProgressBar_Controller_Button"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const song = new Audio(Music01);
const MusicPlayer = () => {
  const [play, setPlay] = useState(false);
  const [currentSongTime, setCurrentSongTime] = useState(song.currentTime);
  const totalSongDuration = song.duration;
  const totalSongDurationInMin = `${Math.floor(
    totalSongDuration / 60
  )}:${Math.floor(totalSongDuration % 60)}`;
  const currentSongTimeInMin = `${Math.floor(
    currentSongTime / 60
  )}:${Math.floor(currentSongTime % 60)}`;
  var progressBar;
  useEffect(() => {
    progressBar = document.getElementsByClassName(
      "Music_Player_Current_Progress"
    )[0];
    song.addEventListener("timeupdate", (event) => {
      var calPercentage = (song.currentTime / song.duration) * 100;
      setCurrentSongTime(song.currentTime);
      progressBar.style.width = `${calPercentage}%`;
    });
  }, []);
  return (
    <>
      <div className="Music_Player_Background"></div>
      <div className="Music_Player_Container">
        <div className="Music_Player_BackButton_And_Profile">
          <Icon
            width="4rem"
            icon="eva:arrow-ios-back-outline"
            color="#000000B3"
          />
          <img src={User_Image} alt="userimg" />
        </div>
        <div className="Music_Player_Volume_And_Song_Image_Container">
          <VolumeController />
          <div></div>
          <img
            style={{ boxShadow: "0px 0px 35px #0e316071" }}
            className="Music_Player_Song_Small_Image"
            src={Song_Image01}
            alt="simg01"
          />
          <div></div>
          <img className="Music_Player_Big_Small_Image" src={Song_Image02} />
          <div></div>
          <img
            style={{ boxShadow: " 0px 0px 35px #7c1f007c" }}
            className="Music_Player_Song_Small_Image"
            src={Song_Image03}
            alt="simg02"
          />
          <div></div>
          <VolumeController />
        </div>
        <div className="Music_Player_Song_Title_Container">
          <h2>Kavhi Khusi Kavhi Gam</h2>
          <p>Sonu Nigam</p>
        </div>
        <div className="Music_Player_TimeStamp_ProgressBar_Container">
          <h1 style={{ marginRight: "1rem" }}>{currentSongTimeInMin}</h1>
          <ProgressBarController />
          <h1 style={{ marginLeft: "1rem" }}>
            {totalSongDurationInMin === "NaN:NaN"
              ? "0:0"
              : totalSongDurationInMin}
          </h1>
        </div>
        <div className="Music_Player_Pause_Play_Next_Previous_Button_Controller">
          <div></div>
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="3.7rem"
            icon="cil:loop-1"
            cursor="pointer"
            color="rgb(125 148 173 / 56%)"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="4rem"
            icon="ic:round-favorite"
            cursor="pointer"
            color="rgb(125 148 173 / 56%)"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="4rem"
            icon="fluent:previous-24-filled"
            color="#1976D2CC"
            cursor="pointer"
          />
          {/* <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="7rem"
            icon="bi:play-circle-fill"
          /> */}
          {play ? (
            <img
              src={PauseButton}
              alt="PauseButton"
              style={{
                width: "8.1rem",
                cursor: "pointer",
                margin: "1.8rem 1.9rem 1.2rem 1.9rem",
              }}
              onClick={() => {
                song.pause();
                setPlay(!play);
              }}
            />
          ) : (
            <img
              src={PlayButton}
              alt="PlayButton"
              style={{ width: "12rem", cursor: "pointer" }}
              onClick={() => {
                song.play();
                setPlay(!play);
                // clearInterval(updateTime);
              }}
            />
          )}
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="4rem"
            icon="fluent:next-24-filled"
            color="#DB392CCC"
            cursor="pointer"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="4rem"
            icon="bx:bxs-playlist"
            cursor="pointer"
            color="rgb(188 126 121 / 76%)"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="3.7rem"
            icon="fa-solid:random"
            cursor="pointer"
            color="rgb(188 126 121 / 76%)"
          />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
