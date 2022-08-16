import React from 'react';
import { Outlet } from 'react-router-dom';

const hihi = () => {
  return (
    <div style={{ height: 'calc(100vh - 160px)' }}>
      <h1>hihihiha</h1>
      <Outlet />
    </div>
  );
};

export default hihi;
