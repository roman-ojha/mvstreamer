import React from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";

const HomePage = () => {
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
