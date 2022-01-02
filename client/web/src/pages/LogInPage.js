import React from "react";
import App_Icon from "../assets/images/App_Icon.png";
import Facebook_Icon from "../assets/images/facebook_icon.svg";
import Google_Icon from "../assets/images/google_icon.svg";
import Github_Icon from "../assets/images/github_icon.svg";

const LogInPage = () => {
  const logInwithGoogleAuth = () => {
    window.open(`${process.env.REACT_APP_BASE_API_URL}/auth/google`, "_self");
  };
  const logInWithFacebookAuth = () => {
    window.open(`${process.env.REACT_APP_BASE_API_URL}/auth/facebook`, "_self");
  };
  const logInWithGithubAuth = () => {
    window.open(`${process.env.REACT_APP_BASE_API_URL}/auth/github`, "_self");
  };
  return (
    <>
      <div className="LoginPage">
        <div className="LoginPage_Container">
          <img src={App_Icon} alt="Logo" className="LoginPage_App_Logo" />
          <h1 className="LoginPage_SignIn_Title">Sign In</h1>
          <div className="LoginPage_Button_Container">
            <div onClick={logInWithGithubAuth}>
              <img src={Github_Icon} alt="icon" />
              <h2>GitHub</h2>
            </div>
            <div onClick={logInWithFacebookAuth}>
              <img src={Facebook_Icon} alt="icon" />
              <h2 style={{ color: "#1877F2" }}>Facebook</h2>
            </div>
            <div onClick={logInwithGoogleAuth}>
              <img src={Google_Icon} alt="icon" />
              <h2 style={{ color: "#EF6054" }}>Google</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInPage;
