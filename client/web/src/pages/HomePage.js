import React, { useEffect } from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";
import { instance as axios } from "../services/axios";
import { useDispatch } from "react-redux";
import { setHomePageSongsDetail } from "../services/redux-actions";

const HomePage = () => {
  const homePageSongDetail = useDispatch();
  useEffect(async () => {
    try {
      const songRes = await axios("/");
      const songResData = await songRes.data;
      // console.log(songResData);
      homePageSongDetail(setHomePageSongsDetail(songResData));
    } catch (err) {}
  }, []);
  return (
    <>
      <div className="HomePage" onClick={() => {}}>
        <Carousel />
        <SongCardCarousel />
      </div>
    </>
  );
};

export default HomePage;
