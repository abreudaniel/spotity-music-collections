import React, { useEffect, useState } from 'react';
import styles from '../spotify.module.css';
import Menu from "./Menu";
import api from '../service/api';
import { AuthService } from '../service/auth';
import buttonCreateList from "../assets/button_create.png";
import textCreateList from "../assets/myPlayList.png";
import NewPlaylistModal from './NewPlaylistModal';



interface Playlist {
    id: string;
    name: string;
    description: string;
    images: Array<{ url: string }>;
    tracks: {
        total: number;
        href: string;
    };
    owner: {
        display_name: string;
    };
}

interface PlaylistsResponse {
    items: Playlist[];
    total: number;
    limit: number;
    offset: number;
}



const Playlist = () => {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchPlayList = async () => {
            try {
                if (!AuthService.isAuthenticated()) {
                    window.location.href = '/login';
                    return;
                }

                // Parâmetros da API
                const params = {
                    limit: 50,  // número de músicas por página
                    offset: 0   // para paginação
                };


                console.log('Iniciou Playlist');
                console.log("UserId: ", localStorage.getItem('userId'));

                if(localStorage.getItem('userId') == null){
                    const newUserId = await api.get('/me');
                    localStorage.setItem('userId', newUserId.data.id);
                }

                const user_id = localStorage.getItem('userId');

                const userId = String(user_id);


                console.log("Denovo UserId: ", userId);

                const response = await api.get('/users/'+userId+'/playlists');
                setPlaylists(response.data.items);
            } catch (err) {
                setError('Erro ao carregar playlist' || err);
                console.error('Erro:', err);
            }
        };

        fetchPlayList();
    }, []);

    const handleCreatePlaylist = async (name: string, description: string) => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await api.post(`/users/${userId}/playlists`, {
                name,
                description,
                public: true
            });

            // Atualizar a lista de playlists
            setIsModalOpen(false);
            // Adicione aqui a lógica para atualizar a lista de playlists

        } catch (error) {
            console.error('Erro ao criar playlist:', error);
        }
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
                      ) : playlists ? (
                          <div className={styles.profileContainer}>
                              <div className={styles.playlistHeader}>
                                  <div className={styles.playlistCard}>
                                      <div className={styles.playlistContent}>

                                          <div className={styles.imageWrapperText}>
                                              <img src={textCreateList} alt="" />
                                          </div>
                                          <div className={styles.imageWrapperButton}>
                                              <img src={buttonCreateList} alt="Descrição da imagem" onClick={() => setIsModalOpen(true)} />
                                          </div>
                                      </div>
                                  </div>


                              </div>
                              {playlists.map(playlist => (
                              <div className={styles.playlistCard}>
                                  <div className={styles.playlistContent}>
                                      {playlist.images?.[0]?.url && (
                                          <div className={styles.imageWrapper}>
                                              <img
                                                  src={playlist.images[0].url}
                                                  alt={`Capa da playlist ${playlist.name}`}
                                                  className={styles.playlistImage}
                                              />
                                          </div>
                                      )}
                                      <div className={styles.playlistInfo}>
                                          <h3>{playlist.name}</h3>
                                          <p className={styles.ownerName}>{playlist.owner.display_name}</p>
                                      </div>
                                  </div>
                              </div>
                              ))}
                          </div>
                      ) : null}

                      <NewPlaylistModal
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          onCreatePlaylist={handleCreatePlaylist}
                      />

                  </td>
              </tr>
              </tbody>
          </table>
      </div>
  )
}

export default Playlist;