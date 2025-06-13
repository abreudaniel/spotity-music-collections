import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import './index.css';
import Login from "./pages/Login";
import Callback from './pages/Callback';
import Dashboard from './pages/Dashboard';
import Artista  from "./pages/Artista";
import Playlist  from "./pages/Playlist";
import Perfil from "./pages/Perfil";
import ArtistAlbums from './pages/ArtistAlbums';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/artista" element={<Artista />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/artist/:artistId/albums" element={<ArtistAlbums />} />
              <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
      </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
