import React from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";

const HomePage = () => {
  return (
    <>
      <div className="HomePage">
        <Carousel />
        <SongCardCarousel />
        <SongCardCarousel />
      </div>
    </>
  );
};

export default HomePage;
