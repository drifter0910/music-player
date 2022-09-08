import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import DashboardContent from './components/DashboardContent/DashboardContent';
import Albums from './Page/Albums';
import AllTracks from './Page/AllTracks';
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<DashboardContent />} />
          <Route path="albums" element={<Albums />} />
          <Route path="alltracks" element={<AllTracks />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
