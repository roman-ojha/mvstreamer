import React from "react";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";
import Carousel from "../react-components/Carousel";
import SongCard from "../react-components/SongCard";
import SongCardCarousel from "../react-components/SongCardCarousel";

const HomePage = () => {
  return (
    <>
      <div className="HomePage">
        <Carousel />
        <SongCardCarousel />
        <SongCardCarousel />
        <NavBarANDMiniplayer />
      </div>
    </>
  );
};

export default HomePage;
