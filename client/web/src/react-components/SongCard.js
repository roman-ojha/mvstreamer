import React from "react";
import { useNavigate } from "react-router-dom";

const SongCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="SongCard"
        onClick={() => {
          navigate(`/mplayer/${props.songDetail.mediaPath.split("/")[1]}`, {
            state: props.songDetail,
          });
        }}
      >
        <div className="SongCard_Container">
          <img
            src={props.songDetail.imgUrl}
            alt="song"
            className="SongCard_Image"
          />
          <h2 className="SongCard_SongName">{props.songDetail.title}</h2>
          <p className="SongCard_SingerName">{props.songDetail.singerName}</p>
          <p className="SongCard_Date_Time">2021 | 3:15</p>
        </div>
      </div>
    </>
  );
};

export default SongCard;
