import React, { useEffect } from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";
import { instance as axios } from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { setHomePageSongsDetail } from "../services/redux-actions";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const homePageSongDetail = useDispatch();
  const homePageSongDetailStore = useSelector(
    (state) => state.homePageSongsDetail
  );
  window.onload = function () {
    if (location.state !== null) {
      location.state.from = "load";
    }
  };

  useEffect(async () => {
    try {
      const songRes = await axios("/");
      const songResData = await songRes.data;
      homePageSongDetail(setHomePageSongsDetail(songResData));
      if (location.state.from === "mplayer") {
        const url = location.state.url;
        const currentAudioTime = location.state.currentTime;
        const audio = new Audio(url);
        // audio.play();
      }
    } catch (err) {}
  }, []);
  return (
    <>
      <div className="HomePage">
        <Carousel carouselItem={homePageSongDetailStore.carouselItem} />
        <SongCardCarousel songsDetail={homePageSongDetailStore.songs} />
        <SongCardCarousel songsDetail={homePageSongDetailStore.songs} />
        <SongCardCarousel songsDetail={homePageSongDetailStore.songs} />
      </div>
    </>
  );
};

export default HomePage;
