import React from 'react';
import { Routes } from 'react-router-dom';
import Dashboard from './Page/Dashboard';
import { Route } from 'react-router-dom';
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/" element={<Dashboard />}>
          <Route path="personal" element={<DashboardMessages />} />
        </Route> */}
      </Routes>
    </div>
  );
};

export default App;
