import React from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";

const MusicPage = () => {
  return (
    <div>
      <Carousel />
      <SongCardCarousel songsDetail={[]}/>
    </div>
  );
};

export default MusicPage;
