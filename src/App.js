import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import MyUploads from './screens/MyUploads';
import Signup from './screens/Signup';
import LoginScreen from './screens/LoginScreen';
import EmailVerify from './screens/EmailVerify';
import PrivateRoute from './components/PrivateRoute';
import { ProtectedRoute} from './components/PrivateRoute';

function App() {
  return (
    <div className='App'>
      <Router>
        <div>
          <Routes>
            // Private route
            <Route element={<PrivateRoute/>}>
              <Route path='/home' element={<MyUploads />} />
              <Route path='/' element={<MyUploads />} />
            </Route>
            <Route element={<ProtectedRoute/>}>
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
