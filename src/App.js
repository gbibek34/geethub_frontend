import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyUploads from "./screens/MyUploads";
import Signup from "./screens/Signup";
import LoginScreen from "./screens/LoginScreen";
import EmailVerify from "./screens/EmailVerify";
import MyPlaylists from "./screens/MyPlaylists";
import PrivateRoute, { ProtectedAdminRoute } from "./helpers/PrivateRoute";
import { ProtectedRoute } from "./helpers/PrivateRoute";
import AllMusics from "./screens/AllMusics";
import PageLayout from "./helpers/PageLayout";
import PlaylistDetailScreen from "./screens/PlaylistDetailScreen";
import ArtistProfileScreen from "./screens/ArtistProfileScreen";
import SearchArtist from "./screens/SearchScreen";
import Terms from "./screens/Terms";
import LikedMusicScreen from "./screens/LikedMusicScreen";
import AllUsersScreen from "./screens/AllUsersScreen";
import ReportedMusicScreen from "./screens/ReportedMusicScreen";
import ReportedUserScreen from "./screens/ReportedUserScreen";
import UserVerification from "./screens/admin/UserVerification";
import ForgotPassword from "./screens/ForgotPassword";
import ChangePassword from "./screens/ChangePassword";
import ResetPassword from "./screens/ResetPassword";
import NotFound from "./screens/NotFound";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Monetization from "./screens/admin/Monetization";
import LoadMoney from './screens/LoadMoney';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    // splash screen here?
    <>
      {isLoading === false ? (
        <div className='App'>
          <Router>
            <Routes>
              {/* admin path */}
              <Route path='/admin' element={<ProtectedAdminRoute />}>
                <Route element={<PageLayout />}>
                  <Route path='' element={<AllUsersScreen />} />
                  <Route
                    path='reportedmusic'
                    element={<ReportedMusicScreen />}
                  />
                  <Route path='reporteduser' element={<ReportedUserScreen />} />
                  <Route
                    path='userverification'
                    element={<UserVerification />}
                  />
                  <Route path="monetization" element={<Monetization />} />
                </Route>
              </Route>
              {/* // user path */}
              <Route path='/' element={<PrivateRoute />}>
                <Route element={<PageLayout />}>
                  <Route path='/profile' element={<MyUploads />} />
                  <Route path='/playlist' element={<MyPlaylists />} />
                  <Route path='/' element={<AllMusics />} />
                  <Route
                    path='/playlist/:playlistId'
                    element={<PlaylistDetailScreen />}
                  />
                  <Route path='/search' element={<SearchArtist />} />
                  <Route
                    path='/artist/:artistid'
                    element={<ArtistProfileScreen />}
                  />
                  <Route
                    path='/verify/:userId/:uniqueString'
                    element={<EmailVerify />}
                  />
                  <Route path='/liked' element={<LikedMusicScreen />} />
                  <Route path='/change-password' element={<ChangePassword />} />
                  <Route path='/monetization' element={<LoadMoney />} />
                </Route>
              </Route>
              {/* not login path */}
              <Route element={<ProtectedRoute />}>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route
                  path='/reset-password/:userId/:uniqueString'
                  element={<ResetPassword />}
                />
              </Route>
              {/* open path */}
              <Route
                path='/verify/:userId/:uniqueString'
                element={<EmailVerify />}
              />
              <Route path='/terms' element={<Terms />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      ) : (
        <SplashScreen />
      )}
    </>
  );
}

export default App;
