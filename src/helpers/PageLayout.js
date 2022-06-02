import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <div>
      <div className='container-fluid app-container'>
        <Sidebar />
        <Outlet />
        <div className='music-status text-center'>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;