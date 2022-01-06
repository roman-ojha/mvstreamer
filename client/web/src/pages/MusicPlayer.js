import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import Song_Image01 from "../assets/images/carousel_Image_02.jpg";
import Song_Image02 from "../assets/images/carousel_Image_01.jpg";
import Song_Image03 from "../assets/images/carousel_Image_03.jpg";
import PlayButton from "../assets/svg/PlayButton.svg";
import PauseButton from "../assets/svg/PauseButton.svg";
import { useParams } from "react-router-dom";

const MusicPlayer = () => {
  const { songID } = useParams();
  const [song, setSong] = useState(
    new Audio(`${process.env.REACT_APP_BASE_API_URL}/get/Audio/${songID}`)
  );
  const [play, setPlay] = useState(false);
  const [currentSongTime, setCurrentSongTime] = useState(song.currentTime);
  const totalSongDuration = song.duration;
  const totalSongDurationInMin = `${Math.floor(
    totalSongDuration / 60
  )}:${Math.floor(totalSongDuration % 60)}`;
  const currentSongTimeInMin = `${Math.floor(
    currentSongTime / 60
  )}:${Math.floor(currentSongTime % 60)}`;
  var songBufferPercentage;
  song.onprogress = function () {
    // getting the buffer length of song
    songBufferPercentage = (song.buffered.end(0) / song.duration) * 100;
  };
  var calculateTotalBufferWidth = 0;
  useEffect(() => {
    var rotateImage = 0;
    song.addEventListener("timeupdate", (event) => {
      // upgrading the song current time and lenght of the progressive bar
      var calPercentage = (song.currentTime / song.duration) * 100;
      setCurrentSongTime(song.currentTime);
      document.getElementsByClassName(
        "Music_Player_Current_Progress"
      )[0].style.width = `${calPercentage}%`;
      rotateImage++;
      document.getElementsByClassName(
        // rotating the image according while music playing
        "Music_Player_Big_Image"
      )[0].style = `transform: rotate(${rotateImage / 2}deg);`;
      calculateTotalBufferWidth =
        calPercentage + songBufferPercentage >= 100
          ? 100
          : calPercentage + songBufferPercentage;
      document.getElementsByClassName(
        // setting butter width
        "Music_Player_Buffer_Bar"
      )[0].style = `width: ${calculateTotalBufferWidth}%`;
    });
  }, []);

  const setSongTimeOnClick = (event) => {
    try {
      var fullProgressBar;
      if (
        event.target.className === "Music_Player_ProgressBar_Controller_Button"
      ) {
        // if we are clicking in the button it means that we don't want to move any where so we will return
        return;
      } else if (event.target.className === "Music_Player_Current_Progress") {
        fullProgressBar = event.target.parentNode.parentNode;
      } else if (event.target.className === "Music_Player_Buffer_Bar") {
        fullProgressBar = event.target.parentNode;
      } else if (
        event.target.className === "Music_Player_ProgressBar_Controller"
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
      const totalSongDuration = song.duration;
      const getClickTimePosition = (getPercentage / 100) * totalSongDuration;
      song.currentTime = getClickTimePosition;
      // setting the time where user had clicked
    } catch (err) {}
  };

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
          <img className="Music_Player_Big_Image" src={Song_Image02} />
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
          <h1
            className="Music_Player_Current_TimeStamp"
            style={{ marginRight: "1rem" }}
          >
            {currentSongTimeInMin}
          </h1>
          <div
            className="Music_Player_ProgressBar_Controller"
            onClick={setSongTimeOnClick}
          >
            <div className="Music_Player_Buffer_Bar">
              <div className="Music_Player_Current_Progress">
                <div className="Music_Player_ProgressBar_Controller_Button"></div>
              </div>
            </div>
          </div>
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
              style={{ width: "8rem", cursor: "pointer" }}
              onClick={() => {
                song.pause();
                setPlay(!play);
              }}
            />
          ) : (
            <img
              src={PlayButton}
              alt="PlayButton"
              style={{ width: "8rem", cursor: "pointer" }}
              onClick={() => {
                song.play();
                setPlay(!play);
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
