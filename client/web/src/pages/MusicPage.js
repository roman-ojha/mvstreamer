import React from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";
import { useDispatch, useSelector } from "react-redux";
import { setHomePageSongsDetail } from "../services/redux-actions";

const MusicPage = () => {
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

export default MusicPage;
