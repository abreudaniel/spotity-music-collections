import React, { useEffect, useState } from 'react';
import styles from '../spotify.module.css';
import Menu from "./Menu";
import api from '../service/api';
import { AuthService } from '../service/auth';
import buttonExit from "../assets/ButtonExit.png";

interface SpotifyProfile {
    display_name: string;
    email: string;
    country: string;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    followers: {
        total: number;
    };
    product?: string;
}


const Perfil =  () => {

    const [userProfile, setUserProfile] = useState<SpotifyProfile | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!AuthService.isAuthenticated()) {
                    window.location.href = '/login';
                    return;
                }

                const response = await api.get('/me');

                localStorage.setItem('userId', response.data.id);

                setUserProfile(response.data);
            } catch (err) {
                setError('Erro ao carregar perfil' || err);
                console.error('Erro:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        // Limpa todos os dados e redireciona
        localStorage.removeItem('access_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('activeMenuItem');
        AuthService.removeToken();
        window.location.href = '/login';
    };


    return (

        <div className={styles.dashboardhead}>
            <table className={styles.mainTable}>
                <tbody>
                <tr>
                    <td className={styles.menuCell}>
                        <Menu />
                    </td>
                    <td className={styles.contentCell}>
                        {isLoading ? (
                            <div className={styles.loading}>Carregando...</div>
                        ) : error ? (
                            <div className={styles.error}>{error}</div>
                        ) : userProfile ? (
                            <div className={styles.profileContainer}>
                                <div className={styles.profileHeader}>
                                    {userProfile.images?.[0]?.url && (
                                        <img
                                            src={userProfile.images[0].url}
                                            alt="Foto do perfil"
                                            className={styles.profileImage}
                                        />
                                    )}
                                    <h1 className={styles.profileName}>
                                        {userProfile.display_name}
                                    </h1>
                                </div>

                                <div className={styles.profileInfo}>
                                    <div className={styles.infoItem}>
                                        <img src={buttonExit} alt="Descrição da imagem" onClick={handleLogout} />
                                    </div>

                                </div>
                            </div>
                        ) : null}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Perfil;