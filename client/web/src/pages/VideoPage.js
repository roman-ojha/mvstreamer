import React from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";
import { useSelector } from "react-redux";

const VideoPage = () => {
  const homePageSongDetailStore = useSelector(
    (state) => state.homePageSongsDetail
  );
  return (
    <div>
      <Carousel carouselItem={homePageSongDetailStore.carouselItem} />
      <SongCardCarousel songsDetail={[]} />
    </div>
  );
};

export default VideoPage;
