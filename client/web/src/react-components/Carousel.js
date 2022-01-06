import React from "react";
import App_Icon from "../assets/images/App_Icon.png";
import { Icon } from "@iconify/react";
import Carousel_Image_01 from "../assets/images/carousel_Image_01.jpg";
import Carousel_Image_02 from "../assets/images/carousel_Image_02.jpg";
import Carousel_Image_03 from "../assets/images/carousel_Image_03.jpg";
import { useSelector } from "react-redux";

const Carousel = () => {
  const userProfileDetail = useSelector((state) => state.userProfileDetail);
  return (
    <>
      <div className="Carousel_Container">
        <div className="Carousel_UpperBar_Container">
          <div className="Carousel_App_Icon_And_Title">
            <img className="Carousel_App_Icon" src={App_Icon} alt="icon" />
            <div className="Carousel_App_Title">
              <h1>MV</h1>
              <h3>Streamer</h3>
            </div>
          </div>
          <div className="Carousel_SearchBar_Container">
            <Icon icon="bx:bx-search-alt" width="40" color="white" />
            <input type="text" placeholder="Search.." />
          </div>
          <img
            className="Carousel_User_Icon"
            src={userProfileDetail.picture}
            alt="icon"
          />
        </div>

        <div className="Carousel_Inner_Container">
          {/* This is form Bootstrap v5.1 */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="Carousel_Image_Filter"></div>
                <img
                  src={Carousel_Image_01}
                  className="d-block w-100"
                  alt="..."
                  style={{ height: "65vh", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block carousel_MV_Info_and_Play_Button">
                  <h2>Kavhi Khusi Kavhi Gam</h2>
                  <p>Singer: Sonu Nigam</p>
                  <Icon
                    className="Carousel_PlayIcon"
                    icon="bi:play-circle-fill"
                    width="85px"
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="Carousel_Image_Filter"></div>
                <img
                  src={Carousel_Image_02}
                  className="d-block w-100"
                  alt="..."
                  style={{ height: "65vh", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block carousel_MV_Info_and_Play_Button">
                  <h2>Kavhi Khusi Kavhi Gam</h2>
                  <p>Singer: Sonu Nigam</p>
                  <Icon
                    className="Carousel_PlayIcon"
                    icon="bi:play-circle-fill"
                    width="85px"
                  />
                </div>
              </div>
              <div className="carousel-item">
                <div className="Carousel_Image_Filter"></div>
                <img
                  src={Carousel_Image_03}
                  className="d-block w-100"
                  alt="..."
                  style={{ height: "65vh", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block carousel_MV_Info_and_Play_Button">
                  <h2>Kavhi Khusi Kavhi Gam</h2>
                  <p>Singer: Sonu Nigam</p>
                  <Icon
                    className="Carousel_PlayIcon"
                    icon="bi:play-circle-fill"
                    width="85px"
                  />
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
              style={{ zIndex: "4", width: "80px" }}
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
              style={{ zIndex: "4", width: "80px" }}
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
