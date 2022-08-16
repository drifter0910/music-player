import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import DashboardContent from './components/DashboardContent/DashboardContent';
import tracks from './tracks';
import Hihi from './Page/Hihi';
import TrackContext from './context/AudioContext';
const App = () => {
  const { changeTrack, isPlaying, setIsPlaying } = useContext(TrackContext);
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route
            path=""
            element={
              <DashboardContent
                tracks={tracks}
                changeTrack={changeTrack}
                onPlayPauseClick={setIsPlaying}
                isPlaying={isPlaying}
              />
            }
          />
          <Route path="hihi" element={<Hihi />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
