import React from "react";
import SongCard from "./SongCard";

const SongCardCarousel = (props) => {
  return (
    <>
      <div className="SongCard_Caraousel">
        <h1>Recommended :</h1>
        <div className="SongCard_Carousel_Container">
          {props.songsDetail.map((value, key) => {
            return <SongCard key={key} songDetail={value} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SongCardCarousel;
