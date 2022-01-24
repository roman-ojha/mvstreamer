import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import Song_Image01 from "../assets/images/carousel_Image_02.jpg";
import Song_Image03 from "../assets/images/carousel_Image_03.jpg";
import PlayButton from "../assets/svg/PlayButton.svg";
import PauseButton from "../assets/svg/PauseButton.svg";
import MusicIcon from "../assets/images/App_Icon.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentAudioAction } from "../services/redux-actions";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navitate = useNavigate();
  const audioFrom = location.state.from;
  const { songID } = useParams();
  const audio = useSelector((state) => state.currentAudioReducer);
  // getting songid from the url parameter
  let url;
  if (audioFrom === "local") {
    // if audio from local file then we will set url comming from navigated location
    url = location.state.url;
  } else {
    url = `${process.env.REACT_APP_BASE_API_URL}/get/Audio/${songID}`;
  }

  // With out redux state ===================================
  // const [song, setSong] = useState(new Audio(url));
  // // song.current = new Audio(url);
  // // song.autoplay = true;
  // const [currentSongTime, setCurrentSongTime] = useState(song.currentTime);
  // const [buttonValue, setButtonValue] = useState({
  //   playSong: true,
  //   loopSong: false,
  //   favoriteSong: false,
  //   randomSong: false,
  // });
  // const [currentVolume, setCurrentVolume] = useState(0.7);
  // song.loop = buttonValue.loopSong;
  // song.volume = currentVolume;
  // const totalSongDuration = song.duration;
  // const totalSongDurationInMin = `${Math.floor(
  //   totalSongDuration / 60
  // )}:${Math.floor(totalSongDuration % 60)}`;
  // const currentSongTimeInMin = `${Math.floor(
  //   currentSongTime / 60
  // )}:${Math.floor(currentSongTime % 60)}`;
  // var songBufferPercentage;
  // song.onprogress = function () {
  //   // getting the buffer length of song
  //   songBufferPercentage = (song.buffered.end(0) / song.duration) * 100;
  // };
  // var calculateTotalBufferWidth = 0;
  // =================================================

  const [currentSongTime, setCurrentSongTime] = useState(audio.currentTime);
  const [buttonValue, setButtonValue] = useState({
    playSong: true,
    loopSong: false,
    favoriteSong: false,
    randomSong: false,
  });
  const [currentVolume, setCurrentVolume] = useState(0.7);
  audio.loop = buttonValue.loopSong;
  audio.volume = currentVolume;
  const totalSongDuration = audio.duration;
  const totalSongDurationInMin = `${Math.floor(
    totalSongDuration / 60
  )}:${Math.floor(totalSongDuration % 60)}`;
  const currentSongTimeInMin = `${Math.floor(
    currentSongTime / 60
  )}:${Math.floor(currentSongTime % 60)}`;
  var songBufferPercentage;
  audio.onprogress = function () {
    // getting the buffer length of song
    songBufferPercentage = (audio.buffered.end(0) / audio.duration) * 100;
  };
  var calculateTotalBufferWidth = 0;
  useEffect(() => {
    dispatch(currentAudioAction(new Audio(url)));
  }, []);
  useEffect(() => {
    var rotateImage = 0;
    audio.addEventListener("timeupdate", (event) => {
      // upgrading the song current time and lenght of the progressive bar
      var calPercentage = (audio.currentTime / audio.duration) * 100;
      setCurrentSongTime(audio.currentTime);
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
  }, [audio]);
  useEffect(() => {
    return () => {
      audio.pause();
    };
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
      const totalSongDuration = audio.duration;
      const getClickTimePosition = (getPercentage / 100) * totalSongDuration;
      audio.currentTime = getClickTimePosition;
      // setting the time where user had clicked
    } catch (err) {}
  };
  const updateVolume = (e) => {
    let parentElement;
    if (e.target.className === "Music_Player_Current_Volume") {
      parentElement = e.target.parentElement.parentElement;
    } else if (e.target.className === "Music_Player_Volume_Controller_Button") {
      return;
    } else if (e.target.className === "Music_Player_Volume_Controller") {
      parentElement = e.target.parentElement;
    } else {
      parentElement = e.target;
    }
    const totalHeight = parentElement.getBoundingClientRect().height;
    const clickedHeight = e.target.getBoundingClientRect().bottom - e.clientY;
    const getPercentage = (clickedHeight / totalHeight) * 100;
    if (getPercentage < 0) {
      getPercentage = 0;
    } else if (getPercentage > 100) {
      getPercentage = 100;
    }
    const currentVolumeProgress = parentElement.firstChild.firstChild;
    currentVolumeProgress.style = `height:${getPercentage}%`;
    setCurrentVolume(getPercentage / 100);
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
            cursor="pointer"
            onClick={() => {
              // navigating to home page and we want to paly the current song with
              navitate("/", {
                state: {
                  url: url,
                  currentTime: currentSongTime,
                  from: "mplayer",
                },
              });
            }}
          />
          <img src={User_Image} alt="userimg" />
        </div>
        <div className="Music_Player_Volume_And_Song_Image_Container">
          <div className="Music_Player_Volume_Controller">
            <div className="Music_Player_Current_Volume">
              <div className="Music_Player_Volume_Controller_Button"></div>
            </div>
          </div>
          <div></div>
          <img
            style={{ boxShadow: "0px 0px 35px #0e316071" }}
            className="Music_Player_Song_Small_Image"
            src={Song_Image01}
            alt="simg01"
          />
          <div></div>
          <img
            className="Music_Player_Big_Image"
            src={
              audioFrom === "local" ? MusicIcon : location.state.metaData.imgUrl
            }
          />
          <div></div>
          <img
            style={{ boxShadow: " 0px 0px 35px #7c1f007c" }}
            className="Music_Player_Song_Small_Image"
            src={Song_Image03}
            alt="simg02"
          />
          <div></div>
          <div
            className="Music_Player_Volume_Controller_Container"
            onMouseDown={updateVolume}
          >
            <div className="Music_Player_Volume_Controller">
              <div
                className="Music_Player_Current_Volume"
                style={{ height: `${currentVolume * 100}%` }}
              >
                <div className="Music_Player_Volume_Controller_Button"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="Music_Player_Song_Title_Container">
          <h2>{location.state.metaData.title}</h2>
          {audioFrom === "local" ? (
            <p></p>
          ) : (
            <p>{location.state.metaData.singerName}</p>
          )}
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
            width="3.7rem"
            icon="cil:loop-1"
            cursor="pointer"
            color={
              buttonValue.loopSong ? "#1976D2CC" : "rgb(125 148 173 / 56%)"
            }
            onClick={() => {
              setButtonValue({
                ...buttonValue,
                loopSong: !buttonValue.loopSong,
              });
            }}
          />

          <Icon
            width="4rem"
            icon="bx:bxs-playlist"
            cursor="pointer"
            color="rgb(125 148 173 / 56%)"
          />
          <Icon
            width="4rem"
            icon="fluent:previous-24-filled"
            color="#1976D2CC"
            cursor="pointer"
          />
          {buttonValue.playSong ? (
            <img
              src={PauseButton}
              alt="PauseButton"
              style={{ width: "8rem", cursor: "pointer" }}
              onClick={() => {
                audio.pause();
                setButtonValue({
                  ...buttonValue,
                  playSong: !buttonValue.playSong,
                });
              }}
            />
          ) : (
            <img
              src={PlayButton}
              alt="PlayButton"
              style={{ width: "8rem", cursor: "pointer" }}
              onClick={() => {
                audio.play();
                setButtonValue({
                  ...buttonValue,
                  playSong: !buttonValue.playSong,
                });
              }}
            />
          )}
          <Icon
            width="4rem"
            icon="fluent:next-24-filled"
            color="#DB392CCC"
            cursor="pointer"
          />
          <Icon
            width="4rem"
            icon="ic:round-favorite"
            cursor="pointer"
            color={
              buttonValue.favoriteSong ? "#DB392CCC" : "rgb(188 126 121 / 70%)"
            }
            onClick={() => {
              setButtonValue({
                ...buttonValue,
                favoriteSong: !buttonValue.favoriteSong,
              });
            }}
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="3.6rem"
            icon="fa-solid:random"
            cursor="pointer"
            color="rgb(188 126 121 / 70%)"
            color={
              buttonValue.randomSong ? "#DB392CCC" : "rgb(188 126 121 / 70%)"
            }
            onClick={() => {
              setButtonValue({
                ...buttonValue,
                randomSong: !buttonValue.randomSong,
              });
            }}
          />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
