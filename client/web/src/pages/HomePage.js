import React, { useEffect } from "react";
import Carousel from "../react-components/Carousel";
import SongCardCarousel from "../react-components/SongCardCarousel";
import NavBarANDMiniplayer from "../react-components/NavBarANDMiniplayer";
import { instance as axios } from "../services/axios";

const HomePage = () => {
  // const ctx = new AudioContext();
  // let audio;
  // function playBack() {
  //   // const playSound = ctx.createBufferSource();
  //   // playSound.buffer = audio;
  //   // playSound.connect(ctx.destination);
  //   // playSound.start(ctx.currentTime);
  // }
  // const getSongs = () => {
  //   try {
  //     // const res = await axios.get("/get/Audio", {
  //     //   responseType: "arraybuffer",
  //     // });
  //     const res = fetch("http://localhost:8080/get/Audio", {
  //       responseType: "arraybuffer",
  //     })
  //       .then((data) => data.arrayBuffer())
  //       .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
  //       .then((decodedAudio) => {
  //         audio = decodedAudio;
  //         const playSound = ctx.createBufferSource();
  //         playSound.buffer = audio;
  //         playSound.connect(ctx.destination);
  //         playSound.start(ctx.currentTime);
  //         console.log(audio);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {}, []);

  return (
    <>
      <div className="HomePage" onClick={() => {}}>
        <Carousel />
        <SongCardCarousel />
        <SongCardCarousel />
      </div>
    </>
  );
};

export default HomePage;
