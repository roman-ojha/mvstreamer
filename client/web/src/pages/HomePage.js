import React, { useEffect } from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";
import { instance as axios } from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { setHomePageSongsDetail } from "../services/redux-actions";

const HomePage = () => {
  const homePageSongDetail = useDispatch();
  const homePageSongDetailStore = useSelector(
    (state) => state.homePageSongsDetail
  );
  useEffect(async () => {
    try {
      const songRes = await axios("/");
      const songResData = await songRes.data;
      homePageSongDetail(setHomePageSongsDetail(songResData));
    } catch (err) {}
  }, []);
  return (
    <>
      <div className="HomePage">
        <Carousel carouselItem={homePageSongDetailStore.carouselItem} />
        <SongCardCarousel songsDetail={homePageSongDetailStore.songs} />
      </div>
    </>
  );
};

export default HomePage;
