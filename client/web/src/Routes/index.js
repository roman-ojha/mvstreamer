import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LogInPage";
import MusicPlayer from "../pages/MusicPlayer";
import MusicPage from "../pages/MusicPage";
import VideoPage from "../pages/VideoPage";
import FilePage from "../pages/FilePage";
import MainPage from "../pages/MainPage";
import UploadPage from "../pages/UploadPage";
import VideoPlayer from "../pages/VideoPlayer";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="" element={<HomePage />} />
          <Route path="music" element={<MusicPage />} />
          <Route path="video" element={<VideoPage />} />
          <Route path="file" element={<FilePage />} />
          <Route path="playing" element={<HomePage />}>
            <Route path=":ID" element={<HomePage />} />
          </Route>
        </Route>
        <Route exact path="/login" element={<LogInPage />} />
        <Route path="/mplayer" element={<MusicPlayer />}>
          <Route path=":songID" element={<MusicPlayer />} />
        </Route>
        <Route path="/vplayer" element={<VideoPlayer />}>
          <Route path=":songID" element={<VideoPlayer />} />
        </Route>
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </>
  );
};
export { MainRoute };
