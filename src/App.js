import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserProfile from './screens/UserProfile';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
