import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from '../spotify.module.css';
import logoSpotify from "../assets/logo_spotify.png";
import homeSpotifyOn from "../assets/Home.png";
import homeSpotify from "../assets/HomeOff.png"
import artistaSpotify from "../assets/Artistas.png";
import artistaSpotifyOn from "../assets/ArtistasOn.png";
import playlistSpotify from "../assets/Playlists.png";
import playlistSpotifyOn from "../assets/PlaylistsOn.png";
import perfilSpotify from "../assets/Perfil.png";
import perfilSpotifyOn from "../assets/PerfilOn.png";
import installAppSpotify from "../assets/Install App.png";


const menuImages = {
    home: {
        default: homeSpotify,
        active: homeSpotifyOn
    },
    actor: {
        default: artistaSpotify,
        active: artistaSpotifyOn
    },
    library: {
        default: playlistSpotify,
        active: playlistSpotifyOn
    },
    perfil: {
        default: perfilSpotify,
        active: perfilSpotifyOn
    }
};

// Pré-carregamento das imagens
const preloadImages = () => {
    Object.values(menuImages).forEach(({default: defaultImg, active}) => {
        const img1 = new Image();
        const img2 = new Image();
        img1.src = defaultImg;
        img2.src = active;
    });
};


const Menu = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(() => {
        const path = location.pathname;
        switch (path) {
            case '/dashboard': return 'home';
            case '/artista': return 'actor';
            case '/playlist': return 'library';
            case '/perfil': return 'perfil';
            default: return 'home';
        }
    });

    // Pré-carregar imagens quando o componente montar
    useEffect(() => {
        preloadImages();
    }, []);

    const menuItems = [
        { id: 'home', path: '/dashboard', label: 'Início' },
        { id: 'actor', path: '/artista', label: 'Artista' },
        { id: 'library', path: '/playlist', label: 'PlayLis' },
        { id: 'perfil', path: '/perfil', label: 'Perfil' }
    ];

    const handleNavigation = (path: string, menuItem: string) => {
        setActiveItem(menuItem);
        navigate(path);
    };

    return (
                <nav className={styles.dashboardcard}>
                    <div>
                        <img src={logoSpotify} alt="Descrição da imagem" className={styles.dashboardimagem}/>
                    </div>
                    <div className={styles.dashboardoption}>
                    {menuItems.map(item => (
                        <div
                            key={item.id}
                            className={`${styles.dashboardhome}`}
                            onClick={() => handleNavigation(item.path, item.id)}
                        >
                            <img
                                src={activeItem === item.id ?
                                    menuImages[item.id as keyof typeof menuImages].active :
                                    menuImages[item.id as keyof typeof menuImages].default}
                                alt={item.label}
                                className={styles.menuIcon}
                                loading="eager"
                            />
                            <span>{item.label}</span>
                        </div>
                    ))}
                    </div>
                    <div className={styles.dashboardinstallapp}>
                        <img src={installAppSpotify} alt="Descrição da imagem"/>
                    </div>
                </nav>
    );

}

export default Menu;