import React from "react";
import styles from '../spotify.module.css';
import Menu from "./Menu";

const Playlist = () => {
    console.log('Iniciou Playlist');

    // Armazena o token de acesso
    var token = localStorage.getItem('access_token');

    console.log('Dados recebidos ( token):', {token});

  return (
      <div className={styles.dashboardhead}>
          <Menu />
          <div className={styles.content}>
              Playlists
          </div>
      </div>
  )
}

export default Playlist;