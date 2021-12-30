import React from "react";
import Card_Image from "../assets/images/card_image.jpg";

const SongCard = () => {
  return (
    <>
      <div className="SongCard">
        <div className="SongCard_Container">
          <img src={Card_Image} alt="song" className="SongCard_Image" />
          <h2 className="SongCard_SongName">Kavhi Khusi Kavhi Gam</h2>
          <p className="SongCard_SingerName">Singer: Sonu Nigam</p>
          <p className="SongCard_Date_Time">2021 | 3:15</p>
        </div>
      </div>
    </>
  );
};

export default SongCard;
