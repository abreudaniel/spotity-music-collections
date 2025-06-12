import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../spotify.module.css';
import logoSpotify from "../assets/logo_spotify.png";
import homeSpotify from "../assets/Home.png";
import artistaSpotify from "../assets/Artistas.png";
import playlistSpotify from "../assets/Playlists.png";
import perfilSpotify from "../assets/Perfil.png";
import installAppSpotify from "../assets/Install App.png";

const Menu = () => {
    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate('/dashboard');
    }
    const handleArtista = () => {
        navigate('/artista');
    }

    const handlePlaylist = () => {
        navigate('/playlist');
    }

    const handlePerfil = () => {
        navigate('/perfil');
    }

    return (
        <div className={styles.dashboardcard}>
            <div>
                <img src={logoSpotify} alt="Descrição da imagem" className={styles.dashboardimagem}/>
            </div>
            <div className={styles.dashboardoption}>
                <div className={styles.dashboardhome}>
                    <img src={homeSpotify} alt="Descrição da imagem" onClick={handleDashboard}/>
                </div>
                <div className={styles.dashboardhome}>
                    <img src={artistaSpotify} alt="Descrição da imagem" onClick={handleArtista}/>
                </div>
                <div className={styles.dashboardhome}>
                    <img src={playlistSpotify} alt="Descrição da imagem" onClick={handlePlaylist}/>
                </div>
                <div className={styles.dashboardhome}>
                    <img src={perfilSpotify} alt="Descrição da imagem" onClick={handlePerfil}/>
                </div>
                <div className={styles.dashboardinstallapp}>
                    <img src={installAppSpotify} alt="Descrição da imagem"/>
                </div>
            </div>
        </div>
    );

}

export default Menu;