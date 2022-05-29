import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyUploads from './screens/MyUploads';
import Signup from './screens/Signup';
import LoginScreen from './screens/LoginScreen';
import EmailVerify from './screens/EmailVerify';
import MyPlaylists from './screens/MyPlaylists';
import PrivateRoute from './helpers/PrivateRoute';
import { ProtectedRoute } from './helpers/PrivateRoute';
import AllMusics from './screens/AllMusics';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Routes>
            // Private route
            <Route element={<PrivateRoute />}>
              <Route path='/home' element={<MyUploads />} />
              <Route path='/' element={<MyUploads />} />
              <Route path='/playlist' element={<MyPlaylists />} />
              <Route path='/all' element={<AllMusics />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<LoginScreen />} />
            </Route>
            <Route
              path='/verify/:userId/:uniqueString'
              element={<EmailVerify />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
