import React from "react";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import Song_Image01 from "../assets/images/carousel_Image_01.jpg";
import Song_Image02 from "../assets/images/carousel_Image_01.jpg";
import Song_Image03 from "../assets/images/carousel_Image_01.jpg";

const VolumeController = () => {
  return <></>;
};

const ProgressBarController = () => {
  return <></>;
};

const MusicPlayer = () => {
  return (
    <>
      <div className="Music_Player_Background">
        <div className="Music_Player_Container">
          <div className="Music_Player_BackButton_And_Profile">
            <Icon icon="eva:arrow-ios-back-outline" />
            <img src={User_Image} />
          </div>
          <div className="Music_Player_Volume_And_Song_Image_Container">
            <VolumeController />
            <img src={Song_Image01} />
            <img src={Song_Image02} />
            <img src={Song_Image03} />
            <VolumeController />
          </div>
          <div className="Music_Player_Song_Title_Container">
            <h2>Kavhi Khusi Kavhi Gam</h2>
            <p>Sonu Nigam</p>
          </div>
          <div className="Music_Player_TimeStamp_ProgressBar_Container">
            <p>1:45</p>
            <ProgressBarController />
            <p>3:20</p>
          </div>
          <div>
            <Icon icon="cil:loop-1" />
            <Icon icon="ic:round-favorite" />
            <Icon icon="fluent:previous-24-filled" />
            <Icon icon="bi:play-circle-fill" />
            <Icon icon="fluent:next-24-filled" />
            <Icon icon="bx:bxs-playlist" />
            <Icon icon="fa-solid:random" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
