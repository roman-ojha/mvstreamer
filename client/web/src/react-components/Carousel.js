import React from "react";
import App_Icon from "../assets/images/App_Icon.png";
import { Icon } from "@iconify/react";
import Carousel_Image_01 from "../assets/images/carousel_Image_01.jpg";
import Carousel_Image_02 from "../assets/images/carousel_Image_02.jpg";
import Carousel_Image_03 from "../assets/images/carousel_Image_03.jpg";
import { useSelector } from "react-redux";

const Carousel = (props) => {
  const items = props.carouselItem;
  const userProfileDetail = useSelector((state) => state.userProfileDetail);
  const CarouselIndicatorButton = (props) => {
    let ariaCurrent;
    let className;
    const ariaLabel = `Slide ${props.index + 1}`;
    if (props.index === 0) {
      ariaCurrent = "true";
      className = "active";
    } else {
      ariaCurrent = "false";
      className = "";
    }
    return (
      <>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          className={className}
          aria-current={ariaCurrent}
          data-bs-slide-to={props.index}
          aria-label={ariaLabel}
        ></button>
      </>
    );
  };
  const CarouselItem = (props) => {
    let parentClassName;
    if (props.index === 0) {
      parentClassName = "carousel-item active";
    } else {
      parentClassName = "carousel-item";
    }
    return (
      <>
        <div className={parentClassName}>
          <div className="Carousel_Image_Filter"></div>
          <img
            src={props.item.imgUrl}
            className="d-block w-100"
            alt="..."
            style={{
              height: "65vh",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          <div className="carousel-caption d-none d-md-block carousel_MV_Info_and_Play_Button">
            <h2>{props.item.title}</h2>
            <p>Artist: {props.item.singerName}</p>
            <Icon
              className="Carousel_PlayIcon"
              icon="bi:play-circle-fill"
              width="85px"
            />
          </div>
        </div>
      </>
    );
  };
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
        <div className="Carousel_Inner_Container" onClick={() => {}}>
          {/* This is form Bootstrap v5.1 */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {items.map((value, index) => {
                return <CarouselIndicatorButton key={index} index={index} />;
              })}
            </div>
            <div className="carousel-inner">
              {items.map((value, index) => {
                return <CarouselItem item={value} index={index} key={index} />;
              })}
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
