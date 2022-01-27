import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  currentAudioAction,
  currentVideoAction,
} from "../services/redux-actions";

const SongCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const audio = useSelector((state) => state.currentAudioReducer);
  return (
    <>
      <div
        className="SongCard"
        onClick={() => {
          // ater clicking card we will get the api url to get fetch the audio then we will dispatch the audio and store it into the redux state and then on redux reducer we will play the audio and we will navigate to mvplayer page
          // console.log(props.songDetail);
          if (props.songDetail.mediaType === "audio") {
            const url = `${process.env.REACT_APP_BASE_API_URL}/get/Audio/${
              props.songDetail.mediaPath.split("/")[1]
            }`;
            dispatch(currentAudioAction(new Audio(url)));
            navigate(`/mplayer/${props.songDetail.mediaPath.split("/")[1]}`, {
              state: { from: "url", metaData: props.songDetail },
            });
          } else if (props.songDetail.mediaType === "video") {
            console.log("hello");
            const url = `${process.env.REACT_APP_BASE_API_URL}/get/video/${
              props.songDetail.mediaPath.split("/")[1]
            }`;
            dispatch(currentVideoAction(url));
            navigate(`/vplayer/${props.songDetail.mediaPath.split("/")[1]}`, {
              state: { from: "url", metaData: props.songDetail, url: url },
            });
          }
        }}
      >
        <div className="SongCard_Container">
          <img
            src={props.songDetail.imgUrl}
            alt="song"
            className="SongCard_Image"
          />
          <h2 className="SongCard_SongName">{props.songDetail.title}</h2>
          <p className="SongCard_SingerName">{props.songDetail.artist}</p>
          {/* <p className="SongCard_Date_Time">2021 | 3:15</p> */}
        </div>
      </div>
    </>
  );
};

export default SongCard;
