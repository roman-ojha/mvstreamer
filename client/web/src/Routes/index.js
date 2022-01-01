import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LogInPage";
import MusicPlayer from "../pages/MusicPlayer";
import MusicPage from "../pages/MusicPage";
import VideoPage from "../pages/VideoPage";
import FilePage from "../pages/FilePage";
import MainPage from "../pages/MainPage";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="" element={<HomePage />} />
          <Route path="music" element={<MusicPage />} />
          <Route path="video" element={<VideoPage />} />
          <Route path="file" element={<FilePage />} />
        </Route>
        <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/mplayer" element={<MusicPlayer />} />
      </Routes>
    </>
  );
};
export { MainRoute };
