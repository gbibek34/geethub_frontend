import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyUploads from "./screens/MyUploads";
import Signup from "./screens/Signup";
import LoginScreen from "./screens/LoginScreen";
import EmailVerify from "./screens/EmailVerify";
import MyPlaylists from "./screens/MyPlaylists";
import PrivateRoute from "./helpers/PrivateRoute";
import { ProtectedRoute } from "./helpers/PrivateRoute";
import AllMusics from "./components/AllMusics";
import PageLayout from "./helpers/PageLayout";
import PlaylistDetailScreen from "./screens/PlaylitsDetailScreen";
import ArtistProfileScreen from "./screens/ArtistProfileScreen";
import SearchArtist from "./screens/SearchScreen";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<PageLayout />}>
              {/* <Route path='/home' element={<MyUploads />} /> */}
              <Route path="/profile" element={<MyUploads />} />
              <Route path="/playlist" element={<MyPlaylists />} />
              <Route path="/" element={<AllMusics />} />
              <Route
                path="/playlist/:playlistId"
                element={<PlaylistDetailScreen />}
              />
              <Route path="/search" element={<SearchArtist />} />
              <Route path='/artist/:artistid' element={<ArtistProfileScreen/>}/>
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginScreen />} />
          </Route>
          <Route
            path="/verify/:userId/:uniqueString"
            element={<EmailVerify />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
