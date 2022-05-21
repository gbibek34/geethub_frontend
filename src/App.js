import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyUploads from './screens/MyUploads';
import Signup from './screens/Signup';
import EmailVerify from './screens/EmailVerify';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<MyUploads />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/verify/:userId/:uniqueString' element={<EmailVerify />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
