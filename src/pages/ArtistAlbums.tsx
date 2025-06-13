import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Album, Artist, ArtistService} from '../service/ArtistaService';
import styles from '../spotify.module.css';
import Menu from "../pages/Menu";
import buttonarrow from "../assets/arrow-left.png";
import {AuthService} from "../service/auth";

const ArtistAlbums = () => {
    /*const { artistId } = useParams<{ artistId: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);*/

    const {artistId} = useParams<{ artistId: string }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [artist, setArtist] = useState<Artist | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchAlbums = async () => {
            if (!artistId) return;

            try {
                setIsLoading(true);
                /* const response = await ArtistService.getArtistAlbums(artistId, ['album'],5);
                */
                const [artistData, albumsData] = await Promise.all([
                    ArtistService.getArtist(artistId),
                    ArtistService.getArtistAlbums(artistId, ['album'], 5)
                ]);


                setArtist(artistData);
                setAlbums(albumsData.items);
                setError(null);
            } catch (err) {
                setError('Erro ao carregar álbuns');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbums();
    }, [artistId]);

    const handleBack = () => {
        window.location.href = '/artista';
    };

    return (
        <div className={styles.dashboardhead}>
            <table className={styles.mainTable}>
                <tbody>
                <tr>
                    <td className={styles.menuCell}>
                        <Menu/>
                    </td>
                    <td className={styles.contentCell}>
                        {/*   <div className={styles.filterButtons}>
                            <button
                                onClick={() => setAlbumType(['album'])}
                                className={albumType.includes('album') ? styles.active : ''}
                            >
                                Álbuns
                            </button>
                            <button
                                onClick={() => setAlbumType(['single'])}
                                className={albumType.includes('single') ? styles.active : ''}
                            >
                                Singles
                            </button>
                            <button
                                onClick={() => setAlbumType(['compilation'])}
                                className={albumType.includes('compilation') ? styles.active : ''}
                            >
                                Compilações
                            </button>
                        </div>*/}

                        {isLoading && <div className={styles.loading}>Carregando...</div>}
                        {error && <div className={styles.error}>{error}</div>}


                        {artist && (


                            <div className={styles.artistArrow}>
                                <div className={styles.artistHeader}>
                                    <img src={buttonarrow} alt="Descrição da imagem"
                                         onClick={handleBack}/>
                                    <h5 className={styles.artistName}>{artist.name}</h5>
                                </div>
                                <div className={styles.artistBackAlbum}>
                                    {artist.images?.[0]?.url && (
                                        <img
                                            src={artist.images[0].url}
                                            alt={artist.name}
                                            className={styles.artistHeaderImage}
                                        />
                                    )}
                                </div>


                            </div>
                        )}

                        <div className={styles.albumsGrid}>
                            {albums.map((album) => (

                                <div key={album.id} className={styles.albumCard}>
                                    {/*<table>
                                        <tbody>
                                        <tr>
                                            <td>*/}
                                    <div>
                                        {album.images[0] && (
                                            <img
                                                src={album.images[0].url}
                                                alt={album.name}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.albumInfo}>
                                        <h3>{album.name}</h3>
                                        <h4>
                                            {new Date(album.release_date).getDay()}/{new Date(album.release_date).getMonth()}/{new Date(album.release_date).getFullYear()}
                                        </h4>
                                    </div>
                                    {/* </td>
                                            <td>*/}
                                    {/*<div className={styles.albumInfo}>
                                                    <h3>{album.name}</h3>
                                                    <h4 className={styles.releaseDate}>
                                                        {new Date(album.release_date).getDay()}/{new Date(album.release_date).getMonth()}/{new Date(album.release_date).getFullYear()}
                                                    </h4>
                                                </div>*/}
                                    {/*        </td>
                                        </tr>
                                        </tbody>
                                    </table>*/}
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

export default ArtistAlbums;
