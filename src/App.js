import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyUploads from './screens/MyUploads';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<MyUploads />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
