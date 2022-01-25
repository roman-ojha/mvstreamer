import React, { useState } from "react";
import App_Icon from "../assets/images/App_Icon.png";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Carousel = (props) => {
  const navigate = useNavigate();
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
        <div
          className={parentClassName}
          onClick={() => {
            navigate(`/mplayer/${props.item.mediaPath.split("/")[1]}`, {
              state: { from: "url", metaData: props.item },
            });
          }}
        >
          <div className="Carousel_Image_Filter">
            <div className="carousel_MV_Info_and_Play_Button">
              <h2>{props.item.title}</h2>
              <p>Artist: {props.item.singerName}</p>
              <Icon className="Carousel_PlayIcon" icon="bi:play-circle-fill" />
            </div>
          </div>
          <img
            src={props.item.imgUrl}
            className="d-block w-100 carousel_Item_Image"
            alt="..."
          />
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
            <Icon
              className="Carousel_SearchBar_Container_Icon"
              icon="bx:bx-search-alt"
              width="4rem"
              color="white"
            />
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
