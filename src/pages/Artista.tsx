import React from "react";
import styles from '../spotify.module.css';
import Menu from "./Menu";

const Artista = () => {
    console.log('Iniciou Artista');

    // Armazena o token de acesso
    var token = localStorage.getItem('access_token');

    console.log('Dados recebidos ( token):', {token});

  return (
      <div className={styles.dashboardhead}>
          <div style={{color: '#ffffff', paddingLeft: '920px'}}>
              Artista
          </div>
          <Menu />
      </div>

  )
}

export default Artista;