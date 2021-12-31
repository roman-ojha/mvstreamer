import React from "react";
import { Icon } from "@iconify/react";
import User_Image from "../assets/images/user.jpg";
import Song_Image01 from "../assets/images/carousel_Image_02.jpg";
import Song_Image02 from "../assets/images/carousel_Image_01.jpg";
import Song_Image03 from "../assets/images/carousel_Image_03.jpg";

const VolumeController = () => {
  return (
    <>
      <div className="Music_Player_Volume_Controller">
        <div className="Music_Player_Current_Volume">
          <div className="Music_Player_Volume_Controller_Button"></div>
        </div>
      </div>
    </>
  );
};

const ProgressBarController = () => {
  return (
    <>
      <div className="Music_Player_ProgressBar_Controller">
        <div className="Music_Player_Current_Progress">
          <div className="Music_Player_ProgressBar_Controller_Button"></div>
        </div>
      </div>
    </>
  );
};

const MusicPlayer = () => {
  return (
    <>
      <div className="Music_Player_Background"></div>
      <div className="Music_Player_Container">
        <div className="Music_Player_BackButton_And_Profile">
          <Icon width="60px" icon="eva:arrow-ios-back-outline" />
          <img src={User_Image} />
        </div>
        <div className="Music_Player_Volume_And_Song_Image_Container">
          <VolumeController />
          <img className="Music_Player_Song_Small_Image" src={Song_Image01} />
          <img className="Music_Player_Big_Small_Image" src={Song_Image02} />
          <img className="Music_Player_Song_Small_Image" src={Song_Image03} />
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
        <div className="Music_Player_Pause_Play_Next_Previous_Button_Controller">
          <div></div>
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="50px"
            icon="cil:loop-1"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="50px"
            icon="ic:round-favorite"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="50px"
            icon="fluent:previous-24-filled"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="80px"
            icon="bi:play-circle-fill"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="50px"
            icon="fluent:next-24-filled"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="50px"
            icon="bx:bxs-playlist"
          />
          <Icon
            // style={{ margin: "0px 5px 0px 5px" }}
            width="50px"
            icon="fa-solid:random"
          />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
