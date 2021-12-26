import React from "react";
import LogInPage from "./pages/LogInPage";
import MainPage from "./pages/MainPage";
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
