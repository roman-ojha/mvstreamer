import React from "react";
import LogInPage from "./react-components/LogInPage";
import MainPage from "./react-components/MainPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/login" element={<LogInPage />} />
      </Routes>
    </>
  );
};

export default App;
