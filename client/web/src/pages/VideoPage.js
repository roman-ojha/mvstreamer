import React from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";

const VideoPage = () => {
  return (
    <div>
      <Carousel />
      <SongCardCarousel  songsDetail={[]}/>
    </div>
  );
};

export default VideoPage;
