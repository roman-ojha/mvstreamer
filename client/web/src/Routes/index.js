import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LogInPage";
import MusicPlayer from "../pages/MusicPlayer";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/mplayer" element={<MusicPlayer />} />
      </Routes>
    </>
  );
};

export { MainRoute };
