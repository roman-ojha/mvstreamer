import React from "react";
import SongCard from "./SongCard";

const SongCardCarousel = () => {
  return (
    <>
      <div className="SongCard_Caraousel">
        <h1>Recommended</h1>
        <div className="SongCard_Carousel_Container">
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
          <SongCard />
        </div>
      </div>
    </>
  );
};

export default SongCardCarousel;
