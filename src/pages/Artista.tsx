import React, { useEffect, useState } from 'react';
import styles from '../spotify.module.css';
import Menu from "./Menu";
import { Artist, ArtistService } from '../service/ArtistaService';
import textArtist from "../assets/Header.png";
import { useNavigate } from 'react-router-dom';




const Artista = () => {
    const navigate = useNavigate();

    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 /*   const [timeRange, setTimeRange] = useState('medium_term');*/

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                setIsLoading(true);
                const response = await ArtistService.getTopArtists('medium_term', 20);
                setTopArtists(response.items);
                setError(null);
            } catch (err) {
                setError('Erro ao carregar artistas preferidos');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopArtists();
    }, []
        //[timeRange]

    );

    const handleArtistClick = (artistId: string) => {
        navigate(`/artist/${artistId}/albums`);
    };


    /*    const handleTimeRangeChange = (newRange: 'short_term' | 'medium_term' | 'long_term') => {
            setTimeRange(newRange);
        };*/

    return (
        <div className={styles.dashboardhead}>
            <table className={styles.mainTable}>
                <tbody>
                <tr>
                    <td className={styles.menuCell}>
                        <Menu />
                    </td>
                    <td className={styles.contentCell}>
                        <div className={styles.artistTitle}>
                            <img src={textArtist} alt="" />
                        </div>

{/*            <div className={styles.timeRangeButtons}>
                <button
                    onClick={() => handleTimeRangeChange('short_term')}
                    className={timeRange === 'short_term' ? styles.active : ''}
                >
                    Último mês
                </button>
                <button
                    onClick={() => handleTimeRangeChange('medium_term')}
                    className={timeRange === 'medium_term' ? styles.active : ''}
                >
                    Últimos 6 meses
                </button>
                <button
                    onClick={() => handleTimeRangeChange('long_term')}
                    className={timeRange === 'long_term' ? styles.active : ''}
                >
                    Todo tempo
                </button>
            </div>*/}

            {isLoading && <div className={styles.loading}>Carregando...</div>}
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.artistsGrid}>
                {topArtists.map((artist) => (
                    <div key={artist.id} className={styles.artistCard}>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    {artist.images[0] && (
                                        <img
                                            src={artist.images[0].url}
                                            alt={artist.name}
                                            onClick={() => handleArtistClick(artist.id)}

                                        />
                                    )}
                                </td>
                                <td>
                                    <h3>{artist.name}</h3>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Artista;